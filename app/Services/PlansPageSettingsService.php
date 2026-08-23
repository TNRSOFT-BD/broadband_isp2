<?php

namespace App\Services;

use App\Models\PlansPageSetting;
use App\Repositories\Contracts\PlansPageSettingRepositoryInterface;
use Illuminate\Support\Facades\Cache;

class PlansPageSettingsService
{
    private const CACHE_KEY = 'plans.public.page_settings';

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

            if ($existing) {
                return $this->settingsRepository->update($existing->id, $data);
            }

            return $this->settingsRepository->create([
                ...$data,
                'is_active' => true,
            ]);
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }
}
