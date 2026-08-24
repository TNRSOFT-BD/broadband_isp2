<?php

namespace App\Services;

use App\Models\PlansPageSetting;
use App\Repositories\Contracts\PlansPageSettingRepositoryInterface;
use App\Support\InteractsWithLocalImages;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PlansPageSettingsService
{
    use InteractsWithLocalImages;

    private const CACHE_KEY = 'plans.public.page_settings';

    /** @var list<string> */
    private const IMAGE_FIELDS = ['background_image', 'cta_section_background_image'];

    public function __construct(
        private PlansPageSettingRepositoryInterface $settingsRepository,
    ) {}

    /**
     * Active plans page settings, falling back to defaults.
     */
    public function getSettings(): array
    {
        $setting = $this->settingsRepository->getActive();

        if (! $setting) {
            return PlansPageSetting::getDefaults();
        }

        return $setting->toArray();
    }

    /**
     * Cached settings for the public page.
     */
    public function getPublicSettings(): array
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), fn () => $this->getSettings());
    }

    public function saveSettings(array $data): PlansPageSetting
    {
        try {
            $existing = $this->settingsRepository->getActive();
            $previous = $existing?->only(self::IMAGE_FIELDS) ?? [];

            $saved = $existing
                ? $this->settingsRepository->update($existing->id, $data)
                : $this->settingsRepository->create([
                    ...$data,
                    'is_active' => true,
                ]);

            $this->deleteReplacedImages($previous, $saved->only(self::IMAGE_FIELDS), self::IMAGE_FIELDS);

            return $saved;
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    /**
     * Store an uploaded page image and return its public URL.
     */
    public function storeImage(UploadedFile $file): string
    {
        return '/storage/'.$file->store('plans-page', 'public');
    }
}
