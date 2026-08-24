<?php

namespace App\Repositories\Contracts;

use App\Models\QuickContactMethod;
use Illuminate\Database\Eloquent\Collection;

interface QuickContactMethodRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?QuickContactMethod;

    public function create(array $data): QuickContactMethod;

    public function update(int $id, array $data): QuickContactMethod;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): QuickContactMethod;
}
