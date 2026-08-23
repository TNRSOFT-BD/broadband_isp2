<?php

namespace App\Repositories\Contracts;

use App\Models\PlansPageSetting;

interface PlansPageSettingRepositoryInterface
{
    public function getActive(): ?PlansPageSetting;

    public function create(array $data): PlansPageSetting;

    public function update(int $id, array $data): PlansPageSetting;
}
