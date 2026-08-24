<?php

namespace App\Services;

use App\Models\ContactInquiryType;
use App\Repositories\Contracts\ContactInquiryTypeRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class ContactInquiryTypeService
{
    public function __construct(
        private ContactInquiryTypeRepositoryInterface $inquiryTypeRepository,
    ) {}

    public function getActiveTypes(): Collection
    {
        return $this->inquiryTypeRepository->getActiveOrdered();
    }

    public function getAllTypes(): Collection
    {
        return $this->inquiryTypeRepository->getAll();
    }

    public function findById(int $id): ?ContactInquiryType
    {
        return $this->inquiryTypeRepository->findById($id);
    }

    public function createType(array $data): ContactInquiryType
    {
        $data['slug'] = $this->resolveUniqueSlug($data['slug'] ?? null, $data['name']);

        return $this->inquiryTypeRepository->create($data);
    }

    public function updateType(int $id, array $data): ContactInquiryType
    {
        if (isset($data['name']) && ! isset($data['slug'])) {
            $data['slug'] = $this->resolveUniqueSlug(null, $data['name'], $id);
        }

        return $this->inquiryTypeRepository->update($id, $data);
    }

    public function deleteType(int $id): bool
    {
        return $this->inquiryTypeRepository->delete($id);
    }

    public function toggleStatus(int $id): ContactInquiryType
    {
        return $this->inquiryTypeRepository->toggleStatus($id);
    }

    private function resolveUniqueSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($slug ?: $name);
        $candidate = $base;
        $suffix = 1;

        $exists = fn (string $value) => ContactInquiryType::where('slug', $value)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists();

        while ($exists($candidate)) {
            $candidate = "{$base}-" . (++$suffix);
        }

        return $candidate;
    }
}
