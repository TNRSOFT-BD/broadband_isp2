import { Shield, Heart, Zap, BookOpen, Award, Globe, Users, Eye, Target, Clock, Headphones, CheckCircle2, Star, Lock, Server, Wifi } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Shield, Heart, Zap, BookOpen, Award, Globe, Users, Eye, Target, Clock, Headphones, CheckCircle2, Star, Lock, Server, Wifi,
};

interface CoreValueItem {
    id: number; icon: string; title: string; description: string;
}

export default function CoreValues({ items }: { items: CoreValueItem[] }) {
    const accent = 'var(--isp-primary)';

    if (items.length === 0) return null;

    return (
        <section className="bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Our Values
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Drives Us</h3>
                </div>

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((value) => {
                        const Icon = iconMap[value.icon] ?? Shield;
                        return (
                            <div
                                key={value.id}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50"
                            >
                                <div
                                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                                    style={{
                                        background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                        color: accent,
                                    }}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">{value.title}</h4>
                                <p className="text-sm leading-relaxed text-gray-600 text-justify">{value.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
