import { type ContactPageSettings } from '@/types/contact';
import { Link } from '@inertiajs/react';
import { HelpCircle, Wifi, MapPin, Headphones, CreditCard, Wrench } from 'lucide-react';

interface HelpfulResourcesProps {
    settings: ContactPageSettings;
}

interface Resource {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
}

export default function HelpfulResources({ settings }: HelpfulResourcesProps) {
    if (!settings.resources_enabled) return null;

    const accent = 'var(--isp-primary)';

    const resources: Resource[] = [
        {
            icon: <HelpCircle className="h-5 w-5" />,
            title: 'FAQs',
            description: 'Find answers to commonly asked questions about our services.',
            href: '#faq',
        },
        {
            icon: <Wifi className="h-5 w-5" />,
            title: 'Internet Plans',
            description: 'Explore our range of high-speed internet packages.',
            href: '/plans',
        },
        {
            icon: <MapPin className="h-5 w-5" />,
            title: 'Coverage Area',
            description: 'Check if our service is available in your area.',
            href: '#locations',
        },
        {
            icon: <Headphones className="h-5 w-5" />,
            title: 'Support Center',
            description: 'Get technical help and troubleshooting guides.',
            href: '#',
        },
        {
            icon: <CreditCard className="h-5 w-5" />,
            title: 'Billing Info',
            description: 'Learn about payment methods and billing cycles.',
            href: '#',
        },
        {
            icon: <Wrench className="h-5 w-5" />,
            title: 'Installation',
            description: 'Understand our installation process and requirements.',
            href: '#',
        },
    ];

    return (
        <section className="relative bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {settings.resources_title}
                    </h2>
                    {settings.resources_description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                            {settings.resources_description}
                        </p>
                    )}
                </div>

                {/* Resources grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {resources.map((resource) => (
                        <Link
                            key={resource.title}
                            href={resource.href}
                            className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-[var(--isp-primary)]/30 hover:shadow-lg hover:shadow-gray-200/50"
                        >
                            <div
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                                style={{
                                    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                    color: accent,
                                }}
                            >
                                {resource.icon}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 group-hover:text-[var(--isp-primary)]">
                                    {resource.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
