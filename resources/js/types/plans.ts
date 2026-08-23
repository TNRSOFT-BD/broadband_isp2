export interface PlanCategory {
    id: number;
    name: string;
    slug: string;
    icon?: string | null;
    description?: string | null;
}

export interface PlanFeature {
    id?: number;
    title: string;
    icon?: string | null;
    description?: string | null;
    sort_order?: number;
}

export interface PlanService {
    id: number;
    name: string;
    slug: string;
    logo?: string | null;
    description?: string | null;
    website_url?: string | null;
    custom_label?: string | null;
    custom_note?: string | null;
    duration?: string | null;
}

export interface Plan {
    id: number;
    name: string;
    slug: string;
    tagline?: string | null;
    description?: string | null;
    speed: string;
    speed_unit: string;
    download_speed?: string | null;
    upload_speed?: string | null;
    monthly_price: string;
    quarterly_price?: string | null;
    yearly_price?: string | null;
    setup_fee?: string | null;
    vat_information?: string | null;
    contract_duration?: string | null;
    fair_usage_policy?: string | null;
    terms_conditions?: string | null;
    badge_text?: string | null;
    is_featured: boolean;
    is_recommended: boolean;
    cta_text?: string | null;
    cta_url?: string | null;
    category?: PlanCategory | null;
    features: PlanFeature[];
    services: PlanService[];
}

export interface AdminPlan extends Plan {
    plan_category_id: number | null;
    download_speed: string | null;
    upload_speed: string | null;
    setup_fee: string | null;
    vat_information: string | null;
    contract_duration: string | null;
    fair_usage_policy: string | null;
    terms_conditions: string | null;
    is_active: boolean;
    sort_order: number;
}

export interface PlansPageSettings {
    hero_eyebrow: string;
    hero_title: string;
    hero_highlight: string;
    hero_description?: string | null;
    background_image?: string | null;
    cta_primary_text: string;
    cta_primary_url: string;
    cta_secondary_text: string;
    cta_secondary_url: string;
    section_category_title?: string | null;
    section_category_description?: string | null;
    section_plans_title?: string | null;
    section_plans_description?: string | null;
    cta_section_enabled: boolean;
    cta_section_title: string;
    cta_section_description?: string | null;
    cta_section_primary_text: string;
    cta_section_primary_url: string;
    cta_section_secondary_text: string;
    cta_section_secondary_url: string;
    cta_section_background_image?: string | null;
    currency_symbol: string;
    currency_code: string;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
}
