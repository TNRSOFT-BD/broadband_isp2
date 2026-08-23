<?php

namespace App\Services;

use App\Models\HeroSetting;
use App\Repositories\Contracts\HeroSettingRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class HeroService
{
    public function __construct(
        private HeroSettingRepositoryInterface $heroRepository,
    ) {}

    /**
     * Get active hero settings or defaults.
     */
    public function getActiveHero(): array
    {
        $hero = $this->heroRepository->getActive();

        if (! $hero) {
            return HeroSetting::getDefaults();
        }

        return $hero->toArray();
    }

    /**
     * Create or update hero settings.
     */
    public function saveHero(array $data): HeroSetting
    {
        $existing = $this->heroRepository->getActive();

        if ($existing) {
            return $this->heroRepository->update($existing->id, $data);
        }

        $data['is_active'] = true;

        return $this->heroRepository->create($data);
    }

    /**
     * Store an uploaded hero background image and return its public URL.
     * Deletes the previous locally stored image (if any).
     */
    public function storeImage(UploadedFile $file): string
    {
        $this->deleteOldLocalImage();

        $path = $file->store('hero', 'public');

        return '/storage/'.$path;
    }

    /**
     * Delete the active hero's background image from local storage.
     */
    private function deleteOldLocalImage(): void
    {
        $hero = $this->heroRepository->getActive();

        if (! $hero?->background_image) {
            return;
        }

        if (str_starts_with($hero->background_image, '/storage/')) {
            Storage::disk('public')->delete(
                str_replace('/storage/', '', $hero->background_image)
            );
        }
    }
}
