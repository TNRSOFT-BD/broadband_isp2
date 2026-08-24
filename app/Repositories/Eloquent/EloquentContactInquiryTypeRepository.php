<?php

namespace App\Repositories\Eloquent;

use App\Models\ContactInquiryType;
use App\Repositories\Contracts\ContactInquiryTypeRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentContactInquiryTypeRepository implements ContactInquiryTypeRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return ContactInquiryType::query()
            ->active()
            ->ordered()
            ->get();
    }

    public function getAll(): Collection
    {
        return ContactInquiryType::query()
            ->ordered()
            ->get();
    }

    public function findById(int $id): ?ContactInquiryType
    {
        return ContactInquiryType::find($id);
    }

    public function findBySlug(string $slug): ?ContactInquiryType
    {
        return ContactInquiryType::where('slug', $slug)->first();
    }

    public function create(array $data): ContactInquiryType
    {
        return ContactInquiryType::create($data);
    }

    public function update(int $id, array $data): ContactInquiryType
    {
        $type = ContactInquiryType::findOrFail($id);
        $type->update($data);

        return $type->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) ContactInquiryType::destroy($id);
    }

    public function toggleStatus(int $id): ContactInquiryType
    {
        $type = ContactInquiryType::findOrFail($id);
        $type->update(['is_active' => ! $type->is_active]);

        return $type->fresh();
    }
}
