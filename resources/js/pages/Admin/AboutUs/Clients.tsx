import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Plus, Pencil, Trash2, Users, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface ClientItem { id: number; name: string; logo: string | null; website_url: string | null; category: string | null; sort_order: number; is_active: boolean; }
interface PageProps extends Record<string, unknown> { clients: ClientItem[]; }

export default function ClientsIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Pages', href: '#' },
        { title: 'About Us', href: adminUrl('/pages/about') },
        { title: 'Clients', href: adminUrl('/pages/about/clients') },
    ];

    const { clients } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({ name: '', logo: '', website_url: '', category: '', sort_order: 0, is_active: true as boolean });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...form.data, logo: form.data.logo || null, website_url: form.data.website_url || null, category: form.data.category || null };
        if (editingId) {
            form.put(route('admin.about-us.clients.update', editingId), { onSuccess: () => { setShowForm(false); setEditingId(null); form.reset(); } });
        } else {
            form.post(route('admin.about-us.clients.store'), { onSuccess: () => { setShowForm(false); form.reset(); } });
        }
    };

    const handleEdit = (item: ClientItem) => {
        setEditingId(item.id);
        form.setData({ name: item.name, logo: item.logo ?? '', website_url: item.website_url ?? '', category: item.category ?? '', sort_order: item.sort_order, is_active: item.is_active });
        setShowForm(true);
    };

    const handleDelete = (id: number) => { if (confirm('Are you sure?')) router.delete(route('admin.about-us.clients.destroy', id)); };
    const handleToggleStatus = (id: number) => { router.patch(route('admin.about-us.clients.toggle-status', id)); };

    const inputCls = 'rounded-lg border-gray-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)]';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div><h1 className="text-2xl font-bold tracking-tight">Clients</h1><p className="mt-1 text-sm text-muted-foreground">Manage client organizations and partners.</p></div>
                    <Button onClick={() => { setShowForm(!showForm); setEditingId(null); form.reset(); }}><Plus className="mr-1 h-4 w-4" /> Add Client</Button>
                </div>
                {flash?.success && (<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"><CheckCircle2 className="h-4 w-4" /> {flash.success}</div>)}
                {showForm && (
                    <Card>
                        <CardHeader><CardTitle>{editingId ? 'Edit' : 'Create'} Client</CardTitle></CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                                <div><Label>Name *</Label><Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Client Name" className={inputCls} required /></div>
                                <div><Label>Category</Label><Input value={form.data.category} onChange={(e) => form.setData('category', e.target.value)} placeholder="Financial, Corporate, etc." className={inputCls} /></div>
                                <div><Label>Logo URL</Label><Input value={form.data.logo} onChange={(e) => form.setData('logo', e.target.value)} placeholder="https://..." className={inputCls} /></div>
                                <div><Label>Website URL</Label><Input value={form.data.website_url} onChange={(e) => form.setData('website_url', e.target.value)} placeholder="https://..." className={inputCls} /></div>
                                <div><Label>Sort Order</Label><Input type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)} className={inputCls} /></div>
                                <div className="flex items-end"><label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="h-4 w-4 accent-[var(--isp-primary)]" /><span className="text-sm font-medium">Active</span></label></div>
                                <div className="flex gap-2 sm:col-span-2"><Button type="submit" disabled={form.processing}>{form.processing ? 'Saving...' : editingId ? 'Update' : 'Create'}</Button><Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); form.reset(); }}>Cancel</Button></div>
                            </form>
                        </CardContent>
                    </Card>
                )}
                <Card>
                    <CardHeader><CardTitle>All Clients ({clients.length})</CardTitle></CardHeader>
                    <CardContent>
                        {clients.length === 0 ? (<div className="py-12 text-center text-gray-500"><Users className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-4 text-sm">No clients created yet.</p></div>) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead><tr className="border-b"><th className="px-4 py-3 font-medium">Logo</th><th className="px-4 py-3 font-medium">Name</th><th className="px-4 py-3 font-medium">Category</th><th className="px-4 py-3 font-medium">Website</th><th className="px-4 py-3 font-medium">Order</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Actions</th></tr></thead>
                                    <tbody className="divide-y">
                                        {clients.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">{item.logo ? <img src={item.logo} alt={item.name} className="h-8 w-8 rounded object-cover" /> : <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 text-xs text-gray-400">{item.name.charAt(0)}</div>}</td>
                                                <td className="px-4 py-3 font-medium">{item.name}</td>
                                                <td className="px-4 py-3 text-gray-500">{item.category ?? '—'}</td>
                                                <td className="px-4 py-3">{item.website_url ? <a href={item.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--isp-primary)] hover:underline"><ExternalLink className="h-3 w-3" /></a> : '—'}</td>
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
