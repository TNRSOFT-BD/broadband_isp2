import { type ContactPageSettings } from '@/types/contact';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ContactFAQProps {
    settings: ContactPageSettings;
}

interface FAQItem {
    question: string;
    answer: string;
}

export default function ContactFAQ({ settings }: ContactFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!settings.faq_enabled) return null;

    const faqs: FAQItem[] = [
        {
            question: 'How can I get a new internet connection?',
            answer: 'You can request a new connection by filling out our contact form, calling our sales team, or visiting any of our office locations. Our team will guide you through available plans in your area and schedule an installation at your convenience.',
        },
        {
            question: 'What should I do if my internet is down?',
            answer: 'First, try restarting your router and modem. If the issue persists, check our coverage page for any known outages in your area. You can then contact our 24/7 customer support team for immediate assistance.',
        },
        {
            question: 'How can I pay my bill?',
            answer: 'We accept multiple payment methods including online payments through our portal, bank transfers, mobile banking, and cash payments at our office locations. You can also set up automatic payments for convenience.',
        },
        {
            question: 'How long does installation take?',
            answer: 'Standard residential installation typically takes 2-4 hours. Business installations may take longer depending on the complexity of the setup. Our technician will provide a more accurate estimate during the scheduling process.',
        },
        {
            question: 'Can I upgrade or downgrade my plan?',
            answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades are applied at the start of your next billing cycle. Contact our sales team to make any changes.',
        },
        {
            question: 'Do you offer business solutions?',
            answer: 'Yes, we offer dedicated business internet solutions with guaranteed bandwidth, static IPs, SLA agreements, and priority support. Contact our business solutions team for customized packages.',
        },
    ];

    return (
        <section id="faq" className="relative bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {settings.faq_title}
                    </h2>
                    {settings.faq_description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
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
                                    className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
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
                                    <p className="text-sm leading-relaxed text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
