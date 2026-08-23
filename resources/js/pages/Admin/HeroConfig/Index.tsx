import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Hero Config', href: '/admin/hero-config' },
];

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

export default function HeroConfig() {
    const { hero, theme } = usePage().props as { hero: HeroData; theme?: { colors: { primary: string } } };
    const primaryColor = theme?.colors?.primary ?? '#2563EB';

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
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show instant preview
        setPreviewBg(URL.createObjectURL(file));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(route('admin.hero-config.upload'), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.url) {
                form.setData('background_image', result.url);
                setPreviewBg(result.url);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleApplyPrimaryColor = () => {
        form.setData({
            ...form.data,
            badge_color: primaryColor,
            highlight_color: primaryColor,
            cta_primary_bg: primaryColor,
        });
    };

    // Group colors by section
    const sections = [...new Set(colorFields.map((f) => f.section))];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hero Configuration" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
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
                                {/* Badge */}
                                <span
                                    className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
                                    style={{ color: form.data.badge_color, border: `1px solid ${form.data.badge_color}40`, background: `${form.data.badge_color}15` }}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: form.data.badge_color }} />
                                    {form.data.badge_text}
                                </span>

                                {/* Heading */}
                                <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                                    <span style={{ color: form.data.heading_color }}>{form.data.heading_line1} </span>
                                    <span style={{ color: form.data.highlight_color }}>{form.data.heading_highlight}</span>
                                    <br />
                                    <span style={{ color: form.data.heading_color }}>{form.data.heading_line2}</span>
                                </h2>

                                {/* Subtitle */}
                                <p className="mb-6 max-w-lg text-sm" style={{ color: form.data.subtitle_color }}>
                                    {form.data.subtitle}
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex gap-3">
                                    <span
                                        className="inline-flex items-center rounded-full px-6 py-2 text-sm font-semibold"
                                        style={{ background: form.data.cta_primary_bg, color: form.data.cta_primary_text_color }}
                                    >
                                        {form.data.cta_primary_text}
                                    </span>
                                    <span
                                        className="inline-flex items-center rounded-full border px-6 py-2 text-sm font-semibold"
                                        style={{ borderColor: form.data.cta_secondary_border, color: form.data.cta_secondary_text_color }}
                                    >
                                        {form.data.cta_secondary_text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Content Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Settings</CardTitle>
                                <CardDescription>Edit hero text content and links</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Upload Image</Label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {uploading ? 'Uploading...' : 'Upload a JPG, PNG, or WebP image (max 5MB)'}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Or paste Image URL</Label>
                                    <Input
                                        value={form.data.background_image}
                                        onChange={(e) => {
                                            form.setData('background_image', e.target.value);
                                            setImageFile(null);
                                            setPreviewBg(e.target.value);
                                        }}
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label>Badge Text</Label>
                                    <Input
                                        value={form.data.badge_text}
                                        onChange={(e) => form.setData('badge_text', e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label>Heading Line 1</Label>
                                        <Input
                                            value={form.data.heading_line1}
                                            onChange={(e) => form.setData('heading_line1', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Heading Highlight</Label>
                                        <Input
                                            value={form.data.heading_highlight}
                                            onChange={(e) => form.setData('heading_highlight', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Heading Line 2</Label>
                                    <Input
                                        value={form.data.heading_line2}
                                        onChange={(e) => form.setData('heading_line2', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Subtitle</Label>
                                    <textarea
                                        value={form.data.subtitle}
                                        onChange={(e) => form.setData('subtitle', e.target.value)}
                                        rows={3}
                                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label>Primary CTA Text</Label>
                                        <Input
                                            value={form.data.cta_primary_text}
                                            onChange={(e) => form.setData('cta_primary_text', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Primary CTA URL</Label>
                                        <Input
                                            value={form.data.cta_primary_url}
                                            onChange={(e) => form.setData('cta_primary_url', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label>Secondary CTA Text</Label>
                                        <Input
                                            value={form.data.cta_secondary_text}
                                            onChange={(e) => form.setData('cta_secondary_text', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Secondary CTA URL</Label>
                                        <Input
                                            value={form.data.cta_secondary_url}
                                            onChange={(e) => form.setData('cta_secondary_url', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Color Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Color Settings</CardTitle>
                                <CardDescription>Customize colors for each section of the hero</CardDescription>
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
                                            <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">{section}</h4>
                                            <div className="space-y-3">
                                                {fields.map((field) => (
                                                    <div key={field.key} className="flex items-center gap-3">
                                                        <input
                                                            type="color"
                                                            value={form.data[field.key] as string}
                                                            onChange={(e) => form.setData(field.key as string, e.target.value)}
                                                            className="h-9 w-9 cursor-pointer rounded-md border-0 p-0"
                                                        />
                                                        <div className="flex-1">
                                                            <Label className="text-sm font-medium">{field.label}</Label>
                                                            <p className="text-xs text-muted-foreground">{field.description}</p>
                                                        </div>
                                                        <Input
                                                            value={form.data[field.key] as string}
                                                            onChange={(e) => form.setData(field.key as string, e.target.value)}
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
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit" disabled={form.processing} className="min-w-[150px]">
                            {form.processing ? 'Saving...' : 'Save Hero Settings'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
