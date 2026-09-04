import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAdminUrl } from '@/hooks/use-admin-url';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { AdminPlan, PlanCategory, PlansPageSettings } from '@/types/plans';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eye, Pencil, Plus, Search, Star, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface PageProps {
    plans: {
        data: AdminPlan[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: { search?: string; category?: string; status?: string };
    categories: PlanCategory[];
    stats: { total: number; active: number; featured: number };
    pageSettings: PlansPageSettings;
}


export default function PlansIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Plans', href: adminUrl('/plans') },
    ];

    const { plans, filters, categories, stats, pageSettings } = usePage<PageProps & { [key: string]: unknown }>().props;

    const currencySymbol = pageSettings.currency_symbol ?? '$';

    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [deleteTarget, setDeleteTarget] = useState<AdminPlan | null>(null);

    const applyFilters = useCallback(
        (overrides?: Partial<{ search: string; category: string; status: string; page: number }>) => {
            router.get(
                route('admin.plans.index'),
                {
                    search: overrides?.search ?? search,
                    category: overrides?.category ?? category,
                    status: overrides?.status ?? status,
                    page: overrides?.page,
                },
                { preserveState: true, replace: true, only: ['plans'] },
            );
        },
        [search, category, status],
    );

    // Debounced search
    useEffect(() => {
        if (search === (filters.search ?? '')) return;
        const timer = setTimeout(() => applyFilters({ search }), 350);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Internet Plans" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Internet Plans</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage broadband packages shown on the public Plans page.
                        </p>
                    </div>
                    <Link href={route('admin.plans.create')}>
                        <Button>
                            <Plus /> New Plan
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Total Plans', value: stats.total },
                        { label: 'Active', value: stats.active },
                        { label: 'Featured', value: stats.featured },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-xl border bg-card p-5 shadow-sm">
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="mt-1 text-3xl font-bold tabular-nums">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name..."
                            className="pl-9"
                            aria-label="Search plans"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            applyFilters({ category: e.target.value });
                        }}
                        className="h-10 rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        aria-label="Filter by category"
                    >
                        <option value="">All Categories</option>
                        {categories.map((c) => (
                            <option key={c.id} value={String(c.id)}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            applyFilters({ status: e.target.value });
                        }}
                        className="h-10 rounded-md border border-input bg-transparent px-3 text-sm capitalize focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        aria-label="Filter by status"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                                <th className="px-4 py-3 font-medium">Plan</th>
                                <th className="px-4 py-3 font-medium">Category</th>
                                <th className="px-4 py-3 font-medium">Speed</th>
                                <th className="px-4 py-3 font-medium">Price</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Sort</th>
                                <th className="px-4 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                                        No plans found.
                                    </td>
                                </tr>
                            )}
                            {plans.data.map((plan) => (
                                <tr key={plan.id} className="border-b transition-colors last:border-0 hover:bg-muted/30">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{plan.name}</span>
                                            {plan.is_featured && (
                                                <Badge variant="secondary" className="gap-1">
                                                    <Star className="h-3 w-3" /> Featured
                                                </Badge>
                                            )}
                                        </div>
                                        {plan.tagline && <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{plan.tagline}</p>}
                                    </td>
                                    <td className="px-4 py-3">{plan.category?.name ?? '—'}</td>
                                    <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                                        {plan.speed} {plan.speed_unit}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 tabular-nums">{currencySymbol}{Number(plan.monthly_price).toFixed(2)}/mo</td>
                                    <td className="px-4 py-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.patch(route('admin.plans.toggle-status', plan.id), {}, { preserveScroll: true })
                                            }
                                            className="inline-flex cursor-pointer"
                                            aria-label={`Toggle ${plan.name} active`}
                                            title="Click to toggle"
                                        >
                                            <Badge variant={plan.is_active ? 'default' : 'outline'}>
                                                {plan.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 tabular-nums text-muted-foreground">{plan.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button asChild variant="ghost" size="icon" title="View public page">
                                                <a href={`/plans/${plan.slug}`} target="_blank" rel="noopener noreferrer">
                                                    <Eye />
                                                </a>
                                            </Button>
                                            <Button asChild variant="ghost" size="icon">
                                                <Link href={route('admin.plans.edit', plan.id)} title="Edit">
                                                    <Pencil />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(plan)} title="Delete">
                                                <Trash2 className="text-destructive" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {plans.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing page {plans.current_page} of {plans.last_page} ({plans.total} plans)
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={plans.current_page <= 1}
                                onClick={() => applyFilters({ page: plans.current_page - 1 })}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={plans.current_page >= plans.last_page}
                                onClick={() => applyFilters({ page: plans.current_page + 1 })}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete confirmation */}
            <Dialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete "{deleteTarget?.name}"?</DialogTitle>
                        <DialogDescription>
                            This will permanently remove this plan and all its features and service associations. This action cannot be
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
                                router.delete(route('admin.plans.destroy', deleteTarget.id), {
                                    preserveScroll: true,
                                    onSuccess: () => setDeleteTarget(null),
                                });
                            }}
                        >
                            Delete Plan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
