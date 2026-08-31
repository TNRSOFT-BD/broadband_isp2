import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import { useAdminUrl } from '@/hooks/use-admin-url';
import {
    CheckCircle2,
    Globe,
    Sparkles,
    Users,
    Eye,
    Target,
    Zap,
    Shield,
    Clock,
    Award,
    ChevronRight,
    Image,
    BarChart3,
} from 'lucide-react';


const ICON_OPTIONS = [
    'Phone', 'Mail', 'MessageCircle', 'Headphones', 'MapPin', 'Globe',
    'Clock', 'HelpCircle', 'Users', 'TrendingUp', 'CreditCard', 'Wrench',
    'Wifi', 'ExternalLink', 'Send', 'CheckCircle2', 'Star', 'Shield', 'Zap', 'Heart',
    'Eye', 'Target', 'BookOpen', 'Lock', 'Award', 'Building2', 'Home', 'Server',
    'GraduationCap', 'Landmark', 'BarChart3',
];

interface AboutPageSettings {
    hero_eyebrow: string;
    hero_title: string;
    hero_description: string;
    hero_primary_cta_text: string;
    hero_primary_cta_url: string;
    hero_secondary_cta_text: string;
    hero_secondary_cta_url: string;
    hero_image: string;
    hero_image_alt: string;
    company_eyebrow: string;
    company_title: string;
    company_content: string;
    company_image: string;
    company_image_alt: string;
    vision_title: string;
    vision_description: string;
    vision_icon: string;
    mission_title: string;
    mission_description: string;
    mission_icon: string;
    capabilities_eyebrow: string;
    capabilities_title: string;
    capabilities_description: string;
    capabilities_image: string;
    capabilities_image_alt: string;
    clients_title: string;
    clients_description: string;
    certifications_title: string;
    certifications_description: string;
    cta_eyebrow: string;
    cta_title: string;
    cta_description: string;
    cta_primary_button_text: string;
    cta_primary_button_url: string;
    cta_secondary_button_text: string;
    cta_secondary_button_url: string;
    cta_background_image: string;
    cta_background_image_alt: string;
    hero_enabled: boolean;
    company_enabled: boolean;
    statistics_enabled: boolean;
    vision_mission_enabled: boolean;
    core_values_enabled: boolean;
    timeline_enabled: boolean;
    capabilities_enabled: boolean;
    clients_enabled: boolean;
    certifications_enabled: boolean;
    why_choose_us_enabled: boolean;
    cta_enabled: boolean;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
}

interface PageProps extends Record<string, unknown> {
    settings: AboutPageSettings;
    statisticsCount: number;
    coreValuesCount: number;
    milestonesCount: number;
    capabilitiesCount: number;
    clientsCount: number;
    certificationsCount: number;
    whyChooseUsCount: number;
}

const TABS = ['Hero', 'Company', 'Vision & Mission', 'Capabilities', 'Repeatable Content', 'CTA', 'SEO'] as const;

const inputCls = 'rounded-lg border-gray-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)]';

function SectionCard({
    title, description, icon, accent, children,
}: {
    title: string; description: string; icon: React.ReactNode; accent?: boolean; children: React.ReactNode;
}) {
    return (
        <Card className={`transition-shadow duration-200 hover:shadow-md ${accent ? 'border-[var(--isp-primary)]/20' : ''}`}>
            <CardHeader className="px-4 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{
                        background: accent ? 'color-mix(in srgb, var(--isp-primary) 12%, transparent)' : 'color-mix(in srgb, var(--isp-primary) 6%, transparent)',
                        color: 'var(--isp-primary)',
                    }}>{icon}</div>
                    <div className="min-w-0">
                        <CardTitle className="text-base">{title}</CardTitle>
                        <CardDescription className="text-xs">{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">{children}</CardContent>
        </Card>
    );
}

function ToggleField({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
            <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
            </div>
            <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--isp-primary)] focus-visible:ring-offset-2 ${checked ? 'bg-[var(--isp-primary)]' : 'bg-gray-200'}`}>
                <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
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
        <select value={value} onChange={(e) => onChange(e.target.value)}
            className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm transition-colors focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]">
            {ICON_OPTIONS.map((icon) => (<option key={icon} value={icon}>{icon}</option>))}
        </select>
    );
}

function ImageUploadField({ label, value, onChange, altValue, onAltChange, placeholder }: {
    label: string; value: string; onChange: (v: string) => void;
    altValue?: string; onAltChange?: (v: string) => void; placeholder?: string;
}) {
    const MAX_SIZE_BYTES = 1024 * 1024; // 1 MB
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        setUploadError(null);

        if (file.size > MAX_SIZE_BYTES) {
            setUploadError('Image must not be larger than 1 MB.');
            return;
        }

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/admin/pages/about/upload', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: formData,
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.url) {
                onChange(result.url);
                setPreview(result.url);
            } else {
                setPreview(value);
                setUploadError(
                    result?.errors?.image?.[0] ?? result?.message ?? 'Upload failed. Please try again.',
                );
            }
        } catch {
            setPreview(value);
            setUploadError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleUrlChange = (url: string) => {
        onChange(url);
        setPreview(url);
        setUploadError(null);
    };

    return (
        <FieldGroup label={label}>
            <div className="space-y-2">
                <label
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-2.5 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50"
                    style={{
                        borderColor: 'color-mix(in srgb, var(--isp-primary) 30%, transparent)',
                        background: 'color-mix(in srgb, var(--isp-primary) 4%, transparent)',
                        color: 'var(--isp-primary)',
                    }}
                >
                    <Image className="h-4 w-4 shrink-0" />
                    <span className="truncate font-medium">{uploading ? 'Uploading...' : 'Click to upload image'}</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="sr-only"
                        aria-label={`Upload ${label}`}
                    />
                </label>
                {uploadError ? (
                    <p className="text-xs font-medium text-destructive">{uploadError}</p>
                ) : (
                    <p className="text-xs text-muted-foreground">{uploading ? 'Uploading...' : 'JPG, PNG, or WebP (max 1 MB) — or paste a URL below'}</p>
                )}
                <Input value={value} onChange={(e) => handleUrlChange(e.target.value)} placeholder={placeholder ?? 'https://...'} className={inputCls} />
                {onAltChange && altValue !== undefined && (
                    <Input value={altValue} onChange={(e) => onAltChange(e.target.value)} placeholder="Alt text" className={inputCls} />
                )}
                {preview && !uploadError && (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <img src={preview} alt={altValue ?? ''} className="h-40 w-full object-cover" />
                    </div>
                )}
            </div>
        </FieldGroup>
    );
}

export default function AboutUsIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Pages', href: '#' },
        { title: 'About Page', href: adminUrl('/pages/about') },
    ];

    const { settings, statisticsCount, coreValuesCount, milestonesCount, capabilitiesCount, clientsCount, certificationsCount, whyChooseUsCount } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Hero');

    const form = useForm({
        hero_eyebrow: settings.hero_eyebrow ?? '',
        hero_title: settings.hero_title ?? '',
        hero_description: settings.hero_description ?? '',
        hero_primary_cta_text: settings.hero_primary_cta_text ?? '',
        hero_primary_cta_url: settings.hero_primary_cta_url ?? '',
        hero_secondary_cta_text: settings.hero_secondary_cta_text ?? '',
        hero_secondary_cta_url: settings.hero_secondary_cta_url ?? '',
        hero_image: settings.hero_image ?? '',
        hero_image_alt: settings.hero_image_alt ?? '',
        company_eyebrow: settings.company_eyebrow ?? '',
        company_title: settings.company_title ?? '',
        company_content: settings.company_content ?? '',
        company_image: settings.company_image ?? '',
        company_image_alt: settings.company_image_alt ?? '',
        vision_title: settings.vision_title ?? '',
        vision_description: settings.vision_description ?? '',
        vision_icon: settings.vision_icon ?? 'Eye',
        mission_title: settings.mission_title ?? '',
        mission_description: settings.mission_description ?? '',
        mission_icon: settings.mission_icon ?? 'Target',
        capabilities_eyebrow: settings.capabilities_eyebrow ?? '',
        capabilities_title: settings.capabilities_title ?? '',
        capabilities_description: settings.capabilities_description ?? '',
        capabilities_image: settings.capabilities_image ?? '',
        capabilities_image_alt: settings.capabilities_image_alt ?? '',
        clients_title: settings.clients_title ?? '',
        clients_description: settings.clients_description ?? '',
        certifications_title: settings.certifications_title ?? '',
        certifications_description: settings.certifications_description ?? '',
        cta_eyebrow: settings.cta_eyebrow ?? '',
        cta_title: settings.cta_title ?? '',
        cta_description: settings.cta_description ?? '',
        cta_primary_button_text: settings.cta_primary_button_text ?? '',
        cta_primary_button_url: settings.cta_primary_button_url ?? '',
        cta_secondary_button_text: settings.cta_secondary_button_text ?? '',
        cta_secondary_button_url: settings.cta_secondary_button_url ?? '',
        cta_background_image: settings.cta_background_image ?? '',
        cta_background_image_alt: settings.cta_background_image_alt ?? '',
        hero_enabled: settings.hero_enabled ?? true,
        company_enabled: settings.company_enabled ?? true,
        statistics_enabled: settings.statistics_enabled ?? true,
        vision_mission_enabled: settings.vision_mission_enabled ?? true,
        core_values_enabled: settings.core_values_enabled ?? true,
        timeline_enabled: settings.timeline_enabled ?? true,
        capabilities_enabled: settings.capabilities_enabled ?? true,
        clients_enabled: settings.clients_enabled ?? true,
        certifications_enabled: settings.certifications_enabled ?? true,
        why_choose_us_enabled: settings.why_choose_us_enabled ?? true,
        cta_enabled: settings.cta_enabled ?? true,
        meta_title: settings.meta_title ?? '',
        meta_description: settings.meta_description ?? '',
        meta_keywords: settings.meta_keywords ?? '',
    });

    const sections = [
        { title: 'Hero Section', description: 'Dark futuristic banner at the top', icon: <Sparkles className="h-4 w-4" />, enabled: form.data.hero_enabled, count: null, editUrl: null },
        { title: 'Company Introduction', description: 'Manage company story and introduction', icon: <Users className="h-4 w-4" />, enabled: form.data.company_enabled, count: null, editUrl: null },
        { title: 'Statistics', description: 'Manage company achievements and statistics', icon: <BarChart3 className="h-4 w-4" />, enabled: form.data.statistics_enabled, count: statisticsCount, editUrl: adminUrl('/pages/about/statistics') },
        { title: 'Vision & Mission', description: 'Manage company vision and mission', icon: <Eye className="h-4 w-4" />, enabled: form.data.vision_mission_enabled, count: null, editUrl: null },
        { title: 'Core Values', description: 'Manage company principles and values', icon: <Shield className="h-4 w-4" />, enabled: form.data.core_values_enabled, count: coreValuesCount, editUrl: adminUrl('/pages/about/core-values') },
        { title: 'Company Journey', description: 'Manage timeline milestones', icon: <Clock className="h-4 w-4" />, enabled: form.data.timeline_enabled, count: milestonesCount, editUrl: adminUrl('/pages/about/milestones') },
        { title: 'Network Capabilities', description: 'Manage network and service capabilities', icon: <Zap className="h-4 w-4" />, enabled: form.data.capabilities_enabled, count: capabilitiesCount, editUrl: adminUrl('/pages/about/capabilities') },
        { title: 'Clients', description: 'Manage client organizations and partners', icon: <Users className="h-4 w-4" />, enabled: form.data.clients_enabled, count: clientsCount, editUrl: adminUrl('/pages/about/clients') },
        { title: 'Certifications', description: 'Manage certifications and compliance', icon: <Award className="h-4 w-4" />, enabled: form.data.certifications_enabled, count: certificationsCount, editUrl: adminUrl('/pages/about/certifications') },
        { title: 'Why Choose Us', description: 'Manage reasons to choose your company', icon: <Target className="h-4 w-4" />, enabled: form.data.why_choose_us_enabled, count: whyChooseUsCount, editUrl: adminUrl('/pages/about/why-choose-us') },
        { title: 'Call to Action', description: 'Final CTA section at the bottom', icon: <Zap className="h-4 w-4" />, enabled: form.data.cta_enabled, count: null, editUrl: null },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Page" />
            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">About Us Page</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage all content displayed on your public About Us page.</p>
                    </div>
                    <Button asChild variant="outline" className="w-full gap-2 sm:w-auto">
                        <a href="/about" target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" /> Preview Page <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                        </a>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" /> {flash.success}
                    </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); form.put(route('admin.about-us.update')); }} className="space-y-6">
                    {/* Tab Bar */}
                    <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-white p-2">
                        {TABS.map((tab) => (
                            <button key={tab} type="button" onClick={() => setActiveTab(tab)} aria-current={activeTab === tab}
                                className={cn('rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                                    activeTab === tab ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                                )}>{tab}</button>
                        ))}
                    </div>

                    {/* ═══════ HERO TAB ═══════ */}
                    {activeTab === 'Hero' && (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <SectionCard title="Hero Section" description="Dark futuristic banner at the top" icon={<Sparkles className="h-4 w-4" />} accent>
                                <FieldGroup label="Eyebrow Badge">
                                    <Input value={form.data.hero_eyebrow} onChange={(e) => form.setData('hero_eyebrow', e.target.value)} placeholder="ABOUT OUR COMPANY" className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Main Heading">
                                    <Input value={form.data.hero_title} onChange={(e) => form.setData('hero_title', e.target.value)} placeholder="Connecting People, Businesses & Possibilities" className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Description">
                                    <textarea rows={3} value={form.data.hero_description} onChange={(e) => form.setData('hero_description', e.target.value)}
                                        className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" />
                                </FieldGroup>
                                <Separator className="my-1" />
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call-to-Action Buttons</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <FieldGroup label="Primary Text"><Input value={form.data.hero_primary_cta_text} onChange={(e) => form.setData('hero_primary_cta_text', e.target.value)} className={inputCls} /></FieldGroup>
                                    <FieldGroup label="Primary URL"><Input value={form.data.hero_primary_cta_url} onChange={(e) => form.setData('hero_primary_cta_url', e.target.value)} className={inputCls} /></FieldGroup>
                                    <FieldGroup label="Secondary Text"><Input value={form.data.hero_secondary_cta_text} onChange={(e) => form.setData('hero_secondary_cta_text', e.target.value)} className={inputCls} /></FieldGroup>
                                    <FieldGroup label="Secondary URL"><Input value={form.data.hero_secondary_cta_url} onChange={(e) => form.setData('hero_secondary_cta_url', e.target.value)} className={inputCls} /></FieldGroup>
                                </div>
                            </SectionCard>
                            <div className="flex flex-col gap-6">
                                <SectionCard title="Hero Image" description="Background image for the hero section" icon={<Image className="h-4 w-4" />}>
                                    <ImageUploadField
                                        label="Hero Image"
                                        value={form.data.hero_image}
                                        onChange={(v) => form.setData('hero_image', v)}
                                        altValue={form.data.hero_image_alt}
                                        onAltChange={(v) => form.setData('hero_image_alt', v)}
                                    />
                                </SectionCard>
                                <SectionCard title="Section Visibility" description="Toggle hero section visibility" icon={<Eye className="h-4 w-4" />}>
                                    <ToggleField label="Show Hero Section" checked={form.data.hero_enabled} onChange={(v) => form.setData('hero_enabled', v)} hint="Show or hide the hero banner" />
                                </SectionCard>
                            </div>
                        </div>
                    )}

                    {/* ═══════ COMPANY TAB ═══════ */}
                    {activeTab === 'Company' && (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <SectionCard title="Company Introduction" description="Manage company story and introduction" icon={<Users className="h-4 w-4" />}>
                                <FieldGroup label="Eyebrow">
                                    <Input value={form.data.company_eyebrow} onChange={(e) => form.setData('company_eyebrow', e.target.value)} placeholder="Who We Are" className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Title (optional)">
                                    <Input value={form.data.company_title ?? ''} onChange={(e) => form.setData('company_title', e.target.value)} className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Content">
                                    <textarea rows={8} value={form.data.company_content ?? ''} onChange={(e) => form.setData('company_content', e.target.value)}
                                        className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" />
                                </FieldGroup>
                            </SectionCard>
                            <div className="flex flex-col gap-6">
                                <SectionCard title="Company Image" description="Featured image for the company section" icon={<Image className="h-4 w-4" />}>
                                    <ImageUploadField
                                        label="Company Image"
                                        value={form.data.company_image ?? ''}
                                        onChange={(v) => form.setData('company_image', v)}
                                        altValue={form.data.company_image_alt ?? ''}
                                        onAltChange={(v) => form.setData('company_image_alt', v)}
                                    />
                                </SectionCard>
                                <SectionCard title="Section Visibility" description="Toggle company section visibility" icon={<Eye className="h-4 w-4" />}>
                                    <ToggleField label="Show Company Section" checked={form.data.company_enabled} onChange={(v) => form.setData('company_enabled', v)} />
                                </SectionCard>
                            </div>
                        </div>
                    )}

                    {/* ═══════ VISION & MISSION TAB ═══════ */}
                    {activeTab === 'Vision & Mission' && (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <SectionCard title="Vision" description="Company vision statement" icon={<Eye className="h-4 w-4" />} accent>
                                <FieldGroup label="Title"><Input value={form.data.vision_title} onChange={(e) => form.setData('vision_title', e.target.value)} className={inputCls} /></FieldGroup>
                                <FieldGroup label="Description"><textarea rows={4} value={form.data.vision_description ?? ''} onChange={(e) => form.setData('vision_description', e.target.value)}
                                    className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" /></FieldGroup>
                                <FieldGroup label="Icon"><IconSelect value={form.data.vision_icon} onChange={(v) => form.setData('vision_icon', v)} /></FieldGroup>
                            </SectionCard>
                            <SectionCard title="Mission" description="Company mission statement" icon={<Target className="h-4 w-4" />} accent>
                                <FieldGroup label="Title"><Input value={form.data.mission_title} onChange={(e) => form.setData('mission_title', e.target.value)} className={inputCls} /></FieldGroup>
                                <FieldGroup label="Description"><textarea rows={4} value={form.data.mission_description ?? ''} onChange={(e) => form.setData('mission_description', e.target.value)}
                                    className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" /></FieldGroup>
                                <FieldGroup label="Icon"><IconSelect value={form.data.mission_icon} onChange={(v) => form.setData('mission_icon', v)} /></FieldGroup>
                            </SectionCard>
                            <div className="xl:col-span-2">
                                <SectionCard title="Section Visibility" description="Toggle vision & mission section visibility" icon={<Eye className="h-4 w-4" />}>
                                    <ToggleField label="Show Vision & Mission Section" checked={form.data.vision_mission_enabled} onChange={(v) => form.setData('vision_mission_enabled', v)} />
                                </SectionCard>
                            </div>
                        </div>
                    )}

                    {/* ═══════ CAPABILITIES TAB ═══════ */}
                    {activeTab === 'Capabilities' && (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <SectionCard title="Network Capabilities" description="Manage network and service capabilities section" icon={<Zap className="h-4 w-4" />} accent>
                                <FieldGroup label="Eyebrow">
                                    <Input value={form.data.capabilities_eyebrow} onChange={(e) => form.setData('capabilities_eyebrow', e.target.value)} placeholder="Our Capabilities" className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Title">
                                    <Input value={form.data.capabilities_title} onChange={(e) => form.setData('capabilities_title', e.target.value)} placeholder="Network Capabilities" className={inputCls} />
                                </FieldGroup>
                                <FieldGroup label="Description">
                                    <textarea rows={3} value={form.data.capabilities_description ?? ''} onChange={(e) => form.setData('capabilities_description', e.target.value)}
                                        className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" />
                                </FieldGroup>
                                <Button asChild className="mt-2 w-full gap-1.5" style={{ background: 'var(--isp-primary)' }}>
                                    <Link href={adminUrl('/pages/about/capabilities')}>Manage Features →</Link>
                                </Button>
                            </SectionCard>
                            <div className="flex flex-col gap-6">
                                <SectionCard title="Capabilities Image" description="Featured image for the capabilities section" icon={<Image className="h-4 w-4" />}>
                                    <ImageUploadField
                                        label="Capabilities Image"
                                        value={form.data.capabilities_image ?? ''}
                                        onChange={(v) => form.setData('capabilities_image', v)}
                                        altValue={form.data.capabilities_image_alt ?? ''}
                                        onAltChange={(v) => form.setData('capabilities_image_alt', v)}
                                    />
                                </SectionCard>
                                <SectionCard title="Section Visibility" description="Toggle capabilities section visibility" icon={<Eye className="h-4 w-4" />}>
                                    <ToggleField label="Show Capabilities Section" checked={form.data.capabilities_enabled} onChange={(v) => form.setData('capabilities_enabled', v)} />
                                </SectionCard>
                            </div>
                        </div>
                    )}

                    {/* ═══════ REPEATABLE CONTENT TAB ═══════ */}
                    {activeTab === 'Repeatable Content' && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Add, edit, or remove items for each section.</p>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {sections.filter(s => s.editUrl).map((section) => (
                                    <Card key={section.title} className="transition-shadow duration-200 hover:shadow-md">
                                        <CardContent className="flex items-center justify-between gap-3 p-4">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                                    style={{ background: 'color-mix(in srgb, var(--isp-primary) 6%, transparent)', color: 'var(--isp-primary)' }}>
                                                    {section.icon}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium">{section.title}</p>
                                                    <p className="text-xs text-muted-foreground">{section.count} items</p>
                                                </div>
                                            </div>
                                            <Button asChild variant="outline" size="sm" className="shrink-0">
                                                <Link href={section.editUrl!}>Manage</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ═══════ CTA TAB ═══════ */}
                    {activeTab === 'CTA' && (
                        <SectionCard title="Final Call to Action" description="The closing call-to-action banner" icon={<Zap className="h-4 w-4" />} accent>
                            <ToggleField label="Show CTA Section" checked={form.data.cta_enabled} onChange={(v) => form.setData('cta_enabled', v)} />
                            <FieldGroup label="Eyebrow"><Input value={form.data.cta_eyebrow ?? ''} onChange={(e) => form.setData('cta_eyebrow', e.target.value)} className={inputCls} /></FieldGroup>
                            <FieldGroup label="Title"><Input value={form.data.cta_title} onChange={(e) => form.setData('cta_title', e.target.value)} className={inputCls} /></FieldGroup>
                            <FieldGroup label="Description"><textarea rows={2} value={form.data.cta_description ?? ''} onChange={(e) => form.setData('cta_description', e.target.value)}
                                className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" /></FieldGroup>
                            <Separator className="my-1" />
                            <div className="grid gap-3 sm:grid-cols-2">
                                <FieldGroup label="Primary Button Text"><Input value={form.data.cta_primary_button_text} onChange={(e) => form.setData('cta_primary_button_text', e.target.value)} className={inputCls} /></FieldGroup>
                                <FieldGroup label="Primary Button URL"><Input value={form.data.cta_primary_button_url} onChange={(e) => form.setData('cta_primary_button_url', e.target.value)} className={inputCls} /></FieldGroup>
                                <FieldGroup label="Secondary Button Text"><Input value={form.data.cta_secondary_button_text} onChange={(e) => form.setData('cta_secondary_button_text', e.target.value)} className={inputCls} /></FieldGroup>
                                <FieldGroup label="Secondary Button URL"><Input value={form.data.cta_secondary_button_url} onChange={(e) => form.setData('cta_secondary_button_url', e.target.value)} className={inputCls} /></FieldGroup>
                            </div>
                            <ImageUploadField
                                label="Background Image"
                                value={form.data.cta_background_image ?? ''}
                                onChange={(v) => form.setData('cta_background_image', v)}
                                altValue={form.data.cta_background_image_alt ?? ''}
                                onAltChange={(v) => form.setData('cta_background_image_alt', v)}
                            />
                        </SectionCard>
                    )}

                    {/* ═══════ SEO TAB ═══════ */}
                    {activeTab === 'SEO' && (
                        <SectionCard title="SEO & Meta" description="Browser title and search-engine snippets" icon={<Globe className="h-4 w-4" />}>
                            <FieldGroup label="Meta Title"><Input value={form.data.meta_title} onChange={(e) => form.setData('meta_title', e.target.value)} className={inputCls} /></FieldGroup>
                            <FieldGroup label="Meta Description"><textarea rows={2} value={form.data.meta_description} onChange={(e) => form.setData('meta_description', e.target.value)}
                                className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]" /></FieldGroup>
                            <FieldGroup label="Meta Keywords (comma separated)"><Input value={form.data.meta_keywords} onChange={(e) => form.setData('meta_keywords', e.target.value)} className={inputCls} /></FieldGroup>
                        </SectionCard>
                    )}

                    {/* ═══════ SUBMIT ═══════ */}
                    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
                        <p className="text-center text-sm text-muted-foreground sm:text-left">Changes apply to the public page instantly.</p>
                        <Button type="submit" disabled={form.processing} size="lg" className="w-full shrink-0 gap-2 sm:w-auto sm:min-w-[200px]">
                            {form.processing ? (<><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Saving...</>) : (<><CheckCircle2 className="h-4 w-4" /> Save All Settings</>)}
                        </Button>
                    </div>
                </form>


            </div>
        </AppLayout>
    );
}
