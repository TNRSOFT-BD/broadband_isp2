<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreAboutCoreValueRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'icon' => ['nullable', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string', 'max:1000'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
