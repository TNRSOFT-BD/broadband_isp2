<?php

namespace App\Repositories\Contracts;

use App\Models\AboutMilestone;
use Illuminate\Database\Eloquent\Collection;

interface AboutMilestoneRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?AboutMilestone;

    public function create(array $data): AboutMilestone;

    public function update(int $id, array $data): AboutMilestone;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): AboutMilestone;
}
