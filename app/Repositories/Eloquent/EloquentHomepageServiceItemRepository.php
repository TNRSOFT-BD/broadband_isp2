<?php

namespace App\Repositories\Eloquent;

use App\Models\HomepageServiceItem;
use App\Repositories\Contracts\HomepageServiceItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentHomepageServiceItemRepository implements HomepageServiceItemRepositoryInterface
{
    public function all(): Collection
    {
        return HomepageServiceItem::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function getActiveOrdered(): Collection
    {
        return HomepageServiceItem::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function findById(int $id): ?HomepageServiceItem
    {
        return HomepageServiceItem::find($id);
    }

    public function create(array $data): HomepageServiceItem
    {
        return HomepageServiceItem::create($data);
    }

    public function update(int $id, array $data): HomepageServiceItem
    {
        $item = HomepageServiceItem::findOrFail($id);
        $item->update($data);

        return $item->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) HomepageServiceItem::destroy($id);
    }
}
