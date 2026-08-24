<?php

namespace App\Services;

use App\Models\OfficeLocation;
use App\Repositories\Contracts\OfficeLocationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class OfficeLocationService
{
    public function __construct(
        private OfficeLocationRepositoryInterface $locationRepository,
    ) {}

    public function getActiveLocations(): Collection
    {
        return $this->locationRepository->getActiveOrdered();
    }

    public function getAllLocations(): Collection
    {
        return $this->locationRepository->getAll();
    }

    public function findById(int $id): ?OfficeLocation
    {
        return $this->locationRepository->findById($id);
    }

    public function createLocation(array $data): OfficeLocation
    {
        $data['slug'] = $this->resolveUniqueSlug($data['slug'] ?? null, $data['name']);

        return $this->locationRepository->create($data);
    }

    public function updateLocation(int $id, array $data): OfficeLocation
    {
        if (isset($data['name']) && ! isset($data['slug'])) {
            $data['slug'] = $this->resolveUniqueSlug(null, $data['name'], $id);
        }

        return $this->locationRepository->update($id, $data);
    }

    public function deleteLocation(int $id): bool
    {
        return $this->locationRepository->delete($id);
    }

    public function toggleStatus(int $id): OfficeLocation
    {
        return $this->locationRepository->toggleStatus($id);
    }

    private function resolveUniqueSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug ?: $name);
        $candidate = $base;
        $suffix = 1;

        $exists = fn (string $value) => OfficeLocation::where('slug', $value)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists();

        while ($exists($candidate)) {
            $candidate = "{$base}-" . (++$suffix);
        }

        return $candidate;
    }
}
