<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreAboutMilestoneRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'year' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'image' => ['nullable', 'string', 'max:512'],
            'image_alt' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
