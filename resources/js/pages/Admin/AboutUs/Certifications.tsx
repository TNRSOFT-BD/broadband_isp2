import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Plus, Pencil, Trash2, Award } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Pages', href: '#' },
    { title: 'About Us', href: '/admin/pages/about' },
    { title: 'Certifications', href: '/admin/pages/about/certifications' },
];

const ICON_OPTIONS = [
    'Shield', 'Lock', 'CheckCircle2', 'Award', 'Globe', 'Star', 'Heart', 'Zap', 'Eye', 'Target',
];

interface CertItem { id: number; icon: string; title: string; description: string | null; certificate_number: string | null; issuing_organization: string | null; issue_date: string | null; expiry_date: string | null; verification_url: string | null; sort_order: number; is_active: boolean; }
interface PageProps extends Record<string, unknown> { certifications: CertItem[]; }

export default function CertificationsIndex() {
    const { certifications } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({ icon: 'Shield', title: '', description: '', certificate_number: '', issuing_organization: '', issue_date: '', expiry_date: '', verification_url: '', sort_order: 0, is_active: true as boolean });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...form.data, description: form.data.description || null, certificate_number: form.data.certificate_number || null, issuing_organization: form.data.issuing_organization || null, issue_date: form.data.issue_date || null, expiry_date: form.data.expiry_date || null, verification_url: form.data.verification_url || null };
        if (editingId) {
            form.put(route('admin.about-us.certifications.update', editingId), { onSuccess: () => { setShowForm(false); setEditingId(null); form.reset(); } });
        } else {
            form.post(route('admin.about-us.certifications.store'), { onSuccess: () => { setShowForm(false); form.reset(); } });
        }
    };

    const handleEdit = (item: CertItem) => {
        setEditingId(item.id);
        form.setData({ icon: item.icon, title: item.title, description: item.description ?? '', certificate_number: item.certificate_number ?? '', issuing_organization: item.issuing_organization ?? '', issue_date: item.issue_date ?? '', expiry_date: item.expiry_date ?? '', verification_url: item.verification_url ?? '', sort_order: item.sort_order, is_active: item.is_active });
        setShowForm(true);
    };

    const handleDelete = (id: number) => { if (confirm('Are you sure?')) router.delete(route('admin.about-us.certifications.destroy', id)); };
    const handleToggleStatus = (id: number) => { router.patch(route('admin.about-us.certifications.toggle-status', id)); };

    const inputCls = 'rounded-lg border-gray-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)]';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Certifications" />
            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div><h1 className="text-2xl font-bold tracking-tight">Certifications & Compliance</h1><p className="mt-1 text-sm text-muted-foreground">Manage certifications and compliance information.</p></div>
                    <Button onClick={() => { setShowForm(!showForm); setEditingId(null); form.reset(); }}><Plus className="mr-1 h-4 w-4" /> Add Certification</Button>
                </div>
                {flash?.success && (<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"><CheckCircle2 className="h-4 w-4" /> {flash.success}</div>)}
                {showForm && (
                    <Card>
                        <CardHeader><CardTitle>{editingId ? 'Edit' : 'Create'} Certification</CardTitle></CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                                <div><Label>Title *</Label><Input value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} placeholder="ISP License" className={inputCls} required /></div>
                                <div><Label>Icon</Label><select value={form.data.icon} onChange={(e) => form.setData('icon', e.target.value)} className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm">{ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}</select></div>
                                <div className="sm:col-span-2"><Label>Description</Label><textarea rows={2} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" /></div>
                                <div><Label>Certificate Number</Label><Input value={form.data.certificate_number} onChange={(e) => form.setData('certificate_number', e.target.value)} className={inputCls} /></div>
                                <div><Label>Issuing Organization</Label><Input value={form.data.issuing_organization} onChange={(e) => form.setData('issuing_organization', e.target.value)} className={inputCls} /></div>
                                <div><Label>Issue Date</Label><Input type="date" value={form.data.issue_date} onChange={(e) => form.setData('issue_date', e.target.value)} className={inputCls} /></div>
                                <div><Label>Expiry Date</Label><Input type="date" value={form.data.expiry_date} onChange={(e) => form.setData('expiry_date', e.target.value)} className={inputCls} /></div>
                                <div><Label>Verification URL</Label><Input value={form.data.verification_url} onChange={(e) => form.setData('verification_url', e.target.value)} placeholder="https://..." className={inputCls} /></div>
                                <div><Label>Sort Order</Label><Input type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)} className={inputCls} /></div>
                                <div className="flex items-end"><label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="h-4 w-4 accent-[var(--isp-primary)]" /><span className="text-sm font-medium">Active</span></label></div>
                                <div className="flex gap-2 sm:col-span-2"><Button type="submit" disabled={form.processing}>{form.processing ? 'Saving...' : editingId ? 'Update' : 'Create'}</Button><Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); form.reset(); }}>Cancel</Button></div>
                            </form>
                        </CardContent>
                    </Card>
                )}
                <Card>
                    <CardHeader><CardTitle>All Certifications ({certifications.length})</CardTitle></CardHeader>
                    <CardContent>
                        {certifications.length === 0 ? (<div className="py-12 text-center text-gray-500"><Award className="mx-auto h-12 w-12 text-gray-300" /><p className="mt-4 text-sm">No certifications created yet.</p></div>) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead><tr className="border-b"><th className="px-4 py-3 font-medium">Icon</th><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Organization</th><th className="px-4 py-3 font-medium">Number</th><th className="px-4 py-3 font-medium">Order</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Actions</th></tr></thead>
                                    <tbody className="divide-y">
                                        {certifications.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">{item.icon}</td>
                                                <td className="px-4 py-3 font-medium">{item.title}</td>
                                                <td className="px-4 py-3 text-gray-500">{item.issuing_organization ?? '—'}</td>
                                                <td className="px-4 py-3 text-gray-500">{item.certificate_number ?? '—'}</td>
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
