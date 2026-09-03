<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->hasPermissionTo('manage-roles');
    }

    /**
     * Normalize input before validation so role names/prefixes are always
     * stored lowercase (routes are built from the prefix).
     */
    protected function prepareForValidation(): void
    {
        $name = strtolower(trim((string) $this->input('name')));
        $prefix = strtolower(trim((string) $this->input('prefix')));

        // No prefix given? Use the role name as the URL prefix.
        if ($prefix === '') {
            $prefix = $name;
        }

        $this->merge([
            'name' => $name,
            'prefix' => $prefix,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->where(function ($query) {
                    $query->where('guard_name', 'web')
                        ->whereRaw('LOWER(name) = ?', [strtolower(trim((string) $this->input('name')))]);
                }),
            ],
            'prefix' => [
                'nullable',
                'string',
                'max:50',
                'alpha_dash',
                'not_in:admin',
                Rule::unique('roles', 'prefix')->where(function ($query) {
                    $query->whereNotNull('prefix')
                        ->where('prefix', '!=', '')
                        ->whereRaw('LOWER(prefix) = ?', [strtolower(trim((string) $this->input('prefix')))]);
                }),
            ],
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id',
        ];
    }

    public function messages(): array
    {
        return [
            'prefix.not_in' => 'The URL prefix "admin" is reserved. Choose a different prefix.',
            'prefix.unique' => 'That URL prefix is already in use by another role.',
        ];
    }
}