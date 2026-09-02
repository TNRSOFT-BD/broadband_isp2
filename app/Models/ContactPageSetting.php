<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_eyebrow',
        'hero_title',
        'hero_highlight',
        'hero_description',
        'hero_background_image',
        'hero_cta_primary_text',
        'hero_cta_primary_url',
        'hero_cta_secondary_text',
        'hero_cta_secondary_url',
        'quick_contact_enabled',
        'quick_contact_title',
        'quick_contact_description',
        'contact_form_enabled',
        'contact_form_title',
        'contact_form_description',
        'contact_form_success_message',
        'locations_enabled',
        'locations_title',
        'locations_description',
        'hours_enabled',
        'hours_title',
        'hours_description',
        'faq_enabled',
        'faq_title',
        'faq_description',
        'faq_selected_ids',
        'office_hours_entries',
        'faq_items',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'is_active',
    ];

    protected $casts = [
        'quick_contact_enabled' => 'boolean',
        'contact_form_enabled' => 'boolean',
        'locations_enabled' => 'boolean',
        'hours_enabled' => 'boolean',
        'faq_enabled' => 'boolean',
        'faq_selected_ids' => 'array',
        'office_hours_entries' => 'array',
        'faq_items' => 'array',
        'is_active' => 'boolean',
    ];

    public static function getActive(): ?self
    {
        return static::where('is_active', true)->first();
    }

    public static function getDefaults(): array
    {
        return [
            'hero_eyebrow' => 'Get in Touch',
            'hero_title' => 'We\'re Here to Keep You Connected',
            'hero_highlight' => null,
            'hero_description' => 'Have a question about our internet services, need technical support, or want to get connected? Our team is ready to help.',
            'hero_background_image' => null,
            'hero_cta_primary_text' => 'Send Message',
            'hero_cta_primary_url' => '#contact-form',
            'hero_cta_secondary_text' => 'Call Us',
            'hero_cta_secondary_url' => null,
            'quick_contact_enabled' => true,
            'quick_contact_title' => 'Quick Contact',
            'quick_contact_description' => null,
            'contact_form_enabled' => true,
            'contact_form_title' => 'Send Us a Message',
            'contact_form_description' => null,
            'contact_form_success_message' => 'Thank you! Your message has been received. We\'ll get back to you shortly.',
            'locations_enabled' => true,
            'locations_title' => 'Our Offices',
            'locations_description' => null,
            'hours_enabled' => true,
            'hours_title' => 'Support Availability',
            'hours_description' => null,
            'faq_enabled' => true,
            'faq_title' => 'Frequently Asked Questions',
            'faq_description' => null,
            'faq_selected_ids' => null,
            'office_hours_entries' => [
                ['icon' => 'Headphones', 'title' => 'Customer Support', 'schedule' => 'Available 24/7', 'note' => 'For urgent technical issues'],
                ['icon' => 'Users', 'title' => 'Sales Department', 'schedule' => 'Saturday – Thursday', 'note' => '9:00 AM – 8:00 PM'],
                ['icon' => 'TrendingUp', 'title' => 'Business Solutions', 'schedule' => 'Saturday – Thursday', 'note' => '10:00 AM – 6:00 PM'],
                ['icon' => 'Clock', 'title' => 'Billing Support', 'schedule' => 'Saturday – Thursday', 'note' => '9:00 AM – 7:00 PM'],
            ],
            'faq_items' => [
                ['question' => 'How can I get a new internet connection?', 'answer' => 'You can request a new connection by filling out our contact form, calling our sales team, or visiting any of our office locations. Our team will guide you through available plans in your area and schedule an installation at your convenience.'],
                ['question' => 'What should I do if my internet is down?', 'answer' => 'First, try restarting your router and modem. If the issue persists, check our coverage page for any known outages in your area. You can then contact our 24/7 customer support team for immediate assistance.'],
                ['question' => 'How can I pay my bill?', 'answer' => 'We accept multiple payment methods including online payments through our portal, bank transfers, mobile banking, and cash payments at our office locations. You can also set up automatic payments for convenience.'],
                ['question' => 'How long does installation take?', 'answer' => 'Standard residential installation typically takes 2-4 hours. Business installations may take longer depending on the complexity of the setup. Our technician will provide a more accurate estimate during the scheduling process.'],
                ['question' => 'Can I upgrade or downgrade my plan?', 'answer' => 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades are applied at the start of your next billing cycle. Contact our sales team to make any changes.'],
                ['question' => 'Do you offer business solutions?', 'answer' => 'Yes, we offer dedicated business internet solutions with guaranteed bandwidth, static IPs, SLA agreements, and priority support. Contact our business solutions team for customized packages.'],
            ],
            'meta_title' => null,
            'meta_description' => null,
            'meta_keywords' => null,
            'is_active' => true,
        ];
    }
}
