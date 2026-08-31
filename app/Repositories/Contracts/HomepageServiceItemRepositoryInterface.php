<?php

namespace App\Repositories\Contracts;

use App\Models\HomepageServiceItem;
use Illuminate\Database\Eloquent\Collection;

interface HomepageServiceItemRepositoryInterface
{
    public function all(): Collection;

    /**
     * Active items ordered for the public site.
     */
    public function getActiveOrdered(): Collection;

    public function findById(int $id): ?HomepageServiceItem;

    public function create(array $data): HomepageServiceItem;

    public function update(int $id, array $data): HomepageServiceItem;

    public function delete(int $id): bool;
}
