<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
    ) {}

    /**
     * Get all users paginated.
     */
    public function getAllUsers(int $perPage = 15): LengthAwarePaginator
    {
        return $this->userRepository->getAllPaginated($perPage);
    }

    /**
     * Get a user by ID.
     */
    public function getUser(int $id): ?User
    {
        return $this->userRepository->find($id);
    }

    /**
     * Create a new user.
     */
    public function createUser(array $data): User
    {
        return $this->userRepository->create($data);
    }

    /**
     * Update a user.
     */
    public function updateUser(int $id, array $data): User
    {
        return $this->userRepository->update($id, $data);
    }

    /**
     * Delete a user (soft delete).
     */
    public function deleteUser(int $id): bool
    {
        return $this->userRepository->delete($id);
    }
}
