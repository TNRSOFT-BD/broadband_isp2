<?php

namespace App\Repositories\Contracts;

use App\Models\HomepageCoverageArea;
use App\Models\HomepageFaq;
use App\Models\HomepageSetting;
use App\Models\HomepageTestimonial;
use Illuminate\Database\Eloquent\Collection;

interface HomepageRepositoryInterface
{
    /**
     * Get all homepage settings keyed by section_key.
     *
     * @return array<string, HomepageSetting>
     */
    public function getSettings(): array;

    /**
     * Update or create a homepage setting.
     */
    public function updateSetting(string $key, array $data, bool $isActive = true): HomepageSetting;

    /**
     * Get all active FAQs ordered.
     */
    public function getActiveFaqs(): Collection;

    /**
     * Get all active testimonials ordered.
     */
    public function getActiveTestimonials(): Collection;

    /**
     * Get featured testimonials.
     */
    public function getFeaturedTestimonials(): Collection;

    /**
     * Get all active coverage areas ordered.
     */
    public function getActiveCoverageAreas(): Collection;

    /**
     * Get featured plans (active + featured).
     */
    public function getFeaturedPlans(): Collection;

    /**
     * Get featured services (active + featured).
     */
    public function getFeaturedServices(): Collection;

    /**
     * Get active intro network features.
     */
    public function getActiveIntroFeatures(): Collection;

    /**
     * Get active "why choose us" items.
     */
    public function getActiveWhyChooseUs(): Collection;

    /**
     * Get active statistics.
     */
    public function getActiveStatistics(): Collection;

    /**
     * Get active partners/clients.
     */
    public function getActivePartners(): Collection;
}
