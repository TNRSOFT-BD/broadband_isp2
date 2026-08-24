<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactPageSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Hero
            'hero_eyebrow' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['nullable', 'string', 'max:255'],
            'hero_highlight' => ['nullable', 'string', 'max:255'],
            'hero_description' => ['nullable', 'string', 'max:2000'],
            'hero_background_image' => ['nullable', 'string', 'max:512'],
            'hero_cta_primary_text' => ['nullable', 'string', 'max:100'],
            'hero_cta_primary_url' => ['nullable', 'string', 'max:512'],
            'hero_cta_secondary_text' => ['nullable', 'string', 'max:100'],
            'hero_cta_secondary_url' => ['nullable', 'string', 'max:512'],

            // Quick Contact
            'quick_contact_enabled' => ['boolean'],
            'quick_contact_title' => ['nullable', 'string', 'max:255'],
            'quick_contact_description' => ['nullable', 'string', 'max:1000'],

            // Contact Form
            'contact_form_enabled' => ['boolean'],
            'contact_form_title' => ['nullable', 'string', 'max:255'],
            'contact_form_description' => ['nullable', 'string', 'max:1000'],
            'contact_form_success_message' => ['nullable', 'string', 'max:1000'],

            // Locations
            'locations_enabled' => ['boolean'],
            'locations_title' => ['nullable', 'string', 'max:255'],
            'locations_description' => ['nullable', 'string', 'max:1000'],

            // Hours
            'hours_enabled' => ['boolean'],
            'hours_title' => ['nullable', 'string', 'max:255'],
            'hours_description' => ['nullable', 'string', 'max:1000'],

            // Resources
            'resources_enabled' => ['boolean'],
            'resources_title' => ['nullable', 'string', 'max:255'],
            'resources_description' => ['nullable', 'string', 'max:1000'],

            // FAQ
            'faq_enabled' => ['boolean'],
            'faq_title' => ['nullable', 'string', 'max:255'],
            'faq_description' => ['nullable', 'string', 'max:1000'],

            // Dynamic content
            'office_hours_entries' => ['nullable', 'array'],
            'office_hours_entries.*.icon' => ['required_with:office_hours_entries', 'string', 'max:50'],
            'office_hours_entries.*.title' => ['required_with:office_hours_entries', 'string', 'max:100'],
            'office_hours_entries.*.schedule' => ['required_with:office_hours_entries', 'string', 'max:255'],
            'office_hours_entries.*.note' => ['nullable', 'string', 'max:500'],
            'helpful_resources' => ['nullable', 'array'],
            'helpful_resources.*.icon' => ['required_with:helpful_resources', 'string', 'max:50'],
            'helpful_resources.*.title' => ['required_with:helpful_resources', 'string', 'max:100'],
            'helpful_resources.*.description' => ['required_with:helpful_resources', 'string', 'max:500'],
            'helpful_resources.*.href' => ['required_with:helpful_resources', 'string', 'max:512'],
            'faq_items' => ['nullable', 'array'],
            'faq_items.*.question' => ['required_with:faq_items', 'string', 'max:500'],
            'faq_items.*.answer' => ['required_with:faq_items', 'string', 'max:2000'],

            // SEO
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'meta_keywords' => ['nullable', 'string', 'max:500'],
        ];
    }
}
