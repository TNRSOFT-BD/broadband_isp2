<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateThemeRequest extends FormRequest
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
            'colors' => 'required|array',
            'colors.primary' => 'required|string|regex:/^#[a-f0-9]{6}$/i',
            'colors.primary_dark' => 'required|string|regex:/^#[a-f0-9]{6}$/i',
            'colors.secondary' => 'required|string|regex:/^#[a-f0-9]{6}$/i',
            'colors.accent' => 'required|string|regex:/^#[a-f0-9]{6}$/i',
            'colors.success' => 'required|string|regex:/^#[a-f0-9]{6}$/i',
            'colors.warning' => 'required|string|regex:/^#[a-f0-9]{6}$/i',
            'colors.error' => 'required|string|regex:/^#[a-f0-9]{6}$/i',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'colors.primary.regex' => 'Primary color must be a valid hex color (e.g., #2563EB).',
            'colors.primary_dark.regex' => 'Primary dark color must be a valid hex color.',
            'colors.secondary.regex' => 'Secondary color must be a valid hex color.',
            'colors.accent.regex' => 'Accent color must be a valid hex color.',
        ];
    }
}
