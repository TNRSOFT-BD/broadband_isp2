import { type ContactPageSettings } from '@/types/contact';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ContactFAQProps {
    settings: ContactPageSettings;
}

export default function ContactFAQ({ settings }: ContactFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!settings.faq_enabled) return null;

    const faqs = settings.faq_items ?? [];
    if (faqs.length === 0) return null;

    return (
        <section id="faq" className="relative bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-8 text-center">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                        {settings.faq_title}
                    </h2>
                    {settings.faq_description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 text-justify">
                            {settings.faq_description}
                        </p>
                    )}
                </div>

                {/* FAQ accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300"
                        >
                            <button
                                type="button"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between px-6 py-4 text-left"
                                aria-expanded={openIndex === index}
                            >
                                <span className="pr-4 text-base font-semibold text-gray-900">{faq.question}</span>
                                <ChevronDown
                                    className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="border-t border-gray-100 px-6 pb-5 pt-4">
                                    <p className="text-sm leading-relaxed text-gray-500 text-justify">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
