<?php

namespace App\Services;

use App\Models\QuickContactMethod;
use App\Repositories\Contracts\QuickContactMethodRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class QuickContactMethodService
{
    private const CACHE_KEY = 'contact.public.quick_contact_methods';
    private const FOOTER_CACHE_KEY = 'contact.public.footer_methods';

    public function __construct(
        private QuickContactMethodRepositoryInterface $methodRepository,
    ) {}

    public function getActiveMethods(): Collection
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), function () {
            return $this->methodRepository->getActiveOrdered();
        });
    }

    /**
     * Active methods marked to appear in the site footer.
     */
    public function getFooterMethods(): Collection
    {
        return Cache::remember(self::FOOTER_CACHE_KEY, now()->addMinutes(10), function () {
            return \App\Models\QuickContactMethod::query()
                ->where('is_active', true)
                ->where('show_in_footer', true)
                ->orderBy('sort_order')
                ->orderBy('label')
                ->get();
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
            Cache::forget(self::FOOTER_CACHE_KEY);
        }
    }

    public function updateMethod(int $id, array $data): QuickContactMethod
    {
        try {
            return $this->methodRepository->update($id, $data);
        } finally {
            Cache::forget(self::CACHE_KEY);
            Cache::forget(self::FOOTER_CACHE_KEY);
        }
    }

    public function deleteMethod(int $id): bool
    {
        try {
            return $this->methodRepository->delete($id);
        } finally {
            Cache::forget(self::CACHE_KEY);
            Cache::forget(self::FOOTER_CACHE_KEY);
        }
    }

    public function toggleStatus(int $id): QuickContactMethod
    {
        try {
            return $this->methodRepository->toggleStatus($id);
        } finally {
            Cache::forget(self::CACHE_KEY);
            Cache::forget(self::FOOTER_CACHE_KEY);
        }
    }
}
