<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutMilestone;
use App\Repositories\Contracts\AboutMilestoneRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentAboutMilestoneRepository implements AboutMilestoneRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return AboutMilestone::query()->active()->ordered()->get();
    }

    public function getAll(): Collection
    {
        return AboutMilestone::query()->ordered()->get();
    }

    public function findById(int $id): ?AboutMilestone
    {
        return AboutMilestone::find($id);
    }

    public function create(array $data): AboutMilestone
    {
        return AboutMilestone::create($data);
    }

    public function update(int $id, array $data): AboutMilestone
    {
        $milestone = AboutMilestone::findOrFail($id);
        $milestone->update($data);

        return $milestone->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) AboutMilestone::destroy($id);
    }

    public function toggleStatus(int $id): AboutMilestone
    {
        $milestone = AboutMilestone::findOrFail($id);
        $milestone->update(['is_active' => ! $milestone->is_active]);

        return $milestone->fresh();
    }
}
