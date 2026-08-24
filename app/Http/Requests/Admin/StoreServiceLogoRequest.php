<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreServiceLogoRequest extends FormRequest
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
            'logo' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:1024'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'logo.max' => 'The logo must not be larger than 1 MB.',
            'logo.image' => 'The file must be an image (JPG, PNG, WebP, SVG).',
        ];
    }
}
