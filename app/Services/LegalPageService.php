<?php

namespace App\Services;

use App\DTOs\LegalPageDTO;
use App\Models\LegalPage;
use App\Repositories\Contracts\LegalPageRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class LegalPageService
{
    public function __construct(
        private LegalPageRepositoryInterface $repository,
    ) {}

    /**
     * Get all legal pages as DTOs.
     */
    public function getAll(): Collection
    {
        return $this->repository->all()->map(fn ($page) => LegalPageDTO::fromModel($page));
    }

    /**
     * Get paginated legal pages.
     */
    public function paginate(int $perPage = 15, string $search = ''): LengthAwarePaginator
    {
        return $this->repository->paginate($perPage, $search);
    }

    /**
     * Get a legal page by ID as DTO.
     */
    public function getById(int $id): ?LegalPageDTO
    {
        $page = $this->repository->findById($id);

        return $page ? LegalPageDTO::fromModel($page) : null;
    }

    /**
     * Get a legal page by slug as DTO.
     */
    public function getBySlug(string $slug): ?LegalPageDTO
    {
        $page = $this->repository->findBySlug($slug);

        return $page ? LegalPageDTO::fromModel($page) : null;
    }

    /**
     * Get a published legal page by slug.
     */
    public function getPublishedBySlug(string $slug): ?LegalPageDTO
    {
        $page = $this->repository->findBySlug($slug);

        if (! $page || ! $page->isPublished()) {
            return null;
        }

        return LegalPageDTO::fromModel($page);
    }

    /**
     * Get all published legal pages.
     */
    public function getPublished(): Collection
    {
        return $this->repository->getPublished()->map(fn ($page) => LegalPageDTO::fromModel($page));
    }

    /**
     * Create a new legal page.
     */
    public function create(array $data): LegalPageDTO
    {
        // Decode content_json if sent as a JSON string (from frontend stringify)
        if (isset($data['content_json']) && is_string($data['content_json'])) {
            $data['content_json'] = json_decode($data['content_json'], true);
        }

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        if (isset($data['status']) && $data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        if (isset($data['status']) && $data['status'] === 'published') {
            $data['last_updated_at'] = now();
        }

        $page = $this->repository->create($data);

        return LegalPageDTO::fromModel($page);
    }

    /**
     * Update an existing legal page.
     */
    public function update(int $id, array $data): LegalPageDTO
    {
        // Decode content_json if sent as a JSON string (from frontend stringify)
        if (isset($data['content_json']) && is_string($data['content_json'])) {
            $data['content_json'] = json_decode($data['content_json'], true);
        }

        if (isset($data['status']) && $data['status'] === 'published') {
            $existing = $this->repository->findById($id);
            if ($existing && $existing->status !== 'published') {
                $data['published_at'] = $data['published_at'] ?? now();
            }
            $data['last_updated_at'] = now();
        }

        if (isset($data['content_json']) || isset($data['title'])) {
            $data['last_updated_at'] = now();
        }

        $page = $this->repository->update($id, $data);

        return LegalPageDTO::fromModel($page);
    }

    /**
     * Delete a legal page.
     */
    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    /**
     * Check if a slug is unique (excluding a given ID).
     */
    public function isSlugUnique(string $slug, ?int $excludeId = null): bool
    {
        $query = LegalPage::where('slug', $slug);
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return ! $query->exists();
    }
}
