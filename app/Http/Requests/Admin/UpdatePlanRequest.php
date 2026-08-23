<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePlanRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'alpha_dash'],
            'plan_category_id' => ['required', 'integer', 'exists:plan_categories,id'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            'speed' => ['required', 'numeric', 'min:1', 'max:999999'],
            'speed_unit' => ['required', 'string', 'in:Mbps,Gbps,Kbps'],
            'download_speed' => ['nullable', 'numeric', 'min:0', 'max:999999'],
            'upload_speed' => ['nullable', 'numeric', 'min:0', 'max:999999'],

            'monthly_price' => ['required', 'numeric', 'min:0', 'max:99999999'],
            'quarterly_price' => ['nullable', 'numeric', 'min:0', 'max:99999999'],
            'yearly_price' => ['nullable', 'numeric', 'min:0', 'max:99999999'],
            'setup_fee' => ['nullable', 'numeric', 'min:0', 'max:99999999'],
            'vat_information' => ['nullable', 'string', 'max:255'],

            'contract_duration' => ['nullable', 'string', 'max:100'],
            'fair_usage_policy' => ['nullable', 'string'],
            'terms_conditions' => ['nullable', 'string'],

            'badge_text' => ['nullable', 'string', 'max:50'],
            'is_featured' => ['boolean'],
            'is_recommended' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],

            'cta_text' => ['nullable', 'string', 'max:100'],
            'cta_url' => ['nullable', 'string', 'max:512'],

            // Features repeater
            'features' => ['nullable', 'array'],
            'features.*.title' => ['required_with:features', 'string', 'max:255'],
            'features.*.icon' => ['nullable', 'string', 'max:50'],
            'features.*.description' => ['nullable', 'string', 'max:500'],

            // Included services
            'services' => ['nullable', 'array'],
            'services.*.service_id' => ['required_with:services', 'integer', 'exists:services,id'],
            'services.*.custom_label' => ['nullable', 'string', 'max:100'],
            'services.*.custom_note' => ['nullable', 'string', 'max:255'],
            'services.*.duration' => ['nullable', 'string', 'max:100'],
            'services.*.is_included' => ['boolean'],
            'services.*.is_featured' => ['boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_featured' => $this->boolean('is_featured'),
            'is_recommended' => $this->boolean('is_recommended'),
            'is_active' => $this->boolean('is_active'),
            'setup_fee' => $this->input('setup_fee') !== null ? $this->input('setup_fee') : 0,
        ]);
    }
}
