import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    category: string | null;
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
    const accent = 'var(--isp-primary)';
    const [openId, setOpenId] = useState<number | null>(null);

    if (items.length === 0) return null;

    const toggle = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
            <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="faq-fade mb-12 text-center sm:mb-16">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        FAQ
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                        Questions? We Have You Connected.
                    </h3>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {items.map((faq, i) => {
                        const isOpen = openId === faq.id;
                        return (
                            <div
                                key={faq.id}
                                className="faq-card overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300"
                                style={{ animationDelay: `${i * 0.06}s` }}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(faq.id)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-gray-50"
                                >
                                    <span className="text-sm font-semibold text-gray-900">{faq.question}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                        style={{ color: accent }}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    role="region"
                                >
                                    <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                                        <p className="text-sm leading-relaxed text-gray-600 text-justify">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All */}
                <div className="faq-fade mt-8 text-center">
                    <a
                        href="/faq"
                        className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: accent }}
                    >
                        View All FAQs
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes faqFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .faq-fade { animation: faqFadeUp 0.6s ease-out 0.1s both; }
                .faq-card { animation: faqFadeUp 0.5s ease-out 0.2s both; }
                .faq-card:nth-child(2) { animation-delay: 0.26s; }
                .faq-card:nth-child(3) { animation-delay: 0.32s; }
                .faq-card:nth-child(4) { animation-delay: 0.38s; }
                @media (prefers-reduced-motion: reduce) {
                    .faq-fade, .faq-card { animation: none !important; opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
