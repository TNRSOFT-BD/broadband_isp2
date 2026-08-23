<?php

namespace App\Repositories\Eloquent;

use App\Models\Plan;
use App\Repositories\Contracts\PlanRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class EloquentPlanRepository implements PlanRepositoryInterface
{
    /**
     * Relations that must always be eager loaded for plan payloads.
     */
    private const WITH_RELATIONS = ['category', 'features', 'services'];

    public function paginateFiltered(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        return Plan::query()
            ->with(['category:id,name,slug,icon', 'features', 'services:id,name,slug,logo,category'])
            ->select('plans.*')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('tagline', 'like', "%{$search}%");
                });
            })
            ->when($filters['category'] ?? null, fn ($query, $categoryId) => $query->where('plan_category_id', $categoryId))
            ->when($filters['status'] ?? null, function ($query, $status) {
                if ($status === 'active') {
                    $query->where('is_active', true);
                } elseif ($status === 'inactive') {
                    $query->where('is_active', false);
                }
            })
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getActiveWithRelations(): Collection
    {
        return Plan::query()
            ->with(self::WITH_RELATIONS)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function findActiveBySlug(string $slug): ?Plan
    {
        return Plan::query()
            ->with(self::WITH_RELATIONS)
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();
    }

    public function findById(int $id): ?Plan
    {
        return Plan::query()->with(self::WITH_RELATIONS)->find($id);
    }

    public function create(array $data): Plan
    {
        return Plan::create($data);
    }

    public function update(int $id, array $data): Plan
    {
        $plan = Plan::findOrFail($id);
        $plan->update($data);

        return $plan->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) Plan::destroy($id);
    }

    public function toggleStatus(int $id): Plan
    {
        $plan = Plan::findOrFail($id);
        $plan->update(['is_active' => ! $plan->is_active]);

        return $plan->fresh();
    }

    public function syncFeatures(Plan $plan, array $features): void
    {
        $plan->features()->delete();

        if ($features === []) {
            return;
        }

        foreach ($features as $index => $feature) {
            $plan->features()->create([
                'title' => $feature['title'],
                'icon' => $feature['icon'] ?? null,
                'description' => $feature['description'] ?? null,
                'sort_order' => $feature['sort_order'] ?? $index,
            ]);
        }
    }

    public function syncServices(Plan $plan, array $services): void
    {
        $syncPayload = [];

        foreach ($services as $index => $service) {
            $syncPayload[$service['service_id']] = [
                'custom_label' => $service['custom_label'] ?? null,
                'custom_note' => $service['custom_note'] ?? null,
                'duration' => $service['duration'] ?? null,
                'is_included' => $service['is_included'] ?? true,
                'is_featured' => $service['is_featured'] ?? false,
                'sort_order' => $service['sort_order'] ?? $index,
            ];
        }

        $plan->services()->sync($syncPayload);
    }
}
