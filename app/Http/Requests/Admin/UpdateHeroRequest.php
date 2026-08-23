<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateHeroRequest extends FormRequest
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
            'background_image' => ['nullable', 'string', 'max:1024'],

            'badge_text' => ['nullable', 'string', 'max:255'],
            'heading_line1' => ['nullable', 'string', 'max:255'],
            'heading_highlight' => ['nullable', 'string', 'max:255'],
            'heading_line2' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:1000'],

            'cta_primary_text' => ['nullable', 'string', 'max:255'],
            'cta_primary_url' => ['nullable', 'string', 'max:512'],
            'cta_secondary_text' => ['nullable', 'string', 'max:255'],
            'cta_secondary_url' => ['nullable', 'string', 'max:512'],

            'badge_color' => ['nullable', 'string', 'max:7'],
            'heading_color' => ['nullable', 'string', 'max:7'],
            'highlight_color' => ['nullable', 'string', 'max:7'],
            'subtitle_color' => ['nullable', 'string', 'max:7'],

            'cta_primary_bg' => ['nullable', 'string', 'max:7'],
            'cta_primary_text_color' => ['nullable', 'string', 'max:7'],
            'cta_secondary_border' => ['nullable', 'string', 'max:7'],
            'cta_secondary_text_color' => ['nullable', 'string', 'max:7'],

            'feature_card_bg' => ['nullable', 'string', 'max:7'],
            'feature_card_border' => ['nullable', 'string', 'max:7'],
            'feature_label_color' => ['nullable', 'string', 'max:7'],
            'feature_desc_color' => ['nullable', 'string', 'max:7'],

            'overlay_color' => ['nullable', 'string', 'max:7'],
        ];
    }
}
