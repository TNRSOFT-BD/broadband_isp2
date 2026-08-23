<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFontRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'family' => 'required|string|max:255',
            'url' => 'nullable|url|max:512',
            'weight' => 'required|string|max:50',
            'font_style' => 'required|string|in:thin,extralight,light,regular,medium,semibold,bold,extrabold,black',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Font name is required.',
            'family.required' => 'Font family is required.',
            'url.url' => 'Please enter a valid URL for the font.',
        ];
    }
}
