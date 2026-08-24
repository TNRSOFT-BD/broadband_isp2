<?php

namespace App\Services;

use App\Models\ContactMessage;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ContactMessageService
{
    public function __construct(
        private ContactMessageRepositoryInterface $messageRepository,
    ) {}

    public function getPaginatedMessages(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return $this->messageRepository->paginateFiltered($filters, $perPage);
    }

    public function findById(int $id): ?ContactMessage
    {
        return $this->messageRepository->findById($id);
    }

    public function createMessage(array $data): ContactMessage
    {
        $data['status'] = 'new';

        return $this->messageRepository->create($data);
    }

    public function updateStatus(int $id, string $status): ContactMessage
    {
        return $this->messageRepository->updateStatus($id, $status);
    }

    public function deleteMessage(int $id): bool
    {
        return $this->messageRepository->delete($id);
    }

    public function markAsRead(int $id): ContactMessage
    {
        return $this->messageRepository->markAsRead($id);
    }

    public function markAsResolved(int $id): ContactMessage
    {
        return $this->messageRepository->markAsResolved($id);
    }

    public function getCounts(): array
    {
        return $this->messageRepository->getCounts();
    }
}
