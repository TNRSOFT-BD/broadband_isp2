<?php

namespace App\Http\Middleware;

use App\Services\FontService;
use App\Services\HeroService;
use App\Services\QuickContactMethodService;
use App\Services\PaymentPartnerService;
use App\Services\SocialMediaService;
use App\Services\SiteSettingsService;
use App\Services\ThemeService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $fontService = app(FontService::class);
        $themeService = app(ThemeService::class);
        $heroService = app(HeroService::class);
        $siteSettingsService = app(SiteSettingsService::class);
        $quickContactMethodService = app(QuickContactMethodService::class);
        $socialMediaService = app(SocialMediaService::class);
        $paymentPartnerService = app(PaymentPartnerService::class);

        $activeFont = $fontService->getActiveFontDetails();
        $themeColors = $themeService->getActiveThemeColors();

        // Share user permissions and roles for frontend authorization
        $user = $request->user();
        $userPermissions = [];
        $userRoles = [];
        $isSuperAdmin = false;
        $adminPrefix = 'admin';

        if ($user) {
            $userRoles = $user->getRoleNames()->toArray();
            $userPermissions = $user->getAllPermissions()->pluck('name')->toArray();
            $isSuperAdmin = $user->hasRole('super_admin');

            // Get the role prefix for dynamic routing
            $primaryRole = $user->roles->first();
            $adminPrefix = $primaryRole?->prefix ?? 'admin';
        }

        return array_merge(parent::share($request), [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'admin_prefix' => $adminPrefix,
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'roles' => $userRoles,
                    'permissions' => $userPermissions,
                    'is_super_admin' => $isSuperAdmin,
                    'admin_prefix' => $adminPrefix,
                ] : null,
            ],
            'font' => $activeFont ? [
                'name' => $activeFont['name'],
                'family' => $activeFont['family'],
                'url' => $activeFont['url'],
                'weight' => $activeFont['weight'],
                'font_style' => $activeFont['font_style'],
                'css_family' => $activeFont['css_family'],
            ] : null,
            'theme' => [
                'colors' => $themeColors,
            ],
            'hero' => $heroService->getActiveHero(),
            'site' => $siteSettingsService->get(),
            'quickContactMethods' => $quickContactMethodService->getActiveMethods()
                ->map(fn ($method) => $method->only(['id', 'icon', 'label', 'value', 'description', 'href'])),
            'footerContactMethods' => $quickContactMethodService->getFooterMethods()
                ->map(fn ($method) => $method->only(['id', 'icon', 'label', 'value', 'description', 'href'])),
            'socialMediaItems' => $socialMediaService->getActiveItems()
                ->map(fn ($item) => $item->only(['id', 'name', 'image', 'link'])),
            'activePaymentPartner' => $paymentPartnerService->getActive()
                ?->only(['id', 'name', 'image', 'website_link']),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'csrf_token' => fn () => csrf_token(),
        ]);
    }
}
