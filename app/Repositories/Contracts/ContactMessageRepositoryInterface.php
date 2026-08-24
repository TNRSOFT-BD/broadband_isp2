<?php

namespace App\Repositories\Contracts;

use App\Models\ContactMessage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ContactMessageRepositoryInterface
{
    public function paginateFiltered(array $filters = [], int $perPage = 15): LengthAwarePaginator;

    public function findById(int $id): ?ContactMessage;

    public function create(array $data): ContactMessage;

    public function updateStatus(int $id, string $status): ContactMessage;

    public function delete(int $id): bool;

    public function markAsRead(int $id): ContactMessage;

    public function markAsResolved(int $id): ContactMessage;

    public function getCounts(): array;
}
