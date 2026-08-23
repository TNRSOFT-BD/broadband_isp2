import { type PlansPageSettings } from '@/types/plans';
import { Link } from '@inertiajs/react';

interface PlansCTAProps {
    settings: PlansPageSettings;
}

export default function PlansCTA({ settings }: PlansCTAProps) {
    if (!settings.cta_section_enabled) return null;

    const overlay = '#0a0e1a';
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    return (
        <section className="relative overflow-hidden" style={{ background: overlay }} aria-labelledby="plans-cta-heading">
            {/* Background visual */}
            {settings.cta_section_background_image && (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${settings.cta_section_background_image})` }} aria-hidden="true" />
            )}
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${overlay}f2, ${overlay}cc, ${overlay}f2)` }} aria-hidden="true" />

            {/* Ambient glows */}
            <div className="plans-cta-orb absolute left-1/4 top-0 h-64 w-64 rounded-full blur-[120px]" style={{ background: `color-mix(in srgb, ${accent} 16%, transparent)` }} aria-hidden="true" />
            <div className="plans-cta-orb-slow absolute bottom-0 right-1/4 h-64 w-64 rounded-full blur-[120px]" style={{ background: `color-mix(in srgb, ${accentAlt} 12%, transparent)` }} aria-hidden="true" />
            <div className="plans-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
                <h2 id="plans-cta-heading" className="mx-auto max-w-3xl text-3xl font-bold text-white sm:text-4xl">
                    {settings.cta_section_title}
                </h2>
                {settings.cta_section_description && (
                    <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">{settings.cta_section_description}</p>
                )}

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href={settings.cta_section_primary_url}
                        className="group relative inline-flex items-center gap-2 overflow-hidden px-9 py-3.5 text-base font-semibold text-white"
                        style={{
                            background: `linear-gradient(to right, ${accent}, ${accentAlt})`,
                            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                        }}
                    >
                        <span className="relative z-10">{settings.cta_section_primary_text}</span>
                        <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                    </Link>
                    {settings.cta_section_secondary_text && (
                        <Link
                            href={settings.cta_section_secondary_url}
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-9 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
                        >
                            {settings.cta_section_secondary_text}
                        </Link>
                    )}
                </div>
            </div>

            <style>{`
                .plans-cta-orb { animation: plansGlowPulse 8s ease-in-out infinite; }
                .plans-cta-orb-slow { animation: plansGlowPulse 11s ease-in-out infinite reverse; }
                @media (prefers-reduced-motion: reduce) {
                    .plans-cta-orb, .plans-cta-orb-slow { animation: none !important; }
                }
            `}</style>
        </section>
    );
}
