import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { PlansPageSettings } from '@/types/plans';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Globe, Sparkles, LayoutGrid, Megaphone, Search } from 'lucide-react';
import { useState } from 'react';
import PageImageField from '@/components/admin/page-image-field';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface PageProps {
    [key: string]: unknown;
    settings: PlansPageSettings;
}

const TABS = ['Hero', 'Sections', 'CTA', 'Currency & SEO'] as const;

function SectionCard({
    title,
    description,
    icon,
    accent = false,
    children,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    accent?: boolean;
    children: React.ReactNode;
}) {
    return (
        <Card className={`transition-shadow duration-200 hover:shadow-md ${accent ? 'border-[var(--isp-primary)]/20' : ''}`}>
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{
                            background: accent
                                ? 'color-mix(in srgb, var(--isp-primary) 12%, transparent)'
                                : 'color-mix(in srgb, var(--isp-primary) 6%, transparent)',
                            color: 'var(--isp-primary)',
                        }}
                    >
                        {icon}
                    </div>
                    <div>
                        <CardTitle className="text-base">{title}</CardTitle>
                        <CardDescription className="text-xs">{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">{children}</CardContent>
        </Card>
    );
}

export default function PlansPageSettingsIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Plans Page', href: adminUrl('/pages/plans') },
    ];

    const { settings } = usePage<PageProps>().props;
    const { errors, flash } = usePage<SharedData>().props as SharedData & {
        errors: Record<string, string>;
        flash?: { success?: string };
    };

    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Hero');

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
    const inputCls = 'rounded-lg border-gray-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)]';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Plans Page Settings" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Plans Page</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Edit the global content shown on the public Plans page.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="gap-2">
                        <a href="/plans" target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" /> View Public Page
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
                    className="space-y-6"
                >
                    {/* Tab Bar */}
                    <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-white p-2">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                aria-current={activeTab === tab}
                                className={cn(
                                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                                    activeTab === tab
                                        ? 'bg-primary text-primary-foreground shadow'
                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* ═══════ HERO TAB ═══════ */}
                    {activeTab === 'Hero' && (
                        <SectionCard
                            title="Hero Section"
                            description="Dark futuristic banner at the top"
                            icon={<Sparkles className="h-4 w-4" />}
                            accent
                        >
                            <div className="space-y-2">
                                <Label>Eyebrow Badge</Label>
                                <Input
                                    value={form.data.hero_eyebrow}
                                    onChange={(e) => form.setData('hero_eyebrow', e.target.value)}
                                    placeholder="Next Generation Internet"
                                    className={inputCls}
                                />
                            </div>
                            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
                                <div className="space-y-2">
                                    <Label>Heading</Label>
                                    <Input
                                        value={form.data.hero_title}
                                        onChange={(e) => form.setData('hero_title', e.target.value)}
                                        placeholder="Choose Your Perfect"
                                        className={inputCls}
                                    />
                                    {errorFor('hero_title') && <p className="text-xs text-destructive">{errorFor('hero_title')}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Highlighted Word(s)</Label>
                                    <Input
                                        value={form.data.hero_highlight}
                                        onChange={(e) => form.setData('hero_highlight', e.target.value)}
                                        placeholder="Connection"
                                        className={inputCls}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Subheading</Label>
                                <textarea
                                    rows={3}
                                    value={form.data.hero_description}
                                    onChange={(e) => form.setData('hero_description', e.target.value)}
                                    className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                />
                            </div>
                            <PageImageField
                                label="Background Image"
                                value={form.data.background_image}
                                onChange={(v) => form.setData('background_image', v)}
                                uploadUrl={adminUrl('/pages/plans/upload')}
                            />
                            <Separator className="my-1" />
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call-to-Action Buttons</p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Primary Text</Label>
                                    <Input value={form.data.cta_primary_text} onChange={(e) => form.setData('cta_primary_text', e.target.value)} className={inputCls} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Primary URL</Label>
                                    <Input value={form.data.cta_primary_url} onChange={(e) => form.setData('cta_primary_url', e.target.value)} className={inputCls} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Secondary Text</Label>
                                    <Input value={form.data.cta_secondary_text} onChange={(e) => form.setData('cta_secondary_text', e.target.value)} className={inputCls} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Secondary URL</Label>
                                    <Input value={form.data.cta_secondary_url} onChange={(e) => form.setData('cta_secondary_url', e.target.value)} className={inputCls} />
                                </div>
                            </div>
                        </SectionCard>
                    )}

                    {/* ═══════ SECTIONS TAB ═══════ */}
                    {activeTab === 'Sections' && (
                        <SectionCard
                            title="Category & Plans Headings"
                            description="Titles above the category filter and plan cards"
                            icon={<LayoutGrid className="h-4 w-4" />}
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Category Filter Title</Label>
                                    <Input
                                        value={form.data.section_category_title}
                                        onChange={(e) => form.setData('section_category_title', e.target.value)}
                                        placeholder="Browse by Category"
                                        className={inputCls}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category Filter Description</Label>
                                    <Input
                                        value={form.data.section_category_description}
                                        onChange={(e) => form.setData('section_category_description', e.target.value)}
                                        className={inputCls}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Plans Grid Title</Label>
                                    <Input
                                        value={form.data.section_plans_title}
                                        onChange={(e) => form.setData('section_plans_title', e.target.value)}
                                        placeholder="All Internet Plans"
                                        className={inputCls}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Plans Grid Description</Label>
                                    <Input
                                        value={form.data.section_plans_description}
                                        onChange={(e) => form.setData('section_plans_description', e.target.value)}
                                        className={inputCls}
                                    />
                                </div>
                            </div>
                        </SectionCard>
                    )}

                    {/* ═══════ CTA TAB ═══════ */}
                    {activeTab === 'CTA' && (
                        <SectionCard
                            title="Bottom CTA Section"
                            description="The closing call-to-action banner"
                            icon={<Megaphone className="h-4 w-4" />}
                        >
                            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-700">Enable CTA Section</span>
                                    <p className="mt-0.5 text-xs text-muted-foreground">Show or hide the bottom call-to-action banner</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={form.data.cta_section_enabled}
                                    onClick={() => form.setData('cta_section_enabled', !form.data.cta_section_enabled)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isp-primary)] focus-visible:ring-offset-2 ${
                                        form.data.cta_section_enabled ? 'bg-[var(--isp-primary)]' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
                                            form.data.cta_section_enabled ? 'translate-x-5' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </label>
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={form.data.cta_section_title}
                                    onChange={(e) => form.setData('cta_section_title', e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <textarea
                                    rows={2}
                                    value={form.data.cta_section_description}
                                    onChange={(e) => form.setData('cta_section_description', e.target.value)}
                                    className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                />
                            </div>
                            <Separator className="my-1" />
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Primary Text</Label>
                                    <Input value={form.data.cta_section_primary_text} onChange={(e) => form.setData('cta_section_primary_text', e.target.value)} className={inputCls} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Primary URL</Label>
                                    <Input value={form.data.cta_section_primary_url} onChange={(e) => form.setData('cta_section_primary_url', e.target.value)} className={inputCls} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Secondary Text</Label>
                                    <Input value={form.data.cta_section_secondary_text} onChange={(e) => form.setData('cta_section_secondary_text', e.target.value)} className={inputCls} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Secondary URL</Label>
                                    <Input value={form.data.cta_section_secondary_url} onChange={(e) => form.setData('cta_section_secondary_url', e.target.value)} className={inputCls} />
                                </div>
                            </div>
                            <PageImageField
                                label="CTA Background Image"
                                value={form.data.cta_section_background_image}
                                onChange={(v) => form.setData('cta_section_background_image', v)}
                                uploadUrl={adminUrl('/pages/plans/upload')}
                            />
                        </SectionCard>
                    )}

                    {/* ═══════ CURRENCY & SEO TAB ═══════ */}
                    {activeTab === 'Currency & SEO' && (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <SectionCard
                                title="Currency"
                                description="Global currency used for every price on the page"
                                icon={<span className="text-lg font-bold">$</span>}
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Symbol *</Label>
                                        <Input
                                            value={form.data.currency_symbol}
                                            onChange={(e) => form.setData('currency_symbol', e.target.value)}
                                            maxLength={5}
                                            placeholder="$ / ৳ / €"
                                            className={inputCls}
                                        />
                                        {errorFor('currency_symbol') && <p className="text-xs text-destructive">{errorFor('currency_symbol')}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>ISO Code</Label>
                                        <Input
                                            value={form.data.currency_code}
                                            onChange={(e) => form.setData('currency_code', e.target.value.toUpperCase())}
                                            maxLength={3}
                                            placeholder="USD / BDT"
                                            className={inputCls}
                                        />
                                    </div>
                                </div>
                            </SectionCard>

                            <SectionCard
                                title="SEO & Meta"
                                description="Browser title and search-engine snippets"
                                icon={<Search className="h-4 w-4" />}
                            >
                                <div className="space-y-2">
                                    <Label>Meta Title</Label>
                                    <Input
                                        value={form.data.meta_title}
                                        onChange={(e) => form.setData('meta_title', e.target.value)}
                                        maxLength={255}
                                        className={inputCls}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Meta Description</Label>
                                    <textarea
                                        rows={2}
                                        value={form.data.meta_description}
                                        onChange={(e) => form.setData('meta_description', e.target.value)}
                                        className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Meta Keywords (comma separated)</Label>
                                    <Input
                                        value={form.data.meta_keywords}
                                        onChange={(e) => form.setData('meta_keywords', e.target.value)}
                                        className={inputCls}
                                    />
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* ═══════ SUBMIT ═══════ */}
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/50 px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            Changes apply to the public page instantly.
                        </p>
                        <Button type="submit" disabled={form.processing} size="lg" className="min-w-[200px] gap-2">
                            {form.processing ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Save All Settings
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
