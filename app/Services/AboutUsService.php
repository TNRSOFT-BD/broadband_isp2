<?php

namespace App\Services;

use App\Models\AboutPageSetting;
use App\Repositories\Contracts\AboutPageSettingRepositoryInterface;
use App\Repositories\Contracts\AboutStatisticRepositoryInterface;
use App\Repositories\Contracts\AboutCoreValueRepositoryInterface;
use App\Repositories\Contracts\AboutMilestoneRepositoryInterface;
use App\Repositories\Contracts\AboutCapabilityRepositoryInterface;
use App\Repositories\Contracts\AboutClientRepositoryInterface;
use App\Repositories\Contracts\AboutCertificationRepositoryInterface;
use App\Repositories\Contracts\AboutWhyChooseUsRepositoryInterface;
use App\Support\InteractsWithLocalImages;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class AboutUsService
{
    use InteractsWithLocalImages;

    private const CACHE_KEY = 'about.public.page_data';

    /** @var list<string> */
    private const IMAGE_FIELDS = ['hero_image', 'company_image', 'cta_background_image'];

    public function __construct(
        private AboutPageSettingRepositoryInterface $settingsRepository,
        private AboutStatisticRepositoryInterface $statisticRepository,
        private AboutCoreValueRepositoryInterface $coreValueRepository,
        private AboutMilestoneRepositoryInterface $milestoneRepository,
        private AboutCapabilityRepositoryInterface $capabilityRepository,
        private AboutClientRepositoryInterface $clientRepository,
        private AboutCertificationRepositoryInterface $certificationRepository,
        private AboutWhyChooseUsRepositoryInterface $whyChooseUsRepository,
    ) {}

    /* ─── Page Settings ─── */

    public function getSettings(): array
    {
        $setting = $this->settingsRepository->getActive();

        if (! $setting) {
            return AboutPageSetting::getDefaults();
        }

        return $setting->toArray();
    }

    public function getPublicData(): array
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(10), function () {
            $settings = $this->settingsRepository->getActive();
            $defaults = AboutPageSetting::getDefaults();
            $data = $settings ? array_merge($defaults, $settings->toArray()) : $defaults;

            return [
                'hero' => [
                    'eyebrow' => $data['hero_eyebrow'],
                    'title' => $data['hero_title'],
                    'description' => $data['hero_description'],
                    'primaryCta' => ['text' => $data['hero_primary_cta_text'], 'url' => $data['hero_primary_cta_url']],
                    'secondaryCta' => ['text' => $data['hero_secondary_cta_text'], 'url' => $data['hero_secondary_cta_url']],
                    'image' => $data['hero_image'],
                    'imageAlt' => $data['hero_image_alt'],
                ],
                'company' => [
                    'eyebrow' => $data['company_eyebrow'],
                    'title' => $data['company_title'],
                    'content' => $data['company_content'],
                    'image' => $data['company_image'],
                    'imageAlt' => $data['company_image_alt'],
                ],
                'statistics' => $this->statisticRepository->getActiveOrdered()
                    ->map(fn ($s) => $s->only(['id', 'label', 'value', 'prefix', 'suffix', 'description', 'icon'])),
                'vision' => [
                    'title' => $data['vision_title'],
                    'description' => $data['vision_description'],
                    'icon' => $data['vision_icon'],
                ],
                'mission' => [
                    'title' => $data['mission_title'],
                    'description' => $data['mission_description'],
                    'icon' => $data['mission_icon'],
                ],
                'coreValues' => $this->coreValueRepository->getActiveOrdered()
                    ->map(fn ($v) => $v->only(['id', 'icon', 'title', 'description'])),
                'milestones' => $this->milestoneRepository->getActiveOrdered()
                    ->map(fn ($m) => $m->only(['id', 'year', 'title', 'description', 'image', 'image_alt'])),
                'capabilities' => [
                    'eyebrow' => $data['capabilities_eyebrow'],
                    'title' => $data['capabilities_title'],
                    'description' => $data['capabilities_description'],
                    'image' => $data['capabilities_image'],
                    'imageAlt' => $data['capabilities_image_alt'],
                    'features' => $this->capabilityRepository->getActiveOrdered()
                        ->map(fn ($c) => $c->only(['id', 'icon', 'title', 'description'])),
                ],
                'clients' => [
                    'title' => $data['clients_title'],
                    'description' => $data['clients_description'],
                    'items' => $this->clientRepository->getActiveOrdered()
                        ->map(fn ($c) => $c->only(['id', 'name', 'logo', 'website_url', 'category'])),
                ],
                'certifications' => [
                    'title' => $data['certifications_title'],
                    'description' => $data['certifications_description'],
                    'items' => $this->certificationRepository->getActiveOrdered()
                        ->map(fn ($c) => $c->only(['id', 'icon', 'title', 'description', 'certificate_number', 'issuing_organization', 'issue_date', 'expiry_date', 'verification_url'])),
                ],
                'whyChooseUs' => $this->whyChooseUsRepository->getActiveOrdered()
                    ->map(fn ($w) => $w->only(['id', 'icon', 'title', 'description'])),
                'cta' => [
                    'eyebrow' => $data['cta_eyebrow'],
                    'title' => $data['cta_title'],
                    'description' => $data['cta_description'],
                    'primaryButton' => ['text' => $data['cta_primary_button_text'], 'url' => $data['cta_primary_button_url']],
                    'secondaryButton' => ['text' => $data['cta_secondary_button_text'], 'url' => $data['cta_secondary_button_url']],
                    'backgroundImage' => $data['cta_background_image'],
                    'backgroundImageAlt' => $data['cta_background_image_alt'],
                ],
                'sections' => [
                    'hero' => $data['hero_enabled'],
                    'company' => $data['company_enabled'],
                    'statistics' => $data['statistics_enabled'],
                    'visionMission' => $data['vision_mission_enabled'],
                    'coreValues' => $data['core_values_enabled'],
                    'timeline' => $data['timeline_enabled'],
                    'capabilities' => $data['capabilities_enabled'],
                    'clients' => $data['clients_enabled'],
                    'certifications' => $data['certifications_enabled'],
                    'whyChooseUs' => $data['why_choose_us_enabled'],
                    'cta' => $data['cta_enabled'],
                ],
                'seo' => [
                    'title' => $data['meta_title'],
                    'description' => $data['meta_description'],
                    'keywords' => $data['meta_keywords'],
                ],
            ];
        });
    }

    public function saveSettings(array $data): AboutPageSetting
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

    /* ─── Statistics CRUD ─── */

    private function mutateAndClearCache(callable $mutation)
    {
        $result = $mutation();
        $this->clearCache();

        return $result;
    }

    public function getAllStatistics()
    {
        return $this->statisticRepository->getAll();
    }

    public function createStatistic(array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->statisticRepository->create($data));
    }

    public function updateStatistic(int $id, array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->statisticRepository->update($id, $data));
    }

    public function deleteStatistic(int $id): bool
    {
        return $this->mutateAndClearCache(fn () => $this->statisticRepository->delete($id));
    }

    public function toggleStatisticStatus(int $id)
    {
        return $this->mutateAndClearCache(fn () => $this->statisticRepository->toggleStatus($id));
    }

    /* ─── Core Values CRUD ─── */

    public function getAllCoreValues()
    {
        return $this->coreValueRepository->getAll();
    }

    public function createCoreValue(array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->coreValueRepository->create($data));
    }

    public function updateCoreValue(int $id, array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->coreValueRepository->update($id, $data));
    }

    public function deleteCoreValue(int $id): bool
    {
        return $this->mutateAndClearCache(fn () => $this->coreValueRepository->delete($id));
    }

    public function toggleCoreValueStatus(int $id)
    {
        return $this->mutateAndClearCache(fn () => $this->coreValueRepository->toggleStatus($id));
    }

    /* ─── Milestones CRUD ─── */

    public function getAllMilestones()
    {
        return $this->milestoneRepository->getAll();
    }

    public function createMilestone(array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->milestoneRepository->create($data));
    }

    public function updateMilestone(int $id, array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->milestoneRepository->update($id, $data));
    }

    public function deleteMilestone(int $id): bool
    {
        return $this->mutateAndClearCache(fn () => $this->milestoneRepository->delete($id));
    }

    public function toggleMilestoneStatus(int $id)
    {
        return $this->mutateAndClearCache(fn () => $this->milestoneRepository->toggleStatus($id));
    }

    /* ─── Capabilities CRUD ─── */

    public function getAllCapabilities()
    {
        return $this->capabilityRepository->getAll();
    }

    public function createCapability(array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->capabilityRepository->create($data));
    }

    public function updateCapability(int $id, array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->capabilityRepository->update($id, $data));
    }

    public function deleteCapability(int $id): bool
    {
        return $this->mutateAndClearCache(fn () => $this->capabilityRepository->delete($id));
    }

    public function toggleCapabilityStatus(int $id)
    {
        return $this->mutateAndClearCache(fn () => $this->capabilityRepository->toggleStatus($id));
    }

    /* ─── Clients CRUD ─── */

    public function getAllClients()
    {
        return $this->clientRepository->getAll();
    }

    public function createClient(array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->clientRepository->create($data));
    }

    public function updateClient(int $id, array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->clientRepository->update($id, $data));
    }

    public function deleteClient(int $id): bool
    {
        return $this->mutateAndClearCache(fn () => $this->clientRepository->delete($id));
    }

    public function toggleClientStatus(int $id)
    {
        return $this->mutateAndClearCache(fn () => $this->clientRepository->toggleStatus($id));
    }

    /* ─── Certifications CRUD ─── */

    public function getAllCertifications()
    {
        return $this->certificationRepository->getAll();
    }

    public function createCertification(array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->certificationRepository->create($data));
    }

    public function updateCertification(int $id, array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->certificationRepository->update($id, $data));
    }

    public function deleteCertification(int $id): bool
    {
        return $this->mutateAndClearCache(fn () => $this->certificationRepository->delete($id));
    }

    public function toggleCertificationStatus(int $id)
    {
        return $this->mutateAndClearCache(fn () => $this->certificationRepository->toggleStatus($id));
    }

    /* ─── Why Choose Us CRUD ─── */

    public function getAllWhyChooseUs()
    {
        return $this->whyChooseUsRepository->getAll();
    }

    public function createWhyChooseUs(array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->whyChooseUsRepository->create($data));
    }

    public function updateWhyChooseUs(int $id, array $data)
    {
        return $this->mutateAndClearCache(fn () => $this->whyChooseUsRepository->update($id, $data));
    }

    public function deleteWhyChooseUs(int $id): bool
    {
        return $this->mutateAndClearCache(fn () => $this->whyChooseUsRepository->delete($id));
    }

    public function toggleWhyChooseUsStatus(int $id)
    {
        return $this->mutateAndClearCache(fn () => $this->whyChooseUsRepository->toggleStatus($id));
    }

    /* ─── Image Upload ─── */

    public function storeImage(UploadedFile $file, string $folder = 'about'): string
    {
        $path = $file->store($folder, 'public');

        return '/storage/'.$path;
    }

    public function deleteImage(string $url): void
    {
        if (str_starts_with($url, '/storage/')) {
            Storage::disk('public')->delete(
                str_replace('/storage/', '', $url)
            );
        }
    }

    /* ─── Cache ─── */

    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
