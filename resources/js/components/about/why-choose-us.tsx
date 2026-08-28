import { Shield, Headphones, Server, Users, Home, TrendingUp, Wifi, Clock, Globe, Zap, Heart, Eye, Target, Award, CheckCircle2, Star } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Shield, Headphones, Server, Users, Home, TrendingUp, Wifi, Clock, Globe, Zap, Heart, Eye, Target, Award, CheckCircle2, Star,
};

interface WhyChooseUsItem {
    id: number; icon: string; title: string; description: string;
}

export default function WhyChooseUs({ items }: { items: WhyChooseUsItem[] }) {
    const accent = 'var(--isp-primary)';

    if (items.length === 0) return null;

    return (
        <section className="relative bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Why Us
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">Why Choose Us</h3>
                </div>

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => {
                        const Icon = iconMap[item.icon] ?? Shield;
                        return (
                            <div
                                key={item.id}
                                className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50"
                            >
                                <div
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                                    style={{
                                        background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                        color: accent,
                                    }}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="mb-1 text-base font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-sm leading-relaxed text-gray-500 text-justify">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
