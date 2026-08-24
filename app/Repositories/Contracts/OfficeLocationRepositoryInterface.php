<?php

namespace App\Repositories\Contracts;

use App\Models\OfficeLocation;
use Illuminate\Database\Eloquent\Collection;

interface OfficeLocationRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?OfficeLocation;

    public function findBySlug(string $slug): ?OfficeLocation;

    public function create(array $data): OfficeLocation;

    public function update(int $id, array $data): OfficeLocation;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): OfficeLocation;
}
