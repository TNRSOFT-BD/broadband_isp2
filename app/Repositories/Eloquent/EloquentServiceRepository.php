<?php

namespace App\Repositories\Eloquent;

use App\Models\Service;
use App\Repositories\Contracts\ServiceRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentServiceRepository implements ServiceRepositoryInterface
{
    public function all(): Collection
    {
        return Service::query()
            ->withCount('plans')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function getActiveOrdered(): Collection
    {
        return Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function findById(int $id): ?Service
    {
        return Service::find($id);
    }

    public function create(array $data): Service
    {
        return Service::create($data);
    }

    public function update(int $id, array $data): Service
    {
        $service = Service::findOrFail($id);
        $service->update($data);

        return $service->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) Service::destroy($id);
    }
}
