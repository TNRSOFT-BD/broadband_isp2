<?php

namespace App\Repositories\Eloquent;

use App\Models\PlansPageSetting;
use App\Repositories\Contracts\PlansPageSettingRepositoryInterface;

class EloquentPlansPageSettingRepository implements PlansPageSettingRepositoryInterface
{
    public function getActive(): ?PlansPageSetting
    {
        return PlansPageSetting::where('is_active', true)->first();
    }

    public function create(array $data): PlansPageSetting
    {
        PlansPageSetting::where('is_active', true)->update(['is_active' => false]);

        return PlansPageSetting::create($data);
    }

    public function update(int $id, array $data): PlansPageSetting
    {
        $setting = PlansPageSetting::findOrFail($id);
        $setting->update($data);

        return $setting->fresh();
    }
}
