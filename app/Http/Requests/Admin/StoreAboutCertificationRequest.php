<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreAboutCertificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'icon' => ['nullable', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'certificate_number' => ['nullable', 'string', 'max:255'],
            'issuing_organization' => ['nullable', 'string', 'max:255'],
            'issue_date' => ['nullable', 'date'],
            'expiry_date' => ['nullable', 'date', 'after_or_equal:issue_date'],
            'certificate_image' => ['nullable', 'string', 'max:512'],
            'verification_url' => ['nullable', 'string', 'max:512'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
