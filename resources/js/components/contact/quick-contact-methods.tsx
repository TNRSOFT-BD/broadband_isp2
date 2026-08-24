import { type ContactPageSettings, type QuickContactMethod } from '@/types/contact';
import { Phone, Mail, MessageCircle, Headphones, MapPin, Globe, Clock, HelpCircle } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    Phone: <Phone className="h-6 w-6" />,
    Mail: <Mail className="h-6 w-6" />,
    MessageCircle: <MessageCircle className="h-6 w-6" />,
    Headphones: <Headphones className="h-6 w-6" />,
    MapPin: <MapPin className="h-6 w-6" />,
    Globe: <Globe className="h-6 w-6" />,
    Clock: <Clock className="h-6 w-6" />,
    HelpCircle: <HelpCircle className="h-6 w-6" />,
};

interface QuickContactMethodsProps {
    settings: ContactPageSettings;
    methods: QuickContactMethod[];
}

export default function QuickContactMethods({ settings, methods }: QuickContactMethodsProps) {
    if (!settings.quick_contact_enabled) return null;

    // Hide entire section if no active methods with valid data exist
    const validMethods = methods.filter((m) => m.label && m.value);
    if (validMethods.length === 0) return null;

    const accent = 'var(--isp-primary)';

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
                <div className="flex flex-wrap justify-center gap-6">
                    {validMethods.map((method) => (
                        <div
                            key={method.id}
                            className="w-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-[var(--isp-primary)]/30 hover:shadow-lg hover:shadow-gray-200/50 sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                        >
                            {/* Icon */}
                            <div
                                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                                style={{
                                    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                    color: accent,
                                }}
                            >
                                {iconMap[method.icon] ?? <Phone className="h-6 w-6" />}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-gray-900">{method.label}</h3>
                            <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>
                                {method.value}
                            </p>
                            {method.description && (
                                <p className="mt-2 text-sm text-gray-500">{method.description}</p>
                            )}


                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
