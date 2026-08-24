import ContactHero from '@/components/contact/contact-hero';
import QuickContactMethods from '@/components/contact/quick-contact-methods';
import ContactForm from '@/components/contact/contact-form';
import OfficeLocations from '@/components/contact/office-locations';
import OfficeHours from '@/components/contact/office-hours';
import HelpfulResources from '@/components/contact/helpful-resources';
import ContactFAQ from '@/components/contact/contact-faq';
import PublicLayout from '@/layouts/public-layout';
import { type ContactPageSettings, type ContactInquiryType, type OfficeLocation } from '@/types/contact';
import { Head, usePage } from '@inertiajs/react';

interface ContactIndexProps extends Record<string, unknown> {
    pageSettings: ContactPageSettings;
    inquiryTypes: ContactInquiryType[];
    officeLocations: OfficeLocation[];
}

export default function ContactIndex() {
    const { pageSettings, inquiryTypes, officeLocations } = usePage<ContactIndexProps>().props;
    const page = usePage();
    const flash = (page.props as Record<string, unknown>).flash as { success?: string } | undefined;

    return (
        <PublicLayout>
            <Head>
                <title>{pageSettings.meta_title ?? 'Contact Us'}</title>
                {pageSettings.meta_description && <meta name="description" content={pageSettings.meta_description} />}
                {pageSettings.meta_keywords && <meta name="keywords" content={pageSettings.meta_keywords} />}
                <meta property="og:title" content={pageSettings.meta_title ?? 'Contact Us'} />
                {pageSettings.meta_description && <meta property="og:description" content={pageSettings.meta_description} />}
                <meta property="og:type" content="website" />
            </Head>

            {/* Hero */}
            <ContactHero settings={pageSettings} />

            {/* Quick Contact Methods */}
            <QuickContactMethods settings={pageSettings} />

            {/* Contact Form */}
            <ContactForm
                settings={pageSettings}
                inquiryTypes={inquiryTypes}
                successMessage={flash?.success}
            />

            {/* Office Locations */}
            <OfficeLocations settings={pageSettings} locations={officeLocations} />

            {/* Office Hours */}
            <OfficeHours settings={pageSettings} />

            {/* Helpful Resources */}
            <HelpfulResources settings={pageSettings} />

            {/* FAQ */}
            <ContactFAQ settings={pageSettings} />
        </PublicLayout>
    );
}
