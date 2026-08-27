import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminUrl } from '@/hooks/use-admin-url';
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
import { ImagePlus, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ServiceItem {
    id: number;
    name: string;
    slug: string;
    category: string;
    category_label: string;
    logo: string | null;
    description: string | null;
    website_url: string | null;
    is_active: boolean;
    sort_order: number;
    plans_count: number;
}

interface PageProps {
    [key: string]: unknown;
    services: ServiceItem[];
    categories: { value: string; label: string }[];
}


const emptyForm = {
    name: '',
    slug: '',
    category: 'ott',
    logo: '' as string,
    description: '',
    website_url: '',
    is_active: true,
    sort_order: 0 as number | string,
};

type ServiceFormState = typeof emptyForm;

export default function ServicesIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Services', href: adminUrl('/services') },
    ];

    const { services, categories } = usePage<PageProps>().props;
    const { errors, flash } = usePage<SharedData>().props as SharedData & {
        errors: Record<string, string>;
        flash?: { success?: string };
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
    const [uploading, setUploading] = useState(false);
    const [logoError, setLogoError] = useState('');

    const form = useForm<ServiceFormState>(emptyForm);

    const openCreate = () => {
        setEditingId(null);
        form.setData({ ...emptyForm });
        setLogoError('');
        setDialogOpen(true);
    };

    const openEdit = (service: ServiceItem) => {
        setEditingId(service.id);
        form.setData({
            name: service.name,
            slug: service.slug,
            category: service.category,
            logo: service.logo ?? '',
            description: service.description ?? '',
            website_url: service.website_url ?? '',
            is_active: service.is_active,
            sort_order: service.sort_order,
        });
        setLogoError('');
        setDialogOpen(true);
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        setUploading(true);
        setLogoError('');

        const MAX_SIZE_BYTES = 1024 * 1024; // 1 MB
        if (file.size > MAX_SIZE_BYTES) {
            setLogoError('Logo must not be larger than 1 MB.');
            setUploading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('logo', file);

            const response = await fetch(route('admin.services.upload'), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: formData,
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.url) {
                form.setData('logo', result.url);
            } else {
                setLogoError(
                    result?.errors?.logo?.[0] ?? result?.message ?? 'Upload failed.',
                );
            }
        } catch {
            setLogoError('Logo upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId !== null) {
            form.put(route('admin.services.update', editingId), {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.post(route('admin.services.store'), {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">OTT &amp; Digital Services</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage bundled services attachable to any plan.</p>
                    </div>
                    <Button onClick={openCreate}>
                        <Plus /> New Service
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                )}

                {/* Grid */}
                {services.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
                        No services yet. Click "New Service" to add your first one.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {services.map((service) => (
                            <Card key={service.id} className="group relative overflow-hidden">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            {service.logo ? (
                                                <img src={service.logo} alt={service.name} className="h-12 w-12 rounded-lg object-contain" loading="lazy" />
                                            ) : (
                                                <span
                                                    aria-hidden
                                                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-xl font-bold text-primary"
                                                >
                                                    {service.name.charAt(0)}
                                                </span>
                                            )}
                                            <div className="min-w-0">
                                                <p className="truncate font-semibold">{service.name}</p>
                                                <p className="text-xs capitalize text-muted-foreground">{service.category_label}</p>
                                            </div>
                                        </div>
                                        <Badge variant={service.is_active ? 'default' : 'outline'}>{service.is_active ? 'Active' : 'Inactive'}</Badge>
                                    </div>

                                    {service.description && (
                                        <p className="mt-3 line-clamp-2 min-h-[2rem] text-xs text-muted-foreground">{service.description}</p>
                                    )}

                                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                                        <span className="text-xs text-muted-foreground">
                                            Used by {service.plans_count} plan{service.plans_count === 1 ? '' : 's'}
                                        </span>
                                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                                            <Button variant="ghost" size="icon" onClick={() => openEdit(service)} title={`Edit ${service.name}`}>
                                                <Pencil />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(service)} title={`Delete ${service.name}`}>
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
                        <DialogTitle>{editingId !== null ? `Edit "${form.data.name}"` : 'New Service'}</DialogTitle>
                        <DialogDescription>Services can be attached to multiple plans.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="svc-name">Name *</Label>
                                <Input id="svc-name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Netflix" />
                                {errors['name'] && <p className="text-xs text-destructive">{errors['name']}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="svc-category">Category *</Label>
                                <select
                                    id="svc-category"
                                    value={form.data.category}
                                    onChange={(e) => form.setData('category', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    {categories.map((c) => (
                                        <option key={c.value} value={c.value}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                                {errors['category'] && <p className="text-xs text-destructive">{errors['category']}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="svc-description">Description</Label>
                            <Input id="svc-description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} placeholder="Unlimited movies and shows" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="svc-url">Website URL</Label>
                            <Input id="svc-url" type="url" value={form.data.website_url} onChange={(e) => form.setData('website_url', e.target.value)} placeholder="https://..." />
                        </div>

                        {/* Logo */}
                        <div className="space-y-2">
                            <Label>Logo</Label>
                            <div className="flex min-w-0 items-center gap-4">
                                {form.data.logo ? (
                                    <img src={form.data.logo} alt="" className="h-14 w-14 shrink-0 rounded-lg border object-contain p-1" />
                                ) : (
                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                                        <ImagePlus className="h-5 w-5" />
                                    </span>
                                )}
                                <div className="min-w-0 flex-1 space-y-1">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.webp,.svg,image/jpeg,image/png,image/webp,image/svg+xml"
                                        onChange={handleLogoUpload}
                                        disabled={uploading}
                                        className="block w-full min-w-0 text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
                                        aria-label="Upload service logo"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {uploading ? 'Uploading...' : 'JPG, PNG, WebP or SVG (max 1 MB)'}
                                    </p>
                                </div>
                            </div>
                            <Input
                                value={form.data.logo}
                                onChange={(e) => form.setData('logo', e.target.value)}
                                placeholder="Or paste logo URL"
                                aria-label="Logo URL"
                            />
                            {logoError && <p className="text-xs text-destructive">{logoError}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
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
                        <DialogTitle>Delete "{deleteTarget?.name}"?</DialogTitle>
                        <DialogDescription>
                            This removes the service from all {deleteTarget?.plans_count ?? 0} linked plan(s). This action cannot be undone.
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
                                router.delete(route('admin.services.destroy', deleteTarget.id), {
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
        </AppLayout>
    );
}
