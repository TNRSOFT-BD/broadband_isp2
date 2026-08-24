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
        <section className="relative bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
                    {/* Content */}
                    <div>
                        <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                            {data.eyebrow}
                        </h2>
                        <div className="mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                        <h3 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{data.title}</h3>
                        {data.description && <p className="mb-8 text-gray-600 text-justify">{data.description}</p>}

                        {data.features.length > 0 && (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {data.features.map((feature) => {
                                    const Icon = iconMap[feature.icon] ?? Wifi;
                                    return (
                                        <div key={feature.id} className="flex items-start gap-3">
                                            <div
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                                                style={{
                                                    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                                    color: accent,
                                                }}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{feature.title}</h4>
                                                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{feature.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Image */}
                    {data.image && <SciFiImageFrame src={data.image} alt={data.imageAlt ?? 'Network infrastructure'} />}
                </div>
            </div>
        </section>
    );
}
