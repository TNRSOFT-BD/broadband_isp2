<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAboutImageRequest extends FormRequest
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
            'image' => ['required', 'image', 'max:1024'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'image.max' => 'The image must not be larger than 1 MB.',
            'image.image' => 'The file must be an image (JPG, PNG, WebP, etc.).',
        ];
    }
}
