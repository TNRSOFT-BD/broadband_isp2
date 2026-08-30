<?php

namespace App\Repositories\Contracts;

use Spatie\Permission\Models\Role;

interface RoleRepositoryInterface
{
    public function getAll(): \Illuminate\Support\Collection;

    public function find(int $id): ?Role;

    public function create(array $data): Role;

    public function update(int $id, array $data): Role;

    public function delete(int $id): bool;

    public function getAllPermissions(): \Illuminate\Support\Collection;

    public function syncPermissions(int $roleId, array $permissionIds): void;
}
