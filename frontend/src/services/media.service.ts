import { supabase } from '@/supabase/client';
import { throwSupabaseError } from '@/lib/supabaseError';
import { MediaRepository } from '@/repositories/media.repository';
import type { Tables, Updates, Inserts } from '@/supabase/types';
import type { MediaImage, MediaImageAssignment, MediaPlacement, MediaStatus, MediaType } from '@/types';

type MediaImageRow = Tables<'media_images'>;
type MediaAssignmentRow = Tables<'media_image_assignments'>;

export interface ServiceOption {
  id: string;
  name: string;
  slug: string;
}

export interface CreateMediaImagePayload {
  file: File;
  /** Defaults to 'image' — pass 'video' to upload a video file instead. */
  mediaType?: MediaType;
  /** Video only: an optional poster/thumbnail image, uploaded to the image bucket alongside the video. */
  posterFile?: File;
  title: string;
  altText: string;
  caption?: string;
  description?: string;
  serviceId?: string | null;
  status?: MediaStatus;
  isFeatured?: boolean;
  displayOrder?: number;
}

export interface UpdateMediaImagePayload {
  title?: string;
  altText?: string;
  caption?: string | null;
  description?: string | null;
  serviceId?: string | null;
  status?: MediaStatus;
  isFeatured?: boolean;
  displayOrder?: number;
}

export interface AssignMediaImagePayload {
  mediaImageId: string;
  placement: MediaPlacement;
  pagePath?: string | null;
  displayOrder?: number;
}

function mapAssignment(row: MediaAssignmentRow): MediaImageAssignment {
  return {
    id: row.id,
    mediaImageId: row.media_image_id,
    placement: row.placement as MediaPlacement,
    pagePath: row.page_path,
    displayOrder: row.display_order,
  };
}

function mapMediaImage(row: MediaImageRow, assignments: MediaAssignmentRow[]): MediaImage {
  return {
    id: row.id,
    mediaType: row.media_type,
    bucket: row.bucket,
    storagePath: row.storage_path,
    publicUrl: row.public_url,
    thumbnailPath: row.thumbnail_path,
    thumbnailUrl: row.thumbnail_url,
    title: row.title,
    altText: row.alt_text,
    caption: row.caption,
    description: row.description,
    serviceId: row.service_id,
    mimeType: row.mime_type,
    fileSize: row.file_size,
    width: row.width,
    height: row.height,
    status: row.status,
    isFeatured: row.is_featured,
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    assignments: assignments.filter((a) => a.media_image_id === row.id).map(mapAssignment),
  };
}

/** Real KARGAR service taxonomy from the database — used to populate the admin "Service" dropdown. */
export async function fetchServiceOptions(): Promise<ServiceOption[]> {
  const { data, error } = await supabase.from('services').select('id, name, slug').eq('is_active', true).order('display_order');
  throwSupabaseError(error, 'Services could not be loaded');
  return data;
}

// Media rows reference the database's `services` table, whose slugs do not all match the
// frontend registry's URL slugs — callers pass the registry's `catalogSlug` (the DB slug), see
// Service.catalogSlug. This in-memory cache avoids an extra round trip on every lookup.
let serviceSlugToIdCache: Map<string, string> | null = null;

async function resolveServiceIdBySlug(slug: string): Promise<string | undefined> {
  if (!serviceSlugToIdCache) {
    const options = await fetchServiceOptions();
    serviceSlugToIdCache = new Map(options.map((s) => [s.slug, s.id]));
  }
  return serviceSlugToIdCache.get(slug);
}

/** Admin: every image regardless of status, with its assignments, for the Media Library. */
export async function fetchMediaLibrary(): Promise<MediaImage[]> {
  const [imagesResult, assignmentsResult] = await Promise.all([
    supabase.from('media_images').select('*').order('display_order').order('created_at', { ascending: false }),
    supabase.from('media_image_assignments').select('*'),
  ]);

  throwSupabaseError(imagesResult.error, 'Media library could not be loaded');
  throwSupabaseError(assignmentsResult.error, 'Media assignments could not be loaded');

  return imagesResult.data.map((row) => mapMediaImage(row, assignmentsResult.data));
}

/**
 * Public/frontend: published images for a given placement, optionally narrowed to a service
 * and/or a specific page. RLS already restricts this to `status = 'published'`, so no extra
 * filter is needed here — this just narrows by placement/service/page and respects ordering.
 */
export async function fetchPublishedImages(options: {
  placement: MediaPlacement;
  serviceSlug?: string;
  pagePath?: string;
  /** Narrows to only images or only videos — omit to accept either. */
  mediaType?: MediaType;
}): Promise<MediaImage[]> {
  let query = supabase
    .from('media_image_assignments')
    .select('*, media_images!inner(*)')
    .eq('placement', options.placement)
    .order('display_order');

  if (options.pagePath) {
    // Quoted so path characters can never be parsed as PostgREST filter syntax.
    query = query.or(`page_path.eq."${options.pagePath.replace(/"/g, '')}",page_path.is.null`);
  }
  if (options.serviceSlug) {
    const serviceId = await resolveServiceIdBySlug(options.serviceSlug);
    // No matching service found for this slug — there can be no results, skip the query.
    if (!serviceId) return [];
    query = query.eq('media_images.service_id', serviceId);
  }
  if (options.mediaType) {
    query = query.eq('media_images.media_type', options.mediaType);
  }

  const { data, error } = await query;
  throwSupabaseError(error, 'Images could not be loaded');

  // Priority: an assignment scoped to this exact page beats a page-agnostic one, then featured
  // media, then the assignment's display order, then the media's own display order.
  const rank = (row: (typeof data)[number]) => {
    const image = row.media_images as unknown as MediaImageRow;
    return [
      options.pagePath && row.page_path === options.pagePath ? 0 : 1,
      image.is_featured ? 0 : 1,
      row.display_order,
      image.display_order,
    ];
  };
  const sorted = [...data].sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    for (let i = 0; i < ra.length; i++) {
      const diff = (ra[i] ?? 0) - (rb[i] ?? 0);
      if (diff !== 0) return diff;
    }
    return 0;
  });

  // The same media can hold both a page-scoped and a page-agnostic assignment for one
  // placement — keep only its highest-priority row so galleries never show it twice.
  const seen = new Set<string>();
  const results: MediaImage[] = [];
  for (const row of sorted) {
    const image = row.media_images as unknown as MediaImageRow;
    if (seen.has(image.id)) continue;
    seen.add(image.id);
    results.push(mapMediaImage(image, [row]));
  }
  return results;
}

export async function createMediaImage(payload: CreateMediaImagePayload): Promise<MediaImage> {
  const mediaType: MediaType = payload.mediaType ?? 'image';

  const service = payload.serviceId
    ? (await supabase.from('services').select('slug').eq('id', payload.serviceId).single()).data
    : null;

  const uploaded = await MediaRepository.uploadMedia(payload.file, mediaType, service?.slug ?? null);

  // Video poster: uploaded as a normal image (its own bucket/path), independent of the video file.
  let poster: { storagePath: string; publicUrl: string } | null = null;
  if (mediaType === 'video' && payload.posterFile) {
    const uploadedPoster = await MediaRepository.uploadMedia(payload.posterFile, 'image', service?.slug ?? null);
    poster = { storagePath: uploadedPoster.storagePath, publicUrl: uploadedPoster.publicUrl };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const insert: Inserts<'media_images'> = {
    media_type: mediaType,
    bucket: uploaded.bucket,
    storage_path: uploaded.storagePath,
    public_url: uploaded.publicUrl,
    thumbnail_path: poster?.storagePath ?? null,
    thumbnail_url: poster?.publicUrl ?? null,
    title: payload.title,
    alt_text: payload.altText,
    caption: payload.caption ?? null,
    description: payload.description ?? null,
    service_id: payload.serviceId ?? null,
    mime_type: uploaded.mimeType,
    file_size: uploaded.fileSize,
    width: uploaded.width,
    height: uploaded.height,
    status: payload.status ?? 'draft',
    is_featured: payload.isFeatured ?? false,
    display_order: payload.displayOrder ?? 0,
    created_by: user?.id ?? null,
  };

  const { data, error } = await supabase.from('media_images').insert(insert).select('*').single();

  if (error) {
    // Roll back the uploaded file(s) so we don't leave orphaned storage objects behind.
    await MediaRepository.deleteMedia(uploaded.bucket, uploaded.storagePath).catch(() => {});
    if (poster) await MediaRepository.deleteMedia('service-images', poster.storagePath).catch(() => {});
    throw new Error(`Media could not be saved: ${error.message}`);
  }

  return mapMediaImage(data, []);
}

export async function updateMediaImage(id: string, payload: UpdateMediaImagePayload): Promise<void> {
  const updates: Updates<'media_images'> = {};

  if (payload.title !== undefined) updates.title = payload.title;
  if (payload.altText !== undefined) updates.alt_text = payload.altText;
  if (payload.caption !== undefined) updates.caption = payload.caption;
  if (payload.description !== undefined) updates.description = payload.description;
  if (payload.serviceId !== undefined) updates.service_id = payload.serviceId;
  if (payload.status !== undefined) updates.status = payload.status;
  if (payload.isFeatured !== undefined) updates.is_featured = payload.isFeatured;
  if (payload.displayOrder !== undefined) updates.display_order = payload.displayOrder;

  if (Object.keys(updates).length === 0) return;

  const { error } = await supabase.from('media_images').update(updates).eq('id', id);
  throwSupabaseError(error, 'Image could not be updated');
}

/** Returns the assignments an image currently has, so the admin UI can warn before deletion. */
export async function fetchImageAssignments(mediaImageId: string): Promise<MediaImageAssignment[]> {
  const { data, error } = await supabase.from('media_image_assignments').select('*').eq('media_image_id', mediaImageId);
  throwSupabaseError(error, 'Assignments could not be loaded');
  return data.map(mapAssignment);
}

/** Deletes the database row (cascades to assignments) and then the storage object(s) — including a video's poster image, if it has one. */
export async function deleteMediaImage(image: Pick<MediaImage, 'id' | 'bucket' | 'storagePath' | 'thumbnailPath'>): Promise<void> {
  const { error } = await supabase.from('media_images').delete().eq('id', image.id);
  throwSupabaseError(error, 'Media could not be deleted');

  await MediaRepository.deleteMedia(image.bucket, image.storagePath);
  if (image.thumbnailPath) {
    await MediaRepository.deleteMedia('service-images', image.thumbnailPath).catch(() => {});
  }
}

export async function assignMediaImage(payload: AssignMediaImagePayload): Promise<void> {
  const insert: Inserts<'media_image_assignments'> = {
    media_image_id: payload.mediaImageId,
    placement: payload.placement,
    page_path: payload.pagePath ?? null,
    display_order: payload.displayOrder ?? 0,
  };

  const { error } = await supabase.from('media_image_assignments').insert(insert);
  throwSupabaseError(error, 'Image could not be assigned');
}

export async function unassignMediaImage(assignmentId: string): Promise<void> {
  const { error } = await supabase.from('media_image_assignments').delete().eq('id', assignmentId);
  throwSupabaseError(error, 'Assignment could not be removed');
}

/** Persists a new display order for a set of images (drag-and-drop reorder). */
export async function reorderMediaImages(orderedIds: string[]): Promise<void> {
  await Promise.all(
    orderedIds.map((id, index) => supabase.from('media_images').update({ display_order: index }).eq('id', id))
  );
}
