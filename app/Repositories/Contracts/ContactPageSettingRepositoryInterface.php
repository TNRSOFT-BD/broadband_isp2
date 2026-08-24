<?php

namespace App\Repositories\Contracts;

use App\Models\ContactPageSetting;

interface ContactPageSettingRepositoryInterface
{
    public function getActive(): ?ContactPageSetting;

    public function update(int $id, array $data): ContactPageSetting;

    public function create(array $data): ContactPageSetting;
}
