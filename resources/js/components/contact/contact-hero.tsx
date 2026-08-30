import { type ContactPageSettings } from '@/types/contact';
import { Link } from '@inertiajs/react';

interface ContactHeroProps {
    settings: ContactPageSettings;
}

export default function ContactHero({ settings }: ContactHeroProps) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';
    const overlay = '#0a0e1a';

    return (
        <section className="relative overflow-hidden" style={{ background: overlay }}>
            {/* Background image */}
            {settings.hero_background_image && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${settings.hero_background_image})` }}
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
            <div className="contact-hero-grid absolute inset-0 opacity-[0.04]" aria-hidden="true" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                {[...Array(14)].map((_, i) => (
                    <div
                        key={i}
                        className="contact-hero-particle absolute h-1 w-1 rounded-full"
                        style={{
                            background: i % 2 === 0 ? accent : accentAlt,
                            left: `${(i * 7.2 + 3) % 100}%`,
                            top: `${(i * 14.3 + 8) % 90}%`,
                            animationDelay: `${(i % 5) * 1.2}s`,
                            animationDuration: `${3.8 + (i % 4)}s`,
                        }}
                    />
                ))}
            </div>

            {/* Glow orbs */}
            <div
                className="glow-orb contact-orb absolute -left-32 top-1/3 h-72 w-72 rounded-full blur-[110px]"
                style={{ background: `color-mix(in srgb, var(--isp-primary) 12%, transparent)` }}
                aria-hidden="true"
            />
            <div
                className="glow-orb contact-orb-slow absolute -right-32 top-2/3 h-72 w-72 rounded-full blur-[110px]"
                style={{ background: `color-mix(in srgb, var(--isp-accent) 10%, transparent)` }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-24 pt-20 text-center sm:px-6 lg:px-8 lg:pt-24">
                {/* Eyebrow badge */}
                <div
                    className="contact-hero-fade mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium backdrop-blur-md"
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
                <h1 className="contact-hero-fade-delayed mb-6 max-w-4xl text-xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {settings.hero_title}
                    {settings.hero_highlight && (
                        <>
                            {' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: `linear-gradient(to right, ${accent}, ${accentAlt})` }}
                            >
                                {settings.hero_highlight}
                            </span>
                        </>
                    )}
                </h1>

                {/* Description */}
                {settings.hero_description && (
                    <p className="contact-hero-fade-late mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
                        {settings.hero_description}
                    </p>
                )}

                {/* CTAs */}
                <div className="contact-hero-fade-late flex flex-col items-center gap-4 sm:flex-row">
                    <Link
                        href={settings.hero_cta_primary_url}
                        className="group relative inline-flex items-center gap-2 overflow-hidden px-8 py-3.5 text-base font-semibold"
                        style={{ background: accent, color: '#fff', clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
                    >
                        <span className="relative z-10">{settings.hero_cta_primary_text}</span>
                        <span className="absolute inset-0 -translate-x-[100%] bg-white/10 transition-transform duration-500 group-hover:translate-x-[100%]" />
                    </Link>
                    {settings.hero_cta_secondary_text && settings.hero_cta_secondary_url && (
                        <Link
                            href={settings.hero_cta_secondary_url}
                            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/15"
                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                        >
                            {settings.hero_cta_secondary_text}
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
                .contact-hero-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: contactGridPulse 8s ease-in-out infinite;
                }
                @keyframes contactGridPulse {
                    0%, 100% { opacity: 0.03; }
                    50% { opacity: 0.07; }
                }
                @keyframes contactFloatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-60vh) scale(0); opacity: 0; }
                }
                .contact-hero-particle { animation: contactFloatUp linear infinite; }
                .glow-orb.contact-orb { animation: contactGlowPulse 7s ease-in-out infinite; }
                .glow-orb.contact-orb-slow { animation: contactGlowPulse 9s ease-in-out infinite reverse; }
                @keyframes contactGlowPulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.15); }
                }
                @keyframes contactFadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .contact-hero-fade { animation: contactFadeUp 0.8s ease-out 0.15s both; }
                .contact-hero-fade-delayed { animation: contactFadeUp 0.8s ease-out 0.35s both; }
                .contact-hero-fade-late { animation: contactFadeUp 0.8s ease-out 0.55s both; }
                @media (prefers-reduced-motion: reduce) {
                    .contact-hero-grid, .contact-hero-particle, .contact-orb, .contact-orb-slow,
                    .contact-hero-fade, .contact-hero-fade-delayed, .contact-hero-fade-late {
                        animation: none !important;
                    }
                    .contact-hero-fade, .contact-hero-fade-delayed, .contact-hero-fade-late {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </section>
    );
}
