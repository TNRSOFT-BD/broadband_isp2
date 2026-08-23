import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { PlanCategory as PlanCategoryType } from '@/types/plans';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
    [key: string]: unknown;
    categories: (PlanCategoryType & { plans_count?: number })[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Plan Categories', href: '/admin/plan-categories' },
];

const emptyForm = {
    name: '',
    slug: '',
    icon: '',
    description: '',
};

export default function PlanCategoriesIndex() {
    const { categories } = usePage<PageProps>().props;
    const { errors, flash } = usePage<SharedData>().props as SharedData & {
        errors: Record<string, string>;
        flash?: { success?: string };
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<PlanCategoryType & { plans_count?: number } | null>(null);

    const form = useForm(emptyForm);

    const openCreate = () => {
        setEditingId(null);
        form.setData({ ...emptyForm });
        setDialogOpen(true);
    };

    const openEdit = (category: PlanCategoryType) => {
        setEditingId(category.id);
        form.setData({
            name: category.name,
            slug: category.slug,
            icon: category.icon ?? '',
            description: category.description ?? '',
        });
        setDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId !== null) {
            form.put(route('admin.plan-categories.update', editingId), {
                onSuccess: () => setDialogOpen(false),
            });
        } else {
            form.post(route('admin.plan-categories.store'), {
                onSuccess: () => setDialogOpen(false),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plan Categories" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Plan Categories</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Group plans into filterable tabs on the public page.</p>
                    </div>
                    <Button onClick={openCreate}>
                        <Plus /> New Category
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{flash.success}</div>
                )}

                {/* Grid */}
                {categories.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
                        No categories yet. Click "New Category" to create one.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Card key={category.id} className="group">
                                <CardContent className="flex h-full flex-col p-5">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <span
                                                aria-hidden
                                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                                            >
                                                {category.icon ? (
                                                    <span className="text-lg">{category.icon}</span>
                                                ) : (
                                                    <span className="text-lg font-bold">{category.name.charAt(0)}</span>
                                                )}
                                            </span>
                                            <div>
                                                <p className="font-semibold">{category.name}</p>
                                                <p className="text-xs text-muted-foreground">/{category.slug}</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">{category.plans_count ?? 0} plans</Badge>
                                    </div>

                                    {category.description && (
                                        <p className="mt-3 line-clamp-2 flex-1 text-xs text-muted-foreground">{category.description}</p>
                                    )}

                                    <div className="mt-4 flex justify-end gap-1 border-t pt-3">
                                        <Button variant="ghost" size="sm" onClick={() => openEdit(category)}>
                                            <Pencil /> Edit
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(category)}>
                                            <Trash2 className="text-destructive" /> Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Create/Edit dialog */}
            <Dialog open={dialogOpen} onOpenChange={(open) => !open && setDialogOpen(false)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingId !== null ? `Edit "${form.data.name}"` : 'New Category'}</DialogTitle>
                        <DialogDescription>Categories appear as filter tabs on the public Plans page.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cat-name">Name *</Label>
                            <Input id="cat-name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Gaming Internet" />
                            {errors['name'] && <p className="text-xs text-destructive">{errors['name']}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cat-icon">Icon (emoji)</Label>
                            <Input id="cat-icon" value={form.data.icon} onChange={(e) => form.setData('icon', e.target.value)} placeholder="🎮" maxLength={10} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cat-desc">Description</Label>
                            <Input id="cat-desc" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} placeholder="Low-latency plans built for competitive gaming." />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Saving...' : editingId !== null ? 'Update' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete confirmation */}
            <Dialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete "{deleteTarget?.name}"?</DialogTitle>
                        <DialogDescription>
                            Plans in this category will become uncategorized and the public filter tab will disappear. This action cannot be
                            undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (!deleteTarget) return;
                                router.delete(route('admin.plan-categories.destroy', deleteTarget.id), {
                                    preserveScroll: true,
                                    onSuccess: () => setDeleteTarget(null),
                                });
                            }}
                        >
                            Delete Category
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
