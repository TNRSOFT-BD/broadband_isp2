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
                    <div className="text-center sm:text-center lg:text-left">
                        <h2 className="mb-2 text-center text-sm font-bold uppercase tracking-wider sm:text-center lg:text-left" style={{ color: accent }}>
                            {data.eyebrow}
                        </h2>
                        <div className="mx-auto mb-8 h-1 w-12 rounded-full sm:mx-auto lg:mx-0" style={{ background: accent }} />

                        {data.title && <h3 className="mb-6 text-center text-3xl font-bold text-gray-900 sm:text-center sm:text-4xl lg:text-left">{data.title}</h3>}

                        {paragraphs.map((p, i) => (
                            <p key={i} className="mb-4 text-base leading-relaxed text-gray-500 text-justify">
                                {p}
                            </p>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                        {data.image && <SciFiImageFrame src={data.image} alt={data.imageAlt ?? 'Company'} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
