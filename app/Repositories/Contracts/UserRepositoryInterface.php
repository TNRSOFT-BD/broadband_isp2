<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator;

    public function find(int $id): ?User;

    public function create(array $data): User;

    public function update(int $id, array $data): User;

    public function delete(int $id): bool;

    public function syncRoles(int $userId, array $roles): void;
}
