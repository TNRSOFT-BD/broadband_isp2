<?php

namespace App\Repositories\Contracts;

use App\Models\AboutClient;
use Illuminate\Database\Eloquent\Collection;

interface AboutClientRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?AboutClient;

    public function create(array $data): AboutClient;

    public function update(int $id, array $data): AboutClient;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): AboutClient;
}
