<?php

namespace App\Services;

use App\Models\PlanCategory;
use App\Repositories\Contracts\PlanCategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class PlanCategoryService
{
    private const CACHE_KEY = 'plans.public.categories';

    public function __construct(
        private PlanCategoryRepositoryInterface $categoryRepository,
    ) {}

    public function getAllCategories(): Collection
    {
        return $this->categoryRepository->all();
    }

    public function getActiveCategories(): Collection
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), fn () => $this->categoryRepository->getActiveOrdered());
    }

    public function findById(int $id): ?PlanCategory
    {
        return $this->categoryRepository->findById($id);
    }

    public function createCategory(array $data): PlanCategory
    {
        $data['slug'] = $this->resolveUniqueSlug($data['slug'] ?? null, $data['name']);

        try {
            return $this->categoryRepository->create($data);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    public function updateCategory(int $id, array $data): PlanCategory
    {
        $data['slug'] = $this->resolveUniqueSlug($data['slug'] ?? null, $data['name'], $id);

        try {
            return $this->categoryRepository->update($id, $data);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    /**
     * Delete a category. Plans are protected by FK cascade; callers confirm first.
     */
    public function deleteCategory(int $id): bool
    {
        try {
            return $this->categoryRepository->delete($id);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    private function resolveUniqueSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug ?: $name);
        $candidate = $base;
        $suffix = 1;

        $exists = fn (string $value) => PlanCategory::where('slug', $value)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists();

        while ($exists($candidate)) {
            $candidate = "{$base}-".(++$suffix);
        }

        return $candidate;
    }
}
