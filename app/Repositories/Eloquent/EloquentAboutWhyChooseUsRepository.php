<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutWhyChooseUs;
use App\Repositories\Contracts\AboutWhyChooseUsRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentAboutWhyChooseUsRepository implements AboutWhyChooseUsRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return AboutWhyChooseUs::query()->active()->ordered()->get();
    }

    public function getAll(): Collection
    {
        return AboutWhyChooseUs::query()->ordered()->get();
    }

    public function findById(int $id): ?AboutWhyChooseUs
    {
        return AboutWhyChooseUs::find($id);
    }

    public function create(array $data): AboutWhyChooseUs
    {
        return AboutWhyChooseUs::create($data);
    }

    public function update(int $id, array $data): AboutWhyChooseUs
    {
        $item = AboutWhyChooseUs::findOrFail($id);
        $item->update($data);

        return $item->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) AboutWhyChooseUs::destroy($id);
    }

    public function toggleStatus(int $id): AboutWhyChooseUs
    {
        $item = AboutWhyChooseUs::findOrFail($id);
        $item->update(['is_active' => ! $item->is_active]);

        return $item->fresh();
    }
}
