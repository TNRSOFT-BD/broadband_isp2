<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentUserRepository implements UserRepositoryInterface
{
    /**
     * Get all users paginated with roles.
     */
    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return User::with('roles')
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    /**
     * Find a user by ID with roles.
     */
    public function find(int $id): ?User
    {
        return User::with('roles')->find($id);
    }

    /**
     * Create a new user.
     */
    public function create(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => 'admin',
        ]);

        if (! empty($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        return $user;
    }

    /**
     * Update an existing user.
     */
    public function update(int $id, array $data): User
    {
        $user = User::findOrFail($id);

        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        // Only update password if provided
        if (! empty($data['password'])) {
            $updateData['password'] = $data['password'];
        }

        $user->update($updateData);

        if (array_key_exists('roles', $data)) {
            $user->syncRoles($data['roles']);
        }

        return $user->load('roles');
    }

    /**
     * Delete a user (soft delete).
     */
    public function delete(int $id): bool
    {
        $user = User::findOrFail($id);

        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return false;
        }

        // Prevent deleting the super admin
        if ($user->hasRole('super_admin')) {
            return false;
        }

        $user->delete();

        return true;
    }

    /**
     * Sync roles for a user.
     */
    public function syncRoles(int $userId, array $roles): void
    {
        $user = User::findOrFail($userId);
        $user->syncRoles($roles);
    }
}
