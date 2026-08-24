import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { ContactPageSettings } from '@/types/contact';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Globe } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Pages', href: '#' },
    { title: 'Contact Page', href: '/admin/pages/contact' },
];

interface PageProps extends Record<string, unknown> {
    settings: ContactPageSettings;
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

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3">
            <span className="text-sm font-medium">{label}</span>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 accent-[var(--isp-primary)]"
            />
        </label>
    );
}

export default function ContactPageIndex() {
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
        hero_background_image: settings.hero_background_image ?? '',
        hero_cta_primary_text: settings.hero_cta_primary_text ?? '',
        hero_cta_primary_url: settings.hero_cta_primary_url ?? '',
        hero_cta_secondary_text: settings.hero_cta_secondary_text ?? '',
        hero_cta_secondary_url: settings.hero_cta_secondary_url ?? '',
        quick_contact_enabled: settings.quick_contact_enabled ?? true,
        quick_contact_title: settings.quick_contact_title ?? '',
        quick_contact_description: settings.quick_contact_description ?? '',
        contact_form_enabled: settings.contact_form_enabled ?? true,
        contact_form_title: settings.contact_form_title ?? '',
        contact_form_description: settings.contact_form_description ?? '',
        contact_form_success_message: settings.contact_form_success_message ?? '',
        locations_enabled: settings.locations_enabled ?? true,
        locations_title: settings.locations_title ?? '',
        locations_description: settings.locations_description ?? '',
        hours_enabled: settings.hours_enabled ?? true,
        hours_title: settings.hours_title ?? '',
        hours_description: settings.hours_description ?? '',
        resources_enabled: settings.resources_enabled ?? true,
        resources_title: settings.resources_title ?? '',
        resources_description: settings.resources_description ?? '',
        faq_enabled: settings.faq_enabled ?? true,
        faq_title: settings.faq_title ?? '',
        faq_description: settings.faq_description ?? '',
        meta_title: settings.meta_title ?? '',
        meta_description: settings.meta_description ?? '',
        meta_keywords: settings.meta_keywords ?? '',
    });

    const errorFor = (key: string) => errors[key];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Page Settings" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Contact Page Content</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Edit the global content shown on the public Contact page.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <a href="/contact" target="_blank" rel="noopener noreferrer">
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
                        form.put(route('admin.contact-page'));
                    }}
                    className="grid gap-6 xl:grid-cols-2"
                >
                    {/* Hero Section */}
                    <SectionCard title="Hero Section" description="The dark futuristic banner at the top of the page.">
                        <div className="space-y-2">
                            <Label htmlFor="hero_eyebrow">Eyebrow Badge</Label>
                            <Input id="hero_eyebrow" value={form.data.hero_eyebrow} onChange={(e) => form.setData('hero_eyebrow', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero_title">Heading</Label>
                            <Input id="hero_title" value={form.data.hero_title} onChange={(e) => form.setData('hero_title', e.target.value)} />
                            {errorFor('hero_title') && <p className="text-xs text-destructive">{errorFor('hero_title')}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero_highlight">Highlighted Word(s)</Label>
                            <Input id="hero_highlight" value={form.data.hero_highlight} onChange={(e) => form.setData('hero_highlight', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero_description">Description</Label>
                            <textarea
                                id="hero_description"
                                rows={3}
                                value={form.data.hero_description}
                                onChange={(e) => form.setData('hero_description', e.target.value)}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero_background_image">Background Image URL</Label>
                            <Input id="hero_background_image" value={form.data.hero_background_image} onChange={(e) => form.setData('hero_background_image', e.target.value)} />
                        </div>
                        <Separator />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Primary Button Text</Label>
                                <Input value={form.data.hero_cta_primary_text} onChange={(e) => form.setData('hero_cta_primary_text', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Primary Button URL</Label>
                                <Input value={form.data.hero_cta_primary_url} onChange={(e) => form.setData('hero_cta_primary_url', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Secondary Button Text</Label>
                                <Input value={form.data.hero_cta_secondary_text} onChange={(e) => form.setData('hero_cta_secondary_text', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Secondary Button URL</Label>
                                <Input value={form.data.hero_cta_secondary_url} onChange={(e) => form.setData('hero_cta_secondary_url', e.target.value)} />
                            </div>
                        </div>
                    </SectionCard>

                    {/* Section Toggles */}
                    <div className="flex flex-col gap-6">
                        <SectionCard title="Quick Contact Section" description="Contact method cards below the hero.">
                            <ToggleField label="Enabled" checked={form.data.quick_contact_enabled} onChange={(v) => form.setData('quick_contact_enabled', v)} />
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input value={form.data.quick_contact_title} onChange={(e) => form.setData('quick_contact_title', e.target.value)} />
                            </div>
                        </SectionCard>

                        <SectionCard title="Contact Form Section" description="The contact form area.">
                            <ToggleField label="Enabled" checked={form.data.contact_form_enabled} onChange={(v) => form.setData('contact_form_enabled', v)} />
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input value={form.data.contact_form_title} onChange={(e) => form.setData('contact_form_title', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Success Message</Label>
                                <textarea
                                    rows={2}
                                    value={form.data.contact_form_success_message}
                                    onChange={(e) => form.setData('contact_form_success_message', e.target.value)}
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                            </div>
                        </SectionCard>

                        <SectionCard title="Office Locations Section" description="Map and office list.">
                            <ToggleField label="Enabled" checked={form.data.locations_enabled} onChange={(v) => form.setData('locations_enabled', v)} />
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input value={form.data.locations_title} onChange={(e) => form.setData('locations_title', e.target.value)} />
                            </div>
                        </SectionCard>

                        <SectionCard title="Office Hours Section" description="Support availability times.">
                            <ToggleField label="Enabled" checked={form.data.hours_enabled} onChange={(v) => form.setData('hours_enabled', v)} />
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input value={form.data.hours_title} onChange={(e) => form.setData('hours_title', e.target.value)} />
                            </div>
                        </SectionCard>

                        <SectionCard title="Helpful Resources Section" description="Quick links to key pages.">
                            <ToggleField label="Enabled" checked={form.data.resources_enabled} onChange={(v) => form.setData('resources_enabled', v)} />
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input value={form.data.resources_title} onChange={(e) => form.setData('resources_title', e.target.value)} />
                            </div>
                        </SectionCard>

                        <SectionCard title="FAQ Section" description="Accordion FAQs.">
                            <ToggleField label="Enabled" checked={form.data.faq_enabled} onChange={(v) => form.setData('faq_enabled', v)} />
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input value={form.data.faq_title} onChange={(e) => form.setData('faq_title', e.target.value)} />
                            </div>
                        </SectionCard>
                    </div>

                    {/* SEO */}
                    <SectionCard title="SEO & Meta" description="Browser title and search-engine snippets.">
                        <div className="space-y-2">
                            <Label>Meta Title</Label>
                            <Input value={form.data.meta_title} onChange={(e) => form.setData('meta_title', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Meta Description</Label>
                            <textarea
                                rows={2}
                                value={form.data.meta_description}
                                onChange={(e) => form.setData('meta_description', e.target.value)}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Meta Keywords (comma separated)</Label>
                            <Input value={form.data.meta_keywords} onChange={(e) => form.setData('meta_keywords', e.target.value)} />
                        </div>
                    </SectionCard>

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
