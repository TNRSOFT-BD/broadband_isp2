import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminUrl } from '@/hooks/use-admin-url';
import { getCsrfToken } from '@/lib/csrf';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ImagePlus, Pencil, Plus, Settings, Trash2, FolderOpen } from 'lucide-react';
import { useState } from 'react';

interface ServiceItem {
    id: number;
    title: string;
    description: string | null;
    image: string;
    link: string;
    open_in_new_tab: boolean;
    is_active: boolean;
    sort_order: number;
    homepage_service_category_id: number | null;
}

interface CategoryItem {
    id: number;
    name: string;
    slug: string;
}

interface SectionSettings {
    title: string;
    subtitle: string;
}

interface PageProps {
    [key: string]: unknown;
    services: ServiceItem[];
    categories: CategoryItem[];
    sectionSettings: SectionSettings;
}

const emptyForm = {
    title: '',
    homepage_service_category_id: null as number | null,
    description: '',
    image: '' as string,
    link: '',
    open_in_new_tab: true,
    is_active: true,
    sort_order: 0 as number | string,
};

type ServiceFormState = typeof emptyForm;

export default function HomepageServicesIndex() {
    const { adminUrl } = useAdminUrl();
    const csrfToken = getCsrfToken();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Homepage Services', href: adminUrl('/homepage-services') },
    ];

    const { services, categories, sectionSettings } = usePage<PageProps>().props;
    const { errors, flash } = usePage<SharedData>().props as SharedData & {
        errors: Record<string, string>;
        flash?: { success?: string };
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageError, setImageError] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [deleteCategoryTarget, setDeleteCategoryTarget] = useState<CategoryItem | null>(null);

    const form = useForm<ServiceFormState>(emptyForm);
    const settingsForm = useForm({
        title: sectionSettings.title,
        subtitle: sectionSettings.subtitle,
        is_active: true,
    });

    const categoryForm = useForm({
        name: '',
        slug: '',
        description: '',
        sort_order: 0 as number | string,
    });

    const openCreate = () => {
        setEditingId(null);
        form.setData({ ...emptyForm });
        setImageError('');
        setDialogOpen(true);
    };

    const openEdit = (service: ServiceItem) => {
        setEditingId(service.id);
        form.setData({
            title: service.title,
            homepage_service_category_id: service.homepage_service_category_id ?? null,
            description: service.description ?? '',
            image: service.image,
            link: service.link,
            open_in_new_tab: service.open_in_new_tab,
            is_active: service.is_active,
            sort_order: service.sort_order,
        });
        setImageError('');
        setDialogOpen(true);
    };

    const openSettings = () => {
        settingsForm.setData({
            title: sectionSettings.title,
            subtitle: sectionSettings.subtitle,
            is_active: true,
        });
        setSettingsOpen(true);
    };

    const openCategoryCreate = () => {
        setEditingCategoryId(null);
        categoryForm.setData({ name: '', slug: '', description: '', sort_order: 0 });
        setCategoryDialogOpen(true);
    };

    const openCategoryEdit = (cat: CategoryItem) => {
        setEditingCategoryId(cat.id);
        categoryForm.setData({
            name: cat.name,
            slug: cat.slug,
            description: '',
            sort_order: 0,
        });
        setCategoryDialogOpen(true);
    };

    const handleCategorySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategoryId !== null) {
            categoryForm.put(route('admin.homepage-service-categories.update', editingCategoryId), {
                onSuccess: () => setCategoryDialogOpen(false),
            });
        } else {
            categoryForm.post(route('admin.homepage-service-categories.store'), {
                onSuccess: () => setCategoryDialogOpen(false),
            });
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        setUploading(true);
        setImageError('');

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(adminUrl('/homepage-services/upload'), {
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
            form.put(route('admin.homepage-services.update', editingId), {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.post(route('admin.homepage-services.store'), {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleSettingsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        settingsForm.put(route('admin.homepage-services.settings'), {
            onSuccess: () => setSettingsOpen(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homepage Services" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Homepage Services</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage the digital services section displayed on the homepage.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={openSettings}>
                            <Settings /> Section Settings
                        </Button>
                        <Button onClick={openCreate}>
                            <Plus /> New Service
                        </Button>
                    </div>
                </div>

                {/* Categories Section */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <FolderOpen className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">Service Categories</h2>
                                    <p className="text-sm text-muted-foreground">Organize services into categories for the filter tabs.</p>
                                </div>
                            </div>
                            <Button size="sm" onClick={openCategoryCreate}>
                                <Plus /> Add Category
                            </Button>
                        </div>

                        {categories.length === 0 ? (
                            <p className="mt-4 text-sm text-muted-foreground">No categories yet. Add one to organize your services.</p>
                        ) : (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="group flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 transition-colors hover:border-primary/30"
                                    >
                                        <span className="text-sm font-medium">{cat.name}</span>
                                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{cat.slug}</span>
                                        <div className="ml-1 flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openCategoryEdit(cat)} title={`Edit ${cat.name}`}>
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDeleteCategoryTarget(cat)} title={`Delete ${cat.name}`}>
                                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {flash?.success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                )}

                {/* Grid */}
                {services.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
                        No homepage services yet. Click "New Service" to add your first one.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {services.map((service) => (
                            <Card key={service.id} className="group relative overflow-hidden">
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="truncate text-sm font-bold text-white">{service.title}</p>
                                    </div>
                                    <div className="absolute right-2 top-2 flex gap-1">
                                        <Badge variant={service.is_active ? 'default' : 'outline'}>
                                            {service.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        {service.homepage_service_category_id && (
                                            <Badge variant="secondary">
                                                {categories.find((c) => c.id === service.homepage_service_category_id)?.name}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    {service.description && (
                                        <p className="mb-3 line-clamp-2 min-h-[2rem] text-xs text-muted-foreground">{service.description}</p>
                                    )}

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="truncate">{service.link}</span>
                                        {service.open_in_new_tab && <Badge variant="secondary" className="shrink-0 text-[10px]">New Tab</Badge>}
                                    </div>

                                    <div className="mt-3 flex items-center justify-between border-t pt-3">
                                        <span className="text-xs text-muted-foreground">Order: {service.sort_order}</span>
                                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                                            <Button variant="ghost" size="icon" onClick={() => openEdit(service)} title={`Edit ${service.title}`}>
                                                <Pencil />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(service)} title={`Delete ${service.title}`}>
                                                <Trash2 className="text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Create/Edit dialog */}
            <Dialog open={dialogOpen} onOpenChange={(open) => !open && setDialogOpen(false)}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editingId !== null ? `Edit "${form.data.title}"` : 'New Homepage Service'}</DialogTitle>
                        <DialogDescription>Services appear in the homepage services carousel with background images.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="svc-title">Title *</Label>
                            <Input id="svc-title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} placeholder="e.g. FTP Server" />
                            {errors['title'] && <p className="text-xs text-destructive">{errors['title']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="svc-category">Category</Label>
                            <select
                                id="svc-category"
                                value={form.data.homepage_service_category_id ?? ''}
                                onChange={(e) => form.setData('homepage_service_category_id', e.target.value ? Number(e.target.value) : null)}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="">No Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors['homepage_service_category_id'] && <p className="text-xs text-destructive">{errors['homepage_service_category_id']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="svc-description">Description</Label>
                            <textarea
                                id="svc-description"
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                                placeholder="Brief description of this service"
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="svc-link">Destination Link *</Label>
                            <Input id="svc-link" type="url" value={form.data.link} onChange={(e) => form.setData('link', e.target.value)} placeholder="https://ftp.example.com" />
                            {errors['link'] && <p className="text-xs text-destructive">{errors['link']}</p>}
                        </div>

                        {/* Image */}
                        <div className="space-y-2">
                            <Label>Background Image *</Label>
                            <div className="flex min-w-0 items-center gap-4">
                                {form.data.image ? (
                                    <img src={form.data.image} alt="" className="h-20 w-28 shrink-0 rounded-lg border object-cover" />
                                ) : (
                                    <span className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                                        <ImagePlus className="h-5 w-5" />
                                    </span>
                                )}
                                <div className="min-w-0 flex-1 space-y-1">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.gif,.webp,.svg,image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="block w-full min-w-0 text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
                                        aria-label="Upload service image"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {uploading ? 'Uploading...' : 'JPG, PNG, GIF, WebP, SVG (max 2 MB)'}
                                    </p>
                                </div>
                            </div>
                            <Input
                                value={form.data.image}
                                onChange={(e) => form.setData('image', e.target.value)}
                                placeholder="Or paste image URL"
                                aria-label="Image URL"
                            />
                            {imageError && <p className="text-xs text-destructive">{imageError}</p>}
                            {errors['image'] && <p className="text-xs text-destructive">{errors['image']}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3">
                                <span className="text-sm font-medium">Active</span>
                                <input
                                    type="checkbox"
                                    checked={form.data.is_active}
                                    onChange={(e) => form.setData('is_active', e.target.checked)}
                                    className="h-4 w-4 accent-[var(--isp-primary)]"
                                    aria-label="Active"
                                />
                            </label>
                            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3">
                                <span className="text-sm font-medium">New Tab</span>
                                <input
                                    type="checkbox"
                                    checked={form.data.open_in_new_tab}
                                    onChange={(e) => form.setData('open_in_new_tab', e.target.checked)}
                                    className="h-4 w-4 accent-[var(--isp-primary)]"
                                    aria-label="Open in new tab"
                                />
                            </label>
                            <div className="space-y-2">
                                <Label htmlFor="svc-sort">Sort Order</Label>
                                <Input id="svc-sort" type="number" min="0" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={form.processing || uploading}>
                                {form.processing ? 'Saving...' : editingId !== null ? 'Update Service' : 'Create Service'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete confirmation */}
            <Dialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete "{deleteTarget?.title}"?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. The service image will also be removed.
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
                                router.delete(route('admin.homepage-services.destroy', deleteTarget.id), {
                                    preserveScroll: true,
                                    onSuccess: () => setDeleteTarget(null),
                                });
                            }}
                        >
                            Delete Service
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Category Create/Edit dialog */}
            <Dialog open={categoryDialogOpen} onOpenChange={(open) => !open && setCategoryDialogOpen(false)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingCategoryId !== null ? `Edit "${categoryForm.data.name}"` : 'New Category'}</DialogTitle>
                        <DialogDescription>Categories appear as filter tabs in the services section.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCategorySubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cat-name">Name *</Label>
                            <Input
                                id="cat-name"
                                value={categoryForm.data.name}
                                onChange={(e) => categoryForm.setData('name', e.target.value)}
                                placeholder="e.g. Streaming"
                            />
                            {errors['name'] && <p className="text-xs text-destructive">{errors['name']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cat-slug">Slug</Label>
                            <Input
                                id="cat-slug"
                                value={categoryForm.data.slug}
                                onChange={(e) => categoryForm.setData('slug', e.target.value)}
                                placeholder="auto-generated from name"
                            />
                            {errors['slug'] && <p className="text-xs text-destructive">{errors['slug']}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cat-description">Description</Label>
                            <textarea
                                id="cat-description"
                                value={categoryForm.data.description}
                                onChange={(e) => categoryForm.setData('description', e.target.value)}
                                placeholder="Optional description"
                                rows={2}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cat-sort">Sort Order</Label>
                            <Input
                                id="cat-sort"
                                type="number"
                                min="0"
                                value={categoryForm.data.sort_order}
                                onChange={(e) => categoryForm.setData('sort_order', e.target.value)}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setCategoryDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={categoryForm.processing}>
                                {categoryForm.processing ? 'Saving...' : editingCategoryId !== null ? 'Update Category' : 'Create Category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Category Delete confirmation */}
            <Dialog open={deleteCategoryTarget !== null} onOpenChange={(open) => !open && setDeleteCategoryTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete "{deleteCategoryTarget?.name}"?</DialogTitle>
                        <DialogDescription>
                            Services in this category will become uncategorized. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteCategoryTarget(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (!deleteCategoryTarget) return;
                                router.delete(route('admin.homepage-service-categories.destroy', deleteCategoryTarget.id), {
                                    preserveScroll: true,
                                    onSuccess: () => setDeleteCategoryTarget(null),
                                });
                            }}
                        >
                            Delete Category
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Section Settings dialog */}
            <Dialog open={settingsOpen} onOpenChange={(open) => !open && setSettingsOpen(false)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Services Section Settings</DialogTitle>
                        <DialogDescription>Configure the section title, subtitle, and visibility on the homepage.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSettingsSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="settings-title">Section Title *</Label>
                            <Input
                                id="settings-title"
                                value={settingsForm.data.title}
                                onChange={(e) => settingsForm.setData('title', e.target.value)}
                                placeholder="e.g. Explore Our Digital Services"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="settings-subtitle">Subtitle / Description</Label>
                            <textarea
                                id="settings-subtitle"
                                value={settingsForm.data.subtitle}
                                onChange={(e) => settingsForm.setData('subtitle', e.target.value)}
                                placeholder="Brief description of the services section"
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>

                        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3">
                            <span className="text-sm font-medium">Show on Homepage</span>
                            <input
                                type="checkbox"
                                checked={settingsForm.data.is_active}
                                onChange={(e) => settingsForm.setData('is_active', e.target.checked)}
                                className="h-4 w-4 accent-[var(--isp-primary)]"
                                aria-label="Show on homepage"
                            />
                        </label>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setSettingsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={settingsForm.processing}>
                                {settingsForm.processing ? 'Saving...' : 'Save Settings'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
