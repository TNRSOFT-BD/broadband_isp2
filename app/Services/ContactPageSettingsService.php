<?php

namespace App\Services;

use App\Models\ContactPageSetting;
use App\Repositories\Contracts\ContactPageSettingRepositoryInterface;
use Illuminate\Support\Facades\Cache;

class ContactPageSettingsService
{
    private const CACHE_KEY = 'contact.public.page_settings';

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

            if ($existing) {
                return $this->settingsRepository->update($existing->id, $data);
            }

            return $this->settingsRepository->create($data);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }
}
