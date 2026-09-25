import { supabase } from '@/supabase/client';
import type { MediaType } from '@/types';

const IMAGE_BUCKET = 'service-images';
const VIDEO_BUCKET = 'service-videos';

// Must stay in sync with the storage bucket limits and the media_images_file_size_valid
// CHECK constraint in supabase/migrations/20260923000000_add_media_library.sql.
const IMAGE_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const VIDEO_MAX_BYTES = 100 * 1024 * 1024; // 100 MB — video files are inherently larger

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_MIME_TYPES = ['video/mp4', 'video/webm'];

export function bucketFor(mediaType: MediaType): string {
  return mediaType === 'video' ? VIDEO_BUCKET : IMAGE_BUCKET;
}

export function maxBytesFor(mediaType: MediaType): number {
  return mediaType === 'video' ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES;
}

export function acceptAttributeFor(mediaType: MediaType): string {
  return (mediaType === 'video' ? VIDEO_MIME_TYPES : IMAGE_MIME_TYPES).join(',');
}

/** Accept attribute for a picker that takes both images and videos at once (batch upload). */
export const BATCH_ACCEPT = [...IMAGE_MIME_TYPES, ...VIDEO_MIME_TYPES].join(',');

/** Media type implied by a file's MIME type, or `null` if it matches neither allowed set. */
export function detectMediaType(file: File): MediaType | null {
  if (IMAGE_MIME_TYPES.includes(file.type)) return 'image';
  if (VIDEO_MIME_TYPES.includes(file.type)) return 'video';
  return null;
}

/** Client-side pre-check for a batch-selected file, before any network call. `null` means valid. */
export function batchValidationError(file: File): string | null {
  const mediaType = detectMediaType(file);
  if (!mediaType) return 'Unsupported type — use JPEG, PNG, WebP, MP4, or WebM.';
  const max = maxBytesFor(mediaType);
  if (file.size > max) return `Exceeds the ${Math.round(max / (1024 * 1024))} MB limit for ${mediaType}s.`;
  return null;
}

export interface UploadedMedia {
  bucket: string;
  storagePath: string;
  publicUrl: string;
  mimeType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  /** A small preview image generated for the original, or null if generation failed/not applicable. */
  thumbnailPath: string | null;
  thumbnailUrl: string | null;
}

// Longer side of the auto-generated preview used for cards/thumbnails — the real photo (`publicUrl`)
// is always used for the hero, the gallery's main image, and the lightbox, which must never crop
// or show a downscaled image. This keeps thumbnail contexts fast without touching the originals.
const THUMBNAIL_MAX_DIMENSION = 480;
const THUMBNAIL_QUALITY = 0.8;

function validateFile(file: File, mediaType: MediaType): void {
  const allowed = mediaType === 'video' ? VIDEO_MIME_TYPES : IMAGE_MIME_TYPES;
  if (!allowed.includes(file.type)) {
    throw new Error(
      mediaType === 'video' ? 'Only MP4 and WebM videos are supported.' : 'Only JPEG, PNG, and WebP images are supported.',
    );
  }
  const max = maxBytesFor(mediaType);
  if (file.size > max) {
    throw new Error(`File must be ${Math.round(max / (1024 * 1024))} MB or smaller.`);
  }
}

/** Reads natural pixel dimensions from an image file client-side, before upload. Videos have no equivalent here (no dimensions are read for them). */
function readImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

function buildStoragePath(serviceSlug: string | null, file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const folder = serviceSlug ?? 'general';
  const unique = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  return `${folder}/${unique}.${ext}`;
}

/**
 * Downscales an image client-side (canvas) to a small JPEG preview for card/thumbnail contexts.
 * Returns null on any failure — a missing thumbnail must never block the real upload, callers
 * fall back to the full image. Flattened to a white background (thumbnails don't need PNG
 * transparency); the original file uploaded to storage is never touched or recompressed.
 */
function generateThumbnail(file: File, maxDimension: number, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const { naturalWidth: w, naturalHeight: h } = img;
      if (!w || !h) { resolve(null); return; }
      const scale = Math.min(1, maxDimension / Math.max(w, h));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(null); return; }
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => { resolve(blob); }, 'image/jpeg', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

/**
 * MediaRepository
 *
 * The exclusive layer for Supabase Storage operations on the `service-images` and
 * `service-videos` buckets. Mirrors the existing ReviewRepository pattern
 * (src/repositories/review.repository.ts).
 */
export const MediaRepository = {
  /** Uploads a validated image or video file and returns everything needed to create/update a media_images row. */
  async uploadMedia(file: File, mediaType: MediaType, serviceSlug: string | null): Promise<UploadedMedia> {
    validateFile(file, mediaType);
    // Dimensions are only meaningful for images — videos skip this (no natural-size probe here).
    const dimensions = mediaType === 'image' ? await readImageDimensions(file) : null;
    const bucket = bucketFor(mediaType);
    const storagePath = buildStoragePath(serviceSlug, file);

    const { error } = await supabase.storage.from(bucket).upload(storagePath, file, {
      contentType: file.type,
      cacheControl: '31536000', // 1 year — storage paths are unique per upload, safe to cache hard
      upsert: false,
    });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);

    let thumbnailPath: string | null = null;
    let thumbnailUrl: string | null = null;
    if (mediaType === 'image') {
      const thumbBlob = await generateThumbnail(file, THUMBNAIL_MAX_DIMENSION, THUMBNAIL_QUALITY);
      if (thumbBlob) {
        const thumbPath = storagePath.replace(/\.[^./]+$/, '-thumb.jpg');
        const { error: thumbError } = await supabase.storage.from(IMAGE_BUCKET).upload(thumbPath, thumbBlob, {
          contentType: 'image/jpeg',
          cacheControl: '31536000',
          upsert: false,
        });
        // A failed thumbnail never blocks the real upload — pages fall back to the full image.
        if (!thumbError) {
          thumbnailPath = thumbPath;
          thumbnailUrl = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(thumbPath).data.publicUrl;
        }
      }
    }

    return {
      bucket,
      storagePath,
      publicUrl: data.publicUrl,
      mimeType: file.type,
      fileSize: file.size,
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
      thumbnailPath,
      thumbnailUrl,
    };
  },

  /** Removes a file from the given bucket. Called after the database row is deleted, never before. */
  async deleteMedia(bucket: string, storagePath: string): Promise<void> {
    const { error } = await supabase.storage.from(bucket).remove([storagePath]);
    if (error) {
      throw new Error(`Failed to delete stored file: ${error.message}`);
    }
  },
};
