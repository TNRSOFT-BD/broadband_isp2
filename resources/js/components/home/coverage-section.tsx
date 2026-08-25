import { MapPin, ArrowRight } from 'lucide-react';

interface CoverageData {
    title: string;
    description: string;
    cta_text: string;
    cta_url: string;
}

interface CoverageArea {
    id: number;
    name: string;
    type: string | null;
    status: string;
}

export default function CoverageSection({ data, areas }: { data: CoverageData; areas: CoverageArea[] }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
        active: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700', dot: 'bg-green-500' },
        coming_soon: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700', dot: 'bg-amber-500' },
        planned: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700', dot: 'bg-blue-500' },
    };

    return (
        <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
            {/* Subtle grid */}
            <div className="cov-grid absolute inset-0 opacity-[0.02]" aria-hidden="true" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="cov-fade mb-12 text-center sm:mb-16">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Coverage
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        {data.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
                        {data.description}
                    </p>
                </div>

                {areas.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {areas.map((area, i) => {
                            const st = statusColors[area.status] ?? statusColors.active;
                            return (
                                <div
                                    key={area.id}
                                    className="cov-card group flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--isp-primary)]/20 hover:shadow-md"
                                    style={{ animationDelay: `${i * 0.04}s` }}
                                >
                                    <div
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                            color: accent,
                                        }}
                                    >
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-gray-900">{area.name}</p>
                                        {area.type && (
                                            <p className="text-xs text-gray-400 capitalize">{area.type.replace('_', ' ')}</p>
                                        )}
                                    </div>
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${st.bg} ${st.text}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                                        {area.status.replace('_', ' ')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-12 text-center">
                        <MapPin className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                        <p className="text-sm text-gray-500">Coverage information coming soon.</p>
                    </div>
                )}

                {/* CTA */}
                <div className="cov-fade mt-10 text-center sm:mt-12">
                    <a
                        href={data.cta_url}
                        className="cov-btn group relative inline-flex items-center gap-2 overflow-hidden px-7 py-3 text-sm font-semibold text-white transition-all duration-300"
                        style={{
                            background: accent,
                            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                        }}
                    >
                        <span className="relative z-10">{data.cta_text}</span>
                        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes covFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .cov-fade { animation: covFadeUp 0.6s ease-out 0.1s both; }
                .cov-card { animation: covFadeUp 0.5s ease-out 0.2s both; }
                .cov-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s ease;
                }
                .cov-btn:hover::before { left: 100%; }
                @media (prefers-reduced-motion: reduce) {
                    .cov-fade, .cov-card { animation: none !important; opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
