<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSocialMediaImageRequest extends FormRequest
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
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:10'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'image.max' => 'The icon/image must not be larger than 10 KB.',
            'image.image' => 'The file must be an image (JPG, JPEG, PNG, WebP, SVG).',
            'image.mimes' => 'The file must be a JPG, JPEG, PNG, WebP, or SVG image.',
        ];
    }
}
