import { type PlansPageSettings } from '@/types/plans';
import { Link } from '@inertiajs/react';

interface PlansHeroProps {
    settings: PlansPageSettings;
}

export default function PlansHero({ settings }: PlansHeroProps) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';
    const overlay = '#0a0e1a';

    return (
        <section className="relative overflow-hidden" style={{ background: overlay }}>
            {/* Background image */}
            {settings.background_image && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${settings.background_image})` }}
                />
            )}

            {/* Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to bottom, ${overlay}e6, ${overlay}99 55%, ${overlay}f5)`,
                }}
            />

            {/* Animated grid lines */}
            <div className="plans-grid absolute inset-0 opacity-[0.04]" aria-hidden="true" />

            {/* Floating particles (deterministic positions for SSR consistency) */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                {[...Array(16)].map((_, i) => (
                    <div
                        key={i}
                        className="plans-particle absolute h-1 w-1 rounded-full"
                        style={{
                            background: i % 2 === 0 ? accent : accentAlt,
                            left: `${(i * 6.4 + 3) % 100}%`,
                            top: `${(i * 13.7 + 8) % 90}%`,
                            animationDelay: `${(i % 5) * 1.1}s`,
                            animationDuration: `${3.5 + (i % 4)}s`,
                        }}
                    />
                ))}
            </div>

            {/* Glow orbs */}
            <div className="glow-orb plans-orb absolute -left-32 top-1/4 h-72 w-72 rounded-full blur-[110px]" style={{ background: 'color-mix(in srgb, var(--isp-primary) 12%, transparent)' }} aria-hidden="true" />
            <div className="glow-orb plans-orb-slow absolute -right-32 top-2/3 h-72 w-72 rounded-full blur-[110px]" style={{ background: 'color-mix(in srgb, var(--isp-accent) 10%, transparent)' }} aria-hidden="true" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-24 pt-20 text-center sm:px-6 lg:px-8 lg:pt-24">
                {/* Eyebrow badge */}
                <div
                    className="plans-fade mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium backdrop-blur-md"
                    style={{
                        color: accent,
                        border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
                        background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                    }}
                >
                    <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
                    {settings.hero_eyebrow}
                </div>

                {/* Heading */}
                <h1 className="plans-fade-delayed mb-6 max-w-4xl text-xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {settings.hero_title}{' '}
                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${accent}, ${accentAlt})` }}>
                        {settings.hero_highlight}
                    </span>
                </h1>

                {/* Description */}
                {settings.hero_description && (
                    <p className="plans-fade-late mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
                        {settings.hero_description}
                    </p>
                )}

                {/* CTAs */}
                <div className="plans-fade-late flex flex-col items-center gap-4 sm:flex-row">
                    <Link
                        href={settings.cta_primary_url}
                        className="plans-btn-primary group relative inline-flex items-center gap-2 overflow-hidden px-8 py-3.5 text-base font-semibold"
                        style={{ background: accent, color: '#fff', clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
                    >
                        <span className="relative z-10">{settings.cta_primary_text}</span>
                        <span className="absolute inset-0 -translate-x-[100%] bg-white/10 transition-transform duration-500 group-hover:translate-x-[100%]" />
                    </Link>
                    {settings.cta_secondary_text && (
                        <Link
                            href={settings.cta_secondary_url}
                            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/15"
                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                        >
                            {settings.cta_secondary_text}
                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>

            {/* Bottom fade into page */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-[#09090b]" aria-hidden="true" />

            <style>{`
                .plans-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: plansGridPulse 8s ease-in-out infinite;
                }
                @keyframes plansGridPulse {
                    0%, 100% { opacity: 0.03; }
                    50% { opacity: 0.07; }
                }
                @keyframes plansFloatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-60vh) scale(0); opacity: 0; }
                }
                .plans-particle { animation: plansFloatUp linear infinite; }
                .glow-orb.plans-orb { animation: plansGlowPulse 7s ease-in-out infinite; }
                .glow-orb.plans-orb-slow { animation: plansGlowPulse 9s ease-in-out infinite reverse; }
                @keyframes plansGlowPulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.15); }
                }
                @keyframes plansFadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .plans-fade { animation: plansFadeUp 0.8s ease-out 0.15s both; }
                .plans-fade-delayed { animation: plansFadeUp 0.8s ease-out 0.35s both; }
                .plans-fade-late { animation: plansFadeUp 0.8s ease-out 0.55s both; }
                @media (prefers-reduced-motion: reduce) {
                    .plans-grid, .plans-particle, .plans-orb, .plans-orb-slow,
                    .plans-fade, .plans-fade-delayed, .plans-fade-late {
                        animation: none !important;
                    }
                    .plans-fade, .plans-fade-delayed, .plans-fade-late {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </section>
    );
}
