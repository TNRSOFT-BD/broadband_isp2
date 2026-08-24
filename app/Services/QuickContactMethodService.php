<?php

namespace App\Services;

use App\Models\QuickContactMethod;
use App\Repositories\Contracts\QuickContactMethodRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class QuickContactMethodService
{
    private const CACHE_KEY = 'contact.public.quick_contact_methods';

    public function __construct(
        private QuickContactMethodRepositoryInterface $methodRepository,
    ) {}

    public function getActiveMethods(): Collection
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), function () {
            return $this->methodRepository->getActiveOrdered();
        });
    }

    public function getAllMethods(): Collection
    {
        return $this->methodRepository->getAll();
    }

    public function findById(int $id): ?QuickContactMethod
    {
        return $this->methodRepository->findById($id);
    }

    public function createMethod(array $data): QuickContactMethod
    {
        try {
            return $this->methodRepository->create($data);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    public function updateMethod(int $id, array $data): QuickContactMethod
    {
        try {
            return $this->methodRepository->update($id, $data);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    public function deleteMethod(int $id): bool
    {
        try {
            return $this->methodRepository->delete($id);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    public function toggleStatus(int $id): QuickContactMethod
    {
        try {
            return $this->methodRepository->toggleStatus($id);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }
}
