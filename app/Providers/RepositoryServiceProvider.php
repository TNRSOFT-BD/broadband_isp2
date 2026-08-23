<?php

namespace App\Providers;

use App\Repositories\Contracts\FontRepositoryInterface;
use App\Repositories\Contracts\HeroSettingRepositoryInterface;
use App\Repositories\Contracts\ThemeRepositoryInterface;
use App\Repositories\Eloquent\EloquentFontRepository;
use App\Repositories\Eloquent\EloquentHeroSettingRepository;
use App\Repositories\Eloquent\EloquentThemeRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ThemeRepositoryInterface::class, EloquentThemeRepository::class);
        $this->app->bind(FontRepositoryInterface::class, EloquentFontRepository::class);
        $this->app->bind(HeroSettingRepositoryInterface::class, EloquentHeroSettingRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
