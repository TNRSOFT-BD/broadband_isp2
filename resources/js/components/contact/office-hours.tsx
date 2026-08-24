import { type ContactPageSettings } from '@/types/contact';
import { Clock, Headphones, Users, TrendingUp } from 'lucide-react';

interface OfficeHoursProps {
    settings: ContactPageSettings;
}

interface HoursEntry {
    icon: React.ReactNode;
    title: string;
    schedule: string;
    note?: string;
}

export default function OfficeHours({ settings }: OfficeHoursProps) {
    if (!settings.hours_enabled) return null;

    const accent = 'var(--isp-primary)';

    const entries: HoursEntry[] = [
        {
            icon: <Headphones className="h-5 w-5" />,
            title: 'Customer Support',
            schedule: 'Available 24/7',
            note: 'For urgent technical issues',
        },
        {
            icon: <Users className="h-5 w-5" />,
            title: 'Sales Department',
            schedule: 'Saturday – Thursday',
            note: '9:00 AM – 8:00 PM',
        },
        {
            icon: <TrendingUp className="h-5 w-5" />,
            title: 'Business Solutions',
            schedule: 'Saturday – Thursday',
            note: '10:00 AM – 6:00 PM',
        },
        {
            icon: <Clock className="h-5 w-5" />,
            title: 'Billing Support',
            schedule: 'Saturday – Thursday',
            note: '9:00 AM – 7:00 PM',
        },
    ];

    return (
        <section className="relative bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {settings.hours_title}
                    </h2>
                    {settings.hours_description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                            {settings.hours_description}
                        </p>
                    )}
                </div>

                {/* Hours grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {entries.map((entry) => (
                        <div
                            key={entry.title}
                            className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50"
                        >
                            <div
                                className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                                style={{
                                    background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                                    color: accent,
                                }}
                            >
                                {entry.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{entry.title}</h3>
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
