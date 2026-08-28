import { Eye, Target, Shield, Users, Zap, Heart, Award, Globe, Clock, Headphones } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Eye, Target, Shield, Users, Zap, Heart, Award, Globe, Clock, Headphones,
};

interface VisionMissionData {
    title: string;
    description: string | null;
    icon: string;
}

export default function VisionMission({ vision, mission }: { vision: VisionMissionData; mission: VisionMissionData }) {
    const accent = 'var(--isp-primary)';
    const items = [vision, mission];

    return (
        <section className="relative bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                    {items.map((item) => {
                        const Icon = iconMap[item.icon] ?? Eye;
                        return (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 sm:p-8 lg:p-10"
                            >
                                <div
                                    className="absolute left-0 top-0 h-1 w-full"
                                    style={{ background: accent }}
                                />
                                <div
                                    className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300"
                                    style={{
                                        background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                        color: accent,
                                    }}
                                >
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-gray-900">{item.title}</h3>
                                <p className="leading-relaxed text-gray-500 text-justify">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
