<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHomepageServiceRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'homepage_service_category_id' => ['nullable', 'integer', 'exists:homepage_service_categories,id'],
            'description' => ['nullable', 'string', 'max:1000'],
            'image' => ['required', 'string', 'max:512'],
            'link' => ['required', 'string', 'max:512', 'url'],
            'open_in_new_tab' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'open_in_new_tab' => $this->boolean('open_in_new_tab', true),
            'is_active' => $this->boolean('is_active', true),
        ]);
    }
}
