<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutCoreValue;
use App\Repositories\Contracts\AboutCoreValueRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentAboutCoreValueRepository implements AboutCoreValueRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return AboutCoreValue::query()->active()->ordered()->get();
    }

    public function getAll(): Collection
    {
        return AboutCoreValue::query()->ordered()->get();
    }

    public function findById(int $id): ?AboutCoreValue
    {
        return AboutCoreValue::find($id);
    }

    public function create(array $data): AboutCoreValue
    {
        return AboutCoreValue::create($data);
    }

    public function update(int $id, array $data): AboutCoreValue
    {
        $value = AboutCoreValue::findOrFail($id);
        $value->update($data);

        return $value->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) AboutCoreValue::destroy($id);
    }

    public function toggleStatus(int $id): AboutCoreValue
    {
        $value = AboutCoreValue::findOrFail($id);
        $value->update(['is_active' => ! $value->is_active]);

        return $value->fresh();
    }
}
