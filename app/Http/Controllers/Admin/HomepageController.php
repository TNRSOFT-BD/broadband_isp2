<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePartnerImageRequest;
use App\Models\AboutClient;
use App\Models\HomepageCoverageArea;
use App\Models\HomepageFaq;
use App\Models\HomepageSetting;
use App\Models\HomepageTestimonial;
use App\Models\IntroFeature;
use App\Services\HomepageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomepageController extends Controller
{
    public function __construct(
        private HomepageService $homepageService,
    ) {}

    /**
     * Show the homepage management overview.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Homepage/Index', [
            'settings' => HomepageSetting::ordered()->get()->map(fn ($s) => [
                'id' => $s->id,
                'section_key' => $s->section_key,
                'is_active' => $s->is_active,
                'sort_order' => $s->sort_order,
            ]),
        ]);
    }

    /**
     * Edit a specific homepage section.
     */
    public function edit(string $section): Response
    {
        $setting = HomepageSetting::findByKey($section);

        $data = match ($section) {
            'intro' => $this->getIntroData($setting),
            'technology' => $this->getTechnologyData($setting),
            'coverage' => $this->getCoverageData($setting),
            'cta' => $this->getCtaData($setting),
            default => [],
        };

        return Inertia::render('Admin/Homepage/EditSection', [
            'section' => $section,
            'data' => $data,
            'is_active' => $setting?->is_active ?? true,
        ]);
    }

    /**
     * Update a homepage section.
     */
    public function update(Request $request, string $section): RedirectResponse
    {
        $validated = $request->validate([
            'data' => 'required|array',
            'is_active' => 'boolean',
        ]);

        $this->homepageService->flushCache();

        HomepageSetting::updateOrCreate(
            ['section_key' => $section],
            [
                'data' => $validated['data'],
                'is_active' => $validated['is_active'] ?? true,
            ]
        );

        return redirect()->route('admin.homepage.index')
            ->with('success', ucfirst($section) . ' section updated successfully.');
    }

    // ─── Testimonial CRUD ───────────────────────────────────────────

    public function testimonials(): Response
    {
        return Inertia::render('Admin/Homepage/Testimonials', [
            'testimonials' => HomepageTestimonial::ordered()->get(),
        ]);
    }

    public function storeTestimonial(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_role' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'avatar' => 'nullable|string|max:512',
            'content' => 'required|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        HomepageTestimonial::create($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.testimonials')
            ->with('success', 'Testimonial created successfully.');
    }

    public function updateTestimonial(Request $request, int $id): RedirectResponse
    {
        $testimonial = HomepageTestimonial::findOrFail($id);

        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_role' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'avatar' => 'nullable|string|max:512',
            'content' => 'required|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $testimonial->update($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.testimonials')
            ->with('success', 'Testimonial updated successfully.');
    }

    public function destroyTestimonial(int $id): RedirectResponse
    {
        HomepageTestimonial::findOrFail($id)->delete();
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.testimonials')
            ->with('success', 'Testimonial deleted successfully.');
    }

    // ─── FAQ CRUD ───────────────────────────────────────────────────

    public function faqs(): Response
    {
        return Inertia::render('Admin/Homepage/Faqs', [
            'faqs' => HomepageFaq::ordered()->get(),
        ]);
    }

    public function storeFaq(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'category' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        HomepageFaq::create($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.faqs')
            ->with('success', 'FAQ created successfully.');
    }

    public function updateFaq(Request $request, int $id): RedirectResponse
    {
        $faq = HomepageFaq::findOrFail($id);

        $validated = $request->validate([
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'category' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $faq->update($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.faqs')
            ->with('success', 'FAQ updated successfully.');
    }

    public function destroyFaq(int $id): RedirectResponse
    {
        HomepageFaq::findOrFail($id)->delete();
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.faqs')
            ->with('success', 'FAQ deleted successfully.');
    }

    // ─── Coverage Areas CRUD ────────────────────────────────────────

    public function coverage(): Response
    {
        return Inertia::render('Admin/Homepage/Coverage', [
            'areas' => HomepageCoverageArea::ordered()->get(),
        ]);
    }

    public function storeCoverage(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:100',
            'status' => 'required|string|in:active,coming_soon,planned',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        HomepageCoverageArea::create($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.coverage')
            ->with('success', 'Coverage area added successfully.');
    }

    public function updateCoverage(Request $request, int $id): RedirectResponse
    {
        $area = HomepageCoverageArea::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:100',
            'status' => 'required|string|in:active,coming_soon,planned',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $area->update($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.coverage')
            ->with('success', 'Coverage area updated successfully.');
    }

    public function destroyCoverage(int $id): RedirectResponse
    {
        HomepageCoverageArea::findOrFail($id)->delete();
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.coverage')
            ->with('success', 'Coverage area deleted successfully.');
    }

    // ─── Intro Features CRUD ──────────────────────────────────────

    public function introFeatures(): Response
    {
        return Inertia::render('Admin/Homepage/IntroFeatures', [
            'features' => IntroFeature::ordered()->get(),
            'enabled' => (HomepageSetting::findByKey('intro_features')?->is_active) ?? true,
        ]);
    }

    public function storeIntroFeature(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'sub_label' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:20',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        IntroFeature::create($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.intro-features')
            ->with('success', 'Intro feature created successfully.');
    }

    public function updateIntroFeature(Request $request, int $id): RedirectResponse
    {
        $feature = IntroFeature::findOrFail($id);

        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'sub_label' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:20',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $feature->update($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.intro-features')
            ->with('success', 'Intro feature updated successfully.');
    }

    public function destroyIntroFeature(int $id): RedirectResponse
    {
        IntroFeature::findOrFail($id)->delete();
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.intro-features')
            ->with('success', 'Intro feature deleted successfully.');
    }

    public function toggleIntroFeatures(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        HomepageSetting::updateOrCreate(
            ['section_key' => 'intro_features'],
            [
                'data' => [],
                'is_active' => $validated['is_active'],
            ]
        );

        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.intro-features')
            ->with('success', $validated['is_active']
                ? 'Intro Network Features shown on the homepage.'
                : 'Intro Network Features hidden from the homepage.');
    }

    // ─── Partners CRUD ─────────────────────────────────────────────

    public function uploadPartnerImage(StorePartnerImageRequest $request): JsonResponse
    {
        $path = $request->file('image')->store('partners', 'public');

        return response()->json(['url' => '/storage/'.$path]);
    }

    public function partners(): Response
    {
        return Inertia::render('Admin/Homepage/Partners', [
            'partners' => AboutClient::active()->ordered()->get(),
        ]);
    }

    public function storePartner(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string|max:512',
            'website_url' => 'nullable|string|max:512',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        AboutClient::create($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.partners')
            ->with('success', 'Partner created successfully.');
    }

    public function updatePartner(Request $request, int $id): RedirectResponse
    {
        $partner = AboutClient::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string|max:512',
            'website_url' => 'nullable|string|max:512',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Delete old local image if replaced
        $oldLogo = $partner->logo;
        $newLogo = $validated['logo'] ?? null;
        if ($oldLogo && $newLogo && $oldLogo !== $newLogo && str_starts_with($oldLogo, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $oldLogo));
        }

        $partner->update($validated);
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.partners')
            ->with('success', 'Partner updated successfully.');
    }

    public function destroyPartner(int $id): RedirectResponse
    {
        $partner = AboutClient::findOrFail($id);

        // Delete associated image
        if ($partner->logo && str_starts_with($partner->logo, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $partner->logo));
        }

        $partner->delete();
        $this->homepageService->flushCache();

        return redirect()->route('admin.homepage.partners')
            ->with('success', 'Partner deleted successfully.');
    }

    public function togglePartnerStatus(int $id): RedirectResponse
    {
        $partner = AboutClient::findOrFail($id);
        $partner->update(['is_active' => ! $partner->is_active]);
        $this->homepageService->flushCache();

        return back()->with('success', 'Partner status updated.');
    }

    // ─── Private helpers ────────────────────────────────────────────

    private function getIntroData(?HomepageSetting $setting): array
    {
        return $setting?->data ?? [
            'eyebrow' => 'About Us',
            'title' => 'Powering a More Connected Future',
            'subtitle' => 'Your Trusted Internet Partner',
            'description' => 'We are a leading internet service provider delivering ultra-fast, reliable connectivity to homes and businesses.',
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
        ];
    }

    private function getTechnologyData(?HomepageSetting $setting): array
    {
        return $setting?->data ?? [
            'eyebrow' => 'Our Technology',
            'title' => 'Engineered for Reliable Connectivity',
            'description' => 'Our network infrastructure is built on cutting-edge fiber optic technology.',
            'image' => null,
            'capabilities' => [],
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
        ];
    }

    private function getCoverageData(?HomepageSetting $setting): array
    {
        return $setting?->data ?? [
            'title' => 'Where We Keep You Connected',
            'description' => 'Our network spans across major divisions and districts.',
            'cta_text' => 'Check Your Coverage',
            'cta_url' => '/contact',
        ];
    }

    private function getCtaData(?HomepageSetting $setting): array
    {
        return $setting?->data ?? [
            'eyebrow' => 'Get Started',
            'title' => 'Your Next Connection Starts Here',
            'description' => 'Experience the future of internet connectivity.',
            'primary_button_text' => 'Explore Packages',
            'primary_button_url' => '/plans',
            'secondary_button_text' => 'Contact Us',
            'secondary_button_url' => '/contact',
        ];
    }
}
