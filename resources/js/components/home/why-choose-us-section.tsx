import { Shield, Headphones, Server, Users, Home, TrendingUp, Wifi, Clock, Globe, Zap, Heart, Eye, Target, Award, CheckCircle2, Star } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Shield, Headphones, Server, Users, Home, TrendingUp, Wifi, Clock, Globe, Zap, Heart, Eye, Target, Award, CheckCircle2, Star,
};

interface FeatureItem {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export default function WhyChooseUsSection({ items }: { items: FeatureItem[] }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    if (items.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-white pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-14 lg:pb-16">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="why-fade mb-12 text-center sm:mb-16">
                    <h2
                        className="mb-3 text-sm font-bold uppercase tracking-wider"
                        style={{ color: accent }}
                    >
                        Why Us
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        More Than Just Internet
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
                        We deliver more than bandwidth — we deliver peace of mind with cutting-edge technology and dedicated support.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, i) => {
                        const Icon = iconMap[item.icon] ?? Shield;
                        return (
                            <div
                                key={item.id}
                                className="why-card group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50"
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                {/* Subtle top accent */}
                                <div
                                    className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                                    aria-hidden="true"
                                />

                                <div
                                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                        color: accent,
                                    }}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h4 className="mb-2 text-base font-bold text-gray-900">{item.title}</h4>
                                <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes whyFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .why-fade { animation: whyFadeUp 0.6s ease-out 0.1s both; }
                .why-card { animation: whyFadeUp 0.6s ease-out 0.2s both; }
                .why-card:nth-child(2) { animation-delay: 0.28s; }
                .why-card:nth-child(3) { animation-delay: 0.36s; }
                .why-card:nth-child(4) { animation-delay: 0.44s; }
                .why-card:nth-child(5) { animation-delay: 0.52s; }
                .why-card:nth-child(6) { animation-delay: 0.6s; }
                @media (prefers-reduced-motion: reduce) {
                    .why-fade, .why-card { animation: none !important; opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
