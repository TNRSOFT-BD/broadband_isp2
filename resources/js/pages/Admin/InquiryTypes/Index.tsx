import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Inquiry Types', href: '/admin/contact/inquiry-types' },
];

interface InquiryType {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    target_department: string | null;
    email_recipient: string | null;
    sort_order: number;
    is_active: boolean;
}

interface PageProps extends Record<string, unknown> {
    inquiryTypes: InquiryType[];
}

export default function InquiryTypesIndex() {
    const { inquiryTypes } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({
        name: '',
        description: '',
        target_department: '',
        email_recipient: '',
        sort_order: 0,
        is_active: true as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            form.put(route('admin.inquiry-types.update', editingId), {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingId(null);
                    form.reset();
                },
            });
        } else {
            form.post(route('admin.inquiry-types.store'), {
                onSuccess: () => {
                    setShowForm(false);
                    form.reset();
                },
            });
        }
    };

    const handleEdit = (type: InquiryType) => {
        setEditingId(type.id);
        form.setData({
            name: type.name,
            description: type.description ?? '',
            target_department: type.target_department ?? '',
            email_recipient: type.email_recipient ?? '',
            sort_order: type.sort_order,
            is_active: type.is_active,
        });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this inquiry type?')) {
            router.delete(route('admin.inquiry-types.destroy', id));
        }
    };

    const handleToggleStatus = (id: number) => {
        router.patch(route('admin.inquiry-types.toggle-status', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inquiry Types" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Inquiry Types</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage the inquiry categories available on the contact form.
                        </p>
                    </div>
                    <Button onClick={() => { setShowForm(!showForm); setEditingId(null); form.reset(); }}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add Inquiry Type
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
                            <CardTitle>{editingId ? 'Edit' : 'Create'} Inquiry Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        placeholder="e.g. Technical Support"
                                        className="mt-1"
                                        required
                                    />
                                    {form.errors.name && <p className="mt-1 text-xs text-red-500">{form.errors.name}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={form.data.description}
                                        onChange={(e) => form.setData('description', e.target.value)}
                                        placeholder="Brief description of this inquiry type"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="target_department">Target Department</Label>
                                    <Input
                                        id="target_department"
                                        value={form.data.target_department}
                                        onChange={(e) => form.setData('target_department', e.target.value)}
                                        placeholder="e.g. Support Team"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email_recipient">Email Recipient</Label>
                                    <Input
                                        id="email_recipient"
                                        type="email"
                                        value={form.data.email_recipient}
                                        onChange={(e) => form.setData('email_recipient', e.target.value)}
                                        placeholder="team@company.com"
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
                                <div className="flex items-end">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_active}
                                            onChange={(e) => form.setData('is_active', e.target.checked)}
                                            className="h-4 w-4 accent-[var(--isp-primary)]"
                                        />
                                        <span className="text-sm font-medium">Active</span>
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
                        <CardTitle>All Inquiry Types ({inquiryTypes.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {inquiryTypes.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <p className="text-sm">No inquiry types created yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 font-medium">Name</th>
                                            <th className="px-4 py-3 font-medium">Department</th>
                                            <th className="px-4 py-3 font-medium">Email</th>
                                            <th className="px-4 py-3 font-medium">Order</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {inquiryTypes.map((type) => (
                                            <tr key={type.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">{type.name}</td>
                                                <td className="px-4 py-3 text-gray-500">{type.target_department ?? '—'}</td>
                                                <td className="px-4 py-3 text-gray-500">{type.email_recipient ?? '—'}</td>
                                                <td className="px-4 py-3 text-gray-500">{type.sort_order}</td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(type.id)}
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            type.is_active
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-500'
                                                        }`}
                                                    >
                                                        {type.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEdit(type)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(type.id)}
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
