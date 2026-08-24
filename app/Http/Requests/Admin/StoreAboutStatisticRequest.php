<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreAboutStatisticRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:100'],
            'value' => ['required', 'string', 'max:50'],
            'prefix' => ['nullable', 'string', 'max:10'],
            'suffix' => ['nullable', 'string', 'max:10'],
            'description' => ['nullable', 'string', 'max:500'],
            'icon' => ['nullable', 'string', 'max:50'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
