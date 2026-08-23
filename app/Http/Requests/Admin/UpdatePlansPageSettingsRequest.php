<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePlansPageSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'hero_eyebrow' => ['required', 'string', 'max:255'],
            'hero_title' => ['required', 'string', 'max:255'],
            'hero_highlight' => ['required', 'string', 'max:255'],
            'hero_description' => ['nullable', 'string', 'max:1000'],
            'background_image' => ['nullable', 'string', 'max:512'],

            'cta_primary_text' => ['required', 'string', 'max:100'],
            'cta_primary_url' => ['required', 'string', 'max:512'],
            'cta_secondary_text' => ['required', 'string', 'max:100'],
            'cta_secondary_url' => ['required', 'string', 'max:512'],

            'section_category_title' => ['nullable', 'string', 'max:255'],
            'section_category_description' => ['nullable', 'string', 'max:500'],
            'section_plans_title' => ['nullable', 'string', 'max:255'],
            'section_plans_description' => ['nullable', 'string', 'max:500'],

            'cta_section_enabled' => ['boolean'],
            'cta_section_title' => ['required_with:cta_section_enabled', 'string', 'max:255'],
            'cta_section_description' => ['nullable', 'string', 'max:500'],
            'cta_section_primary_text' => ['required_with:cta_section_enabled', 'string', 'max:100'],
            'cta_section_primary_url' => ['required_with:cta_section_enabled', 'string', 'max:512'],
            'cta_section_secondary_text' => ['nullable', 'string', 'max:100'],
            'cta_section_secondary_url' => ['nullable', 'string', 'max:512'],
            'cta_section_background_image' => ['nullable', 'string', 'max:512'],

            'currency_symbol' => ['required', 'string', 'max:10'],
            'currency_code' => ['required', 'string', 'max:10'],

            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'meta_keywords' => ['nullable', 'string', 'max:500'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'cta_section_enabled' => $this->boolean('cta_section_enabled'),
        ]);
    }
}
