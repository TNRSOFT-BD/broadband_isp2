<?php

namespace App\Repositories\Contracts;

use App\Models\SiteSetting;

interface SiteSettingRepositoryInterface
{
    public function getActive(): ?SiteSetting;

    public function update(int $id, array $data): SiteSetting;

    public function create(array $data): SiteSetting;
}
