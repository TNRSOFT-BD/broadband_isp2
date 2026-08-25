import { Link } from '@inertiajs/react';
import { Check, Star, ArrowRight } from 'lucide-react';

interface PlanFeature {
    title: string;
    description: string | null;
}

interface FeaturedPlan {
    id: number;
    name: string;
    tagline: string | null;
    speed: string;
    speed_unit: string;
    monthly_price: string | number;
    setup_fee: string | number;
    badge_text: string | null;
    is_featured: boolean;
    is_recommended: boolean;
    cta_text: string | null;
    cta_url: string | null;
    slug: string;
    features: PlanFeature[];
    category: string | null;
}

export default function FeaturedPlansSection({ plans }: { plans: FeaturedPlan[] }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    if (plans.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
            {/* Subtle grid */}
            <div className="plans-grid absolute inset-0 opacity-[0.02]" aria-hidden="true" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="plans-fade mb-12 text-center sm:mb-16">
                    <h2
                        className="mb-3 text-sm font-bold uppercase tracking-wider"
                        style={{ color: accent }}
                    >
                        Internet Plans
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Find the Connection Built for You
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
                        Choose from our range of high-speed internet plans designed for every need — from home browsing to enterprise-grade connectivity.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                    {plans.map((plan, i) => {
                        const featured = plan.is_featured || plan.is_recommended;
                        const badgeText = plan.badge_text ?? (featured ? 'Most Popular' : null);

                        return (
                            <div
                                key={plan.id}
                                className={`plans-card group relative flex w-full max-w-sm flex-col rounded-2xl transition-all duration-300 ${
                                    featured
                                        ? 'bg-[var(--isp-primary)] text-white shadow-xl shadow-[var(--isp-primary)]/20'
                                        : 'bg-white'
                                }`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                {!featured && (
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-gray-200 transition-colors duration-300 group-hover:border-[var(--isp-primary)]/30" />
                                )}

                                {/* Top edge glow */}
                                <div
                                    className="absolute inset-x-0 top-0 h-px"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, ${featured ? 'rgba(255,255,255,0.4)' : accent}, transparent)`,
                                    }}
                                    aria-hidden="true"
                                />

                                {/* Badge */}
                                {badgeText && (
                                    <div
                                        className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <span
                                            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-1 text-xs font-semibold shadow-md"
                                            style={featured ? {
                                                background: 'white',
                                                color: 'var(--isp-primary)',
                                            } : {
                                                background: accent,
                                                color: 'white',
                                                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                                                paddingInline: '1.25rem',
                                            }}
                                        >
                                            <Star className={`h-3 w-3 ${featured ? 'fill-amber-400 text-amber-400' : 'fill-current'}`} />
                                            {badgeText}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-1 flex-col p-6 pt-8 sm:p-8">
                                    {/* Category */}
                                    {plan.category && (
                                        <span className={`mb-2 text-xs font-semibold uppercase tracking-wider ${featured ? 'text-white/70' : 'text-gray-400'}`}>
                                            {plan.category}
                                        </span>
                                    )}

                                    {/* Name */}
                                    <h4 className={`text-xl font-bold ${featured ? 'text-white' : 'text-gray-900'}`}>
                                        {plan.name}
                                    </h4>
                                    {plan.tagline && (
                                        <p className={`mt-1 text-sm ${featured ? 'text-white/80' : 'text-gray-500'}`}>
                                            {plan.tagline}
                                        </p>
                                    )}

                                    {/* Speed */}
                                    <div
                                        className="relative mt-5 overflow-hidden rounded-xl px-4 py-4 text-center"
                                        style={featured
                                            ? { background: 'rgba(255,255,255,0.12)' }
                                            : { background: 'linear-gradient(135deg, #0a0e1af2, #101b33f2)' }
                                        }
                                    >
                                        <span className="block text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                            {plan.speed}
                                            <span className="ml-1 align-middle text-sm font-semibold uppercase tracking-wide text-slate-400">
                                                {plan.speed_unit}
                                            </span>
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-5 flex items-baseline justify-center gap-1">
                                        <span className={`text-2xl font-bold ${featured ? 'text-white' : 'text-gray-900'}`}>
                                            ৳{Number(plan.monthly_price).toLocaleString()}
                                        </span>
                                        <span className={`text-sm ${featured ? 'text-white/80' : 'text-gray-500'}`}>
                                            / month
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <ul className="mt-6 space-y-2.5">
                                        {plan.features.slice(0, 5).map((feature) => (
                                            <li key={feature.title} className="flex items-start gap-2">
                                                <Check
                                                    className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-white' : ''}`}
                                                    style={featured ? undefined : { color: 'var(--isp-success)' }}
                                                />
                                                <span className={`text-sm ${featured ? 'text-white/90' : 'text-gray-600'}`}>
                                                    {feature.title}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA */}
                                <div className="mt-auto p-6 pt-2 sm:p-8 sm:pt-2">
                                    <a
                                        href={plan.cta_url ?? `/plans/${plan.slug}`}
                                        className={`group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden py-3 text-sm font-semibold transition-colors ${
                                            featured
                                                ? 'bg-white text-[var(--isp-primary)] hover:bg-white/95'
                                                : 'text-white'
                                        }`}
                                        style={{
                                            clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                                            ...(featured ? {} : { background: accent }),
                                        }}
                                    >
                                        <span className="relative z-10">{plan.cta_text ?? 'Choose Plan'}</span>
                                        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        <span className={`absolute inset-0 -translate-x-[100%] transition-transform duration-500 group-hover/btn:translate-x-[100%] ${featured ? 'bg-[var(--isp-primary)]/10' : 'bg-white/15'}`} />
                                    </a>
                                    <Link
                                        href={`/plans/${plan.slug}`}
                                        className={`mt-3 block text-center text-sm font-bold transition-colors ${
                                            featured ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-[var(--isp-primary)]'
                                        }`}
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All */}
                <div className="plans-fade mt-10 text-center sm:mt-12">
                    <Link
                        href="/plans"
                        className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: accent }}
                    >
                        View All Packages
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes plansFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .plans-fade { animation: plansFadeUp 0.6s ease-out 0.1s both; }
                .plans-card { animation: plansFadeUp 0.6s ease-out 0.2s both; }
                .plans-card:nth-child(2) { animation-delay: 0.3s; }
                .plans-card:nth-child(3) { animation-delay: 0.4s; }
                @media (prefers-reduced-motion: reduce) {
                    .plans-fade, .plans-card { animation: none !important; opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
