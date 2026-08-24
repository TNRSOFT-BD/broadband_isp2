<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreSiteImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,svg,ico', 'max:1024'],
        ];
    }

    public function messages(): array
    {
        return [
            'image.required' => 'Please choose an image to upload.',
            'image.image' => 'The file must be an image (JPG, PNG, WebP, SVG or ICO).',
            'image.mimes' => 'The image must be a file of type: JPG, JPEG, PNG, WebP, SVG or ICO.',
            'image.max' => 'The image must not be larger than 1 MB.',
        ];
    }
}
