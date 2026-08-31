<?php

namespace App\Repositories\Eloquent;

use App\Models\HomepageServiceCategory;
use App\Repositories\Contracts\HomepageServiceCategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentHomepageServiceCategoryRepository implements HomepageServiceCategoryRepositoryInterface
{
    public function all(): Collection
    {
        return HomepageServiceCategory::query()
            ->withCount('services')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function getOrdered(): Collection
    {
        return HomepageServiceCategory::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function findById(int $id): ?HomepageServiceCategory
    {
        return HomepageServiceCategory::find($id);
    }

    public function create(array $data): HomepageServiceCategory
    {
        return HomepageServiceCategory::create($data);
    }

    public function update(int $id, array $data): HomepageServiceCategory
    {
        $category = HomepageServiceCategory::findOrFail($id);
        $category->update($data);

        return $category->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) HomepageServiceCategory::destroy($id);
    }
}
