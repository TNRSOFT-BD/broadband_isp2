import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Plus, Pencil, Trash2, Clock } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Pages', href: '#' },
    { title: 'About Us', href: '/admin/pages/about' },
    { title: 'Milestones', href: '/admin/pages/about/milestones' },
];

interface MilestoneItem { id: number; year: string; title: string; description: string; image: string | null; image_alt: string | null; sort_order: number; is_active: boolean; }
interface PageProps extends Record<string, unknown> { milestones: MilestoneItem[]; }

export default function MilestonesIndex() {
    const { milestones } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({ year: '', title: '', description: '', image: '', image_alt: '', sort_order: 0, is_active: true as boolean });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...form.data, image: form.data.image || null, image_alt: form.data.image_alt || null };
        if (editingId) {
            form.put(route('admin.about-us.milestones.update', editingId), { onSuccess: () => { setShowForm(false); setEditingId(null); form.reset(); } });
        } else {
            form.post(route('admin.about-us.milestones.store'), { onSuccess: () => { setShowForm(false); form.reset(); } });
        }
    };

    const handleEdit = (item: MilestoneItem) => {
        setEditingId(item.id);
        form.setData({ year: item.year, title: item.title, description: item.description, image: item.image ?? '', image_alt: item.image_alt ?? '', sort_order: item.sort_order, is_active: item.is_active });
        setShowForm(true);
    };

    const handleDelete = (id: number) => { if (confirm('Are you sure?')) router.delete(route('admin.about-us.milestones.destroy', id)); };
    const handleToggleStatus = (id: number) => { router.patch(route('admin.about-us.milestones.toggle-status', id)); };

    const inputCls = 'rounded-lg border-gray-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)]';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Milestones" />
            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div><h1 className="text-2xl font-bold tracking-tight">Company Journey</h1><p className="mt-1 text-sm text-muted-foreground">Manage timeline milestones.</p></div>
                    <Button onClick={() => { setShowForm(!showForm); setEditingId(null); form.reset(); }}><Plus className="mr-1 h-4 w-4" /> Add Milestone</Button>
                </div>
                {flash?.success && (<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"><CheckCircle2 className="h-4 w-4" /> {flash.success}</div>)}
                {showForm && (
                    <Card>
                        <CardHeader><CardTitle>{editingId ? 'Edit' : 'Create'} Milestone</CardTitle></CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                                <div><Label>Year / Date *</Label><Input value={form.data.year} onChange={(e) => form.setData('year', e.target.value)} placeholder="2020" className={inputCls} required /></div>
                                <div><Label>Title *</Label><Input value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} placeholder="Network Expansion" className={inputCls} required /></div>
                                <div className="sm:col-span-2"><Label>Description *</Label><textarea rows={2} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" required /></div>
                                <div><Label>Image URL</Label><Input value={form.data.image} onChange={(e) => form.setData('image', e.target.value)} placeholder="https://..." className={inputCls} /></div>
                                <div><Label>Image Alt Text</Label><Input value={form.data.image_alt} onChange={(e) => form.setData('image_alt', e.target.value)} className={inputCls} /></div>
                                <div><Label>Sort Order</Label><Input type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)} className={inputCls} /></div>
                                <div className="flex items-end"><label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="h-4 w-4 accent-[var(--isp-primary)]" /><span className="text-sm font-medium">Active</span></label></div>
                                <div className="flex gap-2 sm:col-span-2"><Button type="submit" disabled={form.processing}>{form.processing ? 'Saving...' : editingId ? 'Update' : 'Create'}</Button><Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); form.reset(); }}>Cancel</Button></div>
                            </form>
                        </CardContent>
                    </Card>
                )}
                <Card>
                    <CardHeader><CardTitle>All Milestones ({milestones.length})</CardTitle></CardHeader>
                    <CardContent>
                        {milestones.length === 0 ? (<div className="py-12 text-center text-gray-500"><Clock className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-4 text-sm">No milestones created yet.</p></div>) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead><tr className="border-b"><th className="px-4 py-3 font-medium">Year</th><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Description</th><th className="px-4 py-3 font-medium">Order</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Actions</th></tr></thead>
                                    <tbody className="divide-y">
                                        {milestones.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">{item.year}</td>
                                                <td className="px-4 py-3 font-medium">{item.title}</td>
                                                <td className="max-w-xs truncate px-4 py-3 text-gray-500">{item.description}</td>
                                                <td className="px-4 py-3">{item.sort_order}</td>
                                                <td className="px-4 py-3"><button type="button" onClick={() => handleToggleStatus(item.id)} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>{item.is_active ? 'Active' : 'Inactive'}</button></td>
                                                <td className="px-4 py-3"><div className="flex items-center gap-2"><button type="button" onClick={() => handleEdit(item)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => handleDelete(item.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button></div></td>
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
