<?php

namespace App\Repositories\Contracts;

use App\Models\Plan;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface PlanRepositoryInterface
{
    /**
     * Paginated plan list for the admin panel with optional filters.
     */
    public function paginateFiltered(array $filters = [], int $perPage = 10): LengthAwarePaginator;

    /**
     * All active plans for the public plans page (eager loaded).
     */
    public function getActiveWithRelations(): Collection;

    /**
     * Find a plan by slug with all relations eager loaded.
     */
    public function findActiveBySlug(string $slug): ?Plan;

    /**
     * Find a plan by id.
     */
    public function findById(int $id): ?Plan;

    public function create(array $data): Plan;

    public function update(int $id, array $data): Plan;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): Plan;

    /**
     * Sync features for a plan (replaces all existing features).
     *
     * @param array<int, array{title: string, icon?: ?string, description?: ?string, sort_order?: int}> $features
     */
    public function syncFeatures(Plan $plan, array $features): void;

    /**
     * Sync services pivot for a plan.
     *
     * @param array<int, array{service_id: int, custom_label?: ?string, custom_note?: ?string, duration?: ?string, is_included?: bool, is_featured?: bool, sort_order?: int}> $services
     */
    public function syncServices(Plan $plan, array $services): void;
}
