<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuickContactMethodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'icon' => ['required', 'string', 'max:50'],
            'label' => ['required', 'string', 'max:100'],
            'value' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'href' => ['nullable', 'string', 'max:512'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_active' => ['boolean'],
            'show_in_footer' => ['boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
            'show_in_footer' => $this->boolean('show_in_footer'),
        ]);
    }
}
