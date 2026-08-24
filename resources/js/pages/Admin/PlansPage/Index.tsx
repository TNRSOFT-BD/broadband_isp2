import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { PlansPageSettings } from '@/types/plans';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Globe } from 'lucide-react';
import PageImageField from '@/components/admin/page-image-field';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Pages', href: '#' },
    { title: 'Plans Page', href: '/admin/pages/plans' },
];

interface PageProps {
    [key: string]: unknown;
    settings: PlansPageSettings;
}

function SectionCard({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">{children}</CardContent>
        </Card>
    );
}

export default function PlansPageSettingsIndex() {
    const { settings } = usePage<PageProps>().props;
    const { errors, flash } = usePage<SharedData>().props as SharedData & {
        errors: Record<string, string>;
        flash?: { success?: string };
    };

    const form = useForm({
        hero_eyebrow: settings.hero_eyebrow ?? '',
        hero_title: settings.hero_title ?? '',
        hero_highlight: settings.hero_highlight ?? '',
        hero_description: settings.hero_description ?? '',
        background_image: settings.background_image ?? '',
        cta_section_background_image: settings.cta_section_background_image ?? '',
        cta_primary_text: settings.cta_primary_text ?? '',
        cta_primary_url: settings.cta_primary_url ?? '',
        cta_secondary_text: settings.cta_secondary_text ?? '',
        cta_secondary_url: settings.cta_secondary_url ?? '',
        section_category_title: settings.section_category_title ?? '',
        section_category_description: settings.section_category_description ?? '',
        section_plans_title: settings.section_plans_title ?? '',
        section_plans_description: settings.section_plans_description ?? '',
        cta_section_enabled: settings.cta_section_enabled ?? true,
        cta_section_title: settings.cta_section_title ?? '',
        cta_section_description: settings.cta_section_description ?? '',
        cta_section_primary_text: settings.cta_section_primary_text ?? '',
        cta_section_primary_url: settings.cta_section_primary_url ?? '',
        cta_section_secondary_text: settings.cta_section_secondary_text ?? '',
        cta_section_secondary_url: settings.cta_section_secondary_url ?? '',
        currency_symbol: settings.currency_symbol ?? '$',
        currency_code: settings.currency_code ?? 'USD',
        meta_title: settings.meta_title ?? '',
        meta_description: settings.meta_description ?? '',
        meta_keywords: settings.meta_keywords ?? '',
    });

    const errorFor = (key: string) => errors[key];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans Page Settings" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Plans Page Content</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Edit the global content shown on the public Plans page.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <a href="/plans" target="_blank" rel="noopener noreferrer">
                            <Globe /> View Public Page
                        </a>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" />
                        {flash.success}
                    </div>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.put(route('admin.pages.plans'));
                    }}
                    className="grid gap-6 xl:grid-cols-2"
                >
                    {/* Hero Section */}
                    <SectionCard title="Hero Section" description="The dark futuristic banner at the top of the page.">
                        <div className="space-y-2">
                            <Label htmlFor="hero_eyebrow">Eyebrow Badge</Label>
                            <Input id="hero_eyebrow" value={form.data.hero_eyebrow} onChange={(e) => form.setData('hero_eyebrow', e.target.value)} placeholder="Next Generation Internet" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
                            <div className="space-y-2">
                                <Label htmlFor="hero_title">Heading</Label>
                                <Input id="hero_title" value={form.data.hero_title} onChange={(e) => form.setData('hero_title', e.target.value)} placeholder="Choose Your Perfect" />
                                {errorFor('hero_title') && <p className="text-xs text-destructive">{errorFor('hero_title')}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hero_highlight">Highlighted Word(s)</Label>
                                <Input id="hero_highlight" value={form.data.hero_highlight} onChange={(e) => form.setData('hero_highlight', e.target.value)} placeholder="Connection" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero_description">Subheading</Label>
                            <textarea
                                id="hero_description"
                                rows={3}
                                value={form.data.hero_description}
                                onChange={(e) => form.setData('hero_description', e.target.value)}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                        <Separator />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="cta_primary_text">Primary Button Text</Label>
                                <Input id="cta_primary_text" value={form.data.cta_primary_text} onChange={(e) => form.setData('cta_primary_text', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cta_primary_url">Primary Button URL</Label>
                                <Input id="cta_primary_url" value={form.data.cta_primary_url} onChange={(e) => form.setData('cta_primary_url', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cta_secondary_text">Secondary Button Text</Label>
                                <Input id="cta_secondary_text" value={form.data.cta_secondary_text} onChange={(e) => form.setData('cta_secondary_text', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cta_secondary_url">Secondary Button URL</Label>
                                <Input id="cta_secondary_url" value={form.data.cta_secondary_url} onChange={(e) => form.setData('cta_secondary_url', e.target.value)} />
                            </div>
                        </div>
                        <PageImageField
                            label="Background Image"
                            value={form.data.background_image}
                            onChange={(v) => form.setData('background_image', v)}
                            uploadUrl={route('admin.pages.plans.upload')}
                        />
                    </SectionCard>

                    {/* Sections + CTA */}
                    <div className="flex flex-col gap-6">
                        <SectionCard title="Category & Plans Section Headings" description="Titles above the category filter and plan cards.">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="section_category_title">Category Filter Title</Label>
                                    <Input id="section_category_title" value={form.data.section_category_title} onChange={(e) => form.setData('section_category_title', e.target.value)} placeholder="Browse by Category" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="section_category_desc">Category Filter Description</Label>
                                    <Input id="section_category_desc" value={form.data.section_category_description} onChange={(e) => form.setData('section_category_description', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="section_plans_title">Plans Grid Title</Label>
                                    <Input id="section_plans_title" value={form.data.section_plans_title} onChange={(e) => form.setData('section_plans_title', e.target.value)} placeholder="All Internet Plans" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="section_plans_desc">Plans Grid Description</Label>
                                    <Input id="section_plans_desc" value={form.data.section_plans_description} onChange={(e) => form.setData('section_plans_description', e.target.value)} />
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard title="Bottom CTA Section" description="The closing call-to-action banner.">
                            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3">
                                <span className="text-sm font-medium">Enabled</span>
                                <input
                                    type="checkbox"
                                    checked={form.data.cta_section_enabled}
                                    onChange={(e) => form.setData('cta_section_enabled', e.target.checked)}
                                    className="h-4 w-4 accent-[var(--isp-primary)]"
                                    aria-label="Enable CTA section"
                                />
                            </label>
                            <div className="space-y-2">
                                <Label htmlFor="cta_section_title">Title</Label>
                                <Input id="cta_section_title" value={form.data.cta_section_title} onChange={(e) => form.setData('cta_section_title', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cta_section_desc">Description</Label>
                                <textarea
                                    id="cta_section_desc"
                                    rows={2}
                                    value={form.data.cta_section_description}
                                    onChange={(e) => form.setData('cta_section_description', e.target.value)}
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>
                            <Separator />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="cs_primary_text">Primary Text</Label>
                                    <Input id="cs_primary_text" value={form.data.cta_section_primary_text} onChange={(e) => form.setData('cta_section_primary_text', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cs_primary_url">Primary URL</Label>
                                    <Input id="cs_primary_url" value={form.data.cta_section_primary_url} onChange={(e) => form.setData('cta_section_primary_url', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cs_secondary_text">Secondary Text</Label>
                                    <Input id="cs_secondary_text" value={form.data.cta_section_secondary_text} onChange={(e) => form.setData('cta_section_secondary_text', e.target.value)} />
                                </div>
                            <div className="space-y-2">
                                <Label htmlFor="cs_secondary_url">Secondary URL</Label>
                                <Input id="cs_secondary_url" value={form.data.cta_section_secondary_url} onChange={(e) => form.setData('cta_section_secondary_url', e.target.value)} />
                            </div>
                        </div>
                        <PageImageField
                            label="CTA Background Image"
                            value={form.data.cta_section_background_image}
                            onChange={(v) => form.setData('cta_section_background_image', v)}
                            uploadUrl={route('admin.pages.plans.upload')}
                        />
                    </SectionCard>
                    </div>

                    {/* Currency + SEO */}
                    <div className="flex flex-col gap-6 xl:col-span-2 xl:flex-row">
                        <SectionCard title="Currency" description="Global currency used for every price on the page.">
                            <div className="grid gap-4 sm:grid-cols-2 xl:max-w-md">
                                <div className="space-y-2">
                                    <Label htmlFor="currency_symbol">Symbol *</Label>
                                    <Input id="currency_symbol" value={form.data.currency_symbol} onChange={(e) => form.setData('currency_symbol', e.target.value)} maxLength={5} placeholder="$ / ৳ / €" />
                                    {errorFor('currency_symbol') && <p className="text-xs text-destructive">{errorFor('currency_symbol')}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency_code">ISO Code</Label>
                                    <Input id="currency_code" value={form.data.currency_code} onChange={(e) => form.setData('currency_code', e.target.value.toUpperCase())} maxLength={3} placeholder="USD / BDT" />
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard title="SEO & Meta" description="Browser title and search-engine snippets.">
                            <div className="space-y-2">
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input id="meta_title" value={form.data.meta_title} onChange={(e) => form.setData('meta_title', e.target.value)} maxLength={255} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <textarea
                                    id="meta_description"
                                    rows={2}
                                    value={form.data.meta_description}
                                    onChange={(e) => form.setData('meta_description', e.target.value)}
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="meta_keywords">Meta Keywords (comma separated)</Label>
                                <Input id="meta_keywords" value={form.data.meta_keywords} onChange={(e) => form.setData('meta_keywords', e.target.value)} />
                            </div>
                        </SectionCard>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end border-t pt-6 xl:col-span-2">
                        <Button type="submit" disabled={form.processing} size="lg" className="min-w-[200px]">
                            {form.processing ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
