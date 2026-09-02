<?php

namespace App\Repositories\Contracts;

use App\Models\LegalPage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface LegalPageRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection;

    public function paginate(int $perPage = 15, string $search = ''): LengthAwarePaginator;

    public function findById(int $id): ?LegalPage;

    public function findBySlug(string $slug): ?LegalPage;

    public function create(array $data): LegalPage;

    public function update(int $id, array $data): LegalPage;

    public function delete(int $id): bool;

    public function getPublished(): \Illuminate\Database\Eloquent\Collection;
}
