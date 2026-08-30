import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { ContactPageSettings, OfficeHoursEntry, HelpfulResource, FAQItem } from '@/types/contact';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useAdminUrl } from '@/hooks/use-admin-url';
import {
    CheckCircle2,
    Globe,
    Plus,
    Trash2,
    Sparkles,
    MessageSquare,
    MapPin,
    Clock,
    HelpCircle,
    Search,
    ChevronRight,
    GripVertical,
} from 'lucide-react';
import PageImageField from '@/components/admin/page-image-field';


interface PageProps extends Record<string, unknown> {
    settings: ContactPageSettings;
}

const ICON_OPTIONS = [
    'Phone', 'Mail', 'MessageCircle', 'Headphones', 'MapPin', 'Globe',
    'Clock', 'HelpCircle', 'Users', 'TrendingUp', 'CreditCard', 'Wrench',
    'Wifi', 'ExternalLink', 'Send', 'CheckCircle2', 'Star', 'Shield', 'Zap', 'Heart',
];

const TABS = ['Hero', 'Sections', 'Content', 'FAQ', 'SEO'] as const;

/* ─── Tiny helper components ─── */

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

function ToggleField({
    label,
    checked,
    onChange,
    hint,
}: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    hint?: string;
}) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
            <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isp-primary)] focus-visible:ring-offset-2 ${
                    checked ? 'bg-[var(--isp-primary)]' : 'bg-gray-200'
                }`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</Label>
            {children}
        </div>
    );
}

function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm transition-colors focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
        >
            {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
            ))}
        </select>
    );
}

function EntryCard({
    label,
    onRemove,
    children,
}: {
    label: string;
    onRemove: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="group rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-300" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="rounded-md p-1.5 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
                    title="Remove"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>
            {children}
        </div>
    );
}

/* ─── Main Component ─── */

export default function ContactPageIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Pages', href: '#' },
        { title: 'Contact Page', href: adminUrl('/pages/contact') },
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
        office_hours_entries: (settings.office_hours_entries ?? []) as OfficeHoursEntry[],
        helpful_resources: (settings.helpful_resources ?? []) as HelpfulResource[],
        faq_items: (settings.faq_items ?? []) as FAQItem[],
    });

    const errorFor = (key: string) => errors[key];

    /* ─── Office Hours helpers ─── */
    const addHoursEntry = () =>
        form.setData('office_hours_entries', [
            ...form.data.office_hours_entries,
            { icon: 'Clock', title: '', schedule: '', note: '' },
        ]);
    const updateHoursEntry = (i: number, field: keyof OfficeHoursEntry, value: string) => {
        const u = [...form.data.office_hours_entries];
        u[i] = { ...u[i], [field]: value };
        form.setData('office_hours_entries', u);
    };
    const removeHoursEntry = (i: number) =>
        form.setData('office_hours_entries', form.data.office_hours_entries.filter((_, idx) => idx !== i));

    /* ─── Helpful Resources helpers ─── */
    const addResource = () =>
        form.setData('helpful_resources', [
            ...form.data.helpful_resources,
            { icon: 'HelpCircle', title: '', description: '', href: '' },
        ]);
    const updateResource = (i: number, field: keyof HelpfulResource, value: string) => {
        const u = [...form.data.helpful_resources];
        u[i] = { ...u[i], [field]: value };
        form.setData('helpful_resources', u);
    };
    const removeResource = (i: number) =>
        form.setData('helpful_resources', form.data.helpful_resources.filter((_, idx) => idx !== i));

    /* ─── FAQ helpers ─── */
    const addFaq = () =>
        form.setData('faq_items', [...form.data.faq_items, { question: '', answer: '' }]);
    const updateFaq = (i: number, field: keyof FAQItem, value: string) => {
        const u = [...form.data.faq_items];
        u[i] = { ...u[i], [field]: value };
        form.setData('faq_items', u);
    };
    const removeFaq = (i: number) =>
        form.setData('faq_items', form.data.faq_items.filter((_, idx) => idx !== i));

    const inputCls = 'rounded-lg border-gray-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)]';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Page Settings" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Contact Page</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage every section of the public Contact page in one place.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="gap-2">
                        <a href="/contact" target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" /> View Public Page
                            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
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
                    className="space-y-6"
                >
                    {/* ── Tab Bar ── */}
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
                            <FieldGroup label="Eyebrow Badge">
                                <Input
                                    value={form.data.hero_eyebrow}
                                    onChange={(e) => form.setData('hero_eyebrow', e.target.value)}
                                    placeholder="Get in Touch"
                                    className={inputCls}
                                />
                            </FieldGroup>
                            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
                                <FieldGroup label="Heading">
                                    <Input
                                        value={form.data.hero_title}
                                        onChange={(e) => form.setData('hero_title', e.target.value)}
                                        placeholder="We're Here to Keep You Connected"
                                        className={inputCls}
                                    />
                                    {errorFor('hero_title') && <p className="text-xs text-destructive">{errorFor('hero_title')}</p>}
                                </FieldGroup>
                                <FieldGroup label="Highlighted Word(s)">
                                    <Input
                                        value={form.data.hero_highlight}
                                        onChange={(e) => form.setData('hero_highlight', e.target.value)}
                                        placeholder="Connected"
                                        className={inputCls}
                                    />
                                </FieldGroup>
                            </div>
                            <FieldGroup label="Description">
                                <textarea
                                    rows={3}
                                    value={form.data.hero_description}
                                    onChange={(e) => form.setData('hero_description', e.target.value)}
                                    className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                />
                            </FieldGroup>
                            <PageImageField
                                label="Background Image"
                                value={form.data.hero_background_image}
                                onChange={(v) => form.setData('hero_background_image', v)}
                                uploadUrl={'/admin/pages/contact/upload'}
                            />
                            <Separator className="my-1" />
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call-to-Action Buttons</p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <FieldGroup label="Primary Text">
                                    <Input value={form.data.hero_cta_primary_text} onChange={(e) => form.setData('hero_cta_primary_text', e.target.value)} className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Primary URL">
                                    <Input value={form.data.hero_cta_primary_url} onChange={(e) => form.setData('hero_cta_primary_url', e.target.value)} className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Secondary Text">
                                    <Input value={form.data.hero_cta_secondary_text} onChange={(e) => form.setData('hero_cta_secondary_text', e.target.value)} className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Secondary URL">
                                    <Input value={form.data.hero_cta_secondary_url} onChange={(e) => form.setData('hero_cta_secondary_url', e.target.value)} className={inputCls} />
                                </FieldGroup>
                            </div>
                        </SectionCard>
                    )}

                    {/* ═══════ SECTIONS TAB ═══════ */}
                    {activeTab === 'Sections' && (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <SectionCard
                                title="Contact Form"
                                description="The message submission form"
                                icon={<MessageSquare className="h-4 w-4" />}
                            >
                                <ToggleField label="Show Section" checked={form.data.contact_form_enabled} onChange={(v) => form.setData('contact_form_enabled', v)} />
                                <FieldGroup label="Section Title">
                                    <Input value={form.data.contact_form_title} onChange={(e) => form.setData('contact_form_title', e.target.value)} className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Description">
                                    <Input value={form.data.contact_form_description ?? ''} onChange={(e) => form.setData('contact_form_description', e.target.value)} className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Success Message">
                                    <textarea
                                        rows={2}
                                        value={form.data.contact_form_success_message}
                                        onChange={(e) => form.setData('contact_form_success_message', e.target.value)}
                                        className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                    />
                                </FieldGroup>
                            </SectionCard>

                            <SectionCard
                                title="Office Locations"
                                description="Map and office cards"
                                icon={<MapPin className="h-4 w-4" />}
                            >
                                <ToggleField label="Show Section" checked={form.data.locations_enabled} onChange={(v) => form.setData('locations_enabled', v)} hint="Manage individual locations on the Office Locations page" />
                                <FieldGroup label="Section Title">
                                    <Input value={form.data.locations_title} onChange={(e) => form.setData('locations_title', e.target.value)} className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Description">
                                    <Input value={form.data.locations_description ?? ''} onChange={(e) => form.setData('locations_description', e.target.value)} className={inputCls} />
                                </FieldGroup>
                            </SectionCard>

                            <SectionCard
                                title="Office Hours"
                                description="Support availability time cards"
                                icon={<Clock className="h-4 w-4" />}
                            >
                                <ToggleField label="Show Section" checked={form.data.hours_enabled} onChange={(v) => form.setData('hours_enabled', v)} />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <FieldGroup label="Section Title">
                                        <Input value={form.data.hours_title} onChange={(e) => form.setData('hours_title', e.target.value)} className={inputCls} />
                                    </FieldGroup>
                                    <FieldGroup label="Description">
                                        <Input value={form.data.hours_description ?? ''} onChange={(e) => form.setData('hours_description', e.target.value)} className={inputCls} />
                                    </FieldGroup>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Entries · {form.data.office_hours_entries.length}
                                    </span>
                                    <Button type="button" size="sm" variant="outline" onClick={addHoursEntry} className="gap-1.5">
                                        <Plus className="h-3.5 w-3.5" /> Add
                                    </Button>
                                </div>
                                {form.data.office_hours_entries.length === 0 && (
                                    <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 py-8 text-center">
                                        <Clock className="mx-auto h-8 w-8 text-gray-300" />
                                        <p className="mt-2 text-sm text-gray-400">No entries yet</p>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    {form.data.office_hours_entries.map((entry, i) => (
                                        <EntryCard key={i} index={i} label={`Entry ${i + 1}`} onRemove={() => removeHoursEntry(i)}>
                                            <div className="grid gap-2 sm:grid-cols-2">
                                                <div>
                                                    <Label className="text-xs text-gray-500">Icon</Label>
                                                    <IconSelect value={entry.icon} onChange={(v) => updateHoursEntry(i, 'icon', v)} />
                                                </div>
                                                <div>
                                                    <Label className="text-xs text-gray-500">Title</Label>
                                                    <Input value={entry.title} onChange={(e) => updateHoursEntry(i, 'title', e.target.value)} placeholder="Customer Support" className={inputCls} />
                                                </div>
                                                <div>
                                                    <Label className="text-xs text-gray-500">Schedule</Label>
                                                    <Input value={entry.schedule} onChange={(e) => updateHoursEntry(i, 'schedule', e.target.value)} placeholder="Available 24/7" className={inputCls} />
                                                </div>
                                                <div>
                                                    <Label className="text-xs text-gray-500">Note</Label>
                                                    <Input value={entry.note ?? ''} onChange={(e) => updateHoursEntry(i, 'note', e.target.value)} placeholder="For urgent issues" className={inputCls} />
                                                </div>
                                            </div>
                                        </EntryCard>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* ═══════ CONTENT TAB ═══════ */}
                    {activeTab === 'Content' && (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <SectionCard
                                title="Helpful Resources"
                                description="Quick link cards to key pages"
                                icon={<HelpCircle className="h-4 w-4" />}
                            >
                                <ToggleField label="Show Section" checked={form.data.resources_enabled} onChange={(v) => form.setData('resources_enabled', v)} />
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <FieldGroup label="Section Title">
                                        <Input value={form.data.resources_title} onChange={(e) => form.setData('resources_title', e.target.value)} className={inputCls} />
                                    </FieldGroup>
                                    <FieldGroup label="Description">
                                        <Input value={form.data.resources_description ?? ''} onChange={(e) => form.setData('resources_description', e.target.value)} className={inputCls} />
                                    </FieldGroup>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Resources · {form.data.helpful_resources.length}
                                    </span>
                                    <Button type="button" size="sm" variant="outline" onClick={addResource} className="gap-1.5">
                                        <Plus className="h-3.5 w-3.5" /> Add
                                    </Button>
                                </div>
                                {form.data.helpful_resources.length === 0 && (
                                    <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 py-8 text-center">
                                        <HelpCircle className="mx-auto h-8 w-8 text-gray-300" />
                                        <p className="mt-2 text-sm text-gray-400">No resources yet</p>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    {form.data.helpful_resources.map((resource, i) => (
                                        <EntryCard key={i} index={i} label={`Resource ${i + 1}`} onRemove={() => removeResource(i)}>
                                            <div className="grid gap-2 sm:grid-cols-2">
                                                <div>
                                                    <Label className="text-xs text-gray-500">Icon</Label>
                                                    <IconSelect value={resource.icon} onChange={(v) => updateResource(i, 'icon', v)} />
                                                </div>
                                                <div>
                                                    <Label className="text-xs text-gray-500">Title</Label>
                                                    <Input value={resource.title} onChange={(e) => updateResource(i, 'title', e.target.value)} placeholder="FAQs" className={inputCls} />
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <Label className="text-xs text-gray-500">Description</Label>
                                                    <Input value={resource.description} onChange={(e) => updateResource(i, 'description', e.target.value)} placeholder="Find answers to commonly asked questions." className={inputCls} />
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <Label className="text-xs text-gray-500">Link URL</Label>
                                                    <Input value={resource.href} onChange={(e) => updateResource(i, 'href', e.target.value)} placeholder="/plans" className={inputCls} />
                                                </div>
                                            </div>
                                        </EntryCard>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* ═══════ FAQ TAB ═══════ */}
                    {activeTab === 'FAQ' && (
                        <SectionCard
                            title="FAQ"
                            description="Accordion frequently asked questions"
                            icon={<Search className="h-4 w-4" />}
                        >
                            <ToggleField label="Show Section" checked={form.data.faq_enabled} onChange={(v) => form.setData('faq_enabled', v)} />
                            <div className="grid gap-3 sm:grid-cols-2">
                                <FieldGroup label="Section Title">
                                    <Input value={form.data.faq_title} onChange={(e) => form.setData('faq_title', e.target.value)} className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Description">
                                    <Input value={form.data.faq_description ?? ''} onChange={(e) => form.setData('faq_description', e.target.value)} className={inputCls} />
                                </FieldGroup>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Questions · {form.data.faq_items.length}
                                </span>
                                <Button type="button" size="sm" variant="outline" onClick={addFaq} className="gap-1.5">
                                    <Plus className="h-3.5 w-3.5" /> Add
                                </Button>
                            </div>
                            {form.data.faq_items.length === 0 && (
                                <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 py-8 text-center">
                                    <Search className="mx-auto h-8 w-8 text-gray-300" />
                                    <p className="mt-2 text-sm text-gray-400">No FAQs yet</p>
                                </div>
                            )}
                            <div className="space-y-3">
                                {form.data.faq_items.map((faq, i) => (
                                    <EntryCard key={i} index={i} label={`FAQ ${i + 1}`} onRemove={() => removeFaq(i)}>
                                        <div className="space-y-2">
                                            <div>
                                                <Label className="text-xs text-gray-500">Question</Label>
                                                <Input value={faq.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} placeholder="How can I get a new connection?" className={inputCls} />
                                            </div>
                                            <div>
                                                <Label className="text-xs text-gray-500">Answer</Label>
                                                <textarea
                                                    rows={3}
                                                    value={faq.answer}
                                                    onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                                                    placeholder="You can request a new connection by..."
                                                    className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                                />
                                            </div>
                                        </div>
                                    </EntryCard>
                                ))}
                            </div>
                        </SectionCard>
                    )}

                    {/* ═══════ SEO TAB ═══════ */}
                    {activeTab === 'SEO' && (
                        <SectionCard
                            title="SEO & Meta"
                            description="Browser title and search-engine snippets"
                            icon={<Globe className="h-4 w-4" />}
                        >
                            <FieldGroup label="Meta Title">
                                <Input value={form.data.meta_title} onChange={(e) => form.setData('meta_title', e.target.value)} className={inputCls} />
                            </FieldGroup>
                            <FieldGroup label="Meta Description">
                                <textarea
                                    rows={2}
                                    value={form.data.meta_description}
                                    onChange={(e) => form.setData('meta_description', e.target.value)}
                                    className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                />
                            </FieldGroup>
                            <FieldGroup label="Meta Keywords (comma separated)">
                                <Input value={form.data.meta_keywords} onChange={(e) => form.setData('meta_keywords', e.target.value)} className={inputCls} />
                            </FieldGroup>
                        </SectionCard>
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
