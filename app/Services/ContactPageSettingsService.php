<?php

namespace App\Services;

use App\Models\ContactPageSetting;
use App\Repositories\Contracts\ContactPageSettingRepositoryInterface;
use App\Support\InteractsWithLocalImages;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ContactPageSettingsService
{
    use InteractsWithLocalImages;

    private const CACHE_KEY = 'contact.public.page_settings';

    /** @var list<string> */
    private const IMAGE_FIELDS = ['hero_background_image'];

    public function __construct(
        private ContactPageSettingRepositoryInterface $settingsRepository,
    ) {}

    public function getSettings(): array
    {
        $setting = $this->settingsRepository->getActive();

        if (! $setting) {
            return ContactPageSetting::getDefaults();
        }

        return $setting->toArray();
    }

    public function getPublicSettings(): array
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), fn () => $this->getSettings());
    }

    public function saveSettings(array $data): ContactPageSetting
    {
        try {
            $existing = $this->settingsRepository->getActive();
            $previous = $existing?->only(self::IMAGE_FIELDS) ?? [];

            $saved = $existing
                ? $this->settingsRepository->update($existing->id, $data)
                : $this->settingsRepository->create($data);

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
        return '/storage/'.$file->store('contact-page', 'public');
    }
}
