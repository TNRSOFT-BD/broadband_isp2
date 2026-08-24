<?php

namespace App\Services;

use App\Models\Plan;
use App\Repositories\Contracts\PlanRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class PlanService
{
    /**
     * Cache key for the public plans page payload.
     */
    public const CACHE_KEY = 'plans.public.payload';

    public function __construct(
        private PlanRepositoryInterface $planRepository,
    ) {}

    /**
     * Paginated, filtered plan list for the admin panel.
     */
    public function getFilteredPlans(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        return $this->planRepository->paginateFiltered($filters, $perPage);
    }

    /**
     * All active plans for the public site (cached).
     */
    public function getActivePlans(): Collection
    {
        return Cache::remember(self::CACHE_KEY.'.active', now()->addMinutes(10), function () {
            return $this->planRepository->getActiveWithRelations();
        });
    }

    public function findActiveBySlug(string $slug): ?Plan
    {
        return Cache::remember(self::CACHE_KEY.".slug.{$slug}", now()->addMinutes(10), function () use ($slug) {
            return $this->planRepository->findActiveBySlug($slug);
        });
    }

    public function findById(int $id): ?Plan
    {
        return $this->planRepository->findById($id);
    }

    /**
     * Create a plan with features and services in a single transaction.
     */
    public function createPlan(array $data): Plan
    {
        $data['slug'] = $this->resolveUniqueSlug($data['slug'] ?? null, $data['name']);
        try {
            return DB::transaction(function () use ($data) {
                $features = $this->extractFeatures($data);
                $services = $this->extractServices($data);

                $plan = $this->planRepository->create($this->baseAttributes($data));
                $this->planRepository->syncFeatures($plan, $features);
                $this->planRepository->syncServices($plan, $services);

                Log::info('Plan created.', ['plan_id' => $plan->id]);

                return $plan;
            });
        } finally {
            $this->flushCache();
        }
    }

    /**
     * Update a plan with features and services in a single transaction.
     */
    public function updatePlan(int $id, array $data): Plan
    {
        $data['slug'] = $this->resolveUniqueSlug($data['slug'] ?? null, $data['name'] ?? '', $id);

        try {
            return DB::transaction(function () use ($id, $data) {
                $features = $this->extractFeatures($data);
                $services = $this->extractServices($data);

                $plan = $this->planRepository->update($id, $this->baseAttributes($data));
                $this->planRepository->syncFeatures($plan, $features);
                $this->planRepository->syncServices($plan, $services);

                Log::info('Plan updated.', ['plan_id' => $plan->id]);

                return $plan;
            });
        } catch (Throwable $exception) {
            Log::error('Plan update failed.', ['plan_id' => $id, 'error' => $exception->getMessage()]);

            throw $exception;
        } finally {
            $this->flushCache();
        }
    }

    public function deletePlan(int $id): bool
    {
        try {
            return DB::transaction(fn () => $this->planRepository->delete($id));
        } finally {
            $this->flushCache();
        }
    }

    public function toggleStatus(int $id): Plan
    {
        try {
            return $this->planRepository->toggleStatus($id);
        } finally {
            $this->flushCache();
        }
    }

    /**
     * Ensure slug uniqueness, generating one from the name when absent.
     */
    private function resolveUniqueSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug ?: $name);
        $candidate = $base;
        $suffix = 1;

        $exists = fn (string $value) => Plan::where('slug', $value)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists();

        while ($exists($candidate)) {
            $candidate = "{$base}-".(++$suffix);
        }

        return $candidate;
    }

    private function extractFeatures(array &$data): array
    {
        $features = $data['features'] ?? [];

        unset($data['features']);

        return array_values(array_filter($features, fn ($feature) => filled($feature['title'] ?? null)));
    }

    private function extractServices(array &$data): array
    {
        $services = $data['services'] ?? [];

        unset($data['services']);

        return collect($services)
            ->filter(fn ($service) => filled($service['service_id'] ?? null))
            ->values()
            ->all();
    }

    /**
     * Strip non-column keys so only fillable attributes are passed to the repository.
     */
    private function baseAttributes(array $data): array
    {
        return collect($data)->except(['features', 'services'])->all();
    }

    public function flushCache(): void
    {
        Cache::forget(self::CACHE_KEY.'.active');
        // Slug-level entries expire naturally; clear known ones defensively is not feasible,
        // so rely on short TTL for detail pages.
    }
}
