<?php

namespace App\Services;

use App\Models\HomepageServiceItem;
use App\Repositories\Contracts\HomepageServiceItemRepositoryInterface;
use App\Support\InteractsWithLocalImages;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;

class HomepageServiceItemService
{
    use InteractsWithLocalImages;

    private const CACHE_KEY = 'homepage.services.section';

    public function __construct(
        private HomepageServiceItemRepositoryInterface $repository,
    ) {}

    /**
     * Get all items (admin).
     */
    public function getAllItems(): Collection
    {
        return $this->repository->all();
    }

    /**
     * Get active items for the public homepage (cached).
     */
    public function getActiveItems(): Collection
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), function () {
            return $this->repository->getActiveOrdered();
        });
    }

    /**
     * Get section settings from HomepageSetting.
     */
    public function getSectionSettings(): array
    {
        return \App\Models\HomepageSetting::getSectionData('services_section', [
            'title' => 'Explore Our Digital Services',
            'subtitle' => 'Access our high-speed platforms, entertainment services, customer tools, and digital infrastructure from one place.',
        ]);
    }

    public function findById(int $id): ?HomepageServiceItem
    {
        return $this->repository->findById($id);
    }

    public function createItem(array $data): HomepageServiceItem
    {
        try {
            return $this->repository->create($data);
        } finally {
            Cache::forget(self::CACHE_KEY);
            app(\App\Services\HomepageService::class)->flushCache();
        }
    }

    public function updateItem(int $id, array $data): HomepageServiceItem
    {
        $previous = $this->repository->findById($id)?->only(['image']) ?? [];

        try {
            $saved = $this->repository->update($id, $data);

            $this->deleteReplacedImages($previous, $saved->only(['image']), ['image']);

            return $saved;
        } finally {
            Cache::forget(self::CACHE_KEY);
            app(\App\Services\HomepageService::class)->flushCache();
        }
    }

    public function deleteItem(int $id): bool
    {
        try {
            $item = $this->repository->findById($id);

            if ($item?->image) {
                $this->deleteLocalImage($item->image);
            }

            return $this->repository->delete($id);
        } finally {
            Cache::forget(self::CACHE_KEY);
            app(\App\Services\HomepageService::class)->flushCache();
        }
    }

    /**
     * Store an uploaded image and return its public URL.
     */
    public function storeImage(UploadedFile $file): string
    {
        $path = $file->store('homepage-services', 'public');

        return '/storage/'.$path;
    }

    /**
     * Replace an image, safely removing the old local file.
     */
    public function replaceImage(HomepageServiceItem $item, UploadedFile $file): string
    {
        $url = $this->storeImage($file);
        $this->deleteLocalImage($item->image);

        return $url;
    }
}
