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
            'logo' => ['required', 'image', 'mimes:jpg,jpeg,png,gif,bmp,tiff,ico,webp,svg', 'max:10'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'logo.max' => 'The logo must not be larger than 10 KB.',
            'logo.image' => 'The file must be an image (JPG, JPEG, PNG, GIF, BMP, TIFF, WebP, SVG, ICO).',
        ];
    }
}
