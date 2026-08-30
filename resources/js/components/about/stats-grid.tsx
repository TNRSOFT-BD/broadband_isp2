import { TrendingUp, Users, Wifi, Headphones, Globe, Building2, Shield, Zap, Heart, Award, Clock, Server, Eye, Target, BookOpen, CheckCircle2, Home, BarChart3 } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    TrendingUp, Users, Wifi, Headphones, Globe, Building2,
    Shield, Zap, Heart, Award, Clock, Server, Eye, Target,
    BookOpen, CheckCircle2, Home, BarChart3,
};

interface StatItem {
    id: number; label: string; value: string; prefix: string | null; suffix: string | null;
    description: string | null; icon: string;
}

export default function StatsGrid({ items }: { items: StatItem[] }) {
    const accent = 'var(--isp-primary)';

    if (items.length === 0) return null;

    return (
        <section className="bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Our Impact
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">At a Glance</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {items.map((stat) => {
                        const Icon = iconMap[stat.icon] ?? TrendingUp;
                        return (
                            <div
                                key={stat.id}
                                className="group rounded-2xl border border-gray-100 bg-white p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 sm:p-6"
                            >
                                <div
                                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                                    style={{
                                        background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                        color: accent,
                                    }}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">{stat.prefix}{stat.value}{stat.suffix}</p>
                                <p className="mt-1 text-xs font-medium text-gray-500">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
