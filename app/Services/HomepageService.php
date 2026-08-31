<?php

namespace App\Services;

use App\Repositories\Contracts\HomepageRepositoryInterface;
use App\Repositories\Contracts\HomepageServiceItemRepositoryInterface;
use Illuminate\Support\Facades\Cache;

class HomepageService
{
    private const CACHE_KEY = 'homepage.data';
    private const CACHE_TTL = 10; // minutes

    public function __construct(
        private HomepageRepositoryInterface $homepageRepository,
        private HomepageServiceItemRepositoryInterface $homepageServiceItemRepository,
    ) {}

    /**
     * Get all homepage data for the public site (cached).
     */
    public function getHomepageData(): array
    {
        return Cache::remember(self::CACHE_KEY, now()->addMinutes(self::CACHE_TTL), function () {
            return $this->buildHomepageData();
        });
    }

    /**
     * Flush homepage cache (call after admin updates).
     */
    public function flushCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    /**
     * Get a specific section setting.
     */
    public function getSetting(string $key, array $default = []): array
    {
        $section = \App\Models\HomepageSetting::findByKey($key);

        if (! $section || ! $section->is_active) {
            return $default;
        }

        return array_merge($default, $section->data ?? []);
    }

    /**
     * Build the full homepage data structure.
     */
    private function buildHomepageData(): array
    {
        $settings = $this->homepageRepository->getSettings();

        return [
            'intro' => $this->extractSectionData($settings, 'intro', [
                'eyebrow' => 'About Us',
                'title' => 'Powering a More Connected Future',
                'subtitle' => 'Your Trusted Internet Partner',
                'description' => 'We are a leading internet service provider delivering ultra-fast, reliable connectivity to homes and businesses. Our cutting-edge fiber network ensures you stay connected to what matters most.',
                'cta_text' => 'Discover Our Story',
                'cta_url' => '/about',
                'highlights' => [
                    'Fiber Optic Infrastructure',
                    '24/7 Network Monitoring',
                    'No Data Caps',
                    'Free Installation',
                ],
                'trust_badge' => 'Trusted by 50,000+ customers across 8 divisions',
                'hud_panels' => [
                    [
                        'label' => 'Network',
                        'position' => 'top-left',
                        'stats' => [
                            ['value' => '99.97%', 'label' => 'uptime'],
                            ['value' => '12.4 Gbps', 'label' => 'peak'],
                        ],
                    ],
                    [
                        'label' => 'Coverage',
                        'position' => 'bottom-right',
                        'stats' => [
                            ['value' => '64+', 'label' => 'zones'],
                            ['value' => '8 divisions', 'label' => 'active'],
                        ],
                    ],
                ],
            ]),
            'featuredPlans' => $this->getPlansWithFallback(),
            'introFeatures' => $this->homepageRepository->getActiveIntroFeatures()->map(fn ($f) => [
                'id' => $f->id,
                'label' => $f->label,
                'sub_label' => $f->sub_label,
                'icon' => $f->icon,
                'color' => $f->color,
            ])->toArray(),
            'whyChooseUs' => $this->homepageRepository->getActiveWhyChooseUs()->map(fn ($item) => [
                'id' => $item->id,
                'icon' => $item->icon,
                'title' => $item->title,
                'description' => $item->description,
            ])->toArray(),
            'statistics' => $this->homepageRepository->getActiveStatistics()->map(fn ($stat) => [
                'id' => $stat->id,
                'label' => $stat->label,
                'value' => $stat->value,
                'prefix' => $stat->prefix,
                'suffix' => $stat->suffix,
                'description' => $stat->description,
                'icon' => $stat->icon,
            ])->toArray(),
            'services' => $this->homepageRepository->getFeaturedServices()->map(fn ($svc) => [
                'id' => $svc->id,
                'name' => $svc->name,
                'slug' => $svc->slug,
                'category' => $svc->category,
                'category_label' => $svc->category_label,
                'description' => $svc->description,
                'logo' => $svc->logo,
                'website_url' => $svc->website_url,
            ])->toArray(),
            'homepageServices' => $this->getHomepageServicesData(),
            'technology' => $this->extractSectionData($settings, 'technology', [
                'eyebrow' => 'Our Technology',
                'title' => 'Engineered for Reliable Connectivity',
                'description' => 'Our network infrastructure is built on cutting-edge fiber optic technology, ensuring maximum speed, reliability, and security for every connection.',
                'image' => null,
                'capabilities' => [
                    ['title' => 'Fiber Optic Network', 'description' => 'State-of-the-art fiber infrastructure'],
                    ['title' => 'Redundant Paths', 'description' => 'Multiple redundant connectivity paths'],
                    ['title' => '24/7 Monitoring', 'description' => 'Intelligent network monitoring systems'],
                    ['title' => 'Enterprise Grade', 'description' => 'Business-grade SLA guarantees'],
                ],
                'network_stats' => [
                    'uptime' => '99.99%',
                    'peers' => '2,847',
                ],
                'nodes' => [
                    ['label' => 'POP', 'sub' => 'ACCESS'],
                    ['label' => 'DATA CENTER', 'sub' => 'CORE'],
                    ['label' => 'IX PEERING', 'sub' => 'TRANSIT'],
                    ['label' => 'CDN EDGE', 'sub' => 'CACHE'],
                    ['label' => 'ACCESS NODE', 'sub' => 'LAST MILE'],
                    ['label' => 'CORE ROUTER', 'sub' => 'BACKBONE'],
                    ['label' => 'DNS CLUSTER', 'sub' => 'RESOLVE'],
                    ['label' => 'BGP PEER', 'sub' => 'ROUTING'],
                    ['label' => 'SECURITY', 'sub' => 'FIREWALL'],
                    ['label' => 'WIRELESS', 'sub' => '5G/LTE'],
                ],
            ]),
            'coverage' => $this->extractSectionData($settings, 'coverage', [
                'title' => 'Where We Keep You Connected',
                'description' => 'Our network spans across major divisions and districts, bringing reliable internet to homes and businesses everywhere.',
                'cta_text' => 'Check Your Coverage',
                'cta_url' => '/contact',
            ]),
            'coverageAreas' => $this->homepageRepository->getActiveCoverageAreas()->map(fn ($area) => [
                'id' => $area->id,
                'name' => $area->name,
                'type' => $area->type,
                'status' => $area->status,
            ])->toArray(),
            'testimonials' => $this->homepageRepository->getActiveTestimonials()->map(fn ($t) => [
                'id' => $t->id,
                'customer_name' => $t->customer_name,
                'customer_role' => $t->customer_role,
                'company_name' => $t->company_name,
                'avatar' => $t->avatar,
                'content' => $t->content,
                'rating' => $t->rating,
            ])->toArray(),
            'partners' => $this->homepageRepository->getActivePartners()->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'logo' => $p->logo,
                'website_url' => $p->website_url,
            ])->toArray(),
            'faqs' => $this->homepageRepository->getActiveFaqs()->map(fn ($faq) => [
                'id' => $faq->id,
                'question' => $faq->question,
                'answer' => $faq->answer,
                'category' => $faq->category,
            ])->toArray(),
            'cta' => $this->extractSectionData($settings, 'cta', [
                'eyebrow' => 'Get Started',
                'title' => 'Your Next Connection Starts Here',
                'description' => 'Experience the future of internet connectivity. Choose a plan that fits your needs and get connected today.',
                'primary_button_text' => 'Explore Packages',
                'primary_button_url' => '/plans',
                'secondary_button_text' => 'Contact Us',
                'secondary_button_url' => '/contact',
            ]),
            'sectionVisibility' => $this->getSectionVisibility($settings),
        ];
    }

    /**
     * Extract data for a specific section from settings, with defaults.
     */
    private function extractSectionData(array $settings, string $key, array $defaults): array
    {
        if (isset($settings[$key]) && $settings[$key]->is_active) {
            return array_merge($defaults, $settings[$key]->data ?? []);
        }

        return $defaults;
    }

    /**
     * Get section visibility flags.
     */
    private function getSectionVisibility(array $settings): array
    {
        $visibility = [];
        $allSections = ['intro', 'technology', 'coverage', 'cta'];

        foreach ($allSections as $key) {
            $visibility[$key] = isset($settings[$key]) ? $settings[$key]->is_active : true;
        }

        // Intro network features visibility (toggleable from admin)
        $introFeaturesSetting = \App\Models\HomepageSetting::findByKey('intro_features');
        $visibility['introFeatures'] = $introFeaturesSetting ? $introFeaturesSetting->is_active : true;

        // These sections are always visible if they have data
        $visibility['featuredPlans'] = true;
        $visibility['whyChooseUs'] = true;
        $visibility['statistics'] = true;
        // Homepage Services section (dynamic ISP services)
        $homepageServicesSetting = \App\Models\HomepageSetting::findByKey('services_section');
        $visibility['homepageServices'] = $homepageServicesSetting ? $homepageServicesSetting->is_active : true;

        $visibility['services'] = true;
        $visibility['testimonials'] = true;
        $visibility['partners'] = true;
        $visibility['faqs'] = true;

        return $visibility;
    }

    /**
     * Get homepage services section data (ISP services with background images).
     */
    private function getHomepageServicesData(): array
    {
        $sectionSetting = \App\Models\HomepageSetting::findByKey('services_section');
        $sectionData = $sectionSetting?->data ?? [];

        $items = $this->homepageServiceItemRepository->getActiveOrdered()->map(fn ($item) => [
            'id' => $item->id,
            'title' => $item->title,
            'category' => $item->category?->name,
            'description' => $item->description,
            'image' => $item->image,
            'link' => $item->link,
            'open_in_new_tab' => $item->open_in_new_tab,
        ])->toArray();

        $categories = collect($items)
            ->pluck('category')
            ->filter()
            ->unique()
            ->values()
            ->toArray();

        return [
            'title' => $sectionData['title'] ?? 'Explore Our Digital Services',
            'subtitle' => $sectionData['subtitle'] ?? 'Access our high-speed platforms, entertainment services, customer tools, and digital infrastructure from one place.',
            'categories' => $categories,
            'items' => $items,
        ];
    }

    private function getPlansWithFallback(): array
    {
        $featured = $this->homepageRepository->getFeaturedPlans();

        $plans = $featured->isEmpty()
            ? $this->homepageRepository->getLatestPlans()
            : $featured;

        return $plans->map(function ($plan) {
            return [
                'id' => $plan->id,
                'name' => $plan->name,
                'tagline' => $plan->tagline,
                'speed' => $plan->speed,
                'speed_unit' => $plan->speed_unit,
                'monthly_price' => $plan->monthly_price,
                'setup_fee' => $plan->setup_fee,
                'badge_text' => $plan->badge_text,
                'is_featured' => $plan->is_featured,
                'is_recommended' => $plan->is_recommended,
                'cta_text' => $plan->cta_text,
                'cta_url' => $plan->cta_url,
                'slug' => $plan->slug,
                'features' => $plan->features->map(fn ($f) => [
                    'title' => $f->title,
                    'description' => $f->description,
                ])->toArray(),
                'category' => $plan->category?->name,
            ];
        })->toArray();
    }
}
