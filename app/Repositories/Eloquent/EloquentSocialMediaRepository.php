<?php

namespace App\Repositories\Eloquent;

use App\Models\SocialMediaItem;
use App\Repositories\Contracts\SocialMediaRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentSocialMediaRepository implements SocialMediaRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return SocialMediaItem::query()
            ->active()
            ->ordered()
            ->get();
    }

    public function getAll(): Collection
    {
        return SocialMediaItem::query()
            ->ordered()
            ->get();
    }

    public function findById(int $id): ?SocialMediaItem
    {
        return SocialMediaItem::find($id);
    }

    public function create(array $data): SocialMediaItem
    {
        return SocialMediaItem::create($data);
    }

    public function update(int $id, array $data): SocialMediaItem
    {
        $item = SocialMediaItem::findOrFail($id);
        $item->update($data);

        return $item->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) SocialMediaItem::destroy($id);
    }

    public function toggleStatus(int $id): SocialMediaItem
    {
        $item = SocialMediaItem::findOrFail($id);
        $item->update(['is_active' => ! $item->is_active]);

        return $item->fresh();
    }
}
