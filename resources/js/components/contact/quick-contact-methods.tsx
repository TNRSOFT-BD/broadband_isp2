import { type ContactPageSettings } from '@/types/contact';
import { Phone, Mail, MessageCircle, Headphones } from 'lucide-react';

interface QuickContactMethodsProps {
    settings: ContactPageSettings;
}

interface ContactMethod {
    icon: React.ReactNode;
    label: string;
    value: string;
    description: string;
    href: string;
    color: string;
}

export default function QuickContactMethods({ settings }: QuickContactMethodsProps) {
    if (!settings.quick_contact_enabled) return null;

    const accent = 'var(--isp-primary)';

    const methods: ContactMethod[] = [
        {
            icon: <Phone className="h-6 w-6" />,
            label: 'Call Us',
            value: '+1 (800) 123-4567',
            description: 'Available during support hours.',
            href: 'tel:+18001234567',
            color: accent,
        },
        {
            icon: <Mail className="h-6 w-6" />,
            label: 'Email Us',
            value: 'support@vibranet.com',
            description: 'Send us your questions anytime.',
            href: 'mailto:support@vibranet.com',
            color: accent,
        },
        {
            icon: <MessageCircle className="h-6 w-6" />,
            label: 'WhatsApp',
            value: 'Chat with us',
            description: 'Chat with our support team.',
            href: 'https://wa.me/18001234567',
            color: accent,
        },
        {
            icon: <Headphones className="h-6 w-6" />,
            label: 'Customer Support',
            value: '24/7 Available',
            description: 'Get help whenever you need it.',
            href: '#contact-form',
            color: accent,
        },
    ];

    return (
        <section className="relative bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {settings.quick_contact_title}
                    </h2>
                    {settings.quick_contact_description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                            {settings.quick_contact_description}
                        </p>
                    )}
                </div>

                {/* Contact method cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {methods.map((method) => (
                        <a
                            key={method.label}
                            href={method.href}
                            className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-[var(--isp-primary)]/30 hover:shadow-lg hover:shadow-gray-200/50"
                        >
                            {/* Icon */}
                            <div
                                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                                style={{
                                    background: `color-mix(in srgb, ${method.color} 10%, transparent)`,
                                    color: method.color,
                                }}
                            >
                                {method.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-gray-900">{method.label}</h3>
                            <p className="mt-1 text-sm font-semibold" style={{ color: method.color }}>
                                {method.value}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">{method.description}</p>

                            {/* Hover arrow */}
                            <div className="absolute right-4 top-6 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                <svg className="h-5 w-5" style={{ color: method.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
