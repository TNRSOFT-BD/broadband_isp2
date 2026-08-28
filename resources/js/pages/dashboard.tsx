import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    CreditCard,
    Tv,
    MessageSquare,
    MapPin,
    ArrowRight,
    LayoutDashboard,
    Zap,
    Eye,
    CheckCircle2,
    AlertCircle,
    Star,
    Home,
    Settings,
    FileText,
    PhoneCall,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
];

interface DashboardStats {
    plans: { total: number; active: number; featured: number; categories: number };
    services: { total: number; active: number };
    messages: { total: number; new: number; in_progress: number; resolved: number };
    locations: { total: number; active: number };
    hero_configured: boolean;
    site_name: string | null;
}

interface RecentMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    status: string;
    inquiry_type: string | null;
    created_at: string;
}

interface RecentPlan {
    id: number;
    name: string;
    speed: string;
    monthly_price: string;
    is_active: boolean;
    is_featured: boolean;
    category: string | null;
    created_at: string;
}

interface PageProps {
    stats: DashboardStats;
    recentMessages: RecentMessage[];
    recentPlans: RecentPlan[];
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    new: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
    read: { bg: 'bg-gray-50 dark:bg-gray-800/20', text: 'text-gray-700 dark:text-gray-400', dot: 'bg-gray-500' },
    in_progress: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
    replied: { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-700 dark:text-cyan-400', dot: 'bg-cyan-500' },
    resolved: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
    archived: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', dot: 'bg-purple-500' },
};

export default function Dashboard() {
    const { stats, recentMessages, recentPlans } = usePage().props as unknown as PageProps;
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';
    const userPermissions = (usePage().props as any).auth?.user?.permissions ?? [];
    const adminPrefix = (usePage().props as any).admin_prefix ?? 'admin';

    function hasPerm(perm: string): boolean {
        return userPermissions.includes(perm);
    }

    function url(path: string): string {
        if (adminPrefix === 'admin') return path;
        if (path.startsWith('/admin/')) return '/' + adminPrefix + path.slice(6);
        return path;
    }

    const statCards = [
        {
            label: 'Total Plans',
            value: stats.plans.total,
            sub: `${stats.plans.active} active · ${stats.plans.featured} featured`,
            icon: CreditCard,
            color: accent,
            href: url('/admin/plans'),
            permission: 'view-plans',
        },
        {
            label: 'Services',
            value: stats.services.total,
            sub: `${stats.services.active} active OTT / digital services`,
            icon: Tv,
            color: accentAlt,
            href: url('/admin/services'),
            permission: 'view-services',
        },
        {
            label: 'Messages',
            value: stats.messages.total,
            sub: `${stats.messages.new} new · ${stats.messages.in_progress} in progress`,
            icon: MessageSquare,
            color: 'var(--isp-warning, #F59E0B)',
            href: url('/admin/contact-messages'),
            permission: 'view-contact-messages',
        },
        {
            label: 'Locations',
            value: stats.locations.total,
            sub: `${stats.locations.active} active offices`,
            icon: MapPin,
            color: 'var(--isp-success, #10B981)',
            href: url('/admin/contact/locations'),
            permission: 'manage-office-locations',
        },
    ].filter((card) => hasPerm(card.permission));

    const quickActions = [
        { label: 'Plans', desc: 'Manage internet plans', icon: CreditCard, href: url('/admin/plans'), color: accent, permission: 'view-plans' },
        { label: 'Services', desc: 'OTT & digital services', icon: Tv, href: url('/admin/services'), color: accentAlt, permission: 'view-services' },
        { label: 'Hero Section', desc: 'Homepage hero config', icon: Home, href: url('/admin/hero-config'), color: '#8B5CF6', permission: 'view-hero-config' },
        { label: 'Contact Page', desc: 'Contact page settings', icon: PhoneCall, href: url('/admin/pages/contact'), color: '#EC4899', permission: 'manage-contact-page' },
        { label: 'Messages', desc: 'View contact messages', icon: MessageSquare, href: url('/admin/contact-messages'), color: '#F59E0B', permission: 'view-contact-messages' },
        { label: 'About Page', desc: 'About us content', icon: FileText, href: url('/admin/pages/about'), color: '#10B981', permission: 'manage-about-page' },
        { label: 'Locations', desc: 'Office locations', icon: MapPin, href: url('/admin/contact/locations'), color: '#06B6D4', permission: 'manage-office-locations' },
        { label: 'Website Config', desc: 'Theme & branding', icon: Settings, href: url('/admin/website-config'), color: '#6366F1', permission: 'view-website-config' },
    ].filter((action) => hasPerm(action.permission));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="relative flex flex-1 flex-col gap-6 p-6">
                {/* Background grid */}
                <div className="dash-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

                {/* Glow orbs */}
                <div
                    className="dash-orb absolute -right-24 -top-24 h-96 w-96 rounded-full blur-[140px]"
                    style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
                    aria-hidden="true"
                />
                <div
                    className="dash-orb-slow absolute -left-24 bottom-10 h-72 w-72 rounded-full blur-[120px]"
                    style={{ background: `color-mix(in srgb, ${accentAlt} 8%, transparent)` }}
                    aria-hidden="true"
                />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="dash-particle absolute h-1 w-1 rounded-full"
                            style={{
                                background: i % 3 === 0 ? accent : i % 3 === 1 ? accentAlt : '#8B5CF6',
                                left: `${(i * 8.3 + 4) % 100}%`,
                                top: `${(i * 13.7 + 7) % 90}%`,
                                animationDelay: `${(i % 5) * 1.3}s`,
                                animationDuration: `${4 + (i % 3)}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Header */}
                <div className="relative z-10">
                    <div className="dash-fade mb-1 flex items-center gap-3">
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                            style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
                        >
                            <LayoutDashboard className="h-5 w-5" style={{ color: accent }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-foreground">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {stats.site_name ? `Welcome to ${stats.site_name}` : 'Overview of your ISP platform'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                {statCards.length > 0 && (
                    <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((card, i) => (
                            <Link
                                key={card.label}
                                href={card.href}
                                className="dash-card group relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-lg"
                                style={{
                                    borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                                    background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                                    animationDelay: `${i * 0.08}s`,
                                }}
                            >
                                <div
                                    className="absolute inset-x-0 top-0 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
                                    aria-hidden="true"
                                />
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            {card.label}
                                        </p>
                                        <p className="mt-2 text-3xl font-bold text-foreground">{card.value}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
                                    </div>
                                    <div
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                                        style={{ background: `color-mix(in srgb, ${card.color} 10%, transparent)` }}
                                    >
                                        <card.icon className="h-5 w-5" style={{ color: card.color }} />
                                    </div>
                                </div>
                                <div className="dash-scan pointer-events-none absolute inset-x-0 h-[1px]"
                                    style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`, animationDelay: `${i * 1.5}s` }}
                                    aria-hidden="true"
                                />
                            </Link>
                        ))}
                    </div>
                )}

                <div className="relative z-10 grid gap-6 lg:grid-cols-3">
                    {/* Recent Messages */}
                    {hasPerm('view-contact-messages') && (
                        <div className="dash-card group relative overflow-hidden rounded-xl border lg:col-span-2"
                            style={{
                                borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                                background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                            }}
                        >
                            <div
                                className="absolute inset-x-0 top-0 h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                                aria-hidden="true"
                            />
                            <div className="relative p-5">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" style={{ color: accent }} />
                                        <h2 className="text-sm font-bold text-foreground">Recent Messages</h2>
                                        {stats.messages.new > 0 && (
                                            <span
                                                className="flex h-5 items-center rounded-full px-2 text-[10px] font-bold text-white"
                                                style={{ background: accent }}
                                            >
                                                {stats.messages.new} new
                                            </span>
                                        )}
                                    </div>
                                    <Link
                                        href={url('/admin/contact-messages')}
                                        className="flex items-center gap-1 text-xs font-medium transition-colors hover:underline"
                                        style={{ color: accent }}
                                    >
                                        View all <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                                {recentMessages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                                        <MessageSquare className="mb-2 h-8 w-8 opacity-30" />
                                        <p className="text-sm">No messages yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {recentMessages.map((msg) => {
                                            const st = statusColors[msg.status] ?? statusColors.new;
                                            return (
                                                <Link
                                                    key={msg.id}
                                                    href={url(`/admin/contact-messages/${msg.id}`)}
                                                    className="flex items-center justify-between rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-[var(--isp-primary)]/20 hover:bg-[var(--isp-primary)]/[0.03]"
                                                >
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="truncate text-sm font-medium text-foreground">{msg.name}</p>
                                                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${st.bg} ${st.text}`}>
                                                                <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                                                                {msg.status.replace('_', ' ')}
                                                            </span>
                                                        </div>
                                                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                                            {msg.subject}
                                                            {msg.inquiry_type && <span className="ml-1 opacity-60">· {msg.inquiry_type}</span>}
                                                        </p>
                                                    </div>
                                                    <span className="ml-3 shrink-0 text-[10px] text-muted-foreground">{msg.created_at}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    {quickActions.length > 0 && (
                        <div className="dash-card relative overflow-hidden rounded-xl border"
                            style={{
                                borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                                background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                            }}
                        >
                            <div
                                className="absolute inset-x-0 top-0 h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${accentAlt}, transparent)` }}
                                aria-hidden="true"
                            />
                            <div className="relative p-5">
                                <div className="mb-4 flex items-center gap-2">
                                    <Zap className="h-4 w-4" style={{ color: accentAlt }} />
                                    <h2 className="text-sm font-bold text-foreground">Quick Actions</h2>
                                </div>
                                <div className="space-y-2">
                                    {quickActions.map((action) => (
                                        <Link
                                            key={action.label}
                                            href={action.href}
                                            className="group/action flex items-center gap-3 rounded-lg border border-transparent p-2.5 transition-all duration-200 hover:border-[var(--isp-primary)]/20 hover:bg-[var(--isp-primary)]/[0.03]"
                                        >
                                            <div
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover/action:scale-110"
                                                style={{ background: `color-mix(in srgb, ${action.color} 10%, transparent)` }}
                                            >
                                                <action.icon className="h-4 w-4" style={{ color: action.color }} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-foreground">{action.label}</p>
                                                <p className="text-[11px] text-muted-foreground">{action.desc}</p>
                                            </div>
                                            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover/action:translate-x-0.5" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Plans */}
                {hasPerm('view-plans') && (
                    <div className="dash-card group relative overflow-hidden rounded-xl border"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                            background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                        }}
                    >
                        <div
                            className="absolute inset-x-0 top-0 h-px"
                            style={{ background: `linear-gradient(90deg, transparent, ${accent}, ${accentAlt}, transparent)` }}
                            aria-hidden="true"
                        />
                        <div className="relative p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" style={{ color: accent }} />
                                    <h2 className="text-sm font-bold text-foreground">Recent Plans</h2>
                                </div>
                                <Link
                                    href={url('/admin/plans')}
                                    className="flex items-center gap-1 text-xs font-medium transition-colors hover:underline"
                                    style={{ color: accent }}
                                >
                                    View all <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                            {recentPlans.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                                    <CreditCard className="mb-2 h-8 w-8 opacity-30" />
                                    <p className="text-sm">No plans created yet</p>
                                    <Link
                                        href={url('/admin/plans/create')}
                                        className="mt-2 text-xs font-medium transition-colors hover:underline"
                                        style={{ color: accent }}
                                    >
                                        Create your first plan
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                <th className="pb-2 pr-4">Plan</th>
                                                <th className="pb-2 pr-4">Category</th>
                                                <th className="pb-2 pr-4">Speed</th>
                                                <th className="pb-2 pr-4">Price/mo</th>
                                                <th className="pb-2 pr-4">Status</th>
                                                <th className="pb-2">Added</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50">
                                            {recentPlans.map((plan) => (
                                                <tr key={plan.id} className="transition-colors hover:bg-[var(--isp-primary)]/[0.02]">
                                                    <td className="py-2.5 pr-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-foreground">{plan.name}</span>
                                                            {plan.is_featured && (
                                                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 pr-4 text-muted-foreground">{plan.category ?? '—'}</td>
                                                    <td className="py-2.5 pr-4 font-mono text-xs text-foreground">{plan.speed}</td>
                                                    <td className="py-2.5 pr-4 font-semibold text-foreground">${plan.monthly_price}</td>
                                                    <td className="py-2.5 pr-4">
                                                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${plan.is_active ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                                                            <span className={`h-1.5 w-1.5 rounded-full ${plan.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                            {plan.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="py-2.5 text-xs text-muted-foreground">{plan.created_at}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Bottom Status Bar */}
                <div className="dash-fade-late relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-5 py-3"
                    style={{
                        borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                        background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                    }}
                >
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            System Online
                        </span>
                        <span className="hidden sm:inline">·</span>
                        <span className="hidden sm:flex items-center gap-1.5">
                            {stats.hero_configured ? (
                                <><CheckCircle2 className="h-3 w-3 text-green-500" /> Hero configured</>
                            ) : (
                                <><AlertCircle className="h-3 w-3 text-amber-500" /> Hero not configured</>
                            )}
                        </span>
                        <span className="hidden sm:inline">·</span>
                        <span className="hidden sm:inline">{stats.plans.categories} plan categories</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span className="hidden sm:inline">Preview site</span>
                        <a href="/" target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:underline" style={{ color: accent }}>
                            → Visit
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .dash-grid {
                    background-image:
                        linear-gradient(rgba(128, 128, 128, 0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(128, 128, 128, 0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: dashGridPulse 8s ease-in-out infinite;
                }
                @keyframes dashGridPulse {
                    0%, 100% { opacity: 0.03; }
                    50% { opacity: 0.07; }
                }
                @keyframes dashFloatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    10% { opacity: 0.4; }
                    90% { opacity: 0.4; }
                    100% { transform: translateY(-45vh) scale(0); opacity: 0; }
                }
                .dash-particle { animation: dashFloatUp linear infinite; }
                .dash-orb { animation: dashOrbPulse 7s ease-in-out infinite; }
                .dash-orb-slow { animation: dashOrbPulse 9s ease-in-out infinite reverse; }
                @keyframes dashOrbPulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.75; transform: scale(1.1); }
                }
                .dash-scan {
                    top: 0;
                    animation: dashScanSweep 6s linear infinite;
                }
                @keyframes dashScanSweep {
                    0% { top: -3%; opacity: 0; }
                    10% { opacity: 0.25; }
                    90% { opacity: 0.25; }
                    100% { top: 103%; opacity: 0; }
                }
                @keyframes dashFadeUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .dash-fade { animation: dashFadeUp 0.5s ease-out 0.1s both; }
                .dash-fade-delayed { animation: dashFadeUp 0.5s ease-out 0.2s both; }
                .dash-fade-late { animation: dashFadeUp 0.5s ease-out 0.35s both; }
                .dash-card { animation: dashFadeUp 0.5s ease-out 0.2s both; }
                .dash-card:nth-child(2) { animation-delay: 0.28s; }
                .dash-card:nth-child(3) { animation-delay: 0.36s; }
                .dash-card:nth-child(4) { animation-delay: 0.44s; }
                @media (prefers-reduced-motion: reduce) {
                    .dash-grid, .dash-particle, .dash-orb, .dash-orb-slow,
                    .dash-scan, .dash-fade, .dash-fade-delayed, .dash-fade-late, .dash-card {
                        animation: none !important;
                    }
                    .dash-fade, .dash-fade-delayed, .dash-fade-late, .dash-card {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </AppLayout>
    );
}
