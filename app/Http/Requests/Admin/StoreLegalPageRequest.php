<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreLegalPageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:legal_pages,slug'],
            'page_type' => ['required', 'string', 'max:50'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'content_json' => ['nullable'],
            'content_html' => ['nullable', 'string'],
            'status' => ['required', 'string', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
            'show_last_updated' => ['boolean'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'og_title' => ['nullable', 'string', 'max:255'],
            'og_description' => ['nullable', 'string', 'max:500'],
            'og_image' => ['nullable', 'string', 'max:512'],
            'cta_enabled' => ['boolean'],
            'cta_title' => ['nullable', 'string', 'max:255'],
            'cta_description' => ['nullable', 'string', 'max:500'],
            'cta_button_text' => ['nullable', 'string', 'max:100'],
            'cta_button_url' => ['nullable', 'string', 'max:512'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
