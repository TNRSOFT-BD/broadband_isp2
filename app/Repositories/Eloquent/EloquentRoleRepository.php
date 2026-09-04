<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\RoleRepositoryInterface;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class EloquentRoleRepository implements RoleRepositoryInterface
{
    /**
     * Get all roles with their permissions count.
     */
    public function getAll(): Collection
    {
        return Role::withCount('permissions')->orderBy('name')->get();
    }

    /**
     * Find a role by ID with permissions.
     */
    public function find(int $id): ?Role
    {
        return Role::with('permissions')->find($id);
    }

    /**
     * Create a new role.
     */
    public function create(array $data): Role
    {
        $role = Role::create([
            'name' => strtolower(trim($data['name'])),
            'guard_name' => 'web',
            'prefix' => $this->normalizePrefix($data['prefix'] ?? null) ?? $this->normalizePrefix($data['name']),
        ]);

        if (! empty($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return $role;
    }

    /**
     * Update an existing role.
     */
    public function update(int $id, array $data): Role
    {
        $role = Role::findOrFail($id);

        $role->update([
            'name' => strtolower(trim($data['name'])),
            'prefix' => $this->normalizePrefix($data['prefix'] ?? $role->prefix) ?? $this->normalizePrefix($data['name']),
        ]);

        if (array_key_exists('permissions', $data)) {
            $role->syncPermissions($data['permissions']);
        }

        return $role->load('permissions');
    }

    /**
     * Normalize the prefix: trim, lowercase, and store empty values as null
     * so unique validation and the prefix middleware treat them uniformly.
     */
    private function normalizePrefix(?string $prefix): ?string
    {
        $prefix = $prefix === null ? null : strtolower(trim($prefix));

        return $prefix === '' ? null : $prefix;
    }

    /**
     * Delete a role.
     */
    public function delete(int $id): bool
    {
        $role = Role::findOrFail($id);

        // Prevent deletion of system roles
        if (in_array($role->name, ['super_admin'])) {
            return false;
        }

        $role->delete();

        return true;
    }

    /**
     * Get all available permissions.
     */
    public function getAllPermissions(): Collection
    {
        return Permission::orderBy('name')->get();
    }

    /**
     * Sync permissions for a role.
     */
    public function syncPermissions(int $roleId, array $permissionIds): void
    {
        $role = Role::findOrFail($roleId);
        $role->syncPermissions($permissionIds);
    }
}
