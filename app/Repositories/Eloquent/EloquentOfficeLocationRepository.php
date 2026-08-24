<?php

namespace App\Repositories\Eloquent;

use App\Models\OfficeLocation;
use App\Repositories\Contracts\OfficeLocationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentOfficeLocationRepository implements OfficeLocationRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return OfficeLocation::query()
            ->active()
            ->ordered()
            ->get();
    }

    public function getAll(): Collection
    {
        return OfficeLocation::query()
            ->ordered()
            ->get();
    }

    public function findById(int $id): ?OfficeLocation
    {
        return OfficeLocation::find($id);
    }

    public function findBySlug(string $slug): ?OfficeLocation
    {
        return OfficeLocation::where('slug', $slug)->first();
    }

    public function create(array $data): OfficeLocation
    {
        return OfficeLocation::create($data);
    }

    public function update(int $id, array $data): OfficeLocation
    {
        $location = OfficeLocation::findOrFail($id);
        $location->update($data);

        return $location->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) OfficeLocation::destroy($id);
    }

    public function toggleStatus(int $id): OfficeLocation
    {
        $location = OfficeLocation::findOrFail($id);
        $location->update(['is_active' => ! $location->is_active]);

        return $location->fresh();
    }
}
