<?php

namespace App\Repositories\Eloquent;

use App\Models\ContactMessage;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentContactMessageRepository implements ContactMessageRepositoryInterface
{
    public function paginateFiltered(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return ContactMessage::query()
            ->with('inquiryType:id,name,slug')
            ->search($filters['search'] ?? null)
            ->byStatus($filters['status'] ?? null)
            ->byInquiryType($filters['inquiry_type_id'] ?? null)
            ->ordered()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function findById(int $id): ?ContactMessage
    {
        return ContactMessage::with('inquiryType')->find($id);
    }

    public function create(array $data): ContactMessage
    {
        return ContactMessage::create($data);
    }

    public function updateStatus(int $id, string $status): ContactMessage
    {
        $message = ContactMessage::findOrFail($id);
        $updateData = ['status' => $status];

        if ($status === 'read' && ! $message->read_at) {
            $updateData['read_at'] = now();
        }

        if ($status === 'resolved' && ! $message->resolved_at) {
            $updateData['resolved_at'] = now();
        }

        $message->update($updateData);

        return $message->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) ContactMessage::destroy($id);
    }

    public function markAsRead(int $id): ContactMessage
    {
        $message = ContactMessage::findOrFail($id);
        $message->markAsRead();

        return $message->fresh();
    }

    public function markAsResolved(int $id): ContactMessage
    {
        $message = ContactMessage::findOrFail($id);
        $message->markAsResolved();

        return $message->fresh();
    }

    public function getCounts(): array
    {
        return [
            'total' => ContactMessage::count(),
            'new' => ContactMessage::where('status', 'new')->count(),
            'in_progress' => ContactMessage::where('status', 'in_progress')->count(),
            'resolved' => ContactMessage::where('status', 'resolved')->count(),
        ];
    }
}
