<?php

namespace App\Providers;

use App\Models\LegalPage;
use App\Services\SiteSettingsService;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('thirdPartyLinks', function () {
            $settings = app(SiteSettingsService::class)->get();
            $links = $settings['third_party_links'] ?? [];

            return collect($links)->pluck('url', 'key')->toArray();
        });

        Inertia::share('legalPages', function () {
            return LegalPage::where('status', 'published')
                ->orderBy('sort_order')
                ->get()
                ->map(fn ($page) => [
                    'title' => $page->title,
                    'slug' => $page->slug,
                ]);
        });
    }
}
