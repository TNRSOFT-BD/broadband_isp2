import { useAdminUrl } from '@/hooks/use-admin-url';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { LayoutGrid, Edit3, Star, HelpCircle, ArrowRight, Settings, Home, Target, Sparkles, Handshake, ServerCog, Landmark } from 'lucide-react';


interface SectionSetting {
    id: number;
    section_key: string;
    is_active: boolean;
    sort_order: number;
    eyebrow: string | null;
    title: string | null;
}

interface PageProps {
    settings: SectionSetting[];
}

const sectionConfig: Record<string, { description: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; route?: string }> = {
    hero: { description: 'Main hero banner with heading, CTA buttons, and background', icon: Home, route: 'hero-config' },
    intro: { description: 'Trust section with company overview', icon: Settings },
    technology: { description: 'Network capabilities and tech stack', icon: Sparkles },
    testimonials: { description: 'Customer reviews and testimonials', icon: Star, route: 'homepage.testimonials' },
    faqs: { description: 'Frequently asked questions', icon: HelpCircle, route: 'homepage.faqs' },
    partners: { description: 'Our trusted partners and clients', icon: Handshake, route: 'homepage.partners' },
    services: { description: 'Digital services section with background images', icon: ServerCog, route: 'homepage-services.index' },
    why_choose_us: { description: 'Section heading and subtitle for Why Choose Us', icon: Target },
};

export default function HomepageIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Homepage', href: adminUrl('/homepage') },
    ];

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
                        const href = config.route
                            ? (config.route === 'hero-config' ? adminUrl('/hero-config') : route(`admin.${config.route}`))
                            : route('admin.homepage.edit', key);

                        return (
                            <Link
                                key={key}
                                href={href}
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
                                <h3 className="mt-3 text-sm font-bold text-gray-900">{setting?.eyebrow ?? key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</h3>
                                <p className="mt-1 text-xs text-gray-500">{setting?.title ?? config.description}</p>
                                <div className="mt-3 flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: accent }}>
                                    Edit Section <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Payment Partner Section */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${accent} 10%, transparent)` }}>
                                <Landmark className="h-5 w-5" style={{ color: accent }} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Payment Partner</h3>
                                <p className="text-xs text-gray-500">
                                    One active payment partner is displayed above the website footer.
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route('admin.payment-partners.index')}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-[var(--isp-primary)]/30 hover:bg-[var(--isp-primary)]/5 hover:text-[var(--isp-primary)]"
                        >
                            Manage Partners <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>

                {/* Info */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
                    <strong>Note:</strong> Plans, Services, Statistics, and Why Choose Us items are managed in their own sections:
                    <Link href={adminUrl("/plans")} className="font-semibold underline"> Plans</Link>,
                    <Link href={adminUrl("/services")} className="font-semibold underline"> Services</Link>,
                    <Link href={adminUrl("/pages/about")} className="font-semibold underline"> About Page</Link>.
                </div>
            </div>
        </AppLayout>
    );
}
