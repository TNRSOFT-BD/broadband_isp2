import { type ContactPageSettings } from '@/types/contact';
import { Clock, Headphones, Users, TrendingUp, MapPin, Globe, HelpCircle, Phone, Mail, MessageCircle, CreditCard, Wrench, Wifi, ExternalLink, Send, CheckCircle2, Star, Shield, Zap, Heart } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    Phone: <Phone className="h-5 w-5" />,
    Mail: <Mail className="h-5 w-5" />,
    MessageCircle: <MessageCircle className="h-5 w-5" />,
    Headphones: <Headphones className="h-5 w-5" />,
    MapPin: <MapPin className="h-5 w-5" />,
    Globe: <Globe className="h-5 w-5" />,
    Clock: <Clock className="h-5 w-5" />,
    HelpCircle: <HelpCircle className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    TrendingUp: <TrendingUp className="h-5 w-5" />,
    CreditCard: <CreditCard className="h-5 w-5" />,
    Wrench: <Wrench className="h-5 w-5" />,
    Wifi: <Wifi className="h-5 w-5" />,
    ExternalLink: <ExternalLink className="h-5 w-5" />,
    Send: <Send className="h-5 w-5" />,
    CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
    Star: <Star className="h-5 w-5" />,
    Shield: <Shield className="h-5 w-5" />,
    Zap: <Zap className="h-5 w-5" />,
    Heart: <Heart className="h-5 w-5" />,
};

interface OfficeHoursProps {
    settings: ContactPageSettings;
}

export default function OfficeHours({ settings }: OfficeHoursProps) {
    if (!settings.hours_enabled) return null;

    const entries = settings.office_hours_entries ?? [];
    if (entries.length === 0) return null;

    const accent = 'var(--isp-primary)';

    return (
        <section className="relative bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-8 text-center">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                        {settings.hours_title}
                    </h2>
                    {settings.hours_description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 text-justify">
                            {settings.hours_description}
                        </p>
                    )}
                </div>

                {/* Hours grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {entries.map((entry, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50"
                        >
                            <div
                                className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                                style={{
                                    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                    color: accent,
                                }}
                            >
                                {iconMap[entry.icon] ?? <Clock className="h-5 w-5" />}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{entry.title}</h3>
                            <p className="mt-2 text-base font-semibold" style={{ color: accent }}>
                                {entry.schedule}
                            </p>
                            {entry.note && (
                                <p className="mt-1 text-sm text-gray-500">{entry.note}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
