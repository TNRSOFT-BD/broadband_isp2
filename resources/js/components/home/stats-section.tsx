import { TrendingUp, Users, Wifi, Headphones, Globe, Building2, Shield, Zap, Heart, Award, Clock, Server, Eye, Target, BookOpen, CheckCircle2, Home, BarChart3 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    TrendingUp, Users, Wifi, Headphones, Globe, Building2,
    Shield, Zap, Heart, Award, Clock, Server, Eye, Target,
    BookOpen, CheckCircle2, Home, BarChart3,
};

interface StatItem {
    id: number;
    label: string;
    value: string;
    prefix: string | null;
    suffix: string | null;
    description: string | null;
    icon: string;
}

export default function StatsSection({ items }: { items: StatItem[] }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    if (items.length === 0) return null;

    return (
        <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16" style={{ background: '#0a0e1a' }}>
            {/* Grid background */}
            <div className="stats-grid absolute inset-0 opacity-[0.04]" aria-hidden="true" />

            {/* Glow orbs */}
            <div
                className="stats-orb absolute -left-20 top-1/3 h-64 w-64 rounded-full blur-[120px]"
                style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
                aria-hidden="true"
            />
            <div
                className="stats-orb-slow absolute -right-20 bottom-1/3 h-64 w-64 rounded-full blur-[120px]"
                style={{ background: `color-mix(in srgb, ${accentAlt} 10%, transparent)` }}
                aria-hidden="true"
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="stats-particle absolute h-1 w-1 rounded-full"
                        style={{
                            background: i % 2 === 0 ? accent : accentAlt,
                            left: `${(i * 12 + 5) % 100}%`,
                            top: `${(i * 17 + 10) % 90}%`,
                            animationDelay: `${(i % 4) * 1.5}s`,
                            animationDuration: `${4 + (i % 3)}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="stats-fade mb-12 text-center sm:mb-16">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accentAlt }}>
                        Network Strength
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accentAlt }} />
                    <h3 className="text-3xl font-bold text-white sm:text-4xl">
                        Built on a Stronger Network
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
                        Our numbers speak for themselves — a network engineered for performance, reliability, and scale.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-6">
                    {items.map((stat, i) => {
                        const Icon = iconMap[stat.icon] ?? TrendingUp;
                        return (
                            <div
                                key={stat.id}
                                className="stats-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 sm:p-6"
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <div
                                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        background: `color-mix(in srgb, ${accent} 15%, transparent)`,
                                        color: accent,
                                    }}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <p className="text-2xl font-bold text-white sm:text-3xl">
                                    {stat.prefix}{stat.value}{stat.suffix}
                                </p>
                                <p className="mt-1 text-xs font-medium text-slate-400">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .stats-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: statsGridPulse 8s ease-in-out infinite;
                }
                @keyframes statsGridPulse {
                    0%, 100% { opacity: 0.03; }
                    50% { opacity: 0.06; }
                }
                .stats-orb { animation: statsOrbPulse 7s ease-in-out infinite; }
                .stats-orb-slow { animation: statsOrbPulse 9s ease-in-out infinite reverse; }
                @keyframes statsOrbPulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }
                @keyframes statsFloatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    10% { opacity: 0.5; }
                    90% { opacity: 0.5; }
                    100% { transform: translateY(-40vh) scale(0); opacity: 0; }
                }
                .stats-particle { animation: statsFloatUp linear infinite; }
                @keyframes statsFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .stats-fade { animation: statsFadeUp 0.6s ease-out 0.1s both; }
                .stats-card { animation: statsFadeUp 0.6s ease-out 0.2s both; }
                .stats-card:nth-child(2) { animation-delay: 0.28s; }
                .stats-card:nth-child(3) { animation-delay: 0.36s; }
                .stats-card:nth-child(4) { animation-delay: 0.44s; }
                .stats-card:nth-child(5) { animation-delay: 0.52s; }
                .stats-card:nth-child(6) { animation-delay: 0.6s; }
                @media (prefers-reduced-motion: reduce) {
                    .stats-grid, .stats-orb, .stats-orb-slow, .stats-particle,
                    .stats-fade, .stats-card { animation: none !important; }
                    .stats-fade, .stats-card { opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
