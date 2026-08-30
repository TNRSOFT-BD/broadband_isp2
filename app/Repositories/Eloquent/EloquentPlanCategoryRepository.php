<?php

namespace App\Repositories\Eloquent;

use App\Models\PlanCategory;
use App\Repositories\Contracts\PlanCategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentPlanCategoryRepository implements PlanCategoryRepositoryInterface
{
    public function all(): Collection
    {
        return PlanCategory::query()
            ->withCount('plans')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function getActiveOrdered(): Collection
    {
        return PlanCategory::query()
            ->whereHas('activePlans')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function findById(int $id): ?PlanCategory
    {
        return PlanCategory::find($id);
    }

    public function create(array $data): PlanCategory
    {
        return PlanCategory::create($data);
    }

    public function update(int $id, array $data): PlanCategory
    {
        $category = PlanCategory::findOrFail($id);
        $category->update($data);

        return $category->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) PlanCategory::destroy($id);
    }
}
