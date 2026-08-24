<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAboutPageSettingsRequest extends FormRequest
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
            'hero_description' => ['nullable', 'string', 'max:2000'],
            'hero_primary_cta_text' => ['nullable', 'string', 'max:100'],
            'hero_primary_cta_url' => ['nullable', 'string', 'max:512'],
            'hero_secondary_cta_text' => ['nullable', 'string', 'max:100'],
            'hero_secondary_cta_url' => ['nullable', 'string', 'max:512'],
            'hero_image' => ['nullable', 'string', 'max:512'],
            'hero_image_alt' => ['nullable', 'string', 'max:255'],

            // Company
            'company_eyebrow' => ['nullable', 'string', 'max:255'],
            'company_title' => ['nullable', 'string', 'max:255'],
            'company_content' => ['nullable', 'string', 'max:10000'],
            'company_image' => ['nullable', 'string', 'max:512'],
            'company_image_alt' => ['nullable', 'string', 'max:255'],

            // Vision
            'vision_title' => ['nullable', 'string', 'max:255'],
            'vision_description' => ['nullable', 'string', 'max:2000'],
            'vision_icon' => ['nullable', 'string', 'max:50'],

            // Mission
            'mission_title' => ['nullable', 'string', 'max:255'],
            'mission_description' => ['nullable', 'string', 'max:2000'],
            'mission_icon' => ['nullable', 'string', 'max:50'],

            // Capabilities section
            'capabilities_eyebrow' => ['nullable', 'string', 'max:255'],
            'capabilities_title' => ['nullable', 'string', 'max:255'],
            'capabilities_description' => ['nullable', 'string', 'max:2000'],
            'capabilities_image' => ['nullable', 'string', 'max:512'],
            'capabilities_image_alt' => ['nullable', 'string', 'max:255'],

            // Clients section
            'clients_title' => ['nullable', 'string', 'max:255'],
            'clients_description' => ['nullable', 'string', 'max:2000'],

            // Certifications section
            'certifications_title' => ['nullable', 'string', 'max:255'],
            'certifications_description' => ['nullable', 'string', 'max:2000'],

            // CTA
            'cta_eyebrow' => ['nullable', 'string', 'max:255'],
            'cta_title' => ['nullable', 'string', 'max:255'],
            'cta_description' => ['nullable', 'string', 'max:2000'],
            'cta_primary_button_text' => ['nullable', 'string', 'max:100'],
            'cta_primary_button_url' => ['nullable', 'string', 'max:512'],
            'cta_secondary_button_text' => ['nullable', 'string', 'max:100'],
            'cta_secondary_button_url' => ['nullable', 'string', 'max:512'],
            'cta_background_image' => ['nullable', 'string', 'max:512'],
            'cta_background_image_alt' => ['nullable', 'string', 'max:255'],

            // Section visibility
            'hero_enabled' => ['boolean'],
            'company_enabled' => ['boolean'],
            'statistics_enabled' => ['boolean'],
            'vision_mission_enabled' => ['boolean'],
            'core_values_enabled' => ['boolean'],
            'timeline_enabled' => ['boolean'],
            'capabilities_enabled' => ['boolean'],
            'clients_enabled' => ['boolean'],
            'certifications_enabled' => ['boolean'],
            'why_choose_us_enabled' => ['boolean'],
            'cta_enabled' => ['boolean'],

            // SEO
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'meta_keywords' => ['nullable', 'string', 'max:500'],
        ];
    }
}
