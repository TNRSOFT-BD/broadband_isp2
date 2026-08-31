import PublicLayout from '@/layouts/public-layout';
import { Head, usePage } from '@inertiajs/react';
import { useLayoutEffect } from 'react';
import HeroSection from '@/components/hero-section';
import IntroSection from '@/components/home/intro-section';
import FeaturedPlansSection from '@/components/home/featured-plans-section';
import WhyChooseUsSection from '@/components/home/why-choose-us-section';
import ServicesSection from '@/components/home/services-section';
import HomepageServicesSection from '@/components/home/homepage-services-section';
import TechnologySection from '@/components/home/technology-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import PartnersSection from '@/components/home/partners-section';
import FaqSection from '@/components/home/faq-section';

interface HomepageProps {
    intro?: {
        eyebrow: string;
        title: string;
        subtitle?: string | null;
        description: string;
        cta_text: string;
        cta_url: string;
        highlights?: string[];
        trust_badge?: string | null;
        hud_panels?: Array<{
            label: string;
            position: string;
            stats: Array<{ value: string; label: string }>;
        }>;
    };
    featuredPlans?: Array<{
        id: number;
        name: string;
        tagline: string | null;
        speed: string;
        speed_unit: string;
        monthly_price: string | number;
        setup_fee: string | number;
        badge_text: string | null;
        is_featured: boolean;
        is_recommended: boolean;
        cta_text: string | null;
        cta_url: string | null;
        slug: string;
        features: Array<{ title: string; description: string | null }>;
        category: string | null;
    }>;
    whyChooseUs?: Array<{
        id: number;
        icon: string;
        title: string;
        description: string;
    }>;
    whyChooseUsSettings?: {
        eyebrow?: string;
        title?: string;
        description?: string;
    };
    statistics?: Array<{
        id: number;
        label: string;
        value: string;
        prefix: string | null;
        suffix: string | null;
        description: string | null;
        icon: string;
    }>;
    services?: Array<{
        id: number;
        name: string;
        slug: string;
        category: string;
        category_label: string;
        description: string | null;
        logo: string | null;
        website_url: string | null;
    }>;
    homepageServices?: {
        title: string;
        subtitle: string;
        categories: string[];
        items: Array<{
            id: number;
            title: string;
            category: string | null;
            description: string | null;
            image: string;
            link: string;
            open_in_new_tab: boolean;
        }>;
    };
    technology?: {
        eyebrow: string;
        title: string;
        description: string;
        image: string | null;
        capabilities: Array<{ title: string; description?: string }>;
        network_stats?: {
            uptime?: string;
            peers?: string;
        };
    };
    testimonials?: Array<{
        id: number;
        customer_name: string;
        customer_role: string | null;
        company_name: string | null;
        avatar: string | null;
        content: string;
        rating: number | null;
    }>;
    partners?: Array<{
        id: number;
        name: string;
        logo: string | null;
        website_url: string | null;
    }>;
    faqs?: Array<{
        id: number;
        question: string;
        answer: string;
        category: string | null;
    }>;
    sectionVisibility?: Record<string, boolean>;
}

export default function Welcome() {
    const props = usePage().props as unknown as HomepageProps;
    const vis = props.sectionVisibility ?? {};

    // Scroll to top before paint on mount.
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PublicLayout>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Existing Hero Section — DO NOT MODIFY */}
            <HeroSection />

            {/* Homepage sections below */}
            {vis.intro !== false && props.intro && (
                <IntroSection data={props.intro} />
            )}

            {props.featuredPlans && props.featuredPlans.length > 0 && (
                <FeaturedPlansSection plans={props.featuredPlans} />
            )}

            {props.whyChooseUs && props.whyChooseUs.length > 0 && (
                <WhyChooseUsSection items={props.whyChooseUs} settings={props.whyChooseUsSettings} />
            )}

            {props.services && props.services.length > 0 && (
                <ServicesSection services={props.services} />
            )}

            {vis.homepageServices !== false && props.homepageServices && props.homepageServices.items.length > 0 && (
                <HomepageServicesSection data={props.homepageServices} />
            )}

            {vis.technology !== false && props.technology && (
                <TechnologySection data={props.technology} />
            )}

{props.testimonials && props.testimonials.length > 0 && (
                <TestimonialsSection items={props.testimonials} />
            )}

            {props.partners && props.partners.length > 0 && (
                <PartnersSection partners={props.partners} />
            )}

            {props.faqs && props.faqs.length > 0 && (
                <FaqSection items={props.faqs} />
            )}


        </PublicLayout>
    );
}
