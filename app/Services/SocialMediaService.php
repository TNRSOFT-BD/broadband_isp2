<?php

namespace App\Services;

use App\Models\SocialMediaItem;
use App\Repositories\Contracts\SocialMediaRepositoryInterface;
use App\Support\InteractsWithLocalImages;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SocialMediaService
{
    use InteractsWithLocalImages;

    public function __construct(
        private SocialMediaRepositoryInterface $socialMediaRepository,
    ) {}

    public function getActiveItems(): Collection
    {
        return $this->socialMediaRepository->getActiveOrdered();
    }

    public function getAllItems(): Collection
    {
        return $this->socialMediaRepository->getAll();
    }

    public function findById(int $id): ?SocialMediaItem
    {
        return $this->socialMediaRepository->findById($id);
    }

    public function createItem(array $data): SocialMediaItem
    {
        return $this->socialMediaRepository->create($data);
    }

    public function updateItem(int $id, array $data): SocialMediaItem
    {
        $previous = $this->socialMediaRepository->findById($id)?->only(['image']) ?? [];

        $saved = $this->socialMediaRepository->update($id, $data);

        $this->deleteReplacedImages($previous, $saved->only(['image']), ['image']);

        return $saved;
    }

    public function deleteItem(int $id): bool
    {
        $item = $this->socialMediaRepository->findById($id);

        if ($item?->image) {
            $this->deleteLocalImage($item->image);
        }

        return $this->socialMediaRepository->delete($id);
    }

    public function toggleStatus(int $id): SocialMediaItem
    {
        return $this->socialMediaRepository->toggleStatus($id);
    }

    /**
     * Store an uploaded social media icon/image and return its public URL.
     */
    public function storeImage(UploadedFile $file): string
    {
        $path = $file->store('social-media/icons', 'public');

        return '/storage/' . $path;
    }

    /**
     * Delete a stored image file when it lives on the local public disk.
     */
    public function deleteStoredImage(?string $imageUrl): void
    {
        if (! $imageUrl || ! str_starts_with($imageUrl, '/storage/')) {
            return;
        }

        Storage::disk('public')->delete(str_replace('/storage/', '', $imageUrl));
    }
}
