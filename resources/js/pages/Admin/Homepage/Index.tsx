import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { LayoutGrid, Edit3, Star, HelpCircle, MapPin, ArrowRight, Settings, Zap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Homepage', href: '/admin/homepage' },
];

interface SectionSetting {
    id: number;
    section_key: string;
    is_active: boolean;
    sort_order: number;
}

interface PageProps {
    settings: SectionSetting[];
}

const sectionConfig: Record<string, { label: string; description: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }> = {
    intro: { label: 'Company Introduction', description: 'Trust section with company overview', icon: Settings },
    technology: { label: 'Technology & Infrastructure', description: 'Network capabilities and tech stack', icon: Settings },
    coverage: { label: 'Coverage Areas', description: 'Service coverage regions', icon: MapPin },
    cta: { label: 'Final CTA', description: 'Bottom conversion section', icon: ArrowRight },
};

export default function HomepageIndex() {
    const { settings, flash } = usePage().props as unknown as PageProps & { flash?: { success?: string } };
    const accent = 'var(--isp-primary)';

    const settingsMap = new Map(settings.map((s) => [s.section_key, s]));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homepage Management" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Homepage Management</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your homepage sections, testimonials, FAQs, and coverage areas.
                    </p>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" /> {flash.success}
                    </div>
                )}

                {/* Section Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(sectionConfig).map(([key, config]) => {
                        const setting = settingsMap.get(key);
                        return (
                            <Link
                                key={key}
                                href={route('admin.homepage.edit', key)}
                                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-[var(--isp-primary)]/30 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${accent} 10%, transparent)` }}>
                                        <config.icon className="h-5 w-5" style={{ color: accent }} />
                                    </div>
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${setting?.is_active !== false ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {setting?.is_active !== false ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <h3 className="mt-3 text-sm font-bold text-gray-900">{config.label}</h3>
                                <p className="mt-1 text-xs text-gray-500">{config.description}</p>
                                <div className="mt-3 flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: accent }}>
                                    Edit Section <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </div>
                            </Link>
                        );
                    })}

                    {/* Intro Features */}
                    <Link
                        href={route('admin.homepage.intro-features')}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-[var(--isp-primary)]/30 hover:shadow-md"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--isp-accent) 10%, transparent)' }}>
                            <Zap className="h-5 w-5" style={{ color: 'var(--isp-accent)' }} />
                        </div>
                        <h3 className="mt-3 text-sm font-bold text-gray-900">Intro Network Features</h3>
                        <p className="mt-1 text-xs text-gray-500">Satellite nodes in the company intro section</p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
                            Manage <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </Link>

                    {/* Testimonials */}
                    <Link
                        href={route('admin.homepage.testimonials')}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-[var(--isp-primary)]/30 hover:shadow-md"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--isp-accent) 10%, transparent)' }}>
                            <Star className="h-5 w-5" style={{ color: 'var(--isp-accent)' }} />
                        </div>
                        <h3 className="mt-3 text-sm font-bold text-gray-900">Testimonials</h3>
                        <p className="mt-1 text-xs text-gray-500">Customer reviews and testimonials</p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
                            Manage <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </Link>

                    {/* FAQs */}
                    <Link
                        href={route('admin.homepage.faqs')}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-[var(--isp-primary)]/30 hover:shadow-md"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--isp-warning, #F59E0B) 10%, transparent)' }}>
                            <HelpCircle className="h-5 w-5" style={{ color: 'var(--isp-warning, #F59E0B)' }} />
                        </div>
                        <h3 className="mt-3 text-sm font-bold text-gray-900">FAQs</h3>
                        <p className="mt-1 text-xs text-gray-500">Frequently asked questions</p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
                            Manage <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </Link>

                    {/* Coverage */}
                    <Link
                        href={route('admin.homepage.coverage')}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-[var(--isp-primary)]/30 hover:shadow-md"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--isp-success, #10B981) 10%, transparent)' }}>
                            <MapPin className="h-5 w-5" style={{ color: 'var(--isp-success, #10B981)' }} />
                        </div>
                        <h3 className="mt-3 text-sm font-bold text-gray-900">Coverage Areas</h3>
                        <p className="mt-1 text-xs text-gray-500">Service coverage regions</p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
                            Manage <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                    </Link>
                </div>

                {/* Info */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
                    <strong>Note:</strong> Featured Plans, Why Choose Us, Statistics, Services, and Partners are managed through their own admin sections.
                    Plans use the <Link href="/admin/plans" className="font-semibold underline">Plans Manager</Link>,
                    Services use the <Link href="/admin/services" className="font-semibold underline">Services Manager</Link>,
                    Statistics and Why Choose Us are managed in <Link href="/admin/pages/about" className="font-semibold underline">About Page</Link>,
                    and Partners/Clients are also in <Link href="/admin/pages/about" className="font-semibold underline">About Page</Link>.
                </div>
            </div>
        </AppLayout>
    );
}
