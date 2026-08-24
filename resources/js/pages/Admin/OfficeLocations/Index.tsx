import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Office Locations', href: '/admin/contact/locations' },
];

interface OfficeLocationItem {
    id: number;
    name: string;
    slug: string;
    type: string | null;
    address: string;
    phone: string | null;
    email: string | null;
    sort_order: number;
    is_active: boolean;
}

interface PageProps extends Record<string, unknown> {
    locations: OfficeLocationItem[];
    locationTypes: Record<string, string>;
}

export default function OfficeLocationsIndex() {
    const { locations, locationTypes } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({
        name: '',
        type: '',
        address: '',
        phone: '',
        email: '',
        map_url: '',
        map_embed_url: '',
        latitude: '',
        longitude: '',
        office_hours: '',
        sort_order: 0,
        is_active: true as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form.data,
            latitude: form.data.latitude ? parseFloat(form.data.latitude as string) : null,
            longitude: form.data.longitude ? parseFloat(form.data.longitude as string) : null,
        };

        if (editingId) {
            form.put(route('admin.office-locations.update', editingId), {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingId(null);
                    form.reset();
                },
            });
        } else {
            form.post(route('admin.office-locations.store'), {
                onSuccess: () => {
                    setShowForm(false);
                    form.reset();
                },
            });
        }
    };

    const handleEdit = (location: OfficeLocationItem) => {
        setEditingId(location.id);
        form.setData({
            name: location.name,
            type: location.type ?? '',
            address: location.address,
            phone: location.phone ?? '',
            email: location.email ?? '',
            map_url: '',
            map_embed_url: '',
            latitude: '',
            longitude: '',
            office_hours: '',
            sort_order: location.sort_order,
            is_active: location.is_active,
        });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this location?')) {
            router.delete(route('admin.office-locations.destroy', id));
        }
    };

    const handleToggleStatus = (id: number) => {
        router.patch(route('admin.office-locations.toggle-status', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Office Locations" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Office Locations</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage office locations shown on the contact page.
                        </p>
                    </div>
                    <Button onClick={() => { setShowForm(!showForm); setEditingId(null); form.reset(); }}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add Location
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
                            <CardTitle>{editingId ? 'Edit' : 'Create'} Office Location</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Label htmlFor="name">Office Name *</Label>
                                    <Input id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="e.g. Head Office" className="mt-1" required />
                                    {form.errors.name && <p className="mt-1 text-xs text-red-500">{form.errors.name}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="type">Office Type</Label>
                                    <Select value={form.data.type} onValueChange={(v) => form.setData('type', v)}>
                                        <SelectTrigger className="mt-1"><SelectValue placeholder="Select type..." /></SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(locationTypes).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input id="sort_order" type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)} className="mt-1" />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label htmlFor="address">Address *</Label>
                                    <Input id="address" value={form.data.address} onChange={(e) => form.setData('address', e.target.value)} placeholder="Full address" className="mt-1" required />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} className="mt-1" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} className="mt-1" />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label htmlFor="map_embed_url">Google Maps Embed URL</Label>
                                    <Input id="map_embed_url" value={form.data.map_embed_url} onChange={(e) => form.setData('map_embed_url', e.target.value)} placeholder="https://www.google.com/maps/embed?..." className="mt-1" />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label htmlFor="office_hours">Office Hours</Label>
                                    <Input id="office_hours" value={form.data.office_hours} onChange={(e) => form.setData('office_hours', e.target.value)} placeholder="e.g. Sat-Thu: 9:00 AM - 6:00 PM" className="mt-1" />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input type="checkbox" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="h-4 w-4 accent-[var(--isp-primary)]" />
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
                        <CardTitle>All Locations ({locations.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {locations.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <MapPin className="mx-auto h-12 w-12 text-gray-300" />
                                <p className="mt-4 text-sm">No locations created yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 font-medium">Name</th>
                                            <th className="px-4 py-3 font-medium">Type</th>
                                            <th className="px-4 py-3 font-medium">Address</th>
                                            <th className="px-4 py-3 font-medium">Phone</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {locations.map((location) => (
                                            <tr key={location.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">{location.name}</td>
                                                <td className="px-4 py-3 text-gray-500">{location.type ? locationTypes[location.type] ?? location.type : '—'}</td>
                                                <td className="max-w-xs truncate px-4 py-3 text-gray-500">{location.address}</td>
                                                <td className="px-4 py-3 text-gray-500">{location.phone ?? '—'}</td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(location.id)}
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            location.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                                                        }`}
                                                    >
                                                        {location.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button type="button" onClick={() => handleEdit(location)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100">
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button type="button" onClick={() => handleDelete(location.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50">
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
