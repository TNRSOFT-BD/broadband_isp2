import SciFiImageFrame from '@/components/about/sci-fi-image-frame';

interface CompanyData {
    eyebrow: string;
    title: string | null;
    content: string | null;
    image: string | null;
    imageAlt: string | null;
}

export default function CompanyIntro({ data }: { data: CompanyData }) {
    const accent = 'var(--isp-primary)';

    if (!data.content) return null;

    const paragraphs = data.content.split('\n').filter((p) => p.trim());

    return (
        <section className="relative bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
                    {/* Content */}
                    <div>
                        <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                            {data.eyebrow}
                        </h2>
                        <div className="mb-8 h-1 w-12 rounded-full" style={{ background: accent }} />

                        {data.title && <h3 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">{data.title}</h3>}

                        {paragraphs.map((p, i) => (
                            <p key={i} className="mb-4 text-base leading-relaxed text-gray-600 text-justify">
                                {p}
                            </p>
                        ))}
                    </div>

                    {/* Image */}
                    {data.image && <SciFiImageFrame src={data.image} alt={data.imageAlt ?? 'Company'} />}
                </div>
            </div>
        </section>
    );
}
