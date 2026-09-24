import { useMemo, useRef, useState } from 'react';
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
import { acceptAttributeFor, maxBytesFor } from '@/repositories/media.repository';
import { serviceCategories, allServices, SERVICES_PAGE_PATH } from '@/features/services/config';
import { punePageList } from '@/features/pune-landing/config/punePages';
import type { MediaImage, MediaPlacement, MediaStatus, MediaType } from '@/types';

const PLACEMENTS: MediaPlacement[] = ['hero', 'gallery', 'homepage', 'service-card', 'section'];
const STATUSES: MediaStatus[] = ['draft', 'published', 'archived'];
const MEDIA_TYPES: MediaType[] = ['image', 'video'];

/** Where each placement appears on the public site — shown to admins when assigning. */
const PLACEMENT_HELP: Record<MediaPlacement, string> = {
  hero: 'Hero media at the top of a service page (or Pune landing page). A video here replaces the hero image.',
  gallery: '"Real Service Work" gallery on the service page. Images and videos, in display order.',
  'service-card': `Service card on the Services page (${SERVICES_PAGE_PATH}).`,
  homepage: 'Reserved for homepage sections.',
  section: 'Reserved for other page sections.',
};

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
                  <img src={image.publicUrl} alt={image.altText} className="h-full w-full object-cover" loading="lazy" />
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

const EMPTY_FORM: UploadFormState = { title: '', altText: '', caption: '', serviceId: '', status: 'draft' };

function UploadModal({
  services,
  onClose,
  onUploaded,
}: {
  services: ServiceOption[];
  onClose: () => void;
  onUploaded: () => void;
}) {
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [form, setForm] = useState<UploadFormState>(EMPTY_FORM);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: () => {
      if (!file) throw new Error(`Please choose a${mediaType === 'video' ? ' video' : 'n image'} first.`);
      return createMediaImage({
        file,
        mediaType,
        posterFile: posterFile ?? undefined,
        title: form.title,
        altText: form.altText,
        caption: form.caption || undefined,
        serviceId: form.serviceId || null,
        status: form.status,
      });
    },
    onSuccess: () => {
      toast.success(`${mediaType === 'video' ? 'Video' : 'Image'} uploaded successfully.`);
      onUploaded();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to upload media. Please try again.');
    },
  });

  function handleFile(selected: File | undefined) {
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function handlePosterFile(selected: File | undefined) {
    if (!selected) return;
    setPosterFile(selected);
    setPosterPreview(URL.createObjectURL(selected));
  }

  const canSubmit = Boolean(file && form.title.trim() && form.altText.trim());
  const maxMb = Math.round(maxBytesFor(mediaType) / (1024 * 1024));

  return (
    <Modal isOpen onClose={onClose} title="Upload Media" maxWidth="lg">
      <div className="space-y-4">
        <div className="flex gap-2" role="group" aria-label="Media type">
          {MEDIA_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setMediaType(t); setFile(null); setPreview(null); }}
              aria-pressed={mediaType === t}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                mediaType === t ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => { setIsDragging(false); }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label={`Upload zone. Press Enter or Space to browse for a${mediaType === 'video' ? ' video' : 'n image'}, or drag and drop a file here`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
          }`}
        >
          {preview ? (
            mediaType === 'video' ? (
              // No caption track: this is a local admin-only preview of the just-selected file, never shown to end users.
              <video src={preview} controls muted className="max-h-48 rounded-md" />
            ) : (
              <img src={preview} alt="Selected preview" className="max-h-48 rounded-md object-contain" />
            )
          ) : (
            <>
              {mediaType === 'video' ? (
                <VideoIcon className="mb-2 h-8 w-8 text-gray-400" aria-hidden="true" />
              ) : (
                <ImagePlus className="mb-2 h-8 w-8 text-gray-400" aria-hidden="true" />
              )}
              <p className="text-sm text-gray-600">
                Drag &amp; drop a{mediaType === 'video' ? ' video' : 'n image'}, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {mediaType === 'video' ? 'MP4 or WebM' : 'JPEG, PNG, or WebP'} — up to {maxMb} MB
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={acceptAttributeFor(mediaType)}
            className="hidden"
            onChange={(e) => { handleFile(e.target.files?.[0]); }}
            aria-label={`Choose a${mediaType === 'video' ? ' video' : 'n image'} file to upload`}
          />
        </div>

        {mediaType === 'video' && (
          <div>
            <span className="mb-1 block text-sm font-medium text-navy-900">Poster image (optional)</span>
            <div className="flex items-center gap-3">
              {posterPreview && (
                <img
                  src={posterPreview}
                  alt={`Poster preview for ${form.title.trim() || 'this video'}`}
                  className="h-14 w-24 rounded-md border border-gray-200 object-cover"
                />
              )}
              <Button type="button" variant="outline" size="sm" onClick={() => posterInputRef.current?.click()}>
                {posterPreview ? 'Change poster' : 'Choose poster image'}
              </Button>
              <input
                ref={posterInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => { handlePosterFile(e.target.files?.[0]); }}
                aria-label="Choose a poster image for this video"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">Shown before the video plays and used as its thumbnail in this library.</p>
          </div>
        )}

        <MediaMetadataFields form={form} setForm={setForm} services={services} mediaType={mediaType} />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={!canSubmit || uploadMutation.isPending} onClick={() => { uploadMutation.mutate(); }}>
            {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
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
  const [newPlacement, setNewPlacement] = useState<MediaPlacement>('hero');
  const [newPagePath, setNewPagePath] = useState('');
  const assignmentsHeadingRef = useRef<HTMLHeadingElement>(null);

  const saveMutation = useMutation({
    mutationFn: () =>
      updateMediaImage(image.id, {
        title: form.title,
        altText: form.altText,
        caption: form.caption || null,
        serviceId: form.serviceId || null,
        status: form.status,
        isFeatured,
        displayOrder: Number.parseInt(displayOrder, 10) || 0,
      }),
    onSuccess: () => {
      toast.success('Image updated.');
      onSaved();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to update image. Please try again.');
    },
  });

  const assignMutation = useMutation({
    mutationFn: () =>
      assignMediaImage({ mediaImageId: image.id, placement: newPlacement, pagePath: newPagePath.trim() || null }),
    onSuccess: () => {
      setNewPagePath('');
      toast.success('Placement added.');
      void queryClient.invalidateQueries({ queryKey: ['admin-media-library'] });
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
          <h3 ref={assignmentsHeadingRef} tabIndex={-1} className="mb-2 text-sm font-semibold text-navy-900">Assignments</h3>
          {image.assignments.length === 0 ? (
            <p className="text-xs text-gray-500">Not assigned to any page yet.</p>
          ) : (
            <ul className="mb-3 space-y-1.5">
              {image.assignments.map((a) => (
                <li key={a.id} className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-1.5 text-xs">
                  <span>
                    <strong>{a.placement}</strong>{a.pagePath ? ` — ${a.pagePath}` : ' — any page'}
                  </span>
                  <button
                    type="button"
                    onClick={() => { unassignMutation.mutate(a.id); }}
                    className="text-gray-400 hover:text-red-600"
                    aria-label={`Remove ${a.placement} assignment`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={newPlacement}
              onChange={(e) => { setNewPlacement(e.target.value as MediaPlacement); }}
              aria-label="Placement"
              className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs"
            >
              {PLACEMENTS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <input
              type="text"
              value={newPagePath}
              onChange={(e) => { setNewPagePath(e.target.value); }}
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
            <Button size="sm" variant="outline" disabled={assignMutation.isPending} onClick={() => { assignMutation.mutate(); }}>
              Add
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {PLACEMENT_HELP[newPlacement]} Leave the page path blank to use it on every matching page for this service.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={saveMutation.isPending} onClick={() => { saveMutation.mutate(); }}>
            {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
