<?php

namespace App\Services;

use App\Models\SiteSetting;
use App\Repositories\Contracts\SiteSettingRepositoryInterface;
use App\Support\InteractsWithLocalImages;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;

class SiteSettingsService
{
    use InteractsWithLocalImages;

    private const CACHE_KEY = 'site.branding';

    /** @var list<string> */
    private const IMAGE_FIELDS = ['logo', 'favicon'];

    public function __construct(
        private SiteSettingRepositoryInterface $repository,
    ) {}

    /**
     * Cached branding assets shared across the site.
     *
     * @return array{site_name: ?string, logo: ?string, favicon: ?string}
     */
    public function get(): array
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), function () {
            $setting = $this->repository->getActive();

            return [
                'site_name' => $setting?->site_name,
                'logo' => $setting?->logo,
                'favicon' => $setting?->favicon,
            ];
        });
    }

    public function save(array $data): SiteSetting
    {
        try {
            $existing = $this->repository->getActive();
            $previous = $existing?->only(self::IMAGE_FIELDS) ?? [];

            $saved = $existing
                ? $this->repository->update($existing->id, $data)
                : $this->repository->create($data);

            $this->deleteReplacedImages($previous, $saved->only(self::IMAGE_FIELDS), self::IMAGE_FIELDS);

            return $saved;
        } finally {
            Cache::forget(self::CACHE_KEY);
        }
    }

    /**
     * Store an uploaded branding image and return its public URL.
     */
    public function storeImage(UploadedFile $file): string
    {
        return '/storage/'.$file->store('branding', 'public');
    }

    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
