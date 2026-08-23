<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Services\PlanCategoryService;
use App\Services\PlanService;
use App\Services\PlansPageSettingsService;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    public function __construct(
        private PlanService $planService,
        private PlanCategoryService $planCategoryService,
        private PlansPageSettingsService $pageSettingsService,
    ) {}

    /**
     * Display the public plans page.
     */
    public function index(): Response
    {
        return Inertia::render('plans/Index', [
            'pageSettings' => $this->pageSettingsService->getPublicSettings(),
            'categories' => $this->planCategoryService->getActiveCategories()
                ->map(fn ($category) => $category->only(['id', 'name', 'slug', 'icon', 'description'])),
            'plans' => $this->planService->getActivePlans()->map(
                fn (Plan $plan) => $this->transformForCard($plan)
            ),
        ]);
    }

    /**
     * Display a single plan details page.
     */
    public function show(string $slug): Response
    {
        $plan = $this->planService->findActiveBySlug($slug);

        abort_if(! $plan, 404);

        return Inertia::render('plans/Show', [
            'pageSettings' => $this->pageSettingsService->getPublicSettings(),
            'plan' => $this->transformForDetail($plan),
        ]);
    }

    /**
     * Public card payload for a plan.
     */
    private function transformForCard(Plan $plan): array
    {
        return [
            ...$this->basePayload($plan),
            'features' => $plan->features->map(fn ($feature) => $feature->only(['id', 'title', 'icon', 'description'])),
            'services' => $plan->services
                ->filter(fn ($service) => $service->pivot->is_included)
                ->values()
                ->map(fn ($service) => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'slug' => $service->slug,
                    'logo' => $service->logo,
                    'custom_label' => $service->pivot->custom_label,
                    'duration' => $service->pivot->duration,
                ]),
        ];
    }

    /**
     * Full public payload for a plan detail page.
     */
    private function transformForDetail(Plan $plan): array
    {
        return [
            ...$this->basePayload($plan),
            'features' => $plan->features->map(fn ($feature) => $feature->only(['id', 'title', 'icon', 'description'])),
            'services' => $plan->services
                ->filter(fn ($service) => $service->pivot->is_included)
                ->values()
                ->map(fn ($service) => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'slug' => $service->slug,
                    'logo' => $service->logo,
                    'description' => $service->description,
                    'website_url' => $service->website_url,
                    'custom_label' => $service->pivot->custom_label,
                    'duration' => $service->pivot->duration,
                ]),
        ];
    }

    /**
     * Shared scalar fields for plan payloads.
     */
    private function basePayload(Plan $plan): array
    {
        return [
            'id' => $plan->id,
            'name' => $plan->name,
            'slug' => $plan->slug,
            'tagline' => $plan->tagline,
            'description' => $plan->description,
            'speed' => $plan->speed,
            'speed_unit' => $plan->speed_unit,
            'download_speed' => $plan->download_speed,
            'upload_speed' => $plan->upload_speed,
            'monthly_price' => $plan->monthly_price,
            'quarterly_price' => $plan->quarterly_price,
            'yearly_price' => $plan->yearly_price,
            'setup_fee' => $plan->setup_fee,
            'vat_information' => $plan->vat_information,
            'contract_duration' => $plan->contract_duration,
            'fair_usage_policy' => $plan->fair_usage_policy,
            'terms_conditions' => $plan->terms_conditions,
            'badge_text' => $plan->badge_text,
            'is_featured' => $plan->is_featured,
            'is_recommended' => $plan->is_recommended,
            'cta_text' => $plan->cta_text,
            'cta_url' => $plan->cta_url,
            'category' => $plan->category?->only(['id', 'name', 'slug']),
        ];
    }
}
