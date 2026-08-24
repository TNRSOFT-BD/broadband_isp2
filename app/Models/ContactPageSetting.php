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
        'resources_enabled',
        'resources_title',
        'resources_description',
        'faq_enabled',
        'faq_title',
        'faq_description',
        'faq_selected_ids',
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
        'resources_enabled' => 'boolean',
        'faq_enabled' => 'boolean',
        'faq_selected_ids' => 'array',
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
            'resources_enabled' => true,
            'resources_title' => 'Helpful Resources',
            'resources_description' => null,
            'faq_enabled' => true,
            'faq_title' => 'Frequently Asked Questions',
            'faq_description' => null,
            'faq_selected_ids' => null,
            'meta_title' => null,
            'meta_description' => null,
            'meta_keywords' => null,
            'is_active' => true,
        ];
    }
}
