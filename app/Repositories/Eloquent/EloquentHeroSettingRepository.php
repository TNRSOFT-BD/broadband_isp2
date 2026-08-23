<?php

namespace App\Repositories\Eloquent;

use App\Models\HeroSetting;
use App\Repositories\Contracts\HeroSettingRepositoryInterface;

class EloquentHeroSettingRepository implements HeroSettingRepositoryInterface
{
    public function getActive(): ?HeroSetting
    {
        return HeroSetting::where('is_active', true)->first();
    }

    public function create(array $data): HeroSetting
    {
        // Deactivate existing active hero
        HeroSetting::where('is_active', true)->update(['is_active' => false]);

        return HeroSetting::create($data);
    }

    public function update(int $id, array $data): HeroSetting
    {
        $hero = HeroSetting::findOrFail($id);
        $hero->update($data);

        return $hero->fresh();
    }
}
