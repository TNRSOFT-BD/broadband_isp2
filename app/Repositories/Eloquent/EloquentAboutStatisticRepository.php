<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutStatistic;
use App\Repositories\Contracts\AboutStatisticRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentAboutStatisticRepository implements AboutStatisticRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return AboutStatistic::query()->active()->ordered()->get();
    }

    public function getAll(): Collection
    {
        return AboutStatistic::query()->ordered()->get();
    }

    public function findById(int $id): ?AboutStatistic
    {
        return AboutStatistic::find($id);
    }

    public function create(array $data): AboutStatistic
    {
        return AboutStatistic::create($data);
    }

    public function update(int $id, array $data): AboutStatistic
    {
        $stat = AboutStatistic::findOrFail($id);
        $stat->update($data);

        return $stat->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) AboutStatistic::destroy($id);
    }

    public function toggleStatus(int $id): AboutStatistic
    {
        $stat = AboutStatistic::findOrFail($id);
        $stat->update(['is_active' => ! $stat->is_active]);

        return $stat->fresh();
    }
}
