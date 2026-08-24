import { Landmark, Building2, GraduationCap, Zap, Home, Users } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Landmark, Building2, GraduationCap, Zap, Home, Users,
};

interface ClientsData {
    title: string;
    description: string | null;
    items: Array<{ id: number; name: string; logo: string | null; website_url: string | null; category: string | null }>;
}

export default function ClientsSection({ data }: { data: ClientsData }) {
    const accent = 'var(--isp-primary)';

    if (data.items.length === 0) return null;

    return (
        <section className="relative bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-4 text-center">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Our Clients
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">{data.title}</h3>
                    {data.description && (
                        <p className="mx-auto mt-4 max-w-2xl text-gray-600 text-justify">{data.description}</p>
                    )}
                </div>

                <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((client) => {
                        const CategoryIcon = iconMap[client.category ?? ''] ?? Users;
                        return (
                            <div
                                key={client.id}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50"
                            >
                                {client.logo ? (
                                    <img src={client.logo} alt={client.name} className="mx-auto mb-4 h-16 w-auto object-contain" loading="lazy" />
                                ) : (
                                    <div
                                        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300"
                                        style={{
                                            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                            color: accent,
                                        }}
                                    >
                                        <CategoryIcon className="h-7 w-7" />
                                    </div>
                                )}
                                <h4 className="mb-2 text-lg font-bold text-gray-900">{client.name}</h4>
                                {client.category && <p className="text-sm text-gray-500">{client.category}</p>}
                                {client.website_url && (
                                    <a href={client.website_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-[var(--isp-primary)] hover:underline">Visit Website</a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
