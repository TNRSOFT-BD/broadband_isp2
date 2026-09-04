import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, ImagePlus, Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAdminUrl } from '@/hooks/use-admin-url';
import { getCsrfToken } from '@/lib/csrf';

interface SocialMediaItem {
    id: number;
    name: string;
    image: string;
    link: string;
    is_active: boolean;
    sort_order: number;
}

interface PageProps extends Record<string, unknown> {
    items: SocialMediaItem[];
}

const emptyForm = {
    name: '',
    image: '' as string,
    link: '',
    is_active: true as boolean,
    sort_order: 0 as number | string,
};

export default function SocialMediaIndex() {
    const { adminUrl } = useAdminUrl();
    const csrfToken = getCsrfToken();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Social Media', href: adminUrl('/social-media') },
    ];

    const { items } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<SocialMediaItem | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageError, setImageError] = useState('');

    const form = useForm(emptyForm);

    const openCreate = () => {
        setEditingId(null);
        form.setData({ ...emptyForm });
        setImageError('');
        setDialogOpen(true);
    };

    const openEdit = (item: SocialMediaItem) => {
        setEditingId(item.id);
        form.setData({
            name: item.name,
            image: item.image,
            link: item.link,
            is_active: item.is_active,
            sort_order: item.sort_order,
        });
        setImageError('');
        setDialogOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        setUploading(true);
        setImageError('');

        const MAX_SIZE_BYTES = 10 * 1024; // 10 KB
        if (file.size > MAX_SIZE_BYTES) {
            setImageError('Image/icon must not be larger than 10 KB.');
            setUploading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(adminUrl('/social-media/upload'), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: formData,
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.url) {
                form.setData('image', result.url);
            } else {
                setImageError(
                    result?.errors?.image?.[0] ?? result?.message ?? 'Upload failed.',
                );
            }
        } catch {
            setImageError('Image upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId !== null) {
            form.put(route('admin.social-media.update', editingId), {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.post(route('admin.social-media.store'), {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleToggleStatus = (id: number) => {
        router.patch(route('admin.social-media.toggle-status', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Social Media Management" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Social Media Management</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage social media links and icons displayed on the website.
                        </p>
                    </div>
                    <Button onClick={openCreate}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add Social Media
                    </Button>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" />
                        {flash.success}
                    </div>
                )}

                {/* List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Social Media Items ({items.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {items.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <p className="text-sm">No social media items created yet.</p>
                                <p className="mt-1 text-xs text-gray-400">
                                    Click "Add Social Media" to add your first item.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 font-medium">Icon</th>
                                            <th className="px-4 py-3 font-medium">Name</th>
                                            <th className="px-4 py-3 font-medium">Link</th>
                                            <th className="px-4 py-3 font-medium">Order</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {items.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="h-8 w-8 rounded object-contain"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <span className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 text-gray-400">
                                                            <ImagePlus className="h-4 w-4" />
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 font-medium">{item.name}</td>
                                                <td className="px-4 py-3 text-gray-500 truncate max-w-[250px]">
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-[var(--isp-primary)] hover:underline"
                                                    >
                                                        {item.link}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-3 text-gray-500">{item.sort_order}</td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(item.id)}
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            item.is_active
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-500'
                                                        }`}
                                                    >
                                                        {item.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEdit(item)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setDeleteTarget(item)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={(open) => !open && setDialogOpen(false)}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editingId !== null ? `Edit "${form.data.name}"` : 'Add Social Media'}
                        </DialogTitle>
                        <DialogDescription>
                            Add or update a social media link and its icon.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sm-name">Name *</Label>
                            <Input
                                id="sm-name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="e.g. Facebook, YouTube, Instagram"
                            />
                            {form.errors.name && (
                                <p className="text-xs text-destructive">{form.errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sm-link">Link / URL *</Label>
                            <Input
                                id="sm-link"
                                type="url"
                                value={form.data.link}
                                onChange={(e) => form.setData('link', e.target.value)}
                                placeholder="https://facebook.com/example"
                            />
                            {form.errors.link && (
                                <p className="text-xs text-destructive">{form.errors.link}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Icon / Image *</Label>
                            <div className="flex min-w-0 items-center gap-4">
                                {form.data.image ? (
                                    <img
                                        src={form.data.image}
                                        alt=""
                                        className="h-14 w-14 shrink-0 rounded-lg border object-contain p-1"
                                    />
                                ) : (
                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                                        <ImagePlus className="h-5 w-5" />
                                    </span>
                                )}
                                <div className="min-w-0 flex-1 space-y-1">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.webp,.svg,image/jpeg,image/png,image/webp,image/svg+xml"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="block w-full min-w-0 text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
                                        aria-label="Upload icon"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {uploading
                                            ? 'Uploading...'
                                            : 'SVG, PNG, JPG, or WebP (max 10 KB)'}
                                    </p>
                                </div>
                            </div>
                            <Input
                                value={form.data.image}
                                onChange={(e) => form.setData('image', e.target.value)}
                                placeholder="Or paste image URL"
                                aria-label="Image URL"
                            />
                            {imageError && (
                                <p className="text-xs text-destructive">{imageError}</p>
                            )}
                            {form.errors.image && (
                                <p className="text-xs text-destructive">{form.errors.image}</p>
                            )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="sm-sort">Sort Order</Label>
                                <Input
                                    id="sm-sort"
                                    type="number"
                                    min="0"
                                    value={form.data.sort_order}
                                    onChange={(e) =>
                                        form.setData('sort_order', parseInt(e.target.value) || 0)
                                    }
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={form.data.is_active}
                                        onChange={(e) =>
                                            form.setData('is_active', e.target.checked)
                                        }
                                        className="h-4 w-4 accent-[var(--isp-primary)]"
                                    />
                                    <span className="text-sm font-medium">Active</span>
                                </label>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={form.processing || uploading}>
                                {form.processing
                                    ? 'Saving...'
                                    : editingId !== null
                                      ? 'Update'
                                      : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete "{deleteTarget?.name}"?</DialogTitle>
                        <DialogDescription>
                            This will permanently delete the social media item and its associated
                            icon/image file from the server. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (!deleteTarget) return;
                                router.delete(route('admin.social-media.destroy', deleteTarget.id), {
                                    preserveScroll: true,
                                    onSuccess: () => setDeleteTarget(null),
                                });
                            }}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
