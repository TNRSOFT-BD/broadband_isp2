<?php

namespace App\Repositories\Eloquent;

use App\Models\ContactPageSetting;
use App\Repositories\Contracts\ContactPageSettingRepositoryInterface;

class EloquentContactPageSettingRepository implements ContactPageSettingRepositoryInterface
{
    public function getActive(): ?ContactPageSetting
    {
        return ContactPageSetting::where('is_active', true)->first();
    }

    public function update(int $id, array $data): ContactPageSetting
    {
        $setting = ContactPageSetting::findOrFail($id);
        $setting->update($data);

        return $setting->fresh();
    }

    public function create(array $data): ContactPageSetting
    {
        return ContactPageSetting::create([
            ...$data,
            'is_active' => true,
        ]);
    }
}
