import { Link } from '@inertiajs/react';

interface HeroData {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { text: string; url: string };
    secondaryCta: { text: string; url: string };
    image: string;
    imageAlt: string;
}

export default function AboutHero({ data }: { data: HeroData }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';
    const overlay = '#0a0e1a';

    return (
        <section className="relative overflow-hidden" style={{ background: overlay }}>
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${data.image})` }}
            />

            {/* Overlay */}
            <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, ${overlay}e6, ${overlay}99 55%, ${overlay}f5)` }}
            />

            {/* Animated grid lines */}
            <div className="about-hero-grid absolute inset-0 opacity-[0.04]" aria-hidden="true" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                {[...Array(14)].map((_, i) => (
                    <div
                        key={i}
                        className="about-hero-particle absolute h-1 w-1 rounded-full"
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
                className="glow-orb about-orb absolute -left-32 top-1/3 h-72 w-72 rounded-full blur-[110px]"
                style={{ background: `color-mix(in srgb, var(--isp-primary) 12%, transparent)` }}
                aria-hidden="true"
            />
            <div
                className="glow-orb about-orb-slow absolute -right-32 top-2/3 h-72 w-72 rounded-full blur-[110px]"
                style={{ background: `color-mix(in srgb, var(--isp-accent) 10%, transparent)` }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-3 pb-14 pt-12 text-center sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pt-24">
                {/* Eyebrow badge */}
                <div
                    className="about-hero-fade mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium backdrop-blur-md"
                    style={{
                        color: accent,
                        border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
                        background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                    }}
                >
                    <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
                    {data.eyebrow}
                </div>

                {/* Heading */}
                <h1 className="about-hero-fade-delayed mb-4 max-w-4xl text-xl font-bold leading-tight tracking-tight text-white sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                    {data.title.split('&').map((part, i, arr) =>
                        i < arr.length - 1 ? (
                            <span key={i}>
                                {part}
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{ backgroundImage: `linear-gradient(to right, ${accent}, ${accentAlt})` }}
                                >
                                    &amp;
                                </span>
                            </span>
                        ) : (
                            <span key={i}>{part}</span>
                        ),
                    )}
                </h1>

                {/* Description */}
                <p className="about-hero-fade-late mb-6 max-w-2xl text-sm text-slate-300 sm:mb-10 sm:text-lg md:text-xl">
                    {data.description}
                </p>

                {/* CTAs */}
                <div className="about-hero-fade-late flex flex-col items-center gap-4 sm:flex-row">
                    <Link
                        href={data.primaryCta.url}
                        className="group relative inline-flex items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold sm:px-8 sm:py-3.5 sm:text-base"
                        style={{ background: accent, color: '#fff', clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
                    >
                        <span className="relative z-10">{data.primaryCta.text}</span>
                        <span className="absolute inset-0 -translate-x-[100%] bg-white/10 transition-transform duration-500 group-hover:translate-x-[100%]" />
                    </Link>
                    <Link
                        href={data.secondaryCta.url}
                        className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/15 sm:px-8 sm:py-3.5 sm:text-base"
                        style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        {data.secondaryCta.text}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Bottom fade into page */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-[#09090b]" aria-hidden="true" />

            <style>{`
                .about-hero-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: aboutGridPulse 8s ease-in-out infinite;
                }
                @keyframes aboutGridPulse {
                    0%, 100% { opacity: 0.03; }
                    50% { opacity: 0.07; }
                }
                @keyframes aboutFloatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-60vh) scale(0); opacity: 0; }
                }
                .about-hero-particle { animation: aboutFloatUp linear infinite; }
                .glow-orb.about-orb { animation: aboutGlowPulse 7s ease-in-out infinite; }
                .glow-orb.about-orb-slow { animation: aboutGlowPulse 9s ease-in-out infinite reverse; }
                @keyframes aboutGlowPulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.15); }
                }
                @keyframes aboutFadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .about-hero-fade { animation: aboutFadeUp 0.8s ease-out 0.15s both; }
                .about-hero-fade-delayed { animation: aboutFadeUp 0.8s ease-out 0.35s both; }
                .about-hero-fade-late { animation: aboutFadeUp 0.8s ease-out 0.55s both; }
                @media (prefers-reduced-motion: reduce) {
                    .about-hero-grid, .about-hero-particle, .about-orb, .about-orb-slow,
                    .about-hero-fade, .about-hero-fade-delayed, .about-hero-fade-late {
                        animation: none !important;
                    }
                    .about-hero-fade, .about-hero-fade-delayed, .about-hero-fade-late {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </section>
    );
}
