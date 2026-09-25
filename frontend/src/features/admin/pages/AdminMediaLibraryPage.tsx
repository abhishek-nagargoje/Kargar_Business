import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ImagePlus, Pencil, Trash2, X, Video as VideoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import {
  fetchMediaLibrary,
  fetchServiceOptions,
  createMediaImage,
  updateMediaImage,
  deleteMediaImage,
  assignMediaImage,
  unassignMediaImage,
  type ServiceOption,
} from '@/services/media.service';
import { BATCH_ACCEPT, batchValidationError, detectMediaType } from '@/repositories/media.repository';
import { serviceCategories, allServices, SERVICES_PAGE_PATH } from '@/features/services/config';
import { punePageList } from '@/features/pune-landing/config/punePages';
import type { Service } from '@/features/services/domain/service.types';
import type { MediaImage, MediaPlacement, MediaStatus, MediaType } from '@/types';

const PLACEMENTS: MediaPlacement[] = ['hero', 'gallery', 'homepage', 'service-card', 'section'];
const STATUSES: MediaStatus[] = ['draft', 'published', 'archived'];
const MEDIA_TYPES: MediaType[] = ['image', 'video'];

/** Where each placement appears on the public site — shown to admins when assigning. */
const PLACEMENT_HELP: Record<MediaPlacement, string> = {
  hero: 'Hero media at the top of a service page (or Pune landing page). A video here replaces the hero image.',
  gallery: '"Real Service Work" gallery on the service page. Images and videos, in display order.',
  'service-card': `Service card on the Services page (${SERVICES_PAGE_PATH}).`,
  homepage: 'Not currently read by any page — no homepage section queries this placement yet.',
  section: 'Not currently read by any page — no section component queries this placement yet.',
};

function registryServiceForCatalogSlug(catalogSlug: string | undefined): Service | undefined {
  if (!catalogSlug) return undefined;
  return Object.values(allServices).find((s) => s.catalogSlug === catalogSlug);
}

/** The real public URL for a registry service's detail page, e.g. /services/soft-services/housekeeping. */
function registryServiceUrlPath(service: Service): string | null {
  const category = Object.values(serviceCategories).find((c) => c.id === service.categoryId);
  return category ? `/services/${category.slug}/${service.slug}` : null;
}

/**
 * Friendly, human-readable destinations for "where should this media appear?" — each maps to
 * the exact (placement, page_path) pair the matching public component actually queries, so an
 * admin can never pick a destination that silently does nothing (the bug this replaces: the
 * old raw "homepage" placement value was never read by any page).
 */
type DestinationKey = 'homepage-card' | 'service-hero' | 'service-gallery' | 'pune-hero' | 'advanced';

const DESTINATION_LABELS: Record<DestinationKey, string> = {
  'homepage-card': 'Homepage → Service Card',
  'service-hero': 'Service Page → Hero',
  'service-gallery': 'Service Page → Gallery ("Real Service Work")',
  'pune-hero': 'Pune Landing Page → Hero',
  advanced: 'Advanced (choose placement and page manually)',
};

/** Resolves a friendly destination + the media's selected service into a real (placement, page_path). */
function resolveDestination(
  destination: DestinationKey,
  registryService: Service | undefined,
  punePath: string,
): { placement: MediaPlacement; pagePath: string | null } | null {
  switch (destination) {
    case 'homepage-card':
      return { placement: 'service-card', pagePath: SERVICES_PAGE_PATH };
    case 'service-hero':
      return registryService ? { placement: 'hero', pagePath: registryServiceUrlPath(registryService) } : null;
    case 'service-gallery':
      return registryService ? { placement: 'gallery', pagePath: registryServiceUrlPath(registryService) } : null;
    case 'pune-hero':
      return punePath ? { placement: 'hero', pagePath: punePath } : null;
    default:
      return null;
  }
}

/** The 3 destinations common enough to show as a checklist rather than a pick-one-then-Add flow. */
const STANDARD_DESTINATION_KEYS = ['homepage-card', 'service-hero', 'service-gallery'] as const satisfies readonly DestinationKey[];
type StandardDestinationKey = (typeof STANDARD_DESTINATION_KEYS)[number];
const STANDARD_DESTINATION_SUBLABEL: Record<StandardDestinationKey, string> = {
  'homepage-card': 'Shown on the homepage and the Services page.',
  'service-hero': 'The large image/video at the top of the service page.',
  'service-gallery': 'The "Real Service Work" photo/video gallery on the service page.',
};

/** Human label for an existing (placement, page_path) assignment, for the "Used on" summary. */
function friendlyLocationLabel(placement: MediaPlacement, pagePath: string | null): string {
  if (pagePath === SERVICES_PAGE_PATH && placement === 'service-card') return 'Homepage & Services page → Service card';
  const pune = punePageList.find((p) => p.path === pagePath);
  if (pune) return `${pune.breadcrumbLabel} → ${placement === 'hero' ? 'Hero' : placement}`;
  const service = Object.values(allServices).find((s) => registryServiceUrlPath(s) === pagePath);
  if (service) {
    const where = placement === 'hero' ? 'Hero' : placement === 'gallery' ? 'Gallery' : placement === 'service-card' ? 'Service card' : placement;
    return `${service.title} page → ${where}`;
  }
  if (!pagePath) return `${placement} (any matching page)`;
  return `${placement} — ${pagePath}`;
}

/** Real public page paths an assignment can be scoped to, derived from the route registries. */
const PAGE_PATH_SUGGESTIONS: string[] = [
  SERVICES_PAGE_PATH,
  ...Object.values(allServices).flatMap((service) => {
    const category = Object.values(serviceCategories).find((c) => c.id === service.categoryId);
    return category ? [`/services/${category.slug}/${service.slug}`] : [];
  }),
  ...punePageList.map((p) => p.path),
];

function statusVariant(status: MediaStatus): 'default' | 'success' | 'warning' {
  if (status === 'published') return 'success';
  if (status === 'archived') return 'default';
  return 'warning';
}

function formatBytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminMediaLibraryPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<MediaImage | null>(null);

  const { data: images, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-media-library'],
    queryFn: fetchMediaLibrary,
  });

  // Derived (not a snapshot) so the modal reflects live query data — e.g. an assignment
  // added/removed while the modal is open shows up immediately after invalidation, instead
  // of requiring a close/reopen to see the change.
  const editing = useMemo(() => images?.find((img) => img.id === editingId) ?? null, [images, editingId]);

  const { data: services } = useQuery({
    queryKey: ['admin-media-services'],
    queryFn: fetchServiceOptions,
  });

  const serviceNameById = useMemo(() => new Map((services ?? []).map((s) => [s.id, s.name])), [services]);

  const filtered = useMemo(() => {
    return (images ?? []).filter((img) => {
      if (serviceFilter !== 'all' && img.serviceId !== serviceFilter) return false;
      if (statusFilter !== 'all' && img.status !== statusFilter) return false;
      if (typeFilter !== 'all' && img.mediaType !== typeFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!img.title.toLowerCase().includes(q) && !img.altText.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [images, serviceFilter, statusFilter, typeFilter, search]);

  const deleteMutation = useMutation({
    mutationFn: (image: MediaImage) => deleteMediaImage(image),
    onSuccess: () => {
      toast.success('Media deleted.');
      setDeleting(null);
      void queryClient.invalidateQueries({ queryKey: ['admin-media-library'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to delete image. Please try again.');
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full min-h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Media Library</h1>
          <p className="mt-1 text-sm text-gray-500">Real KARGAR service photographs — upload, assign, and publish.</p>
        </div>
        <Button onClick={() => { setUploadOpen(true); }}>
          <ImagePlus className="mr-2 h-4 w-4" aria-hidden="true" />
          Upload Image
        </Button>
      </div>

      {isError ? (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          Media library could not be loaded.
          <button className="ml-2 font-semibold underline" type="button" onClick={() => { void refetch(); }}>
            Retry
          </button>
        </div>
      ) : null}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search images..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); }}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm sm:max-w-xs"
          aria-label="Search images by title or alt text"
        />
        <select
          value={serviceFilter}
          onChange={(e) => { setServiceFilter(e.target.value); }}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          aria-label="Filter by service"
        >
          <option value="all">All services</option>
          {(services ?? []).map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); }}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); }}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          aria-label="Filter by media type"
        >
          <option value="all">Images &amp; Videos</option>
          {MEDIA_TYPES.map((t) => (
            <option key={t} value={t}>{t === 'image' ? 'Images only' : 'Videos only'}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No media found."
          description="Upload your first KARGAR service photo or video to get started."
          action={<Button onClick={() => { setUploadOpen(true); }}>Upload Media</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((image) => (
            <Card key={image.id} className="overflow-hidden p-0">
              <div className="relative aspect-video w-full bg-gray-100">
                {image.mediaType === 'video' ? (
                  image.thumbnailUrl ? (
                    <img src={image.thumbnailUrl} alt={image.altText} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <VideoIcon className="h-10 w-10" aria-hidden="true" />
                    </div>
                  )
                ) : (
                  <img src={image.thumbnailUrl ?? image.publicUrl} alt={image.altText} className="h-full w-full object-cover" loading="lazy" />
                )}
                {image.mediaType === 'video' && (
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
                    <VideoIcon className="h-3 w-3" aria-hidden="true" />
                    Video
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant={statusVariant(image.status)}>{image.status}</Badge>
                  {image.isFeatured && <Badge variant="info">Featured</Badge>}
                </div>
                <h3 className="truncate text-sm font-semibold text-navy-900" title={image.title}>{image.title}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  {image.serviceId ? serviceNameById.get(image.serviceId) ?? 'Unknown service' : 'General'}
                  {' · '}
                  {formatBytes(image.fileSize)}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {image.assignments.length === 0
                    ? 'Not assigned to any page'
                    : `Assigned to ${image.assignments.length} placement${image.assignments.length === 1 ? '' : 's'}`}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setEditingId(image.id); }}>
                    <Pencil className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setDeleting(image); }}>
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {uploadOpen && (
        <UploadModal
          services={services ?? []}
          onClose={() => { setUploadOpen(false); }}
          onUploaded={() => {
            setUploadOpen(false);
            void queryClient.invalidateQueries({ queryKey: ['admin-media-library'] });
          }}
        />
      )}

      {editing && (
        <EditModal
          image={editing}
          services={services ?? []}
          onClose={() => { setEditingId(null); }}
          onSaved={() => {
            setEditingId(null);
            void queryClient.invalidateQueries({ queryKey: ['admin-media-library'] });
          }}
        />
      )}

      <Modal
        isOpen={Boolean(deleting)}
        onClose={() => { setDeleting(null); }}
        title="Delete this media?"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => { setDeleting(null); }}>Cancel</Button>
            <Button
              variant="danger"
              disabled={deleteMutation.isPending}
              onClick={() => { if (deleting) deleteMutation.mutate(deleting); }}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        }
      >
        {deleting && (
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>{deleting.title}</strong> will be permanently deleted from the media library and storage.
            </p>
            {deleting.assignments.length > 0 && (
              <p className="rounded-md bg-amber-50 p-3 text-amber-800">
                This {deleting.mediaType} is currently assigned to {deleting.assignments.length} placement
                {deleting.assignments.length === 1 ? '' : 's'}: {deleting.assignments.map((a) => a.placement).join(', ')}.
                Those placements will fall back to the existing default media once this is deleted.
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

interface UploadFormState {
  title: string;
  altText: string;
  caption: string;
  serviceId: string;
  status: MediaStatus;
}

interface BatchItem {
  id: string;
  file: File;
  mediaType: MediaType | null;
  /** Client-side pre-check failure (unsupported type / too large). `null` means valid so far. */
  validationError: string | null;
  preview: string;
  posterFile: File | null;
  posterPreview: string | null;
  title: string;
  altText: string;
  /** Per-file outcome of the actual upload, set once the batch starts submitting. */
  status: 'pending' | 'uploading' | 'done' | 'failed';
  uploadError: string | null;
}

function titleFromFilename(name: string): string {
  const base = name.replace(/\.[^./]+$/, '').replace(/[-_]+/g, ' ').trim();
  return base.length > 0 ? base.charAt(0).toUpperCase() + base.slice(1) : name;
}

function makeBatchItem(file: File): BatchItem {
  const mediaType = detectMediaType(file);
  return {
    id: crypto.randomUUID(),
    file,
    mediaType,
    validationError: mediaType ? batchValidationError(file) : 'Unsupported type — use JPEG, PNG, WebP, MP4, or WebM.',
    preview: URL.createObjectURL(file),
    posterFile: null,
    posterPreview: null,
    title: titleFromFilename(file.name),
    altText: '',
    status: 'pending',
    uploadError: null,
  };
}

/**
 * Upload Media modal — supports selecting and uploading many images and videos in one batch
 * (drag-and-drop or multi-select), per the Media Library's multi-file requirement. Shared
 * defaults (service, status, and an optional placement/page assignment) apply to every item;
 * title and alt text stay per-item since they must describe that specific photo or video.
 * Invalid files (wrong type / too large) are flagged inline and can be removed individually
 * without discarding the rest of the batch.
 */
function UploadModal({
  services,
  onClose,
  onUploaded,
}: {
  services: ServiceOption[];
  onClose: () => void;
  onUploaded: () => void;
}) {
  const [items, setItems] = useState<BatchItem[]>([]);
  const [serviceId, setServiceId] = useState('');
  const [status, setStatus] = useState<MediaStatus>('draft');
  const [destination, setDestination] = useState<DestinationKey | ''>('');
  const [punePath, setPunePath] = useState(punePageList[0]?.path ?? '');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFocusId, setPendingFocusId] = useState<string | 'dropzone' | null>(null);
  const removeButtonRefs = useRef(new Map<string, HTMLButtonElement>());
  const dropzoneRef = useRef<HTMLDivElement>(null);

  function addFiles(fileList: FileList | File[]) {
    const newItems = Array.from(fileList).map(makeBatchItem);
    if (newItems.length > 0) setItems((prev) => [...prev, ...newItems]);
  }

  function removeItem(id: string) {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      const next = prev.filter((it) => it.id !== id);
      // Keyboard/screen-reader focus would otherwise drop to <body> when this row's
      // remove button unmounts. Move focus to the item that slides into this row's
      // place, or the previous item, or back to the dropzone if the list is now empty.
      setPendingFocusId(next[idx]?.id ?? next[idx - 1]?.id ?? 'dropzone');
      return next;
    });
  }

  useEffect(() => {
    if (!pendingFocusId) return;
    if (pendingFocusId === 'dropzone') {
      dropzoneRef.current?.focus();
    } else {
      removeButtonRefs.current.get(pendingFocusId)?.focus();
    }
    setPendingFocusId(null);
  }, [items, pendingFocusId]);

  function updateItem(id: string, patch: Partial<BatchItem>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function setPosterForItem(id: string, file: File | undefined) {
    if (!file) return;
    updateItem(id, { posterFile: file, posterPreview: URL.createObjectURL(file) });
  }

  const validItems = items.filter((it) => !it.validationError);
  const canSubmit = validItems.length > 0 && validItems.every((it) => it.title.trim() && it.altText.trim()) && !isSubmitting;

  const selectedServiceSlug = services.find((s) => s.id === serviceId)?.slug;
  const registryService = registryServiceForCatalogSlug(selectedServiceSlug);
  const resolved = destination ? (destination === 'advanced' ? null : resolveDestination(destination, registryService, punePath)) : null;

  const uploadAll = async () => {
    setIsSubmitting(true);
    let succeeded = 0;
    let failed = 0;

    for (const item of items) {
      if (item.validationError) continue;
      updateItem(item.id, { status: 'uploading' });
      try {
        const created = await createMediaImage({
          file: item.file,
          mediaType: item.mediaType ?? 'image',
          posterFile: item.posterFile ?? undefined,
          title: item.title,
          altText: item.altText,
          serviceId: serviceId || null,
          status,
        });
        if (resolved) {
          await assignMediaImage({ mediaImageId: created.id, placement: resolved.placement, pagePath: resolved.pagePath });
        }
        updateItem(item.id, { status: 'done' });
        succeeded += 1;
      } catch (error) {
        updateItem(item.id, { status: 'failed', uploadError: error instanceof Error ? error.message : 'Upload failed.' });
        failed += 1;
      }
    }

    setIsSubmitting(false);
    if (succeeded > 0) {
      toast.success(failed > 0 ? `${succeeded} of ${succeeded + failed} files uploaded.` : `${succeeded} file${succeeded === 1 ? '' : 's'} uploaded successfully.`);
      onUploaded();
    }
    if (failed > 0 && succeeded === 0) {
      toast.error(`${failed} file${failed === 1 ? '' : 's'} failed to upload.`);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title="Upload Media" maxWidth="xl">
      <div className="space-y-4">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => { setIsDragging(false); }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          ref={dropzoneRef}
          role="button"
          tabIndex={0}
          aria-label="Upload zone. Press Enter or Space to browse for images or videos, or drag and drop multiple files here"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
          }`}
        >
          <ImagePlus className="mb-2 h-8 w-8 text-gray-400" aria-hidden="true" />
          <p className="text-sm text-gray-600">Drag &amp; drop photos or videos, or click to browse — select multiple at once</p>
          <p className="mt-1 text-xs text-gray-400">Images: JPEG, PNG, WebP up to 5 MB · Videos: MP4, WebM up to 100 MB</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={BATCH_ACCEPT}
            className="hidden"
            onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ''; }}
            aria-label="Choose image or video files to upload"
          />
        </div>

        {items.length > 0 && (
          <>
            <p className="text-sm font-medium text-navy-900">
              Selected: {items.length} file{items.length === 1 ? '' : 's'}
              {validItems.length !== items.length && (
                <span className="ml-2 font-normal text-red-600">({items.length - validItems.length} invalid)</span>
              )}
            </p>

            <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`rounded-lg border p-3 ${item.validationError ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                      {item.mediaType === 'video' ? (
                        <video src={item.preview} muted className="h-full w-full object-cover" />
                      ) : (
                        <img src={item.preview} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-navy-900">{item.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.mediaType ?? 'unknown'} · {(item.file.size / (1024 * 1024)).toFixed(1)} MB
                            {item.status === 'uploading' && ' · Uploading…'}
                            {item.status === 'done' && ' · Uploaded'}
                            {item.status === 'failed' && ` · Failed: ${item.uploadError}`}
                          </p>
                        </div>
                        <button
                          ref={(el) => {
                            if (el) removeButtonRefs.current.set(item.id, el);
                            else removeButtonRefs.current.delete(item.id);
                          }}
                          type="button"
                          onClick={() => { removeItem(item.id); }}
                          disabled={isSubmitting}
                          className="shrink-0 text-gray-400 hover:text-red-600 disabled:opacity-40"
                          aria-label={`Remove ${item.file.name} from upload batch`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {item.validationError ? (
                        <p className="text-xs font-medium text-red-700">{item.validationError}</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => { updateItem(item.id, { title: e.target.value }); }}
                            placeholder="Title"
                            aria-label={`Title for ${item.file.name}`}
                            disabled={isSubmitting}
                            className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs"
                          />
                          <input
                            type="text"
                            value={item.altText}
                            onChange={(e) => { updateItem(item.id, { altText: e.target.value }); }}
                            placeholder={item.mediaType === 'video' ? "Alt text — describe the video" : 'Alt text — describe the photo'}
                            aria-label={`Alt text for ${item.file.name}`}
                            disabled={isSubmitting}
                            className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs"
                          />
                        </div>
                      )}

                      {!item.validationError && item.mediaType === 'video' && (
                        <div className="flex items-center gap-2">
                          {item.posterPreview && (
                            <img src={item.posterPreview} alt="" aria-hidden="true" className="h-8 w-14 rounded border border-gray-200 object-cover" />
                          )}
                          <label className="cursor-pointer text-xs font-medium text-orange-700 hover:underline">
                            {item.posterPreview ? 'Change poster' : 'Choose poster image (optional)'}
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              disabled={isSubmitting}
                              onChange={(e) => { setPosterForItem(item.id, e.target.files?.[0]); }}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="space-y-3 border-t border-gray-100 pt-4">
          <p className="text-sm font-semibold text-navy-900">Applies to all selected files</p>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-navy-900">Service</span>
              <select
                value={serviceId}
                onChange={(e) => { setServiceId(e.target.value); }}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="">General (no specific service)</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-navy-900">Status</span>
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value as MediaStatus); }}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-navy-900">Where should these appear? (optional — you can also assign each item later)</span>
            <select
              value={destination}
              onChange={(e) => { setDestination(e.target.value as DestinationKey | ''); }}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="">Don&apos;t assign yet</option>
              {(Object.keys(DESTINATION_LABELS) as DestinationKey[])
                .filter((key) => key !== 'advanced')
                .map((key) => (
                  <option key={key} value={key}>{DESTINATION_LABELS[key]}</option>
                ))}
            </select>
          </label>

          {destination === 'pune-hero' && (
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-navy-900">Which Pune page?</span>
              <select
                value={punePath}
                onChange={(e) => { setPunePath(e.target.value); }}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                {punePageList.map((p) => (
                  <option key={p.path} value={p.path}>{p.breadcrumbLabel}</option>
                ))}
              </select>
            </label>
          )}

          {(destination === 'service-hero' || destination === 'service-gallery') && !registryService && (
            <p id="upload-destination-warning" role="status" className="text-xs font-medium text-amber-700">⚠ Pick a Service above first — this destination needs it.</p>
          )}

          {resolved && (
            <p id="upload-destination-preview" role="status" className="rounded-md bg-orange-50 px-3 py-2 text-xs text-orange-800">
              Every uploaded file will appear at: <strong>{friendlyLocationLabel(resolved.placement, resolved.pagePath)}</strong>
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button disabled={!canSubmit} onClick={() => { void uploadAll(); }}>
            {isSubmitting ? 'Uploading…' : `Upload ${validItems.length || ''} File${validItems.length === 1 ? '' : 's'}`.trim()}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function MediaMetadataFields({
  form,
  setForm,
  services,
  mediaType,
}: {
  form: UploadFormState;
  setForm: (updater: (prev: UploadFormState) => UploadFormState) => void;
  services: ServiceOption[];
  mediaType: MediaType;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">Title</span>
        <input
          type="text"
          value={form.title}
          onChange={(e) => { const value = e.target.value; setForm((prev) => ({ ...prev, title: value })); }}
          placeholder="e.g. Housekeeping team cleaning a corporate lobby"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">Alt Text</span>
        <input
          type="text"
          value={form.altText}
          onChange={(e) => { const value = e.target.value; setForm((prev) => ({ ...prev, altText: value })); }}
          placeholder={mediaType === 'video' ? "Describe what's actually in the video" : "Describe what's actually in the photo"}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-navy-900">Caption (optional)</span>
        <input
          type="text"
          value={form.caption}
          onChange={(e) => { const value = e.target.value; setForm((prev) => ({ ...prev, caption: value })); }}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy-900">Service</span>
          <select
            value={form.serviceId}
            onChange={(e) => { const value = e.target.value; setForm((prev) => ({ ...prev, serviceId: value })); }}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="">General (no specific service)</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy-900">Status</span>
          <select
            value={form.status}
            onChange={(e) => { const value = e.target.value as MediaStatus; setForm((prev) => ({ ...prev, status: value })); }}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function EditModal({
  image,
  services,
  onClose,
  onSaved,
}: {
  image: MediaImage;
  services: ServiceOption[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<UploadFormState>({
    title: image.title,
    altText: image.altText,
    caption: image.caption ?? '',
    serviceId: image.serviceId ?? '',
    status: image.status,
  });
  const [isFeatured, setIsFeatured] = useState(image.isFeatured);
  const [displayOrder, setDisplayOrder] = useState(String(image.displayOrder));
  const [destination, setDestination] = useState<'pune-hero' | 'advanced'>('pune-hero');
  const [punePath, setPunePath] = useState(punePageList[0]?.path ?? '');
  const [advancedPlacement, setAdvancedPlacement] = useState<MediaPlacement>('hero');
  const [advancedPagePath, setAdvancedPagePath] = useState('');
  const assignmentsHeadingRef = useRef<HTMLHeadingElement>(null);

  const selectedServiceSlug = services.find((s) => s.id === form.serviceId)?.slug;
  const registryService = registryServiceForCatalogSlug(selectedServiceSlug);

  // "Where should this appear?" as a checklist for the 3 common destinations — checked reflects
  // whether a matching assignment exists right now; toggling just changes local UI state until
  // Save Changes persists the diff in one action (no separate "Add" step to get lost in).
  const [checkedKeys, setCheckedKeys] = useState<Set<(typeof STANDARD_DESTINATION_KEYS)[number]>>(() => {
    const initialRegistryService = registryServiceForCatalogSlug(services.find((s) => s.id === image.serviceId)?.slug);
    const set = new Set<(typeof STANDARD_DESTINATION_KEYS)[number]>();
    for (const key of STANDARD_DESTINATION_KEYS) {
      const r = resolveDestination(key, initialRegistryService, '');
      if (r && image.assignments.some((a) => a.placement === r.placement && a.pagePath === r.pagePath)) {
        set.add(key);
      }
    }
    return set;
  });

  const standardDestinations = STANDARD_DESTINATION_KEYS.map((key) => {
    const resolved = resolveDestination(key, registryService, '');
    const existingAssignment = resolved
      ? (image.assignments.find((a) => a.placement === resolved.placement && a.pagePath === resolved.pagePath) ?? null)
      : null;
    return { key, resolved, existingAssignment, checked: checkedKeys.has(key) };
  });

  // Assignments that aren't one of the 3 standard destinations (e.g. Pune hero, or anything set
  // up via Advanced) — shown separately with their own immediate remove, since they don't fit a
  // fixed checklist.
  const otherAssignments = image.assignments.filter(
    (a) => !standardDestinations.some((d) => d.resolved && d.resolved.placement === a.placement && d.resolved.pagePath === a.pagePath),
  );

  const resolved = destination === 'advanced' ? { placement: advancedPlacement, pagePath: advancedPagePath.trim() || null } : (punePath ? { placement: 'hero' as MediaPlacement, pagePath: punePath } : null);
  const destinationDescribedBy = resolved ? 'edit-destination-preview' : undefined;

  const saveMutation = useMutation({
    mutationFn: async () => {
      await updateMediaImage(image.id, {
        title: form.title,
        altText: form.altText,
        caption: form.caption || null,
        serviceId: form.serviceId || null,
        status: form.status,
        isFeatured,
        displayOrder: Number.parseInt(displayOrder, 10) || 0,
      });

      const toAdd = standardDestinations
        .filter((d): d is typeof d & { resolved: NonNullable<(typeof d)['resolved']> } => d.checked && !d.existingAssignment && d.resolved !== null);
      const toRemove = standardDestinations
        .filter((d): d is typeof d & { existingAssignment: NonNullable<(typeof d)['existingAssignment']> } => !d.checked && d.existingAssignment !== null);
      await Promise.all([
        ...toAdd.map((d) => assignMediaImage({ mediaImageId: image.id, placement: d.resolved.placement, pagePath: d.resolved.pagePath })),
        ...toRemove.map((d) => unassignMediaImage(d.existingAssignment.id)),
      ]);
      return { addedCount: toAdd.length, removedCount: toRemove.length };
    },
    onSuccess: ({ addedCount, removedCount }) => {
      const parts = ['Saved.'];
      if (addedCount > 0) parts.push(`Now shown ${addedCount === 1 ? 'in 1 more place' : `in ${addedCount} more places`}.`);
      if (removedCount > 0) parts.push(`Removed from ${removedCount === 1 ? '1 place' : `${removedCount} places`}.`);
      toast.success(parts.join(' '));
      void queryClient.invalidateQueries({ queryKey: ['admin-media-library'] });
      void queryClient.invalidateQueries({ queryKey: ['managed-media'] });
      onSaved();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to save changes. Please try again.');
    },
  });

  const assignMutation = useMutation({
    mutationFn: () => {
      if (!resolved) throw new Error('Choose a destination first.');
      return assignMediaImage({ mediaImageId: image.id, placement: resolved.placement, pagePath: resolved.pagePath });
    },
    onSuccess: () => {
      toast.success('Placement added — the change is live immediately.');
      void queryClient.invalidateQueries({ queryKey: ['admin-media-library'] });
      void queryClient.invalidateQueries({ queryKey: ['managed-media'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to assign this placement.');
    },
  });

  const unassignMutation = useMutation({
    mutationFn: (assignmentId: string) => unassignMediaImage(assignmentId),
    onSuccess: () => {
      toast.success('Placement removed.');
      void queryClient.invalidateQueries({ queryKey: ['admin-media-library'] });
      void queryClient.invalidateQueries({ queryKey: ['managed-media'] });
      assignmentsHeadingRef.current?.focus();
    },
    onError: () => {
      toast.error('Unable to remove this placement.');
    },
  });

  return (
    <Modal isOpen onClose={onClose} title={image.mediaType === 'video' ? 'Edit Video' : 'Edit Image'} maxWidth="lg">
      <div className="space-y-5">
        {image.mediaType === 'video' ? (
          // No caption track: admin-only preview, not public-facing content.
          <video
            src={image.publicUrl}
            poster={image.thumbnailUrl ?? undefined}
            controls
            muted
            className="max-h-40 w-full rounded-md bg-gray-100"
          />
        ) : (
          <img src={image.publicUrl} alt={image.altText} className="max-h-40 w-full rounded-md object-contain bg-gray-100" />
        )}

        <MediaMetadataFields form={form} setForm={setForm} services={services} mediaType={image.mediaType} />

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-navy-900">Display order</span>
            <input
              type="number"
              min={0}
              value={displayOrder}
              onChange={(e) => { setDisplayOrder(e.target.value); }}
              aria-describedby="media-order-help"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <span id="media-order-help" className="mt-1 block text-xs text-gray-500">Lower numbers show first.</span>
          </label>
          <label className="flex items-center gap-2 self-start pt-7 text-sm font-medium text-navy-900">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => { setIsFeatured(e.target.checked); }}
              className="h-4 w-4 rounded border-gray-300"
            />
            Featured (preferred when several items share a placement)
          </label>
        </div>

        <div>
          <h3 ref={assignmentsHeadingRef} tabIndex={-1} className="mb-2 text-sm font-semibold text-navy-900">
            Where should this appear?
          </h3>
          {!registryService && (
            <p id="media-destination-disabled-hint" className="mb-2 text-xs font-medium text-amber-700">⚠ Select a Service above to enable these destinations.</p>
          )}
          <ul className="mb-4 space-y-1">
            {standardDestinations.map((d) => (
              <li key={d.key}>
                <label className={`flex items-start gap-3 rounded-md px-3 py-2 text-sm ${d.resolved ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-50'}`}>
                  <input
                    type="checkbox"
                    checked={d.checked}
                    disabled={!d.resolved}
                    aria-describedby={!d.resolved ? 'media-destination-disabled-hint' : undefined}
                    onChange={(e) => {
                      setCheckedKeys((prev) => {
                        const next = new Set(prev);
                        if (e.target.checked) next.add(d.key); else next.delete(d.key);
                        return next;
                      });
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300"
                  />
                  <span>
                    <span className="block font-medium text-navy-900">{DESTINATION_LABELS[d.key]}</span>
                    <span className="block text-xs text-gray-500">{STANDARD_DESTINATION_SUBLABEL[d.key]}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>

          {otherAssignments.length > 0 && (
            <>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Also used on</p>
              <ul className="mb-3 space-y-1.5">
                {otherAssignments.map((a) => (
                  <li key={a.id} className="flex items-center justify-between rounded-md bg-green-50 px-3 py-1.5 text-xs text-green-900">
                    <span>✓ {friendlyLocationLabel(a.placement, a.pagePath)}</span>
                    <button
                      type="button"
                      onClick={() => { unassignMutation.mutate(a.id); }}
                      className="text-green-700/60 hover:text-red-600"
                      aria-label={`Remove from ${friendlyLocationLabel(a.placement, a.pagePath)}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <details className="rounded-md border border-gray-100">
            <summary className="cursor-pointer px-3 py-2 text-xs font-medium text-gray-600">More destinations (Pune landing page, or advanced)</summary>
            <div className="space-y-2 p-3 pt-0">
              <div className="flex gap-2" role="group" aria-label="More destination type">
                <button type="button" onClick={() => { setDestination('pune-hero'); }} aria-pressed={destination === 'pune-hero'} className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${destination === 'pune-hero' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600'}`}>Pune Landing Page</button>
                <button type="button" onClick={() => { setDestination('advanced'); }} aria-pressed={destination === 'advanced'} className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${destination === 'advanced' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600'}`}>Advanced</button>
              </div>

              {destination === 'pune-hero' && (
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-navy-900">Which Pune page?</span>
                  <select
                    value={punePath}
                    onChange={(e) => { setPunePath(e.target.value); }}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  >
                    {punePageList.map((p) => (
                      <option key={p.path} value={p.path}>{p.breadcrumbLabel}</option>
                    ))}
                  </select>
                </label>
              )}

              {destination === 'advanced' && (
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={advancedPlacement}
                    onChange={(e) => { setAdvancedPlacement(e.target.value as MediaPlacement); }}
                    aria-label="Placement"
                    aria-describedby="advanced-placement-help"
                    className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs"
                  >
                    {PLACEMENTS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={advancedPagePath}
                    onChange={(e) => { setAdvancedPagePath(e.target.value); }}
                    placeholder="Page path (optional, e.g. /services/soft-services/housekeeping)"
                    aria-label="Page path (optional)"
                    list="media-page-path-suggestions"
                    className="min-w-[220px] flex-1 rounded-lg border border-gray-200 px-2 py-1.5 text-xs"
                  />
                  <datalist id="media-page-path-suggestions">
                    {PAGE_PATH_SUGGESTIONS.map((path) => (
                      <option key={path} value={path} />
                    ))}
                  </datalist>
                  <p id="advanced-placement-help" className="w-full text-xs text-gray-500">{PLACEMENT_HELP[advancedPlacement]}</p>
                </div>
              )}

              {resolved && (
                <p id="edit-destination-preview" role="status" className="rounded-md bg-orange-50 px-3 py-2 text-xs text-orange-800">
                  Will appear at: <strong>{friendlyLocationLabel(resolved.placement, resolved.pagePath)}</strong>
                </p>
              )}

              <Button
                size="sm"
                variant="outline"
                disabled={!resolved || assignMutation.isPending}
                aria-describedby={destinationDescribedBy}
                onClick={() => { assignMutation.mutate(); }}
              >
                {assignMutation.isPending ? 'Adding…' : 'Add this destination'}
              </Button>
            </div>
          </details>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={saveMutation.isPending} aria-busy={saveMutation.isPending} onClick={() => { saveMutation.mutate(); }}>
            {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
