<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutClient;
use App\Models\AboutStatistic;
use App\Models\AboutWhyChooseUs;
use App\Models\IntroFeature;
use App\Models\HomepageCoverageArea;
use App\Models\HomepageFaq;
use App\Models\HomepageSetting;
use App\Models\HomepageTestimonial;
use App\Models\Plan;
use App\Models\Service;
use App\Repositories\Contracts\HomepageRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentHomepageRepository implements HomepageRepositoryInterface
{
    public function getSettings(): array
    {
        return HomepageSetting::query()
            ->active()
            ->ordered()
            ->get()
            ->keyBy('section_key')
            ->all();
    }

    public function updateSetting(string $key, array $data, bool $isActive = true): HomepageSetting
    {
        return HomepageSetting::updateOrCreate(
            ['section_key' => $key],
            ['data' => $data, 'is_active' => $isActive]
        );
    }

    public function getActiveFaqs(): Collection
    {
        return HomepageFaq::active()->ordered()->get();
    }

    public function getActiveTestimonials(): Collection
    {
        return HomepageTestimonial::active()->ordered()->get();
    }

    public function getFeaturedTestimonials(): Collection
    {
        return HomepageTestimonial::active()->featured()->ordered()->get();
    }

    public function getActiveCoverageAreas(): Collection
    {
        return HomepageCoverageArea::active()->ordered()->get();
    }

    public function getFeaturedPlans(): Collection
    {
        return Plan::where('is_active', true)
            ->where('is_featured', true)
            ->with(['category:id,name', 'features:id,plan_id,title,icon,description,sort_order'])
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function getLatestPlans(): Collection
    {
        return Plan::where('is_active', true)
            ->with(['category:id,name', 'features:id,plan_id,title,icon,description,sort_order'])
            ->orderBy('sort_order')
            ->orderBy('id')
            ->limit(3)
            ->get();
    }

    public function getFeaturedServices(): Collection
    {
        return Service::where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    public function getActiveIntroFeatures(): Collection
    {
        return IntroFeature::active()->ordered()->get();
    }

    public function getActiveWhyChooseUs(): Collection
    {
        return AboutWhyChooseUs::active()->ordered()->get();
    }

    public function getActiveStatistics(): Collection
    {
        return AboutStatistic::active()->ordered()->get();
    }

    public function getActivePartners(): Collection
    {
        return AboutClient::active()->ordered()->get();
    }
}
