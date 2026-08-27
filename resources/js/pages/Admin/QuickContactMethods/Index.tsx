import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface QuickContactMethod {
    id: number;
    icon: string;
    label: string;
    value: string;
    description: string | null;
    href: string | null;
    sort_order: number;
    is_active: boolean;
    show_in_footer: boolean;
}

interface PageProps extends Record<string, unknown> {
    methods: QuickContactMethod[];
    icons: Record<string, string>;
}

const emptyForm = {
    icon: 'Phone',
    label: '',
    value: '',
    description: '',
    href: '',
    sort_order: 0 as number | string,
    is_active: true as boolean,
    show_in_footer: false as boolean,
};

/** Pre-defined popular contact presets — selecting one auto-fills icon, label, and href. */
const PRESETS = [
    { label: 'Call Us', icon: 'Phone', href: 'tel:', placeholder: '+1 (800) 123-4567' },
    { label: 'Email Us', icon: 'Mail', href: 'mailto:', placeholder: 'support@company.com' },
    { label: 'WhatsApp', icon: 'MessageCircle', href: 'https://wa.me/', placeholder: '+18001234567' },
    { label: 'Visit Us', icon: 'MapPin', href: 'https://maps.google.com/?q=', placeholder: '123 Tech Avenue, Digital City' },
    { label: 'Live Chat', icon: 'Headphones', href: '#', placeholder: 'Available 24/7' },
    { label: 'Support Center', icon: 'HelpCircle', href: '/contact', placeholder: 'Get help with your account' },
    { label: 'Website', icon: 'Globe', href: 'https://', placeholder: 'www.company.com' },
    { label: 'Business Hours', icon: 'Clock', href: '', placeholder: 'Mon-Fri 9AM-6PM' },
];

export default function QuickContactMethodsIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Quick Contact Methods', href: adminUrl('/contact/quick-methods') },
    ];

    const { methods, icons } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm(emptyForm);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            form.put(route('admin.quick-contact-methods.update', editingId), {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingId(null);
                    form.reset();
                },
            });
        } else {
            form.post(route('admin.quick-contact-methods.store'), {
                onSuccess: () => {
                    setShowForm(false);
                    form.reset();
                },
            });
        }
    };

    const handleEdit = (method: QuickContactMethod) => {
        setEditingId(method.id);
        form.setData({
            icon: method.icon,
            label: method.label,
            value: method.value,
            description: method.description ?? '',
            href: method.href ?? '',
            sort_order: method.sort_order,
            is_active: method.is_active,
            show_in_footer: method.show_in_footer,
        });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this contact method?')) {
            router.delete(route('admin.quick-contact-methods.destroy', id));
        }
    };

    const handleToggleStatus = (id: number) => {
        router.patch(route('admin.quick-contact-methods.toggle-status', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quick Contact Methods" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Quick Contact Methods</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage the contact method cards shown on the public Contact page.
                        </p>
                    </div>
                    <Button onClick={() => { setShowForm(!showForm); setEditingId(null); form.reset(); }}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add Method
                    </Button>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" />
                        {flash.success}
                    </div>
                )}

                {/* Form */}
                {showForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingId ? 'Edit' : 'Create'} Contact Method</CardTitle>
                            <CardDescription>
                                Cards with empty required fields will be hidden on the public page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Label>Quick Select (optional)</Label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {PRESETS.map((preset) => (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => {
                                                    form.setData({
                                                        ...form.data,
                                                        icon: preset.icon,
                                                        label: preset.label,
                                                        href: preset.href,
                                                        description: form.data.description || preset.placeholder,
                                                    });
                                                }}
                                                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-[var(--isp-primary)] hover:bg-[var(--isp-primary)]/5 hover:text-[var(--isp-primary)]"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="icon">Icon</Label>
                                    <select
                                        id="icon"
                                        value={form.data.icon}
                                        onChange={(e) => form.setData('icon', e.target.value)}
                                        className="mt-1 flex h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        {Object.entries(icons).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="label">Label *</Label>
                                    <Input
                                        id="label"
                                        value={form.data.label}
                                        onChange={(e) => form.setData('label', e.target.value)}
                                        placeholder="e.g. Call Us"
                                        className="mt-1"
                                        required
                                    />
                                    {form.errors.label && <p className="mt-1 text-xs text-red-500">{form.errors.label}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="value">Value *</Label>
                                    <Input
                                        id="value"
                                        value={form.data.value}
                                        onChange={(e) => form.setData('value', e.target.value)}
                                        placeholder="e.g. +1 (800) 123-4567"
                                        className="mt-1"
                                        required
                                    />
                                    {form.errors.value && <p className="mt-1 text-xs text-red-500">{form.errors.value}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="href">Link URL</Label>
                                    <Input
                                        id="href"
                                        value={form.data.href}
                                        onChange={(e) => form.setData('href', e.target.value)}
                                        placeholder="e.g. tel:+18001234567"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={form.data.description}
                                        onChange={(e) => form.setData('description', e.target.value)}
                                        placeholder="Brief description shown below the value"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={form.data.sort_order}
                                        onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="flex items-end gap-4">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_active}
                                            onChange={(e) => form.setData('is_active', e.target.checked)}
                                            className="h-4 w-4 accent-[var(--isp-primary)]"
                                        />
                                        <span className="text-sm font-medium">Active</span>
                                    </label>
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.data.show_in_footer}
                                            onChange={(e) => form.setData('show_in_footer', e.target.checked)}
                                            className="h-4 w-4 accent-[var(--isp-primary)]"
                                        />
                                        <span className="text-sm font-medium">Show in Footer</span>
                                    </label>
                                </div>
                                <div className="flex gap-2 sm:col-span-2">
                                    <Button type="submit" disabled={form.processing}>
                                        {form.processing ? 'Saving...' : editingId ? 'Update' : 'Create'}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); form.reset(); }}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Contact Methods ({methods.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {methods.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <p className="text-sm">No contact methods created yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 font-medium">Icon</th>
                                            <th className="px-4 py-3 font-medium">Label</th>
                                            <th className="px-4 py-3 font-medium">Value</th>
                                            <th className="px-4 py-3 font-medium">Link</th>
                                            <th className="px-4 py-3 font-medium">Order</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Footer</th>
                                            <th className="px-4 py-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {methods.map((method) => (
                                            <tr key={method.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-500">{method.icon}</td>
                                                <td className="px-4 py-3 font-medium">{method.label}</td>
                                                <td className="px-4 py-3 text-gray-500">{method.value}</td>
                                                <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">{method.href ?? '—'}</td>
                                                <td className="px-4 py-3 text-gray-500">{method.sort_order}</td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(method.id)}
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            method.is_active
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-500'
                                                        }`}
                                                    >
                                                        {method.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {method.show_in_footer ? (
                                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                            Footer
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEdit(method)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(method.id)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50"
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
        </AppLayout>
    );
}
