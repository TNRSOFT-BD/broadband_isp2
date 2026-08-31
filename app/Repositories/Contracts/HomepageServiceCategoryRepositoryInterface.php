<?php

namespace App\Repositories\Contracts;

use App\Models\HomepageServiceCategory;
use Illuminate\Database\Eloquent\Collection;

interface HomepageServiceCategoryRepositoryInterface
{
    public function all(): Collection;

    /**
     * All categories ordered for the admin dropdown.
     */
    public function getOrdered(): Collection;

    public function findById(int $id): ?HomepageServiceCategory;

    public function create(array $data): HomepageServiceCategory;

    public function update(int $id, array $data): HomepageServiceCategory;

    public function delete(int $id): bool;
}
