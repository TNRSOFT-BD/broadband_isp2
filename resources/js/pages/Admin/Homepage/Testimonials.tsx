import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Plus, Trash2, Edit3, Star } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Homepage', href: '/admin/homepage' },
    { title: 'Testimonials', href: '/admin/homepage/testimonials' },
];

interface Testimonial {
    id: number;
    customer_name: string;
    customer_role: string | null;
    company_name: string | null;
    avatar: string | null;
    content: string;
    rating: number | null;
    sort_order: number;
    is_active: boolean;
    is_featured: boolean;
}

interface PageProps {
    testimonials: Testimonial[];
}

export default function TestimonialsAdmin() {
    const { testimonials } = usePage().props as unknown as PageProps;
    const accent = 'var(--isp-primary)';
    const [editing, setEditing] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm<{
        customer_name: string;
        customer_role: string;
        company_name: string;
        avatar: string;
        content: string;
        rating: number;
        sort_order: number;
        is_active: boolean;
        is_featured: boolean;
    }>({
        customer_name: '',
        customer_role: '',
        company_name: '',
        avatar: '',
        content: '',
        rating: 5,
        sort_order: 0,
        is_active: true,
        is_featured: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.homepage.testimonials.update', editing), {
                onSuccess: () => { setEditing(null); reset(); setShowForm(false); },
            });
        } else {
            post(route('admin.homepage.testimonials.store'), {
                onSuccess: () => { reset(); setShowForm(false); },
            });
        }
    };

    const startEdit = (t: Testimonial) => {
        setEditing(t.id);
        setData({
            customer_name: t.customer_name,
            customer_role: t.customer_role ?? '',
            company_name: t.company_name ?? '',
            avatar: t.avatar ?? '',
            content: t.content,
            rating: t.rating ?? 5,
            sort_order: t.sort_order,
            is_active: t.is_active,
            is_featured: t.is_featured,
        });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this testimonial?')) {
            router.delete(route('admin.homepage.testimonials.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Testimonials" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage customer testimonials for the homepage.</p>
                    </div>
                    <Button onClick={() => { setEditing(null); reset(); setShowForm(!showForm); }} style={{ background: accent }}>
                        <Plus className="mr-1 h-4 w-4" /> Add Testimonial
                    </Button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 space-y-4">
                        <h3 className="font-bold">{editing ? 'Edit' : 'Add'} Testimonial</h3>
                        {Object.keys(errors).length > 0 && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                                {Object.entries(errors).map(([key, msg]) => (
                                    <p key={key}>{msg}</p>
                                ))}
                            </div>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Customer Name *</Label>
                                <Input value={data.customer_name} onChange={(e) => setData('customer_name', e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Input value={data.customer_role} onChange={(e) => setData('customer_role', e.target.value)} placeholder="CEO" />
                            </div>
                            <div className="space-y-2">
                                <Label>Company</Label>
                                <Input value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Rating (1-5)</Label>
                                <Input type="number" min={1} max={5} value={data.rating} onChange={(e) => setData('rating', parseInt(e.target.value) || 5)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Content *</Label>
                            <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={data.content} onChange={(e) => setData('content', e.target.value)} required />
                        </div>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded" style={{ accentColor: accent }} /> Active</label>
                            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} className="rounded" style={{ accentColor: accent }} /> Featured</label>
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing} style={{ background: accent }}>{editing ? 'Update' : 'Create'}</Button>
                            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); reset(); }}>Cancel</Button>
                        </div>
                    </form>
                )}

                <div className="space-y-3">
                    {testimonials.length === 0 ? (
                        <p className="text-center py-10 text-muted-foreground">No testimonials yet.</p>
                    ) : (
                        testimonials.map((t) => (
                            <div key={t.id} className="flex items-start gap-4 rounded-xl border bg-white p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: `linear-gradient(135deg, ${accent}, var(--isp-accent))` }}>
                                    {t.customer_name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-sm">{t.customer_name}</p>
                                        {t.is_featured && <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-semibold">Featured</span>}
                                        {!t.is_active && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-semibold">Inactive</span>}
                                    </div>
                                    {t.rating && (
                                        <div className="flex gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} className={`h-3 w-3 ${i < t.rating! ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />)}
                                        </div>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{t.content}</p>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => startEdit(t)}><Edit3 className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
