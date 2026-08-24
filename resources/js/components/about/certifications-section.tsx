import { Shield, Lock, CheckCircle2, Award, Globe, Star, Heart, Zap, Eye, Target } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Shield, Lock, CheckCircle2, Award, Globe, Star, Heart, Zap, Eye, Target,
};

interface CertificationsData {
    title: string;
    description: string | null;
    items: Array<{ id: number; icon: string; title: string; description: string | null; certificate_number: string | null; issuing_organization: string | null; verification_url: string | null }>;
}

export default function CertificationsSection({ data }: { data: CertificationsData }) {
    const accent = 'var(--isp-primary)';

    if (data.items.length === 0) return null;

    return (
        <section className="bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Trust & Compliance
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">{data.title}</h3>
                    {data.description && (
                        <p className="mx-auto mt-4 max-w-2xl text-gray-600 text-justify">{data.description}</p>
                    )}
                </div>

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((cert) => {
                        const Icon = iconMap[cert.icon] ?? Shield;
                        return (
                            <div
                                key={cert.id}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50"
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
                                <h4 className="mb-2 text-lg font-bold text-gray-900">{cert.title}</h4>
                                {cert.description && <p className="text-sm leading-relaxed text-gray-600 text-justify">{cert.description}</p>}
                                {cert.issuing_organization && (
                                    <p className="mt-2 text-xs text-gray-400">Issued by: {cert.issuing_organization}</p>
                                )}
                                {cert.verification_url && (
                                    <a href={cert.verification_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-[var(--isp-primary)] hover:underline">Verify →</a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
