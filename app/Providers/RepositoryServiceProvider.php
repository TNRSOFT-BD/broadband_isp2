<?php

namespace App\Providers;

use App\Repositories\Contracts\FontRepositoryInterface;
use App\Repositories\Contracts\HeroSettingRepositoryInterface;
use App\Repositories\Contracts\PlanCategoryRepositoryInterface;
use App\Repositories\Contracts\PlanRepositoryInterface;
use App\Repositories\Contracts\PlansPageSettingRepositoryInterface;
use App\Repositories\Contracts\ServiceRepositoryInterface;
use App\Repositories\Contracts\ThemeRepositoryInterface;
use App\Repositories\Eloquent\EloquentFontRepository;
use App\Repositories\Eloquent\EloquentHeroSettingRepository;
use App\Repositories\Eloquent\EloquentPlanCategoryRepository;
use App\Repositories\Eloquent\EloquentPlanRepository;
use App\Repositories\Eloquent\EloquentPlansPageSettingRepository;
use App\Repositories\Eloquent\EloquentServiceRepository;
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
        $this->app->bind(PlanRepositoryInterface::class, EloquentPlanRepository::class);
        $this->app->bind(PlanCategoryRepositoryInterface::class, EloquentPlanCategoryRepository::class);
        $this->app->bind(ServiceRepositoryInterface::class, EloquentServiceRepository::class);
        $this->app->bind(PlansPageSettingRepositoryInterface::class, EloquentPlansPageSettingRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
