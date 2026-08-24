<?php

namespace App\Repositories\Eloquent;

use App\Models\QuickContactMethod;
use App\Repositories\Contracts\QuickContactMethodRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentQuickContactMethodRepository implements QuickContactMethodRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return QuickContactMethod::query()
            ->active()
            ->ordered()
            ->get();
    }

    public function getAll(): Collection
    {
        return QuickContactMethod::query()
            ->ordered()
            ->get();
    }

    public function findById(int $id): ?QuickContactMethod
    {
        return QuickContactMethod::find($id);
    }

    public function create(array $data): QuickContactMethod
    {
        return QuickContactMethod::create($data);
    }

    public function update(int $id, array $data): QuickContactMethod
    {
        $method = QuickContactMethod::findOrFail($id);
        $method->update($data);

        return $method->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) QuickContactMethod::destroy($id);
    }

    public function toggleStatus(int $id): QuickContactMethod
    {
        $method = QuickContactMethod::findOrFail($id);
        $method->update(['is_active' => ! $method->is_active]);

        return $method->fresh();
    }
}
