<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutCapability;
use App\Repositories\Contracts\AboutCapabilityRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentAboutCapabilityRepository implements AboutCapabilityRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return AboutCapability::query()->active()->ordered()->get();
    }

    public function getAll(): Collection
    {
        return AboutCapability::query()->ordered()->get();
    }

    public function findById(int $id): ?AboutCapability
    {
        return AboutCapability::find($id);
    }

    public function create(array $data): AboutCapability
    {
        return AboutCapability::create($data);
    }

    public function update(int $id, array $data): AboutCapability
    {
        $cap = AboutCapability::findOrFail($id);
        $cap->update($data);

        return $cap->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) AboutCapability::destroy($id);
    }

    public function toggleStatus(int $id): AboutCapability
    {
        $cap = AboutCapability::findOrFail($id);
        $cap->update(['is_active' => ! $cap->is_active]);

        return $cap->fresh();
    }
}
