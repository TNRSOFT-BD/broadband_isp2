import { usePage } from '@inertiajs/react';

interface PaymentPartnerData {
    id: number;
    name: string;
    image: string;
    website_link: string | null;
}

export default function PaymentPartner() {
    const page = usePage();
    const partner = page.props.activePaymentPartner as PaymentPartnerData | undefined;
    const accent = 'var(--isp-primary)';

    // Don't render anything if no active payment partner
    if (!partner || !partner.image) {
        return null;
    }

    const imageContent = (
        <img
            src={partner.image}
            alt={partner.name}
            className="mx-auto h-auto max-w-7xl object-contain"
            loading="lazy"
        />
    );

    return (
        <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center sm:mb-16">
                    <h2
                        className="mb-3 text-sm font-bold uppercase tracking-wider"
                        style={{ color: accent }}
                    >
                        Payment Partner
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                </div>

                {partner.website_link ? (
                    <a
                        href={partner.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-opacity hover:opacity-90"
                        aria-label={`Visit ${partner.name}`}
                    >
                        {imageContent}
                    </a>
                ) : (
                    imageContent
                )}
            </div>
        </section>
    );
}
