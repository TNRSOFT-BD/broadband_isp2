import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Homepage', href: '/admin/homepage' },
    { title: 'FAQs', href: '/admin/homepage/faqs' },
];

interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string | null;
    sort_order: number;
    is_active: boolean;
}

interface PageProps {
    faqs: Faq[];
}

export default function FaqsAdmin() {
    const { faqs } = usePage().props as unknown as PageProps;
    const accent = 'var(--isp-primary)';
    const [editing, setEditing] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm<{
        question: string;
        answer: string;
        category: string;
        sort_order: number;
        is_active: boolean;
    }>({
        question: '',
        answer: '',
        category: '',
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.homepage.faqs.update', editing), {
                onSuccess: () => { setEditing(null); reset(); setShowForm(false); },
            });
        } else {
            post(route('admin.homepage.faqs.store'), {
                onSuccess: () => { reset(); setShowForm(false); },
            });
        }
    };

    const startEdit = (faq: Faq) => {
        setEditing(faq.id);
        setData({ question: faq.question, answer: faq.answer, category: faq.category ?? '', sort_order: faq.sort_order, is_active: faq.is_active });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this FAQ?')) {
            router.delete(route('admin.homepage.faqs.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage FAQs" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">FAQs</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage frequently asked questions for the homepage.</p>
                    </div>
                    <Button onClick={() => { setEditing(null); reset(); setShowForm(!showForm); }} style={{ background: accent }}>
                        <Plus className="mr-1 h-4 w-4" /> Add FAQ
                    </Button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 space-y-4">
                        <h3 className="font-bold">{editing ? 'Edit' : 'Add'} FAQ</h3>
                        {Object.keys(errors).length > 0 && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                                {Object.entries(errors).map(([key, msg]) => (
                                    <p key={key}>{msg}</p>
                                ))}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label>Question *</Label>
                            <Input value={data.question} onChange={(e) => setData('question', e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Answer *</Label>
                            <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={data.answer} onChange={(e) => setData('answer', e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Category</Label><Input value={data.category} onChange={(e) => setData('category', e.target.value)} placeholder="Optional" /></div>
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
                    {faqs.length === 0 ? <p className="text-center py-10 text-muted-foreground">No FAQs yet.</p> : faqs.map((faq) => (
                        <div key={faq.id} className="flex items-start gap-4 rounded-xl border bg-white p-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm">{faq.question}</p>
                                    {!faq.is_active && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-semibold">Inactive</span>}
                                </div>
                                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{faq.answer}</p>
                                {faq.category && <span className="mt-1 inline-block text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{faq.category}</span>}
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => startEdit(faq)}><Edit3 className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
