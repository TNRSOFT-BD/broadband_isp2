import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdminUrl } from '@/hooks/use-admin-url';
import { useState } from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    FileText,
    ExternalLink,
} from 'lucide-react';

interface LegalPage {
    id: number;
    title: string;
    slug: string;
    page_type: string;
    status: string;
    last_updated_at: string | null;
    published_at: string | null;
    sort_order: number;
}

interface PaginatedData {
    data: LegalPage[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface PageProps {
    pages: PaginatedData;
    filters: { search: string };
}

export default function LegalPagesIndex() {
    const { adminUrl } = useAdminUrl();
    const { pages, filters } = usePage().props as unknown as PageProps;
    const [search, setSearch] = useState(filters.search || '');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Legal Pages', href: adminUrl('/legal-pages') },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(adminUrl('/legal-pages'), { search }, { preserveState: true });
    };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            router.delete(adminUrl(`/legal-pages/${id}`));
        }
    };

    const handleToggleStatus = (page: LegalPage) => {
        const newStatus = page.status === 'published' ? 'draft' : 'published';
        router.put(adminUrl(`/legal-pages/${page.id}`), {
            title: page.title,
            slug: page.slug,
            page_type: page.page_type,
            status: newStatus,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Legal Pages" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Legal Pages</h1>
                        <p className="text-muted-foreground">
                            Manage terms, privacy policy, refund policy, and other legal content.
                        </p>
                    </div>
                    <Link href={adminUrl('/legal-pages/create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Page
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search legal pages..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <Button type="submit" variant="outline">
                                Search
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Pages Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Legal Pages</CardTitle>
                        <CardDescription>
                            {pages.total} page{pages.total !== 1 ? 's' : ''} total
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 text-left font-medium text-muted-foreground">Title</th>
                                        <th className="pb-3 text-left font-medium text-muted-foreground">Slug</th>
                                        <th className="pb-3 text-left font-medium text-muted-foreground">Type</th>
                                        <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
                                        <th className="pb-3 text-left font-medium text-muted-foreground">Last Updated</th>
                                        <th className="pb-3 text-right font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center text-muted-foreground">
                                                <FileText className="mx-auto mb-3 h-10 w-10 opacity-50" />
                                                <p>No legal pages found.</p>
                                                <Link
                                                    href={adminUrl('/legal-pages/create')}
                                                    className="mt-2 inline-flex items-center text-sm text-primary hover:underline"
                                                >
                                                    <Plus className="mr-1 h-4 w-4" />
                                                    Create your first legal page
                                                </Link>
                                            </td>
                                        </tr>
                                    ) : (
                                        pages.data.map((page) => (
                                            <tr key={page.id} className="border-b last:border-b-0 hover:bg-muted/30">
                                                <td className="py-3">
                                                    <div className="font-medium">{page.title}</div>
                                                </td>
                                                <td className="py-3">
                                                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                                                        /{page.slug}
                                                    </code>
                                                </td>
                                                <td className="py-3">
                                                    <Badge variant="outline" className="capitalize">
                                                        {page.page_type}
                                                    </Badge>
                                                </td>
                                                <td className="py-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(page)}
                                                        className={`cursor-pointer rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                                                            page.status === 'published'
                                                                ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                                                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                        }`}
                                                    >
                                                        {page.status === 'published' ? 'Published' : 'Draft'}
                                                    </button>
                                                </td>
                                                <td className="py-3 text-muted-foreground">
                                                    {page.last_updated_at
                                                        ? new Date(page.last_updated_at).toLocaleDateString()
                                                        : 'Never'}
                                                </td>
                                                <td className="py-3">
                                                    <div className="flex items-center justify-end gap-1">
                                                        {page.status === 'published' && (
                                                            <a
                                                                href={`/legal/${page.slug}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                                                title="View live"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        )}
                                                        <Link
                                                            href={adminUrl(`/legal-pages/${page.slug}/preview`)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                                            title="Preview"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={adminUrl(`/legal-pages/${page.id}/edit`)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                                            title="Edit"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(page.id, page.title)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {pages.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {((pages.current_page - 1) * pages.per_page) + 1} to{' '}
                                    {Math.min(pages.current_page * pages.per_page, pages.total)} of {pages.total}
                                </p>
                                <div className="flex gap-1">
                                    {Array.from({ length: pages.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={page === pages.current_page ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() =>
                                                router.get(adminUrl('/legal-pages'), {
                                                    search,
                                                    page,
                                                }, { preserveState: true })
                                            }
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
