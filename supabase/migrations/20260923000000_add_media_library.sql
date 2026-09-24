-- ============================================================
-- KARGAR FACILITY MANAGEMENT — PRODUCTION DATABASE
-- Media Library: managed service photographs and videos
-- ============================================================
-- Reuses existing conventions: public.is_admin(), public.update_updated_at_column(),
-- public.log_audit_event(), public.services (real service taxonomy), and the same
-- storage-bucket/policy pattern already used for case-study-images (005_storage.sql).
--
-- Size/type limits below must stay in sync with the frontend constants in
-- frontend/src/repositories/media.repository.ts (IMAGE_MAX_BYTES / VIDEO_MAX_BYTES /
-- IMAGE_MIME_TYPES / VIDEO_MIME_TYPES) — there is no single runtime-configurable source
-- for these because Supabase storage bucket limits are set at bucket-creation time.
-- ============================================================

BEGIN;

-- ============================================================
-- 1. ENUMS
-- ============================================================

CREATE TYPE public.media_status AS ENUM (
  'draft',
  'published',
  'archived'
);

CREATE TYPE public.media_type AS ENUM (
  'image',
  'video'
);

-- ============================================================
-- 2. TABLES
-- ============================================================

-- ----------------------------------------------------------
-- media_images
-- ----------------------------------------------------------
-- One row per uploaded photograph OR video (media_type distinguishes them — kept as a
-- single table rather than two, since both share every other column: metadata, service
-- taxonomy, status, assignments, ordering). Not tied to a single page — see
-- media_image_assignments for the many-to-many placement model.
--
-- For video rows, thumbnail_path/thumbnail_url hold an optional poster image (admins
-- upload it separately as a normal image file); for image rows they're unused.
-- ----------------------------------------------------------
CREATE TABLE public.media_images (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_type     public.media_type NOT NULL DEFAULT 'image',
  bucket         TEXT NOT NULL DEFAULT 'service-images',
  storage_path   TEXT NOT NULL,
  public_url     TEXT NOT NULL,
  thumbnail_path TEXT,
  thumbnail_url  TEXT,
  title          TEXT NOT NULL,
  alt_text       TEXT NOT NULL,
  caption        TEXT,
  description    TEXT,
  service_id     UUID REFERENCES public.services(id) ON DELETE SET NULL,
  mime_type      TEXT NOT NULL,
  file_size      INTEGER NOT NULL,
  width          INTEGER,
  height         INTEGER,
  status         public.media_status NOT NULL DEFAULT 'draft',
  is_featured    BOOLEAN NOT NULL DEFAULT false,
  display_order  SMALLINT NOT NULL DEFAULT 0,
  created_by     UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT media_images_unique_path UNIQUE (storage_path),
  CONSTRAINT media_images_title_not_blank
    CHECK (length(trim(title)) > 0),
  CONSTRAINT media_images_alt_text_not_blank
    CHECK (length(trim(alt_text)) > 0),
  -- Images capped at 5 MB (matches the service-images bucket); videos at 100 MB
  -- (matches the service-videos bucket) — see the file header note on keeping these
  -- in sync with the frontend constants.
  CONSTRAINT media_images_file_size_valid
    CHECK (
      file_size > 0
      AND (
        (media_type = 'image' AND file_size <= 5242880)
        OR (media_type = 'video' AND file_size <= 104857600)
      )
    ),
  CONSTRAINT media_images_display_order_valid
    CHECK (display_order >= 0)
);

COMMENT ON TABLE public.media_images IS
  'Real KARGAR service photographs and videos managed by admins, gradually replacing generic imagery.';

-- ----------------------------------------------------------
-- media_image_assignments
-- ----------------------------------------------------------
-- Many-to-many: one image can appear in multiple placements/pages.
-- page_path is nullable — NULL means "any page for this placement+service"
-- (e.g. a general housekeeping hero usable on both the service page and its
-- Pune landing page); a specific path scopes it to exactly one page.
-- ----------------------------------------------------------
CREATE TABLE public.media_image_assignments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_image_id  UUID NOT NULL REFERENCES public.media_images(id) ON DELETE CASCADE,
  placement       TEXT NOT NULL,
  page_path       TEXT,
  display_order   SMALLINT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT media_image_assignments_placement_valid
    CHECK (placement IN ('hero', 'gallery', 'homepage', 'service-card', 'section')),
  CONSTRAINT media_image_assignments_display_order_valid
    CHECK (display_order >= 0),
  CONSTRAINT media_image_assignments_unique
    UNIQUE (media_image_id, placement, page_path)
);

COMMENT ON TABLE public.media_image_assignments IS
  'Placement of a media_images row on a specific page/section — many-to-many so one photo can serve multiple pages.';

-- ============================================================
-- 3. INDEXES
-- ============================================================

CREATE INDEX idx_media_images_service_id ON public.media_images(service_id);
CREATE INDEX idx_media_images_status ON public.media_images(status);
CREATE INDEX idx_media_images_media_type ON public.media_images(media_type);
CREATE INDEX idx_media_image_assignments_media_image_id ON public.media_image_assignments(media_image_id);
CREATE INDEX idx_media_image_assignments_placement_page ON public.media_image_assignments(placement, page_path);

-- ============================================================
-- 4. TRIGGERS
-- ============================================================

CREATE TRIGGER trg_media_images_updated_at
  BEFORE UPDATE ON public.media_images
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_audit_media_images
  AFTER INSERT OR UPDATE OR DELETE ON public.media_images
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- ============================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.media_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_image_assignments ENABLE ROW LEVEL SECURITY;

-- Public (anon + authenticated) can read only published images
CREATE POLICY "Public read published media_images"
  ON public.media_images FOR SELECT
  USING (status = 'published');

-- Admins can read every image regardless of status
CREATE POLICY "Admins read all media_images"
  ON public.media_images FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only admins can create/update/delete images
CREATE POLICY "Admins manage media_images"
  ON public.media_images FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Public can read assignments whose parent image is published
CREATE POLICY "Public read assignments of published media_images"
  ON public.media_image_assignments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.media_images mi
      WHERE mi.id = media_image_id AND mi.status = 'published'
    )
  );

-- Admins can read every assignment
CREATE POLICY "Admins read all media_image_assignments"
  ON public.media_image_assignments FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only admins can create/update/delete assignments
CREATE POLICY "Admins manage media_image_assignments"
  ON public.media_image_assignments FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 6. STORAGE BUCKET
-- ============================================================
-- Follows the exact same pattern as case-study-images (005_storage.sql).

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'service-images',
  'service-images',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

CREATE POLICY "Public read service-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'service-images');

CREATE POLICY "Admins upload service-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'service-images'
    AND public.is_admin()
  );

CREATE POLICY "Admins update service-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'service-images'
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id = 'service-images'
    AND public.is_admin()
  );

CREATE POLICY "Admins delete service-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'service-images'
    AND public.is_admin()
  );

-- Separate bucket for video: Supabase storage buckets have one file-size ceiling and one
-- allowed-mime-types list each, so video (larger files, different mime types) needs its
-- own bucket rather than trying to force one bucket to serve both. Same admin-write/
-- public-read policy shape as service-images.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'service-videos',
  'service-videos',
  true,
  104857600, -- 100 MB
  ARRAY['video/mp4', 'video/webm']
);

CREATE POLICY "Public read service-videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'service-videos');

CREATE POLICY "Admins upload service-videos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'service-videos'
    AND public.is_admin()
  );

CREATE POLICY "Admins update service-videos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'service-videos'
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id = 'service-videos'
    AND public.is_admin()
  );

CREATE POLICY "Admins delete service-videos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'service-videos'
    AND public.is_admin()
  );

COMMIT;
