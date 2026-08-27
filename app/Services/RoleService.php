<?php

namespace App\Services;

use App\Repositories\Contracts\RoleRepositoryInterface;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;

class RoleService
{
    public function __construct(
        private RoleRepositoryInterface $roleRepository,
    ) {}

    /**
     * Get all roles with permission counts.
     */
    public function getAllRoles(): Collection
    {
        return $this->roleRepository->getAll();
    }

    /**
     * Get a role with its permissions.
     */
    public function getRole(int $id): ?Role
    {
        return $this->roleRepository->find($id);
    }

    /**
     * Create a new role with permissions.
     */
    public function createRole(array $data): Role
    {
        return $this->roleRepository->create($data);
    }

    /**
     * Update a role and its permissions.
     */
    public function updateRole(int $id, array $data): Role
    {
        return $this->roleRepository->update($id, $data);
    }

    /**
     * Delete a role (except system roles).
     */
    public function deleteRole(int $id): bool
    {
        return $this->roleRepository->delete($id);
    }

    /**
     * Get all available permissions grouped by category.
     */
    public function getAllPermissions(): Collection
    {
        return $this->roleRepository->getAllPermissions();
    }

    /**
     * Get permissions grouped by their prefix (e.g., 'plans' from 'view-plans').
     */
    public function getPermissionsGrouped(): array
    {
        $permissions = $this->roleRepository->getAllPermissions();

        $grouped = [];
        foreach ($permissions as $permission) {
            $parts = explode('-', $permission->name);
            $group = $parts[0] ?? 'other';

            // Build a more readable group name
            $groupName = match ($group) {
                'view' => 'View Access',
                'create' => 'Create',
                'edit' => 'Edit',
                'delete' => 'Delete',
                'manage' => 'Management',
                default => ucfirst($group),
            };

            $grouped[$permission->name] = [
                'id' => $permission->id,
                'name' => $permission->name,
                'group' => $groupName,
                'guard_name' => $permission->guard_name,
            ];
        }

        return $grouped;
    }
}
