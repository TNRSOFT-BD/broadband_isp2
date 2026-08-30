import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Plus, Trash2, Edit3, MapPin } from 'lucide-react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface CoverageArea {
    id: number;
    name: string;
    type: string | null;
    status: string;
    sort_order: number;
    is_active: boolean;
}

interface PageProps {
    areas: CoverageArea[];
}

export default function CoverageAdmin() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Homepage', href: adminUrl('/homepage') },
        { title: 'Coverage', href: adminUrl('/homepage/coverage') },
    ];

    const { areas } = usePage().props as unknown as PageProps;
    const accent = 'var(--isp-primary)';
    const [editing, setEditing] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm<{
        name: string;
        type: string;
        status: string;
        sort_order: number;
        is_active: boolean;
    }>({
        name: '',
        type: '',
        status: 'active',
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.homepage.coverage.update', editing), {
                onSuccess: () => { setEditing(null); reset(); setShowForm(false); },
            });
        } else {
            post(route('admin.homepage.coverage.store'), {
                onSuccess: () => { reset(); setShowForm(false); },
            });
        }
    };

    const startEdit = (area: CoverageArea) => {
        setEditing(area.id);
        setData({ name: area.name, type: area.type ?? '', status: area.status, sort_order: area.sort_order, is_active: area.is_active });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this coverage area?')) {
            router.delete(route('admin.homepage.coverage.destroy', id));
        }
    };

    const statusColors: Record<string, string> = {
        active: 'bg-green-50 text-green-700',
        coming_soon: 'bg-amber-50 text-amber-700',
        planned: 'bg-blue-50 text-blue-700',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Coverage" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Coverage Areas</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage service coverage regions for the homepage.</p>
                    </div>
                    <Button onClick={() => { setEditing(null); reset(); setShowForm(!showForm); }} style={{ background: accent }}>
                        <Plus className="mr-1 h-4 w-4" /> Add Area
                    </Button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 space-y-4">
                        <h3 className="font-bold">{editing ? 'Edit' : 'Add'} Coverage Area</h3>
                        {Object.keys(errors).length > 0 && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                                {Object.entries(errors).map(([key, msg]) => (
                                    <p key={key}>{msg}</p>
                                ))}
                            </div>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2"><Label>Name *</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)} required placeholder="e.g. Dhaka Division" /></div>
                            <div className="space-y-2"><Label>Type</Label><Input value={data.type} onChange={(e) => setData('type', e.target.value)} placeholder="e.g. division, district, zone" /></div>
                            <div className="space-y-2">
                                <Label>Status *</Label>
                                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                                    <option value="active">Active</option>
                                    <option value="coming_soon">Coming Soon</option>
                                    <option value="planned">Planned</option>
                                </select>
                            </div>
                            <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} /></div>
                        </div>
                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded" style={{ accentColor: accent }} /> Active</label>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing} style={{ background: accent }}>{editing ? 'Update' : 'Create'}</Button>
                            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); reset(); }}>Cancel</Button>
                        </div>
                    </form>
                )}

                <div className="space-y-3">
                    {areas.length === 0 ? <p className="text-center py-10 text-muted-foreground">No coverage areas yet.</p> : areas.map((area) => (
                        <div key={area.id} className="flex items-center gap-4 rounded-xl border bg-white p-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${accent} 10%, transparent)`, color: accent }}>
                                <MapPin className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm">{area.name}</p>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${statusColors[area.status] ?? 'bg-gray-100 text-gray-500'}`}>{area.status.replace('_', ' ')}</span>
                                    {!area.is_active && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-semibold">Inactive</span>}
                                </div>
                                {area.type && <p className="text-xs text-gray-400 capitalize">{area.type}</p>}
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => startEdit(area)}><Edit3 className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(area.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
