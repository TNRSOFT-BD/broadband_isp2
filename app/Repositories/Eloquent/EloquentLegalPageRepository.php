<?php

namespace App\Repositories\Eloquent;

use App\Models\LegalPage;
use App\Repositories\Contracts\LegalPageRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class EloquentLegalPageRepository implements LegalPageRepositoryInterface
{
    public function all(): Collection
    {
        return LegalPage::query()->orderBy('sort_order')->get();
    }

    public function paginate(int $perPage = 15, string $search = ''): LengthAwarePaginator
    {
        $query = LegalPage::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('page_type', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('sort_order')->paginate($perPage);
    }

    public function findById(int $id): ?LegalPage
    {
        return LegalPage::find($id);
    }

    public function findBySlug(string $slug): ?LegalPage
    {
        return LegalPage::where('slug', $slug)->first();
    }

    public function create(array $data): LegalPage
    {
        return LegalPage::create($data);
    }

    public function update(int $id, array $data): LegalPage
    {
        $page = LegalPage::findOrFail($id);
        $page->update($data);

        return $page->fresh();
    }

    public function delete(int $id): bool
    {
        $page = LegalPage::findOrFail($id);

        return $page->delete();
    }

    public function getPublished(): Collection
    {
        return LegalPage::where('status', 'published')->orderBy('sort_order')->get();
    }
}
