import AboutHero from '@/components/about/about-hero';
import CompanyIntro from '@/components/about/company-intro';
import StatsGrid from '@/components/about/stats-grid';
import VisionMission from '@/components/about/vision-mission';
import CoreValues from '@/components/about/core-values';
import Timeline from '@/components/about/timeline';
import Capabilities from '@/components/about/capabilities';
import ClientsSection from '@/components/about/clients-section';
import CertificationsSection from '@/components/about/certifications-section';
import WhyChooseUs from '@/components/about/why-choose-us';
import PublicLayout from '@/layouts/public-layout';
import { Head, usePage } from '@inertiajs/react';

interface AboutData {
    hero: { eyebrow: string; title: string; description: string; primaryCta: { text: string; url: string }; secondaryCta: { text: string; url: string }; image: string; imageAlt: string };
    company: { eyebrow: string; title: string | null; content: string | null; image: string | null; imageAlt: string | null };
    statistics: Array<{ id: number; label: string; value: string; prefix: string | null; suffix: string | null; description: string | null; icon: string }>;
    vision: { title: string; description: string | null; icon: string };
    mission: { title: string; description: string | null; icon: string };
    coreValues: Array<{ id: number; icon: string; title: string; description: string }>;
    milestones: Array<{ id: number; year: string; title: string; description: string; image: string | null; image_alt: string | null }>;
    capabilities: { eyebrow: string; title: string; description: string | null; image: string | null; imageAlt: string | null; features: Array<{ id: number; icon: string; title: string; description: string }> };
    clients: { title: string; description: string | null; items: Array<{ id: number; name: string; logo: string | null; website_url: string | null; category: string | null }> };
    certifications: { title: string; description: string | null; items: Array<{ id: number; icon: string; title: string; description: string | null; certificate_number: string | null; issuing_organization: string | null; verification_url: string | null }> };
    whyChooseUs: Array<{ id: number; icon: string; title: string; description: string }>;
    cta: { eyebrow: string | null; title: string; description: string | null; primaryButton: { text: string; url: string }; secondaryButton: { text: string; url: string }; backgroundImage: string | null };
    sections: Record<string, boolean>;
    seo: { title: string | null; description: string | null; keywords: string | null };
}

interface PageProps extends Record<string, unknown> {
    about: AboutData;
}

export default function AboutIndex() {
    const { about } = usePage<PageProps>().props;

    return (
        <PublicLayout>
            <Head>
                <title>{about.seo?.title ?? 'About Us'}</title>
                {about.seo?.description && <meta name="description" content={about.seo.description} />}
                <meta property="og:title" content={about.seo?.title ?? 'About Us'} />
                {about.seo?.description && <meta property="og:description" content={about.seo.description} />}
                <meta property="og:type" content="website" />
            </Head>

            {/* Hero */}
            {about.sections?.hero !== false && <AboutHero data={about.hero} />}

            {/* Who We Are */}
            {about.sections?.company !== false && <CompanyIntro data={about.company} />}

            {/* Statistics */}
            {about.sections?.statistics !== false && <StatsGrid items={about.statistics} />}

            {/* Vision & Mission */}
            {about.sections?.visionMission !== false && <VisionMission vision={about.vision} mission={about.mission} />}

            {/* Core Values */}
            {about.sections?.coreValues !== false && <CoreValues items={about.coreValues} />}

            {/* Journey Timeline */}
            {about.sections?.timeline !== false && <Timeline items={about.milestones} />}

            {/* Network Capabilities */}
            {about.sections?.capabilities !== false && <Capabilities data={about.capabilities} />}

            {/* Who We Serve */}
            {about.sections?.clients !== false && <ClientsSection data={about.clients} />}

            {/* Certifications */}
            {about.sections?.certifications !== false && <CertificationsSection data={about.certifications} />}

            {/* Why Choose Us */}
            {about.sections?.whyChooseUs !== false && <WhyChooseUs items={about.whyChooseUs} />}
        </PublicLayout>
    );
}
