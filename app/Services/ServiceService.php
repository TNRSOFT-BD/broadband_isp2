<?php

namespace App\Services;

use App\Models\Service;
use App\Repositories\Contracts\ServiceRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServiceService
{
    /**
     * Cache key for the public services payload.
     */
    private const CACHE_KEY = 'plans.public.services';

    public function __construct(
        private ServiceRepositoryInterface $serviceRepository,
    ) {}

    public function getAllServices(): Collection
    {
        return $this->serviceRepository->all();
    }

    public function getActiveServices(): Collection
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), function () {
            return $this->serviceRepository->getActiveOrdered();
        });
    }

    public function findById(int $id): ?Service
    {
        return $this->serviceRepository->findById($id);
    }

    public function createService(array $data): Service
    {
        $data['slug'] = $this->resolveUniqueSlug($data['slug'] ?? null, $data['name']);

        try {
            return $this->serviceRepository->create($data);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    public function updateService(int $id, array $data): Service
    {
        $data['slug'] = $this->resolveUniqueSlug($data['slug'] ?? null, $data['name'], $id);

        try {
            return $this->serviceRepository->update($id, $data);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    public function deleteService(int $id): bool
    {
        try {
            $service = $this->serviceRepository->findById($id);

            if ($service?->logo) {
                $this->deleteStoredLogo($service->logo);
            }

            return $this->serviceRepository->delete($id);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    /**
     * Store an uploaded service logo and return its public URL.
     * Deletes the previous locally stored logo (if any).
     */
    public function storeLogo(UploadedFile $file): string
    {
        $path = $file->store('services/logos', 'public');

        return '/storage/'.$path;
    }

    /**
     * Replace a service logo, safely removing the old local file.
     */
    public function replaceLogo(Service $service, UploadedFile $file): string
    {
        $url = $this->storeLogo($file);
        $this->deleteStoredLogo($service->logo);

        return $url;
    }

    /**
     * Delete a stored logo file when it lives on the local public disk.
     */
    public function deleteStoredLogo(?string $logoUrl): void
    {
        if (! $logoUrl || ! str_starts_with($logoUrl, '/storage/')) {
            return;
        }

        Storage::disk('public')->delete(str_replace('/storage/', '', $logoUrl));
    }

    private function resolveUniqueSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug ?: $name);
        $candidate = $base;
        $suffix = 1;

        $exists = fn (string $value) => Service::where('slug', $value)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists();

        while ($exists($candidate)) {
            $candidate = "{$base}-".(++$suffix);
        }

        return $candidate;
    }
}
