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
import { CheckCircle2, ImagePlus, Plus, Pencil, Trash2, Power, PowerOff, ExternalLink, Info } from 'lucide-react';
import { useState } from 'react';
import { useAdminUrl } from '@/hooks/use-admin-url';
import { getCsrfToken } from '@/lib/csrf';

interface PaymentPartner {
    id: number;
    name: string;
    image: string;
    website_link: string | null;
    is_active: boolean;
}

interface PageProps extends Record<string, unknown> {
    partners: PaymentPartner[];
}

const emptyForm = {
    name: '',
    image: '' as string,
    website_link: '' as string,
};

export default function PaymentPartnersIndex() {
    const { adminUrl } = useAdminUrl();
    const csrfToken = getCsrfToken();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Payment Partners', href: adminUrl('/payment-partners') },
    ];

    const { partners } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<PaymentPartner | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageError, setImageError] = useState('');

    const form = useForm(emptyForm);

    const openCreate = () => {
        setEditingId(null);
        form.setData({ ...emptyForm });
        setImageError('');
        setDialogOpen(true);
    };

    const openEdit = (partner: PaymentPartner) => {
        setEditingId(partner.id);
        form.setData({
            name: partner.name,
            image: partner.image,
            website_link: partner.website_link ?? '',
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

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(adminUrl('/payment-partners/upload'), {
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
            form.put(route('admin.payment-partners.update', editingId), {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.post(route('admin.payment-partners.store'), {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    const handleActivate = (id: number) => {
        router.patch(route('admin.payment-partners.activate', id), {}, { preserveScroll: true });
    };

    const handleDeactivate = () => {
        router.patch(route('admin.payment-partners.deactivate'), {}, { preserveScroll: true });
    };

    const activePartner = partners.find((p) => p.is_active);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Partners" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Payment Partners</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage payment partners displayed on the homepage above the footer.
                        </p>
                    </div>
                    <Button onClick={openCreate}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add Partner
                    </Button>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" />
                        {flash.success}
                    </div>
                )}

                {/* Info Banner */}
                <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                        Only one payment partner can be active at a time. Activating a new partner will automatically
                        disable the currently active one.
                    </p>
                </div>

                {/* Active Partner Card */}
                {activePartner && (
                    <Card className="border-green-200 bg-green-50/50">
                        <CardContent className="flex items-center gap-4 p-4">
                            <img
                                src={activePartner.image}
                                alt={activePartner.name}
                                className="h-12 w-12 rounded-lg object-contain"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-green-800">
                                    Currently Active: {activePartner.name}
                                </p>
                                <p className="text-xs text-green-600">
                                    This partner is displayed on the homepage.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDeactivate}
                                className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                                <PowerOff className="mr-1 h-3 w-3" />
                                Deactivate
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Partners Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Payment Partners ({partners.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {partners.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <p className="text-sm">No payment partners created yet.</p>
                                <p className="mt-1 text-xs text-gray-400">
                                    Click "Add Partner" to add your first payment partner.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 font-medium">Image</th>
                                            <th className="px-4 py-3 font-medium">Name</th>
                                            <th className="px-4 py-3 font-medium">Website</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {partners.map((partner) => (
                                            <tr key={partner.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    {partner.image ? (
                                                        <img
                                                            src={partner.image}
                                                            alt={partner.name}
                                                            className="h-10 w-20 rounded object-contain"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <span className="flex h-10 w-20 items-center justify-center rounded bg-gray-100 text-gray-400">
                                                            <ImagePlus className="h-4 w-4" />
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 font-medium">{partner.name}</td>
                                                <td className="px-4 py-3 text-gray-500">
                                                    {partner.website_link ? (
                                                        <a
                                                            href={partner.website_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 hover:text-[var(--isp-primary)] hover:underline"
                                                        >
                                                            {partner.website_link}
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {partner.is_active ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                                                            Disabled
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-1">
                                                        {!partner.is_active && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleActivate(partner.id)}
                                                                title="Activate this partner"
                                                                className="text-green-600 hover:bg-green-50"
                                                            >
                                                                <Power className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => openEdit(partner)}
                                                            title="Edit"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => setDeleteTarget(partner)}
                                                            title="Delete"
                                                            className="text-red-500 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
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
                            {editingId !== null ? `Edit "${form.data.name}"` : 'Add Payment Partner'}
                        </DialogTitle>
                        <DialogDescription>
                            New partners are created as disabled. Activate them after creation.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="pp-name">Name *</Label>
                            <Input
                                id="pp-name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="e.g. SurjoPay, SSLCommerz"
                            />
                            {form.errors.name && (
                                <p className="text-xs text-destructive">{form.errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pp-link">Website Link (Optional)</Label>
                            <Input
                                id="pp-link"
                                type="url"
                                value={form.data.website_link}
                                onChange={(e) => form.setData('website_link', e.target.value)}
                                placeholder="https://surjopay.com"
                            />
                            {form.errors.website_link && (
                                <p className="text-xs text-destructive">{form.errors.website_link}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Partner Image / Banner *</Label>
                            <div className="flex min-w-0 items-center gap-4">
                                {form.data.image ? (
                                    <img
                                        src={form.data.image}
                                        alt=""
                                        className="h-16 w-28 shrink-0 rounded-lg border object-contain p-1"
                                    />
                                ) : (
                                    <span className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
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
                                        aria-label="Upload partner image"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {uploading
                                            ? 'Uploading...'
                                            : 'SVG, PNG, JPG, or WebP (max 1 MB)'}
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
                                      ? 'Update Partner'
                                      : 'Create Partner'}
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
                            This will permanently delete the payment partner and its associated
                            image from the server. This action cannot be undone.
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
                                router.delete(route('admin.payment-partners.destroy', deleteTarget.id), {
                                    preserveScroll: true,
                                    onSuccess: () => setDeleteTarget(null),
                                });
                            }}
                        >
                            Delete Partner
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
