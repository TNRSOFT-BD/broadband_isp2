<?php

namespace App\Services;

use App\Models\HeroSetting;
use App\Repositories\Contracts\HeroSettingRepositoryInterface;
use App\Support\InteractsWithLocalImages;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class HeroService
{
    use InteractsWithLocalImages;

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
        $previous = $existing?->only(['background_image']) ?? [];

        if (! $existing) {
            $data['is_active'] = true;
        }

        foreach (['cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url'] as $field) {
            if (isset($data[$field]) && trim((string) $data[$field]) === '') {
                $data[$field] = null;
            }
        }

        $saved = $existing
            ? $this->heroRepository->update($existing->id, $data)
            : $this->heroRepository->create($data);

        $this->deleteReplacedImages($previous, $saved->only(['background_image']), ['background_image']);

        return $saved;
    }

    /**
     * Store an uploaded hero background image and return its public URL.
     */
    public function storeImage(UploadedFile $file): string
    {
        return '/storage/'.$file->store('hero', 'public');
    }
}
