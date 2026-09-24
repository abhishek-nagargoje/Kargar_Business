# Media Library — Managed Service Photographs

**Status:** Code complete for both images and videos, migration written but **not yet applied to the production database** (see §7 — requires your explicit go-ahead).

## 1. What this is

A production system letting KARGAR admins upload real service photographs and videos (housekeeping staff at work, security guards, electrical/HVAC technicians, etc.) and control where they appear on the site — without a developer touching React source code. Until an admin uploads and publishes a replacement, every existing page keeps showing its current image unchanged (the fallback system, §5).

**Supports two media types:** images (JPEG/PNG/WebP, 5MB limit) and videos (MP4/WebM, 100MB limit), sharing one admin UI, one database table, and one RLS/permission model — see §3.

## 2. Architecture

```
Admin (Media Library page, /admin/media)
    ↓ upload / edit / delete / assign / reorder
media.service.ts  (src/services/media.service.ts)
    ↓
media.repository.ts (storage) + Supabase client (database)
    ↓
Supabase: media_images + media_image_assignments tables, service-images storage bucket
    ↓ (RLS: public reads only status='published')
useManagedImage hook → ManagedImage component
    ↓
Service pages (hero images) + Pune landing pages (hero images)
    — falls back to the existing static image if nothing is published/assigned yet
```

This reuses, rather than duplicates, everything that already existed:
- **Auth/authorization:** the existing `admin_users` table and `public.is_admin()` Postgres function (no new auth system).
- **Real service taxonomy:** FKs to the existing `public.services` table, not an invented one.
- **Storage/RLS conventions:** the new `service-images` bucket and its policies are a direct copy of the existing `case-study-images` bucket pattern (`supabase/migrations/005_storage.sql`).
- **Frontend patterns:** repository + service layer (mirrors `review.repository.ts`/`admin.service.ts`), React Query + `react-hot-toast` + the existing `Modal`/`Card`/`Badge`/`EmptyState` admin UI components (no new design language introduced).

## 3. Database

**Migration file:** `supabase/migrations/20260923000000_add_media_library.sql` (not yet applied — see §7).

### `media_images`
One row per uploaded photograph or video. Key columns: `media_type` (`image`/`video`, default `image`), `bucket` (`service-images`/`service-videos`), `storage_path`, `public_url`, `thumbnail_path`/`thumbnail_url` (video poster image only, null for images), `title`, `alt_text` (required, non-blank), `caption`, `description`, `service_id` (FK → `services`, nullable — null means "general/not service-specific"), `mime_type`, `file_size` (type-aware CHECK constraint: ≤5MB for `image` rows, ≤100MB for `video` rows, also enforced by the storage bucket size limit), `width`/`height`, `status` (`draft`/`published`/`archived`), `is_featured`, `display_order`, `created_by` (FK → `admin_users`). Indexed on `media_type` for fast filtering.

### `media_image_assignments`
Many-to-many join table so one photo can serve multiple pages (e.g. a housekeeping photo used on both `/services/soft-services/housekeeping` and `/housekeeping-services-pune`). Columns: `media_image_id`, `placement` (`hero` / `gallery` / `homepage` / `service-card` / `section`), `page_path` (nullable — null means "any page for this placement+service"; a specific path scopes it tighter).

### RLS
- Public (anon + authenticated): can `SELECT` only `media_images` where `status = 'published'`, and only `media_image_assignments` whose parent image is published.
- Admins (`public.is_admin()`): full `SELECT`/`INSERT`/`UPDATE`/`DELETE` on both tables.
- No public write access anywhere — enforced database-side, not just in the frontend.

### Storage buckets
- **`service-images`** — public-read, 5MB limit, `image/jpeg` / `image/png` / `image/webp` only. Also holds video poster images.
- **`service-videos`** — public-read, 100MB limit, `video/mp4` / `video/webm` only. New in this pass; same admin-only insert/update/delete RLS pattern as every other bucket in this project.

## 4. Admin workflow

1. Go to **Admin → Media Library** (`/admin/media`).
2. **Upload:** choose Image or Video with the media-type toggle, drag-and-drop or browse for a file (accepted types/size limit shown dynamically), fill in Title + Alt Text (required) + optional Caption/Service/Status, click Upload. New uploads default to `draft` unless you explicitly set Published. **Video only:** you can optionally attach a poster/thumbnail image, shown before playback starts and used as the placeholder in the admin grid.
3. **Assign:** open Edit on an image, add a placement (e.g. `hero`) and optionally a specific page path (e.g. `/housekeeping-services-pune`) — leave the page path blank to make it eligible for every page matching that placement+service.
4. **Publish:** set Status to `published` in the Edit modal — only published images are ever shown on the live site.
5. **Reorder:** display order is respected wherever multiple images share a placement (drag-and-drop reordering in the grid is not yet built — see §8).
6. **Delete:** shows a warning listing every current placement before confirming, so you don't accidentally break a page's hero image without knowing.

## 5. Frontend integration & fallback system

`ManagedImage` (`src/features/media/components/ManagedImage.tsx`) wraps the existing `OptimizedImage` component. It looks up a published, assigned **image** via `useManagedImage`; if none exists (the normal starting state — the media library begins empty), it silently renders the existing static fallback image, exactly as before. No page can ever show a broken or blank image because of this system. **Unchanged by video support.**

**`ManagedVideo`** (`src/features/media/components/ManagedVideo.tsx`, new) looks up a published, assigned **video** via `useManagedVideo`. Unlike images, there is no legacy static video anywhere on the site, so when nothing is published it renders nothing (`null`) rather than a fallback — there's nothing to fall back to. Native `<video controls preload="metadata" playsInline>`, optional `poster`, never autoplays (so it can never autoplay with sound). Not wired into any page yet — infrastructure only, ready to drop into a hero or gallery slot once real footage exists.

**Wired in this pass (images only):**
- `HeroSection.tsx` — hero background image for all 4 real service-detail pages (`/services/hard-services/electrical-maintenance`, `/services/hard-services/hvac-maintenance`, `/services/soft-services/housekeeping`, `/services/soft-services/security-services`)
- `PuneLandingPage.tsx` — hero background image for all 5 Pune landing pages

**Not wired in this pass** (deliberately, to keep the diff focused — see §8): homepage service cards, sector cards, category hub pages, a dedicated gallery section, and any `ManagedVideo` placement. The pieces are generic and ready to be dropped into any of these the same way, once there is real content to justify it.

**Known gap:** videos have no caption track (`<track kind="captions">`) — admins have no way to attach one yet, and fabricating one would misrepresent the video's actual audio. Documented here rather than faked; add real caption support as a follow-up if/when video is actually used.

## 6. Existing AI images

Nothing was deleted. Every page's current `serviceImages`/`punePages` config image is still the literal fallback source — it's what renders today, since the media library has zero rows. Replacement happens per-image, per-admin-action, gradually, exactly as required.

## 7. ⚠️ Required manual action — migration not yet applied

**The migration file exists in the repo but has NOT been run against the production Supabase database.** This is deliberate: creating tables, RLS policies, and a storage bucket on a live production database is a real, hard-to-casually-reverse action, and I do not apply database migrations to production without your explicit confirmation.

To apply it:
```
supabase db push
```
(run from the repository root, where `supabase/migrations/20260923000000_add_media_library.sql` lives — the CLI is already installed and the project is already linked to `gufwdccyiqryisyzravk`).

**Until this is run:**
- The Media Library admin page will show an error when it tries to query `media_images` (the table doesn't exist yet).
- `ManagedImage` will safely fall back to existing static images everywhere (its error handling treats "table doesn't exist" the same as "no published image found").
- The rest of the site is completely unaffected.

After applying, regenerate the TypeScript types from the real schema so they never drift from what's hand-authored here:
```
supabase gen types typescript --linked > src/supabase/types.ts
```

## 8. Explicitly deferred (not built in this pass)

- **Drag-and-drop visual reordering** in the admin grid (the `reorderMediaImages` service function exists; only the UI drag handler is missing).
- **Duplicate-upload detection** (Phase 39 of the brief) — flagged as low-priority/optional there; not built.
- **Automated tests** — this project has no test runner configured (confirmed earlier this session, `package.json` has no `test` script). Adding one would be a separate, larger decision, not something to slip into this feature's scope.
- **Homepage/sector/category-hub image integration** — infrastructure is ready (§5); not wired yet since there's no content-quality reason to force it in before real photos exist to differentiate placements.

## 9. Services page & service-detail media (added 2026-09-24)

The Media Library now drives the Services listing and every service-detail page. No new tables, buckets, hooks or admin pages were added — everything reuses `media_images` / `media_image_assignments`, `fetchPublishedImages`, and the existing admin UI.

### Where each placement appears

| Placement | Page path to assign | Where it renders | Fallback when nothing is published |
|---|---|---|---|
| `service-card` | `/services` (or blank) | Service card on `/services` (`ServiceCard.tsx`) — image **or** video | Existing static service image |
| `hero` | the service page path (or blank) | Framed hero media on the service page (`HeroSection.tsx`) — a hero **video** takes precedence over a hero image | Existing static hero image |
| `gallery` | the service page path (or blank) | "Real Service Work" section (`ServiceMediaSection.tsx` → `ServiceMediaGallery.tsx`) — mixed images/videos, thumbnails, lightbox | Section is hidden (static images are illustrative, so they are never presented as "real work") |

The same media item can hold several assignments, so one real photo can serve the card, the hero and the gallery.

### Selection priority

`fetchPublishedImages` now orders results: (1) assignment scoped to the exact page path, (2) page-agnostic assignment, then featured, then assignment display order, then media display order. A media item assigned twice to one placement appears once. Only `published` media is ever returned (RLS).

### Service slug mapping (bug fix)

The `services` table's slugs do not all match the URL slugs (`housekeeping` ↔ `housekeeping-services`, `electrical-maintenance` ↔ `electrical-systems-maintenance`). Before this change, managed media for Housekeeping and Electrical could never resolve. Each registry service now declares `catalogSlug` (its `services`-table slug) and every media lookup — service pages, cards and Pune landing pages — uses it.

Category hub pages (`/services/hard-services`, `/services/soft-services`) no longer query the Media Library: without a service filter, the lookup matched *any* service's hero media.

### Admin additions

The Edit modal now exposes **Display order** and **Featured**, suggests real page paths (Services page, the 4 service pages, the 5 Pune pages) in the page-path field, and explains where the selected placement renders.

### Performance

Lookups go through React Query (`useManagedMediaList`), so identical lookups share one request. Galleries mount only the active video; thumbnails are posters/images. Card videos use `preload="none"` when a poster exists, otherwise `preload="metadata"`. Nothing autoplays.

### Still manual

- Poster images can only be attached at upload time (no "replace poster" on edit yet).
- Real KARGAR videos have not been uploaded yet — the video paths were verified with a local test file only; nothing was published.
