<?php

namespace App\Providers;

use App\Repositories\Contracts\AboutPageSettingRepositoryInterface;
use App\Repositories\Contracts\AboutStatisticRepositoryInterface;
use App\Repositories\Contracts\AboutCoreValueRepositoryInterface;
use App\Repositories\Contracts\AboutMilestoneRepositoryInterface;
use App\Repositories\Contracts\AboutCapabilityRepositoryInterface;
use App\Repositories\Contracts\AboutClientRepositoryInterface;
use App\Repositories\Contracts\AboutCertificationRepositoryInterface;
use App\Repositories\Contracts\AboutWhyChooseUsRepositoryInterface;
use App\Repositories\Contracts\HomepageRepositoryInterface;
use App\Repositories\Contracts\HomepageServiceItemRepositoryInterface;
use App\Repositories\Contracts\HomepageServiceCategoryRepositoryInterface;
use App\Repositories\Contracts\ContactInquiryTypeRepositoryInterface;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use App\Repositories\Contracts\ContactPageSettingRepositoryInterface;
use App\Repositories\Contracts\QuickContactMethodRepositoryInterface;
use App\Repositories\Contracts\FontRepositoryInterface;
use App\Repositories\Contracts\HeroSettingRepositoryInterface;
use App\Repositories\Contracts\OfficeLocationRepositoryInterface;
use App\Repositories\Contracts\PlanCategoryRepositoryInterface;
use App\Repositories\Contracts\PlanRepositoryInterface;
use App\Repositories\Contracts\PlansPageSettingRepositoryInterface;
use App\Repositories\Contracts\RoleRepositoryInterface;
use App\Repositories\Contracts\ServiceRepositoryInterface;
use App\Repositories\Contracts\SiteSettingRepositoryInterface;
use App\Repositories\Contracts\ThemeRepositoryInterface;
use App\Repositories\Contracts\LegalPageRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\EloquentAboutPageSettingRepository;
use App\Repositories\Eloquent\EloquentAboutStatisticRepository;
use App\Repositories\Eloquent\EloquentAboutCoreValueRepository;
use App\Repositories\Eloquent\EloquentAboutMilestoneRepository;
use App\Repositories\Eloquent\EloquentAboutCapabilityRepository;
use App\Repositories\Eloquent\EloquentAboutClientRepository;
use App\Repositories\Eloquent\EloquentAboutCertificationRepository;
use App\Repositories\Eloquent\EloquentAboutWhyChooseUsRepository;
use App\Repositories\Eloquent\EloquentHomepageRepository;
use App\Repositories\Eloquent\EloquentHomepageServiceItemRepository;
use App\Repositories\Eloquent\EloquentHomepageServiceCategoryRepository;
use App\Repositories\Eloquent\EloquentContactInquiryTypeRepository;
use App\Repositories\Eloquent\EloquentContactMessageRepository;
use App\Repositories\Eloquent\EloquentContactPageSettingRepository;
use App\Repositories\Eloquent\EloquentQuickContactMethodRepository;
use App\Repositories\Eloquent\EloquentFontRepository;
use App\Repositories\Eloquent\EloquentHeroSettingRepository;
use App\Repositories\Eloquent\EloquentOfficeLocationRepository;
use App\Repositories\Eloquent\EloquentPlanCategoryRepository;
use App\Repositories\Eloquent\EloquentPlanRepository;
use App\Repositories\Eloquent\EloquentPlansPageSettingRepository;
use App\Repositories\Eloquent\EloquentRoleRepository;
use App\Repositories\Eloquent\EloquentServiceRepository;
use App\Repositories\Eloquent\EloquentSiteSettingRepository;
use App\Repositories\Eloquent\EloquentThemeRepository;
use App\Repositories\Eloquent\EloquentLegalPageRepository;
use App\Repositories\Eloquent\EloquentUserRepository;
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
        $this->app->bind(SiteSettingRepositoryInterface::class, EloquentSiteSettingRepository::class);
        $this->app->bind(PlansPageSettingRepositoryInterface::class, EloquentPlansPageSettingRepository::class);
        $this->app->bind(ContactInquiryTypeRepositoryInterface::class, EloquentContactInquiryTypeRepository::class);
        $this->app->bind(ContactMessageRepositoryInterface::class, EloquentContactMessageRepository::class);
        $this->app->bind(OfficeLocationRepositoryInterface::class, EloquentOfficeLocationRepository::class);
        $this->app->bind(ContactPageSettingRepositoryInterface::class, EloquentContactPageSettingRepository::class);
        $this->app->bind(QuickContactMethodRepositoryInterface::class, EloquentQuickContactMethodRepository::class);
        $this->app->bind(AboutPageSettingRepositoryInterface::class, EloquentAboutPageSettingRepository::class);
        $this->app->bind(AboutStatisticRepositoryInterface::class, EloquentAboutStatisticRepository::class);
        $this->app->bind(AboutCoreValueRepositoryInterface::class, EloquentAboutCoreValueRepository::class);
        $this->app->bind(AboutMilestoneRepositoryInterface::class, EloquentAboutMilestoneRepository::class);
        $this->app->bind(AboutCapabilityRepositoryInterface::class, EloquentAboutCapabilityRepository::class);
        $this->app->bind(AboutClientRepositoryInterface::class, EloquentAboutClientRepository::class);
        $this->app->bind(AboutCertificationRepositoryInterface::class, EloquentAboutCertificationRepository::class);
        $this->app->bind(AboutWhyChooseUsRepositoryInterface::class, EloquentAboutWhyChooseUsRepository::class);
        $this->app->bind(HomepageRepositoryInterface::class, EloquentHomepageRepository::class);
        $this->app->bind(HomepageServiceItemRepositoryInterface::class, EloquentHomepageServiceItemRepository::class);
        $this->app->bind(HomepageServiceCategoryRepositoryInterface::class, EloquentHomepageServiceCategoryRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, EloquentRoleRepository::class);
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
        $this->app->bind(LegalPageRepositoryInterface::class, EloquentLegalPageRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
