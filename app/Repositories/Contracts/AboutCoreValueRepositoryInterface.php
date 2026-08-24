<?php

namespace App\Repositories\Contracts;

use App\Models\AboutCoreValue;
use Illuminate\Database\Eloquent\Collection;

interface AboutCoreValueRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?AboutCoreValue;

    public function create(array $data): AboutCoreValue;

    public function update(int $id, array $data): AboutCoreValue;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): AboutCoreValue;
}
