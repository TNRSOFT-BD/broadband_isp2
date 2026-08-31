import { type ContactPageSettings, type OfficeLocation } from '@/types/contact';
import { useState } from 'react';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

interface OfficeLocationsProps {
    settings: ContactPageSettings;
    locations: OfficeLocation[];
}

export default function OfficeLocations({ settings, locations }: OfficeLocationsProps) {
    const [selectedLocation, setSelectedLocation] = useState<OfficeLocation | null>(locations[0] ?? null);

    if (!settings.locations_enabled || locations.length === 0) return null;

    return (
        <section className="relative bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-8 text-center">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                        {settings.locations_title}
                    </h2>
                    {settings.locations_description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 text-justify">
                            {settings.locations_description}
                        </p>
                    )}
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Location cards */}
                    <div className="flex flex-col gap-4">
                        {locations.map((location) => (
                            <button
                                key={location.id}
                                type="button"
                                onClick={() => setSelectedLocation(location)}
                                className={`flex w-full flex-1 flex-col justify-center rounded-2xl border p-6 text-left transition-all duration-300 ${
                                    selectedLocation?.id === location.id
                                        ? 'border-[var(--isp-primary)] bg-[var(--isp-primary)]/5 shadow-lg shadow-gray-200/50'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                            selectedLocation?.id === location.id
                                                ? 'bg-[var(--isp-primary)] text-white'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}
                                    >
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                                        {location.type && (
                                            <span className="mt-0.5 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                                                {location.type.replace(/_/g, ' ')}
                                            </span>
                                        )}
                                        <p className="mt-2 text-sm text-gray-500">{location.address}</p>
                                        {location.phone && (
                                            <a
                                                href={`tel:${location.phone}`}
                                                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--isp-primary)] hover:underline"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Phone className="h-3.5 w-3.5" />
                                                {location.phone}
                                            </a>
                                        )}
                                        {location.email && (
                                            <a
                                                href={`mailto:${location.email}`}
                                                className="mt-1 block text-sm text-gray-500 hover:text-[var(--isp-primary)]"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Mail className="mr-1 inline h-3.5 w-3.5" />
                                                {location.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Map */}
                    <div className="flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                        {selectedLocation && (() => {
                            // Priority 1: coordinates
                            if (selectedLocation.latitude && selectedLocation.longitude) {
                                return (
                                    <iframe
                                        src={`https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}&output=embed`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: '300px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map of ${selectedLocation.name}`}
                                        className="h-full w-full"
                                    />
                                );
                            }
                            // Priority 2: location query
                            const locQuery = selectedLocation.location_query;
                            if (locQuery && typeof locQuery === 'string' && locQuery.trim()) {
                                return (
                                    <iframe
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(locQuery)}&output=embed`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: '300px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map of ${selectedLocation.name}`}
                                        className="h-full w-full"
                                    />
                                );
                            }
                            // Priority 3: fallback
                            if (selectedLocation.map_url) {
                                return (
                                    <a
                                        href={selectedLocation.map_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-3 text-[var(--isp-primary)] transition-colors hover:text-[var(--isp-primary-dark)]"
                                    >
                                        <ExternalLink className="h-12 w-12" />
                                        <span className="text-sm font-semibold">Open in Google Maps</span>
                                    </a>
                                );
                            }
                            return (
                                <div className="text-center">
                                    <MapPin className="mx-auto h-12 w-12 text-gray-500" />
                                    <p className="mt-3 text-sm text-gray-500">No map available for this location</p>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </section>
    );
}
