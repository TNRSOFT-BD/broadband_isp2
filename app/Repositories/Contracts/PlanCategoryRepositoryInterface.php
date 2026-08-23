<?php

namespace App\Repositories\Contracts;

use App\Models\PlanCategory;
use Illuminate\Database\Eloquent\Collection;

interface PlanCategoryRepositoryInterface
{
    public function all(): Collection;

    /**
     * Active categories ordered for the public plans page.
     */
    public function getActiveOrdered(): Collection;

    public function findById(int $id): ?PlanCategory;

    public function create(array $data): PlanCategory;

    public function update(int $id, array $data): PlanCategory;

    public function delete(int $id): bool;
}
