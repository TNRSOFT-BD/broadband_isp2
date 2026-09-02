<?php

namespace App\Http\Requests\Admin;

use App\Models\LegalPage;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLegalPageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id');

        // Resolve the actual numeric ID from slug or integer
        $numericId = null;
        if ($id) {
            $page = is_numeric($id)
                ? LegalPage::find((int) $id)
                : LegalPage::where('slug', $id)->first();
            $numericId = $page?->id;
        }

        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:legal_pages,slug,' . ($numericId ?? 'NULL')],
            'page_type' => ['sometimes', 'required', 'string', 'max:50'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'content_json' => ['nullable'],
            'content_html' => ['nullable', 'string'],
            'status' => ['sometimes', 'required', 'string', 'in:draft,published'],
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
