<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreSiteBrandingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site_name' => ['nullable', 'string', 'max:255'],
            'paybill_client_id' => ['nullable', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'max:512'],
            'favicon' => ['nullable', 'string', 'max:512'],
        ];
    }
}
