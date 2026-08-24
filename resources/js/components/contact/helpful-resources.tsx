import { type ContactPageSettings } from '@/types/contact';
import { Link } from '@inertiajs/react';
import { HelpCircle, Wifi, MapPin, Headphones, CreditCard, Wrench, Phone, Mail, MessageCircle, Globe, Clock, ExternalLink, Send, CheckCircle2, Star, Shield, Zap, Heart } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    Phone: <Phone className="h-5 w-5" />,
    Mail: <Mail className="h-5 w-5" />,
    MessageCircle: <MessageCircle className="h-5 w-5" />,
    Headphones: <Headphones className="h-5 w-5" />,
    MapPin: <MapPin className="h-5 w-5" />,
    Globe: <Globe className="h-5 w-5" />,
    Clock: <Clock className="h-5 w-5" />,
    HelpCircle: <HelpCircle className="h-5 w-5" />,
    Wifi: <Wifi className="h-5 w-5" />,
    CreditCard: <CreditCard className="h-5 w-5" />,
    Wrench: <Wrench className="h-5 w-5" />,
    ExternalLink: <ExternalLink className="h-5 w-5" />,
    Send: <Send className="h-5 w-5" />,
    CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
    Star: <Star className="h-5 w-5" />,
    Shield: <Shield className="h-5 w-5" />,
    Zap: <Zap className="h-5 w-5" />,
    Heart: <Heart className="h-5 w-5" />,
};

interface HelpfulResourcesProps {
    settings: ContactPageSettings;
}

export default function HelpfulResources({ settings }: HelpfulResourcesProps) {
    if (!settings.resources_enabled) return null;

    const resources = settings.helpful_resources ?? [];
    if (resources.length === 0) return null;

    const accent = 'var(--isp-primary)';

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
                    {resources.map((resource, index) => (
                        <Link
                            key={index}
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
                                {iconMap[resource.icon] ?? <HelpCircle className="h-5 w-5" />}
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
