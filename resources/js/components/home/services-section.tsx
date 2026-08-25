import { ArrowRight, Tv, Wifi, Shield, Cloud, Gamepad2, Radio, Server, Headphones } from 'lucide-react';

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    ott: Tv,
    streaming: Tv,
    entertainment: Gamepad2,
    gaming: Gamepad2,
    security: Shield,
    cloud_storage: Cloud,
    iptv: Radio,
    other: Server,
};

interface ServiceItem {
    id: number;
    name: string;
    slug: string;
    category: string;
    category_label: string;
    description: string | null;
    logo: string | null;
    website_url: string | null;
}

export default function ServicesSection({ services }: { services: ServiceItem[] }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    if (services.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="svc-fade mb-12 text-center sm:mb-16">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Services & Solutions
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Connectivity for Every Need
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
                        From streaming entertainment to enterprise security, we offer digital services that complete your connected experience.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {services.map((svc, i) => {
                        const Icon = categoryIconMap[svc.category] ?? Wifi;
                        return (
                            <div
                                key={svc.id}
                                className="svc-card group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50"
                                style={{ animationDelay: `${i * 0.06}s` }}
                            >
                                {/* Top accent line on hover */}
                                <div
                                    className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                                    aria-hidden="true"
                                />

                                <div className="mb-4 flex items-center gap-3">
                                    {svc.logo ? (
                                        <img
                                            src={svc.logo}
                                            alt={svc.name}
                                            className="h-12 w-12 rounded-xl object-contain"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                                            style={{
                                                background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                                color: accent,
                                            }}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">{svc.name}</h4>
                                        <span className="text-xs font-medium text-gray-400">{svc.category_label}</span>
                                    </div>
                                </div>

                                {svc.description && (
                                    <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">{svc.description}</p>
                                )}

                                {svc.website_url && (
                                    <a
                                        href={svc.website_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                                        style={{ color: accent }}
                                    >
                                        Learn More <ArrowRight className="h-3 w-3" />
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes svcFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .svc-fade { animation: svcFadeUp 0.6s ease-out 0.1s both; }
                .svc-card { animation: svcFadeUp 0.6s ease-out 0.2s both; }
                .svc-card:nth-child(2) { animation-delay: 0.26s; }
                .svc-card:nth-child(3) { animation-delay: 0.32s; }
                .svc-card:nth-child(4) { animation-delay: 0.38s; }
                @media (prefers-reduced-motion: reduce) {
                    .svc-fade, .svc-card { animation: none !important; opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
