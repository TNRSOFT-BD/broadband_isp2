<?php

namespace App\Repositories\Contracts;

use App\Models\HeroSetting;

interface HeroSettingRepositoryInterface
{
    public function getActive(): ?HeroSetting;

    public function create(array $data): HeroSetting;

    public function update(int $id, array $data): HeroSetting;
}
