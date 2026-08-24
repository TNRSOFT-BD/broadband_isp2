<?php

namespace App\Repositories\Contracts;

use App\Models\AboutCapability;
use Illuminate\Database\Eloquent\Collection;

interface AboutCapabilityRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?AboutCapability;

    public function create(array $data): AboutCapability;

    public function update(int $id, array $data): AboutCapability;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): AboutCapability;
}
