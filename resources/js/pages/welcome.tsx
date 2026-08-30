import PublicLayout from '@/layouts/public-layout';
import { Head, usePage } from '@inertiajs/react';
import HeroSection from '@/components/hero-section';
import IntroSection from '@/components/home/intro-section';
import FeaturedPlansSection from '@/components/home/featured-plans-section';
import WhyChooseUsSection from '@/components/home/why-choose-us-section';
import ServicesSection from '@/components/home/services-section';
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
    introFeatures?: Array<{
        id: number;
        label: string;
        sub_label: string | null;
        icon: string | null;
        color: string | null;
    }>;
    sectionVisibility?: Record<string, boolean>;
}

export default function Welcome() {
    const props = usePage().props as unknown as HomepageProps;
    const vis = props.sectionVisibility ?? {};

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
                <IntroSection data={props.intro} features={vis.introFeatures === false ? [] : (props.introFeatures ?? [])} />
            )}

            {props.featuredPlans && props.featuredPlans.length > 0 && (
                <FeaturedPlansSection plans={props.featuredPlans} />
            )}

            {props.whyChooseUs && props.whyChooseUs.length > 0 && (
                <WhyChooseUsSection items={props.whyChooseUs} />
            )}

            {props.services && props.services.length > 0 && (
                <ServicesSection services={props.services} />
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
