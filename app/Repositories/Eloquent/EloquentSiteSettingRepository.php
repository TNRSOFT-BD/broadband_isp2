<?php

namespace App\Repositories\Eloquent;

use App\Models\SiteSetting;
use App\Repositories\Contracts\SiteSettingRepositoryInterface;

class EloquentSiteSettingRepository implements SiteSettingRepositoryInterface
{
    public function getActive(): ?SiteSetting
    {
        return SiteSetting::query()->first();
    }

    public function update(int $id, array $data): SiteSetting
    {
        $setting = SiteSetting::findOrFail($id);
        $setting->update($data);

        return $setting->fresh();
    }

    public function create(array $data): SiteSetting
    {
        return SiteSetting::create($data);
    }
}
