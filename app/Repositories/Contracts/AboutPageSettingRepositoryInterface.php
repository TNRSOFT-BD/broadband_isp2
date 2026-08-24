<?php

namespace App\Repositories\Contracts;

use App\Models\AboutPageSetting;

interface AboutPageSettingRepositoryInterface
{
    public function getActive(): ?AboutPageSetting;

    public function update(int $id, array $data): AboutPageSetting;

    public function create(array $data): AboutPageSetting;
}
