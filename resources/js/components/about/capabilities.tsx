import { Wifi, Server, Building2, Clock, Headphones, TrendingUp, Shield, Zap, Globe, Users, Eye, Target, Home, BarChart3 } from 'lucide-react';
import SciFiImageFrame from '@/components/about/sci-fi-image-frame';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Wifi, Server, Building2, Clock, Headphones, TrendingUp, Shield, Zap, Globe, Users, Eye, Target, Home, BarChart3,
};

interface CapabilitiesData {
    eyebrow: string;
    title: string;
    description: string | null;
    image: string | null;
    imageAlt: string | null;
    features: Array<{ id: number; icon: string; title: string; description: string }>;
}

export default function Capabilities({ data }: { data: CapabilitiesData }) {
    const accent = 'var(--isp-primary)';

    return (
        <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)' }}>
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background: `color-mix(in srgb, ${accent} 8%, transparent)` }} />
            <div className="pointer-events-none absolute -left-32 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background: `color-mix(in srgb, var(--isp-accent) 6%, transparent)` }} />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center lg:text-left">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        {data.eyebrow}
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full sm:mx-auto lg:mx-0" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">{data.title}</h3>
                    {data.description && <p className="mx-auto mt-3 max-w-2xl text-gray-500 text-justify sm:text-center lg:mx-0 lg:text-left">{data.description}</p>}
                </div>

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Features Grid */}
                    {data.features.length > 0 && (
                        <div className="grid gap-4 text-left sm:grid-cols-2">
                            {data.features.map((feature) => {
                                const Icon = iconMap[feature.icon] ?? Wifi;
                                return (
                                    <div
                                        key={feature.id}
                                        className="group rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-200/50"
                                    >
                                        <div
                                            className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                                            style={{
                                                background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                                color: accent,
                                            }}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-900">{feature.title}</h4>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-500">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Image */}
                    <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                        {data.image && <SciFiImageFrame src={data.image} alt={data.imageAlt ?? 'Network infrastructure'} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
