import { Link } from '@inertiajs/react';
import { ctaData } from '@/data/about-data';

export default function CTASection() {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';
    const overlay = '#0a0e1a';

    return (
        <section className="relative overflow-hidden" style={{ background: overlay }}>
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Glow orbs */}
            <div
                className="absolute -left-32 top-1/2 h-72 w-72 rounded-full blur-[110px]"
                style={{ background: `color-mix(in srgb, ${accent} 15%, transparent)` }}
                aria-hidden="true"
            />
            <div
                className="absolute -right-32 top-1/2 h-72 w-72 rounded-full blur-[110px]"
                style={{ background: `color-mix(in srgb, ${accentAlt} 12%, transparent)` }}
                aria-hidden="true"
            />

            {/* Top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-[#09090b]" aria-hidden="true" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
                <h2 className="mb-4 text-xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {ctaData.title}
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
                    {ctaData.description}
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href={ctaData.primaryButton.url}
                        className="group relative inline-flex items-center gap-2 overflow-hidden px-8 py-3.5 text-base font-semibold"
                        style={{ background: accent, color: '#fff', clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
                    >
                        <span className="relative z-10">{ctaData.primaryButton.text}</span>
                        <span className="absolute inset-0 -translate-x-[100%] bg-white/10 transition-transform duration-500 group-hover:translate-x-[100%]" />
                    </Link>
                    <Link
                        href={ctaData.secondaryButton.url}
                        className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/15"
                        style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        {ctaData.secondaryButton.text}
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0b1120]" aria-hidden="true" />
        </section>
    );
}
