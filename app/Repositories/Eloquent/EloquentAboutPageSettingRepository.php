<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutPageSetting;
use App\Repositories\Contracts\AboutPageSettingRepositoryInterface;

class EloquentAboutPageSettingRepository implements AboutPageSettingRepositoryInterface
{
    public function getActive(): ?AboutPageSetting
    {
        return AboutPageSetting::where('is_active', true)->first();
    }

    public function update(int $id, array $data): AboutPageSetting
    {
        $setting = AboutPageSetting::findOrFail($id);
        $setting->update($data);

        return $setting->fresh();
    }

    public function create(array $data): AboutPageSetting
    {
        return AboutPageSetting::create([
            ...$data,
            'is_active' => true,
        ]);
    }
}
