import { CheckCircle2 } from 'lucide-react';

interface TechnologyData {
    eyebrow: string;
    title: string;
    description: string;
    image: string | null;
    capabilities: { title: string; description?: string }[];
    network_stats?: {
        uptime?: string;
        peers?: string;
    };
    nodes?: { label: string; sub: string }[];
}

const miniStats = [
    { value: 'peers', fallback: '2,847', label: 'PEERS', color: 'var(--isp-primary)' },
    { value: 'speed', fallback: '10', suffix: ' Gbps', label: 'BACKBONE', color: 'var(--isp-primary)' },
    { value: 'monitor', fallback: '24/7', label: 'MONITORING', color: 'var(--isp-primary)' },
];

export default function TechnologySection({ data }: { data: TechnologyData }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    const uptime = data.network_stats?.uptime ?? '99.99%';
    const peers = data.network_stats?.peers ?? '2,847';

    const resolveMini = (stat: (typeof miniStats)[number]) => {
        if (stat.value === 'peers') return peers;
        return stat.fallback + (stat.suffix ?? '');
    };

    return (
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24" style={{ background: '#0a0e1a' }}>
            <div className="tech-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

            <div className="tech-orb absolute -right-24 top-1/4 h-80 w-80 rounded-full blur-[140px]"
                style={{ background: `color-mix(in srgb, ${accent} 10%, transparent)` }} aria-hidden="true" />
            <div className="tech-orb-slow absolute -left-24 bottom-1/4 h-64 w-64 rounded-full blur-[120px]"
                style={{ background: `color-mix(in srgb, ${accentAlt} 8%, transparent)` }} aria-hidden="true" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">

                    {/* ── Hero Number + Mini Stats ── */}
                    <div className="tech-fade relative order-2 lg:order-1">
                        <div className="flex flex-col items-center gap-10">

                            {/* Hero uptime ring */}
                            <div className="tech-hero-wrapper relative flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64">
                                <div className="tech-hero-ring absolute inset-0 rounded-full" />
                                <div className="tech-hero-glow absolute -inset-3 rounded-full" />
                                <div className="relative z-10 text-center">
                                    <p className="text-5xl font-bold text-white sm:text-6xl">{uptime}</p>
                                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accentAlt }}>
                                        UPTIME
                                    </p>
                                </div>
                            </div>

                            {/* Mini stat cards */}
                            <div className="grid w-full max-w-sm grid-cols-3 gap-3">
                                {miniStats.map((stat, i) => (
                                    <div
                                        key={stat.label}
                                        className="tech-mini-stat group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] sm:p-5"
                                        style={{ animationDelay: `${0.3 + i * 0.1}s`, boxShadow: `inset 0 0 20px -8px ${stat.color}, 0 0 16px -6px ${stat.color}`, borderColor: `color-mix(in srgb, ${stat.color} 20%, transparent)` }}
                                    >
                                        <div className="absolute inset-x-0 top-0 h-px"
                                            style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
                                        <p className="text-xl font-bold text-white sm:text-2xl">
                                            {resolveMini(stat)}
                                        </p>
                                        <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Content ── */}
                    <div className="tech-fade-delayed order-1 lg:order-2">
                        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                            {data.eyebrow || 'Our Technology'}
                        </h2>
                        <div className="mb-6 h-1 w-12 rounded-full" style={{ background: accent }} />
                        <h3 className="mb-6 text-3xl font-bold text-white sm:text-4xl">{data.title}</h3>
                        <p className="mb-8 text-base leading-relaxed text-slate-400">{data.description}</p>
                        <div className="space-y-4">
                            {data.capabilities.map((cap, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} />
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{cap.title}</h4>
                                        {cap.description && <p className="mt-0.5 text-xs text-slate-500">{cap.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .tech-grid {
                    background-image: linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: techGridPulse 8s ease-in-out infinite;
                }
                @keyframes techGridPulse { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.06; } }

                .tech-orb { animation: techOrbPulse 7s ease-in-out infinite; }
                .tech-orb-slow { animation: techOrbPulse 9s ease-in-out infinite reverse; }
                @keyframes techOrbPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }

                .tech-hero-ring {
                    background: conic-gradient(from 0deg, transparent 0%, var(--isp-primary) 25%, transparent 50%, var(--isp-accent) 75%, transparent 100%);
                    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
                    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
                    animation: techRingRotate 6s linear infinite;
                }
                .tech-hero-glow {
                    background: conic-gradient(from 0deg, transparent, var(--isp-primary), transparent, var(--isp-accent), transparent);
                    opacity: 0.15;
                    filter: blur(12px);
                    animation: techRingGlow 4s ease-in-out infinite;
                }
                @keyframes techRingRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes techRingGlow { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.3; } }

                @keyframes techFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                .tech-fade { animation: techFadeUp 0.7s ease-out 0.1s both; }
                .tech-fade-delayed { animation: techFadeUp 0.7s ease-out 0.3s both; }
                .tech-mini-stat { animation: techFadeUp 0.5s ease-out both; }

                @media (prefers-reduced-motion: reduce) {
                    .tech-grid, .tech-orb, .tech-orb-slow,
                    .tech-hero-ring, .tech-hero-glow,
                    .tech-fade, .tech-fade-delayed, .tech-mini-stat {
                        animation: none !important;
                    }
                    .tech-hero-glow { opacity: 0.15; }
                    .tech-fade, .tech-fade-delayed, .tech-mini-stat { opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
