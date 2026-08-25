import { Star, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    customer_name: string;
    customer_role: string | null;
    company_name: string | null;
    avatar: string | null;
    content: string;
    rating: number | null;
}

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    if (items.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="test-fade mb-12 text-center sm:mb-16">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Testimonials
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Trusted Connections. Real Experiences.
                    </h3>
                </div>

                {/* Testimonial Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((t, i) => (
                        <div
                            key={t.id}
                            className="test-card group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {/* Quote icon */}
                            <Quote className="mb-4 h-8 w-8 opacity-10" style={{ color: accent }} />

                            {/* Rating */}
                            {t.rating && (
                                <div className="mb-3 flex items-center gap-0.5">
                                    {[...Array(5)].map((_, j) => (
                                        <Star
                                            key={j}
                                            className={`h-4 w-4 ${j < t.rating! ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Content */}
                            <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                &ldquo;{t.content}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                {t.avatar ? (
                                    <img
                                        src={t.avatar}
                                        alt={t.customer_name}
                                        className="h-10 w-10 rounded-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                                        style={{ background: `linear-gradient(135deg, ${accent}, ${accentAlt})` }}
                                    >
                                        {t.customer_name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{t.customer_name}</p>
                                    <p className="text-xs text-gray-500">
                                        {t.customer_role}
                                        {t.company_name && <span> at {t.company_name}</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes testFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .test-fade { animation: testFadeUp 0.6s ease-out 0.1s both; }
                .test-card { animation: testFadeUp 0.6s ease-out 0.2s both; }
                .test-card:nth-child(2) { animation-delay: 0.3s; }
                .test-card:nth-child(3) { animation-delay: 0.4s; }
                @media (prefers-reduced-motion: reduce) {
                    .test-fade, .test-card { animation: none !important; opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
