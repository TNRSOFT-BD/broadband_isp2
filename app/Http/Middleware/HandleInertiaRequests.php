<?php

namespace App\Http\Middleware;

use App\Services\FontService;
use App\Services\HeroService;
use App\Services\QuickContactMethodService;
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

        $activeFont = $fontService->getActiveFontDetails();
        $themeColors = $themeService->getActiveThemeColors();

        return array_merge(parent::share($request), [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
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
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
