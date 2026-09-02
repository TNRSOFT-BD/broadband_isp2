export interface QuickContactMethod {
    id: number;
    icon: string;
    label: string;
    value: string;
    description?: string | null;
    href?: string | null;
}

export interface ContactInquiryType {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    target_department?: string | null;
    email_recipient?: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface ContactMessage {
    id: number;
    inquiry_type_id?: number | null;
    name: string;
    phone?: string | null;
    email?: string | null;
    subject: string;
    message: string;
    additional_data?: Record<string, unknown> | null;
    status: string;
    read_at?: string | null;
    resolved_at?: string | null;
    created_at: string;
    updated_at: string;
    inquiryType?: { id: number; name: string; slug: string } | null;
}

export interface OfficeLocation {
    id: number;
    name: string;
    slug: string;
    type?: string | null;
    address: string;
    phone?: string | null;
    email?: string | null;
    google_maps_url?: string | null;
    location_query?: string | null;
    map_url?: string | null;
    map_embed_url?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    office_hours?: string | null;
    sort_order: number;
    is_active: boolean;
}

export interface ContactPageSettings {
    hero_eyebrow: string;
    hero_title: string;
    hero_highlight?: string | null;
    hero_description?: string | null;
    hero_background_image?: string | null;
    hero_cta_primary_text: string;
    hero_cta_primary_url: string;
    hero_cta_secondary_text: string;
    hero_cta_secondary_url?: string | null;

    quick_contact_enabled: boolean;
    quick_contact_title: string;
    quick_contact_description?: string | null;

    contact_form_enabled: boolean;
    contact_form_title: string;
    contact_form_description?: string | null;
    contact_form_success_message: string;

    locations_enabled: boolean;
    locations_title: string;
    locations_description?: string | null;

    hours_enabled: boolean;
    hours_title: string;
    hours_description?: string | null;

    faq_enabled: boolean;
    faq_title: string;
    faq_description?: string | null;

    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;

    office_hours_entries?: OfficeHoursEntry[];
    faq_items?: FAQItem[];

    is_active: boolean;
}

export interface OfficeHoursEntry {
    icon: string;
    title: string;
    schedule: string;
    note?: string;
}


export interface FAQItem {
    question: string;
    answer: string;
}
