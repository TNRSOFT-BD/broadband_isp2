import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminUrl } from '@/hooks/use-admin-url';
import TiptapEditor from '@/components/editor/tiptap-editor';
import type { JSONContent } from '@tiptap/react';

interface LegalPageData {
    id: number;
    title: string;
    slug: string;
    page_type: string;
    short_description: string | null;
    content_json: JSONContent | null;
    content_html: string | null;
    status: string;
    show_last_updated: boolean;
    meta_title: string | null;
    meta_description: string | null;
    og_title: string | null;
    og_description: string | null;
    cta_enabled: boolean;
    cta_title: string | null;
    cta_description: string | null;
    cta_button_text: string | null;
    cta_button_url: string | null;
}

interface PageProps {
    page: LegalPageData;
}

export default function LegalPageEdit() {
    const { adminUrl } = useAdminUrl();
    const { page } = usePage().props as unknown as PageProps;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Legal Pages', href: adminUrl('/legal-pages') },
        { title: `Edit: ${page.title}`, href: adminUrl(`/legal-pages/${page.id}/edit`) },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        slug: page.slug,
        page_type: page.page_type,
        short_description: page.short_description || '',
        content_json: page.content_json as JSONContent | null,
        status: page.status,
        show_last_updated: page.show_last_updated,
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        og_title: page.og_title || '',
        og_description: page.og_description || '',
        cta_enabled: page.cta_enabled,
        cta_title: page.cta_title || '',
        cta_description: page.cta_description || '',
        cta_button_text: page.cta_button_text || '',
        cta_button_url: page.cta_button_url || '',
    });

    const generateSlug = (text: string) =>
        text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const handleTitleChange = (value: string) => {
        setData('title', value);
        if (data.slug === generateSlug(page.title)) {
            setData('slug', generateSlug(value));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Stringify content_json to avoid max_input_vars limit
        put(
            adminUrl(`/legal-pages/${page.id}`),
            {
                ...data,
                content_json: data.content_json ? JSON.stringify(data.content_json) : null,
            },
            { preserveScroll: true },
        );
    };

    const pageTypes = [
        { value: 'terms', label: 'Terms & Conditions' },
        { value: 'privacy', label: 'Privacy Policy' },
        { value: 'refund', label: 'Refund Policy' },
        { value: 'cookie', label: 'Cookie Policy' },
        { value: 'cancellation', label: 'Cancellation Policy' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${page.title}`} />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div>
                    <h1 className="text-2xl font-bold">Edit Legal Page</h1>
                    <p className="text-muted-foreground">Editing: {page.title}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Set the page title, slug, and type.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Page Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="Privacy Policy"
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="privacy-policy"
                                        required
                                    />
                                    {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="page_type">Page Type *</Label>
                                    <select
                                        id="page_type"
                                        value={data.page_type}
                                        onChange={(e) => setData('page_type', e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        {pageTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.page_type && <p className="text-sm text-destructive">{errors.page_type}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Input
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    placeholder="A brief description of this page..."
                                />
                                {errors.short_description && (
                                    <p className="text-sm text-destructive">{errors.short_description}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Content</CardTitle>
                            <CardDescription>Edit the main content using the rich text editor.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TiptapEditor
                                value={data.content_json}
                                onChange={(val) => setData('content_json', val)}
                                placeholder="Start writing your legal content..."
                                minHeight="500px"
                            />
                            {errors.content_json && (
                                <p className="mt-2 text-sm text-destructive">{errors.content_json}</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Publication Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Publication Settings</CardTitle>
                            <CardDescription>Control how the page is published and displayed.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="show_last_updated"
                                    checked={data.show_last_updated}
                                    onChange={(e) => setData('show_last_updated', e.target.checked)}
                                    className="h-4 w-4 rounded border-input"
                                />
                                <Label htmlFor="show_last_updated">Show "Last Updated" date on page</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Settings</CardTitle>
                            <CardDescription>Configure search engine optimization settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input
                                    id="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    placeholder="Leave empty to use page title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Input
                                    id="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    placeholder="Brief description for search engines..."
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="og_title">Open Graph Title</Label>
                                    <Input
                                        id="og_title"
                                        value={data.og_title}
                                        onChange={(e) => setData('og_title', e.target.value)}
                                        placeholder="For social media sharing"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="og_description">Open Graph Description</Label>
                                    <Input
                                        id="og_description"
                                        value={data.og_description}
                                        onChange={(e) => setData('og_description', e.target.value)}
                                        placeholder="For social media sharing"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom CTA */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Bottom CTA</CardTitle>
                            <CardDescription>Optional call-to-action section at the bottom of the page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="cta_enabled"
                                    checked={data.cta_enabled}
                                    onChange={(e) => setData('cta_enabled', e.target.checked)}
                                    className="h-4 w-4 rounded border-input"
                                />
                                <Label htmlFor="cta_enabled">Enable CTA Section</Label>
                            </div>
                            {data.cta_enabled && (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="cta_title">CTA Title</Label>
                                        <Input
                                            id="cta_title"
                                            value={data.cta_title}
                                            onChange={(e) => setData('cta_title', e.target.value)}
                                            placeholder="Have questions?"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cta_description">CTA Description</Label>
                                        <Input
                                            id="cta_description"
                                            value={data.cta_description}
                                            onChange={(e) => setData('cta_description', e.target.value)}
                                            placeholder="Contact our support team..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cta_button_text">Button Text</Label>
                                        <Input
                                            id="cta_button_text"
                                            value={data.cta_button_text}
                                            onChange={(e) => setData('cta_button_text', e.target.value)}
                                            placeholder="Contact Us"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cta_button_url">Button URL</Label>
                                        <Input
                                            id="cta_button_url"
                                            value={data.cta_button_url}
                                            onChange={(e) => setData('cta_button_url', e.target.value)}
                                            placeholder="/contact"
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit(adminUrl('/legal-pages'))}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
