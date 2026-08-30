import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { CheckCircle2, Type, Palette } from 'lucide-react';
import PageImageField from '@/components/admin/page-image-field';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface HeroData {
    background_image: string | null;
    badge_text: string;
    heading_line1: string;
    heading_highlight: string;
    heading_line2: string;
    subtitle: string;
    cta_primary_text: string;
    cta_primary_url: string;
    cta_secondary_text: string;
    cta_secondary_url: string;
    badge_color: string;
    heading_color: string;
    highlight_color: string;
    subtitle_color: string;
    cta_primary_bg: string;
    cta_primary_text_color: string;
    cta_secondary_border: string;
    cta_secondary_text_color: string;
    feature_card_bg: string;
    feature_card_border: string;
    feature_label_color: string;
    feature_desc_color: string;
    overlay_color: string;
}

const colorFields: { key: keyof HeroData; label: string; description: string; section: string }[] = [
    { key: 'badge_color', label: 'Badge Color', description: 'Badge text & border', section: 'Badge' },
    { key: 'heading_color', label: 'Heading Color', description: 'Main heading text', section: 'Heading' },
    { key: 'highlight_color', label: 'Highlight Color', description: 'Highlighted word gradient', section: 'Heading' },
    { key: 'subtitle_color', label: 'Subtitle Color', description: 'Subtitle text', section: 'Subtitle' },
    { key: 'cta_primary_bg', label: 'Primary CTA BG', description: 'Primary button background', section: 'CTA Buttons' },
    { key: 'cta_primary_text_color', label: 'Primary CTA Text', description: 'Primary button text', section: 'CTA Buttons' },
    { key: 'cta_secondary_border', label: 'Secondary CTA Border', description: 'Secondary button border', section: 'CTA Buttons' },
    { key: 'cta_secondary_text_color', label: 'Secondary CTA Text', description: 'Secondary button text', section: 'CTA Buttons' },
    { key: 'feature_card_bg', label: 'Feature Card BG', description: 'Feature cards background', section: 'Features' },
    { key: 'feature_card_border', label: 'Feature Card Border', description: 'Feature cards border', section: 'Features' },
    { key: 'feature_label_color', label: 'Feature Label Color', description: 'Feature title text', section: 'Features' },
    { key: 'feature_desc_color', label: 'Feature Desc Color', description: 'Feature description text', section: 'Features' },
    { key: 'overlay_color', label: 'Overlay Color', description: 'Dark overlay behind hero', section: 'Background' },
];

const TABS = ['Content', 'Colors'] as const;

export default function HeroConfig() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Hero Config', href: adminUrl('/hero-config') },
    ];

    const { hero, theme } = usePage().props as unknown as { hero: HeroData; theme?: { colors: { primary: string } } };
    const primaryColor = theme?.colors?.primary ?? '#2563EB';

    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Content');

    const form = useForm({
        background_image: hero.background_image ?? '',
        badge_text: hero.badge_text,
        heading_line1: hero.heading_line1,
        heading_highlight: hero.heading_highlight,
        heading_line2: hero.heading_line2,
        subtitle: hero.subtitle,
        cta_primary_text: hero.cta_primary_text,
        cta_primary_url: hero.cta_primary_url,
        cta_secondary_text: hero.cta_secondary_text,
        cta_secondary_url: hero.cta_secondary_url,
        badge_color: hero.badge_color,
        heading_color: hero.heading_color,
        highlight_color: hero.highlight_color,
        subtitle_color: hero.subtitle_color,
        cta_primary_bg: hero.cta_primary_bg,
        cta_primary_text_color: hero.cta_primary_text_color,
        cta_secondary_border: hero.cta_secondary_border,
        cta_secondary_text_color: hero.cta_secondary_text_color,
        feature_card_bg: hero.feature_card_bg,
        feature_card_border: hero.feature_card_border,
        feature_label_color: hero.feature_label_color,
        feature_desc_color: hero.feature_desc_color,
        overlay_color: hero.overlay_color,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(route('admin.hero-config.update'));
    };

    const [previewBg, setPreviewBg] = useState(hero.background_image ?? '');

    const handleApplyPrimaryColor = () => {
        form.setData({
            ...form.data,
            badge_color: primaryColor,
            highlight_color: primaryColor,
            cta_primary_bg: primaryColor,
        });
    };

    const sections = [...new Set(colorFields.map((f) => f.section))];
    const inputCls = 'rounded-lg border-gray-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)]';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hero Configuration" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Hero Section</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Configure the hero banner on the homepage.
                    </p>
                </div>

                {/* Live Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>Preview your hero section changes in real-time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="relative overflow-hidden rounded-xl"
                            style={{ minHeight: '300px', background: `${form.data.overlay_color}ee` }}
                        >
                            {previewBg && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${previewBg})` }}
                                />
                            )}
                            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${form.data.overlay_color}e6, ${form.data.overlay_color}70, ${form.data.overlay_color}f5)` }} />

                            <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 text-center">
                                <span
                                    className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
                                    style={{ color: form.data.badge_color, border: `1px solid ${form.data.badge_color}40`, background: `${form.data.badge_color}15` }}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: form.data.badge_color }} />
                                    {form.data.badge_text}
                                </span>

                                <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                                    <span style={{ color: form.data.heading_color }}>{form.data.heading_line1} </span>
                                    <span style={{ color: form.data.highlight_color }}>{form.data.heading_highlight}</span>
                                    <br />
                                    <span style={{ color: form.data.heading_color }}>{form.data.heading_line2}</span>
                                </h2>

                                <p className="mb-6 max-w-lg text-sm" style={{ color: form.data.subtitle_color }}>
                                    {form.data.subtitle}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {form.data.cta_primary_text && (
                                        <span
                                            className="inline-flex items-center rounded-full px-6 py-2 text-sm font-semibold"
                                            style={{ background: form.data.cta_primary_bg, color: form.data.cta_primary_text_color }}
                                        >
                                            {form.data.cta_primary_text}
                                        </span>
                                    )}
                                    {form.data.cta_secondary_text && (
                                        <span
                                            className="inline-flex items-center rounded-full border px-6 py-2 text-sm font-semibold"
                                            style={{ borderColor: form.data.cta_secondary_border, color: form.data.cta_secondary_text_color }}
                                        >
                                            {form.data.cta_secondary_text}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    {/* ═══════ CONTENT TAB ═══════ */}
                    {activeTab === 'Content' && (
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]">
                                            <Type className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">Content Settings</CardTitle>
                                            <CardDescription className="text-xs">Edit hero text content and links</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <PageImageField
                                        label="Background Image"
                                        value={form.data.background_image}
                                        onChange={(v) => {
                                            form.setData('background_image', v);
                                            setPreviewBg(v);
                                        }}
                                        uploadUrl={'/admin/hero-config/upload'}
                                    />

                                    <Separator className="my-1" />

                                    <div className="space-y-2">
                                        <Label>Badge Text</Label>
                                        <Input value={form.data.badge_text} onChange={(e) => form.setData('badge_text', e.target.value)} className={inputCls} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label>Heading Line 1</Label>
                                            <Input value={form.data.heading_line1} onChange={(e) => form.setData('heading_line1', e.target.value)} className={inputCls} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Heading Highlight</Label>
                                            <Input value={form.data.heading_highlight} onChange={(e) => form.setData('heading_highlight', e.target.value)} className={inputCls} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Heading Line 2</Label>
                                        <Input value={form.data.heading_line2} onChange={(e) => form.setData('heading_line2', e.target.value)} className={inputCls} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Subtitle</Label>
                                        <textarea
                                            value={form.data.subtitle}
                                            onChange={(e) => form.setData('subtitle', e.target.value)}
                                            rows={3}
                                            className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                        />
                                    </div>

                                    <Separator className="my-1" />
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call-to-Action Buttons</p>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label>Primary CTA Text</Label>
                                            <Input value={form.data.cta_primary_text} onChange={(e) => form.setData('cta_primary_text', e.target.value)} className={inputCls} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Primary CTA URL</Label>
                                            <Input value={form.data.cta_primary_url} onChange={(e) => form.setData('cta_primary_url', e.target.value)} className={inputCls} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label>Secondary CTA Text</Label>
                                            <Input value={form.data.cta_secondary_text} onChange={(e) => form.setData('cta_secondary_text', e.target.value)} className={inputCls} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Secondary CTA URL</Label>
                                            <Input value={form.data.cta_secondary_url} onChange={(e) => form.setData('cta_secondary_url', e.target.value)} className={inputCls} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* ═══════ COLORS TAB ═══════ */}
                    {activeTab === 'Colors' && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]">
                                        <Palette className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Color Settings</CardTitle>
                                        <CardDescription className="text-xs">Customize colors for each section of the hero</CardDescription>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleApplyPrimaryColor}
                                        className="gap-2"
                                    >
                                        <span className="inline-block h-3 w-3 rounded-full" style={{ background: primaryColor }} />
                                        Apply Primary Color to Badge, Highlight & CTA
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {sections.map((section) => {
                                    const fields = colorFields.filter((f) => f.section === section);
                                    return (
                                        <div key={section}>
                                            <h4 className="mb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">{section}</h4>
                                            <div className="space-y-3">
                                                {fields.map((field) => (
                                                    <div key={field.key} className="flex items-center gap-3">
                                                        <input
                                                            type="color"
                                                            value={form.data[field.key] as string}
                                                            onChange={(e) => form.setData(field.key as keyof HeroData, e.target.value)}
                                                            className="h-9 w-9 cursor-pointer rounded-md border-0 p-0"
                                                        />
                                                        <div className="flex-1">
                                                            <Label className="text-sm font-medium">{field.label}</Label>
                                                            <p className="text-xs text-muted-foreground">{field.description}</p>
                                                        </div>
                                                        <Input
                                                            value={form.data[field.key] as string}
                                                            onChange={(e) => form.setData(field.key as keyof HeroData, e.target.value)}
                                                            className="w-24 font-mono text-sm"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            {section !== 'Background' && <Separator className="mt-4" />}
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    )}

                    {/* ═══════ SUBMIT ═══════ */}
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/50 px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            Changes apply to the homepage instantly.
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
                                    Save Hero Settings
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
