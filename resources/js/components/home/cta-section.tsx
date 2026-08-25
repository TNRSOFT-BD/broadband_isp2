import { Link } from '@inertiajs/react';
import { ArrowRight, Phone } from 'lucide-react';

interface CtaData {
    eyebrow: string;
    title: string;
    description: string;
    primary_button_text: string;
    primary_button_url: string;
    secondary_button_text: string;
    secondary_button_url: string;
}

export default function CtaSection({ data }: { data: CtaData }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24" style={{ background: '#0a0e1a' }}>
            {/* Grid background */}
            <div className="cta-grid absolute inset-0 opacity-[0.04]" aria-hidden="true" />

            {/* Glow orbs */}
            <div
                className="cta-orb absolute left-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-[140px]"
                style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
                aria-hidden="true"
            />
            <div
                className="cta-orb-slow absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-[120px]"
                style={{ background: `color-mix(in srgb, ${accentAlt} 10%, transparent)` }}
                aria-hidden="true"
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="cta-particle absolute h-1 w-1 rounded-full"
                        style={{
                            background: i % 2 === 0 ? accent : accentAlt,
                            left: `${(i * 15 + 10) % 100}%`,
                            top: `${(i * 20 + 15) % 80}%`,
                            animationDelay: `${(i % 3) * 1.5}s`,
                            animationDuration: `${4 + (i % 3)}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                <div className="cta-fade">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accentAlt }}>
                        {data.eyebrow}
                    </h2>
                    <div className="mx-auto mb-6 h-1 w-12 rounded-full" style={{ background: accentAlt }} />

                    <h3 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        {data.title}
                    </h3>

                    <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-400">
                        {data.description}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={data.primary_button_url}
                            className="cta-btn group relative inline-flex items-center gap-2 overflow-hidden px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300"
                            style={{
                                background: accent,
                                clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                            }}
                        >
                            <span className="relative z-10">{data.primary_button_text}</span>
                            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                        </Link>

                        <Link
                            href={data.secondary_button_url}
                            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                        >
                            <Phone className="h-4 w-4" />
                            {data.secondary_button_text}
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                .cta-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: ctaGridPulse 8s ease-in-out infinite;
                }
                @keyframes ctaGridPulse {
                    0%, 100% { opacity: 0.03; }
                    50% { opacity: 0.06; }
                }
                .cta-orb { animation: ctaOrbPulse 7s ease-in-out infinite; }
                .cta-orb-slow { animation: ctaOrbPulse 9s ease-in-out infinite reverse; }
                @keyframes ctaOrbPulse {
                    0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
                }
                @keyframes ctaFloatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    10% { opacity: 0.5; }
                    90% { opacity: 0.5; }
                    100% { transform: translateY(-40vh) scale(0); opacity: 0; }
                }
                .cta-particle { animation: ctaFloatUp linear infinite; }
                @keyframes ctaFadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .cta-fade { animation: ctaFadeUp 0.7s ease-out 0.1s both; }
                .cta-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s ease;
                }
                .cta-btn:hover::before { left: 100%; }
                @media (prefers-reduced-motion: reduce) {
                    .cta-grid, .cta-orb, .cta-orb-slow, .cta-particle, .cta-fade, .cta-btn::before {
                        animation: none !important;
                    }
                    .cta-fade { opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
