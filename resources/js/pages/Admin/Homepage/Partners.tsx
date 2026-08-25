import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Pencil, Users, Image as ImageIcon, CheckCircle2, ExternalLink } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Homepage', href: '/admin/homepage' },
    { title: 'Partners', href: '/admin/homepage/partners' },
];

interface PartnerItem {
    id: number;
    name: string;
    logo: string | null;
    website_url: string | null;
    sort_order: number;
    is_active: boolean;
}

interface PageProps extends Record<string, unknown> {
    partners: PartnerItem[];
}

export default function PartnersPage() {
    const { partners } = usePage<PageProps>().props;
    const { flash } = usePage().props as { flash?: { success?: string } };
    const accent = 'var(--isp-primary)';

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const MAX_IMAGE_BYTES = 10 * 1024; // 10 KB

    const resetForm = () => {
        setShowForm(false);
        setEditingId(null);
        setName('');
        setLogo('');
        setWebsiteUrl('');
        setSortOrder(0);
        setIsActive(true);
        setUploadError(null);
    };

    const handleEdit = (item: PartnerItem) => {
        setEditingId(item.id);
        setName(item.name);
        setLogo(item.logo ?? '');
        setWebsiteUrl(item.website_url ?? '');
        setSortOrder(item.sort_order);
        setIsActive(item.is_active);
        setShowForm(true);
        setUploadError(null);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        setUploadError(null);

        if (file.size > MAX_IMAGE_BYTES) {
            setUploadError('Image must not be larger than 10 KB. Please compress the image and try again.');
            return;
        }

        setUploading(true);

        try {
            const fd = new FormData();
            fd.append('image', file);

            const response = await fetch(route('admin.homepage.partner-upload'), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: fd,
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.url) {
                setLogo(result.url);
                setUploadError(null);
            } else {
                setUploadError(
                    result?.errors?.image?.[0] ?? result?.message ?? 'Upload failed. Please try again.',
                );
            }
        } catch {
            setUploadError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            name,
            logo: logo || null,
            website_url: websiteUrl || null,
            sort_order: sortOrder,
            is_active: isActive,
        };

        if (editingId) {
            router.put(route('admin.homepage.partners.update', editingId), payload, {
                preserveScroll: true,
                onStart: () => setSaving(true),
                onFinish: () => setSaving(false),
                onSuccess: () => resetForm(),
            });
        } else {
            router.post(route('admin.homepage.partners.store'), payload, {
                preserveScroll: true,
                onStart: () => setSaving(true),
                onFinish: () => setSaving(false),
                onSuccess: () => resetForm(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure? The partner image will also be deleted.')) {
            router.delete(route('admin.homepage.partners.destroy', id));
        }
    };

    const handleToggleStatus = (id: number) => {
        router.patch(route('admin.homepage.partners.toggle-status', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Partners" />

            <div className="relative flex h-full flex-1 flex-col gap-6 p-6">
                {/* Background glow */}
                <div
                    className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-[140px]"
                    style={{ background: `color-mix(in srgb, ${accent} 8%, transparent)` }}
                    aria-hidden="true"
                />

                {/* Header */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Partners</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage partner logos displayed on the homepage "Trusted by Organizations" section.
                        </p>
                    </div>
                    <Button
                        onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
                        style={{ background: accent }}
                    >
                        <Plus className="mr-1 h-4 w-4" /> Add Partner
                    </Button>
                </div>

                {/* Flash message */}
                {flash?.success && (
                    <div className="relative z-10 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" /> {flash.success}
                    </div>
                )}

                {/* Form */}
                {showForm && (
                    <div className="relative z-10 overflow-hidden rounded-xl border p-6"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                            background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                        }}
                    >
                        <div
                            className="absolute inset-x-0 top-0 h-px"
                            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                            aria-hidden="true"
                        />

                        <h2 className="mb-4 text-lg font-bold text-foreground">
                            {editingId ? 'Edit Partner' : 'Add New Partner'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Partner Name *</Label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Google, Microsoft, etc."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Website URL</Label>
                                    <Input
                                        value={websiteUrl}
                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label>Logo Image (max 10 KB)</Label>
                                <label
                                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50"
                                    style={{
                                        borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
                                        background: `color-mix(in srgb, ${accent} 4%, transparent)`,
                                        color: accent,
                                    }}
                                >
                                    <ImageIcon className="h-4 w-4 shrink-0" />
                                    <span className="truncate font-medium">
                                        {uploading ? 'Uploading...' : 'Click to upload logo (max 10 KB)'}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="sr-only"
                                    />
                                </label>
                                {uploadError ? (
                                    <p className="text-xs font-medium text-red-600">{uploadError}</p>
                                ) : (
                                    <p className="text-[11px] text-muted-foreground">
                                        {uploading ? 'Uploading...' : 'JPG, PNG, WebP, or SVG — max 10 KB. Or paste a URL below.'}
                                    </p>
                                )}
                                <Input
                                    value={logo}
                                    onChange={(e) => { setLogo(e.target.value); setUploadError(null); }}
                                    placeholder="/storage/partners/logo.png or https://..."
                                />
                            </div>

                            {/* Image Preview */}
                            {logo && !uploadError && (
                                <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <p className="mb-2 text-xs font-medium text-muted-foreground">Preview:</p>
                                    <img src={logo} alt="Logo preview" className="h-12 w-auto object-contain" />
                                </div>
                            )}

                            <Separator />

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label>Sort Order</Label>
                                    <Input
                                        type="number"
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isActive}
                                            onChange={(e) => setIsActive(e.target.checked)}
                                            className="h-4 w-4 rounded"
                                            style={{ accentColor: accent }}
                                        />
                                        <span className="text-sm font-medium">Active</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button type="submit" disabled={saving || uploading} style={{ background: accent }}>
                                    {saving ? 'Saving...' : editingId ? 'Update Partner' : 'Create Partner'}
                                </Button>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Partners Table */}
                <div className="relative z-10 overflow-hidden rounded-xl border"
                    style={{
                        borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                        background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                    }}
                >
                    <div
                        className="absolute inset-x-0 top-0 h-px"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                        aria-hidden="true"
                    />

                    <div className="p-5">
                        <div className="mb-4 flex items-center gap-2">
                            <Users className="h-4 w-4" style={{ color: accent }} />
                            <h2 className="text-sm font-bold text-foreground">All Partners ({partners.length})</h2>
                        </div>

                        {partners.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                <Users className="mb-2 h-12 w-12 opacity-20" />
                                <p className="text-sm">No partners yet. Add your first partner above.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="px-4 py-3 font-medium text-muted-foreground">Logo</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground">Name</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground">Website</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground">Order</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                                            <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {partners.map((item) => (
                                            <tr key={item.id} className="transition-colors hover:bg-gray-50/50">
                                                <td className="px-4 py-3">
                                                    {item.logo ? (
                                                        <img src={item.logo} alt={item.name} className="h-8 w-8 rounded object-cover" />
                                                    ) : (
                                                        <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-400">
                                                            {item.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 font-medium">{item.name}</td>
                                                <td className="px-4 py-3">
                                                    {item.website_url ? (
                                                        <a
                                                            href={item.website_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 hover:underline"
                                                            style={{ color: accent }}
                                                        >
                                                            Visit <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">{item.sort_order}</td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(item.id)}
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                                                            item.is_active
                                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {item.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEdit(item)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(item.id)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 transition-colors hover:bg-red-50"
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
