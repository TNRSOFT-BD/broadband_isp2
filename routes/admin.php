<?php

use App\Http\Controllers\Admin\AdminAboutUsController;
use App\Http\Controllers\Admin\AdminContactMessageController;
use App\Http\Controllers\Admin\AdminContactPageController;
use App\Http\Controllers\Admin\AdminInquiryTypeController;
use App\Http\Controllers\Admin\AdminQuickContactMethodController;
use App\Http\Controllers\Admin\AdminOfficeLocationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroConfigController;
use App\Http\Controllers\Admin\HomepageController;
use App\Http\Controllers\Admin\PlanCategoryController;
use App\Http\Controllers\Admin\PlanController as AdminPlanController;
use App\Http\Controllers\Admin\PlansPageController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WebsiteConfigController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\RolePrefixMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')->name('admin.')->middleware([AdminMiddleware::class, RolePrefixMiddleware::class])->group(function () {

        // ── Dashboard ───────────────────────────────────────────────
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->middleware('permission:view-dashboard')
            ->name('dashboard');

        // ── Admin Profile (own profile) ─────────────────────────────
        Route::get('/profile', [AdminProfileController::class, 'edit'])
            ->middleware('permission:edit-own-profile')
            ->name('profile.edit');
        Route::put('/profile', [AdminProfileController::class, 'updateProfile'])
            ->middleware('permission:edit-own-profile')
            ->name('profile.update');
        Route::put('/profile/password', [AdminProfileController::class, 'updatePassword'])
            ->middleware('permission:edit-own-profile')
            ->name('profile.password.update');

        // ── Plans Management ────────────────────────────────────────
        Route::middleware('permission:view-plans')->group(function () {
            Route::get('/plans', [AdminPlanController::class, 'index'])->name('plans.index');
        });
        Route::middleware('permission:create-plans')->group(function () {
            Route::get('/plans/create', [AdminPlanController::class, 'create'])->name('plans.create');
            Route::post('/plans', [AdminPlanController::class, 'store'])->name('plans.store');
        });
        Route::middleware('permission:edit-plans')->group(function () {
            Route::get('/plans/{id}/edit', [AdminPlanController::class, 'edit'])->name('plans.edit');
            Route::put('/plans/{id}', [AdminPlanController::class, 'update'])->name('plans.update');
            Route::patch('/plans/{id}/toggle-status', [AdminPlanController::class, 'toggleStatus'])->name('plans.toggle-status');
        });
        Route::middleware('permission:delete-plans')->group(function () {
            Route::delete('/plans/{id}', [AdminPlanController::class, 'destroy'])->name('plans.destroy');
        });

        // ── Plan Categories ─────────────────────────────────────────
        Route::middleware('permission:view-plan-categories')->group(function () {
            Route::get('/plan-categories', [PlanCategoryController::class, 'index'])->name('plan-categories.index');
        });
        Route::middleware('permission:create-plan-categories')->group(function () {
            Route::post('/plan-categories', [PlanCategoryController::class, 'store'])->name('plan-categories.store');
        });
        Route::middleware('permission:edit-plan-categories')->group(function () {
            Route::put('/plan-categories/{id}', [PlanCategoryController::class, 'update'])->name('plan-categories.update');
        });
        Route::middleware('permission:delete-plan-categories')->group(function () {
            Route::delete('/plan-categories/{id}', [PlanCategoryController::class, 'destroy'])->name('plan-categories.destroy');
        });

        // ── Services (OTT) ──────────────────────────────────────────
        Route::middleware('permission:view-services')->group(function () {
            Route::get('/services', [AdminServiceController::class, 'index'])->name('services.index');
        });
        Route::middleware('permission:create-services')->group(function () {
            Route::post('/services', [AdminServiceController::class, 'store'])->name('services.store');
            Route::post('/services/upload', [AdminServiceController::class, 'upload'])->name('services.upload');
        });
        Route::middleware('permission:edit-services')->group(function () {
            Route::put('/services/{id}', [AdminServiceController::class, 'update'])->name('services.update');
        });
        Route::middleware('permission:delete-services')->group(function () {
            Route::delete('/services/{id}', [AdminServiceController::class, 'destroy'])->name('services.destroy');
        });

        // ── Homepage Management ─────────────────────────────────────
        Route::middleware('permission:view-homepage')->group(function () {
            Route::get('/homepage', [HomepageController::class, 'index'])->name('homepage.index');
        });
        Route::middleware('permission:edit-homepage')->group(function () {
            Route::get('/homepage/{section}/edit', [HomepageController::class, 'edit'])->name('homepage.edit');
            Route::put('/homepage/{section}', [HomepageController::class, 'update'])->name('homepage.update');
        });

        // ── Homepage Partners ───────────────────────────────────────
        Route::middleware('permission:manage-homepage-partners')->group(function () {
            Route::get('/homepage/partners', [HomepageController::class, 'partners'])->name('homepage.partners');
            Route::post('/homepage/partners', [HomepageController::class, 'storePartner'])->name('homepage.partners.store');
            Route::post('/homepage/partner-upload', [HomepageController::class, 'uploadPartnerImage'])->name('homepage.partner-upload');
            Route::put('/homepage/partners/{id}', [HomepageController::class, 'updatePartner'])->name('homepage.partners.update');
            Route::delete('/homepage/partners/{id}', [HomepageController::class, 'destroyPartner'])->name('homepage.partners.destroy');
            Route::patch('/homepage/partners/{id}/toggle-status', [HomepageController::class, 'togglePartnerStatus'])->name('homepage.partners.toggle-status');
        });

        // ── Homepage Intro Features ─────────────────────────────────
        Route::middleware('permission:manage-homepage-intro-features')->group(function () {
            Route::get('/homepage/intro-features', [HomepageController::class, 'introFeatures'])->name('homepage.intro-features');
            Route::post('/homepage/intro-features', [HomepageController::class, 'storeIntroFeature'])->name('homepage.intro-features.store');
            Route::put('/homepage/intro-features/{id}', [HomepageController::class, 'updateIntroFeature'])->name('homepage.intro-features.update');
            Route::delete('/homepage/intro-features/{id}', [HomepageController::class, 'destroyIntroFeature'])->name('homepage.intro-features.destroy');
        });

        // ── Homepage Testimonials ───────────────────────────────────
        Route::middleware('permission:manage-homepage-testimonials')->group(function () {
            Route::get('/homepage/testimonials', [HomepageController::class, 'testimonials'])->name('homepage.testimonials');
            Route::post('/homepage/testimonials', [HomepageController::class, 'storeTestimonial'])->name('homepage.testimonials.store');
            Route::put('/homepage/testimonials/{id}', [HomepageController::class, 'updateTestimonial'])->name('homepage.testimonials.update');
            Route::delete('/homepage/testimonials/{id}', [HomepageController::class, 'destroyTestimonial'])->name('homepage.testimonials.destroy');
        });

        // ── Homepage FAQs ───────────────────────────────────────────
        Route::middleware('permission:manage-homepage-faqs')->group(function () {
            Route::get('/homepage/faqs', [HomepageController::class, 'faqs'])->name('homepage.faqs');
            Route::post('/homepage/faqs', [HomepageController::class, 'storeFaq'])->name('homepage.faqs.store');
            Route::put('/homepage/faqs/{id}', [HomepageController::class, 'updateFaq'])->name('homepage.faqs.update');
            Route::delete('/homepage/faqs/{id}', [HomepageController::class, 'destroyFaq'])->name('homepage.faqs.destroy');
        });

        // ── Homepage Coverage ───────────────────────────────────────
        Route::middleware('permission:manage-homepage-coverage')->group(function () {
            Route::get('/homepage/coverage', [HomepageController::class, 'coverage'])->name('homepage.coverage');
            Route::post('/homepage/coverage', [HomepageController::class, 'storeCoverage'])->name('homepage.coverage.store');
            Route::put('/homepage/coverage/{id}', [HomepageController::class, 'updateCoverage'])->name('homepage.coverage.update');
            Route::delete('/homepage/coverage/{id}', [HomepageController::class, 'destroyCoverage'])->name('homepage.coverage.destroy');
        });

        // ── Hero Config ─────────────────────────────────────────────
        Route::middleware('permission:view-hero-config')->group(function () {
            Route::get('/hero-config', [HeroConfigController::class, 'index'])->name('hero-config');
        });
        Route::middleware('permission:edit-hero-config')->group(function () {
            Route::put('/hero-config', [HeroConfigController::class, 'update'])->name('hero-config.update');
            Route::post('/hero-config/upload', [HeroConfigController::class, 'upload'])->name('hero-config.upload');
        });

        // ── Contact Messages ────────────────────────────────────────
        Route::middleware('permission:view-contact-messages')->group(function () {
            Route::get('/contact-messages', [AdminContactMessageController::class, 'index'])->name('contact-messages.index');
            Route::get('/contact-messages/{id}', [AdminContactMessageController::class, 'show'])->name('contact-messages.show');
        });
        Route::middleware('permission:manage-contact-messages')->group(function () {
            Route::patch('/contact-messages/{id}/status', [AdminContactMessageController::class, 'updateStatus'])->name('contact-messages.update-status');
        });
        Route::middleware('permission:delete-contact-messages')->group(function () {
            Route::delete('/contact-messages/{id}', [AdminContactMessageController::class, 'destroy'])->name('contact-messages.destroy');
        });

        // ── Quick Contact Methods ───────────────────────────────────
        Route::middleware('permission:manage-quick-contact-methods')->group(function () {
            Route::get('/contact/quick-methods', [AdminQuickContactMethodController::class, 'index'])->name('quick-contact-methods.index');
            Route::post('/contact/quick-methods', [AdminQuickContactMethodController::class, 'store'])->name('quick-contact-methods.store');
            Route::put('/contact/quick-methods/{id}', [AdminQuickContactMethodController::class, 'update'])->name('quick-contact-methods.update');
            Route::delete('/contact/quick-methods/{id}', [AdminQuickContactMethodController::class, 'destroy'])->name('quick-contact-methods.destroy');
            Route::patch('/contact/quick-methods/{id}/toggle-status', [AdminQuickContactMethodController::class, 'toggleStatus'])->name('quick-contact-methods.toggle-status');
        });

        // ── Inquiry Types ───────────────────────────────────────────
        Route::middleware('permission:manage-inquiry-types')->group(function () {
            Route::get('/contact/inquiry-types', [AdminInquiryTypeController::class, 'index'])->name('inquiry-types.index');
            Route::post('/contact/inquiry-types', [AdminInquiryTypeController::class, 'store'])->name('inquiry-types.store');
            Route::put('/contact/inquiry-types/{id}', [AdminInquiryTypeController::class, 'update'])->name('inquiry-types.update');
            Route::delete('/contact/inquiry-types/{id}', [AdminInquiryTypeController::class, 'destroy'])->name('inquiry-types.destroy');
            Route::patch('/contact/inquiry-types/{id}/toggle-status', [AdminInquiryTypeController::class, 'toggleStatus'])->name('inquiry-types.toggle-status');
        });

        // ── Office Locations ────────────────────────────────────────
        Route::middleware('permission:manage-office-locations')->group(function () {
            Route::get('/contact/locations', [AdminOfficeLocationController::class, 'index'])->name('office-locations.index');
            Route::post('/contact/locations', [AdminOfficeLocationController::class, 'store'])->name('office-locations.store');
            Route::put('/contact/locations/{id}', [AdminOfficeLocationController::class, 'update'])->name('office-locations.update');
            Route::delete('/contact/locations/{id}', [AdminOfficeLocationController::class, 'destroy'])->name('office-locations.destroy');
            Route::patch('/contact/locations/{id}/toggle-status', [AdminOfficeLocationController::class, 'toggleStatus'])->name('office-locations.toggle-status');
        });

        // ── Plans Page CMS ──────────────────────────────────────────
        Route::middleware('permission:manage-plans-page')->group(function () {
            Route::get('/pages/plans', [PlansPageController::class, 'index'])->name('pages.plans');
            Route::put('/pages/plans', [PlansPageController::class, 'update'])->name('pages.plans.update');
            Route::post('/pages/plans/upload', [PlansPageController::class, 'upload'])->name('pages.plans.upload');
        });

        // ── Contact Page CMS ────────────────────────────────────────
        Route::middleware('permission:manage-contact-page')->group(function () {
            Route::get('/pages/contact', [AdminContactPageController::class, 'index'])->name('contact-page');
            Route::put('/pages/contact', [AdminContactPageController::class, 'update'])->name('contact-page.update');
            Route::post('/pages/contact/upload', [AdminContactPageController::class, 'upload'])->name('contact-page.upload');
        });

        // ── About Us Page CMS ───────────────────────────────────────
        Route::middleware('permission:manage-about-page')->group(function () {
            Route::get('/pages/about', [AdminAboutUsController::class, 'index'])->name('about-us.index');
            Route::put('/pages/about', [AdminAboutUsController::class, 'update'])->name('about-us.update');
            Route::post('/pages/about/upload', [AdminAboutUsController::class, 'upload'])->name('about-us.upload');
            Route::get('/pages/about/statistics', [AdminAboutUsController::class, 'statistics'])->name('about-us.statistics');
            Route::post('/pages/about/statistics', [AdminAboutUsController::class, 'storeStatistic'])->name('about-us.statistics.store');
            Route::put('/pages/about/statistics/{id}', [AdminAboutUsController::class, 'updateStatistic'])->name('about-us.statistics.update');
            Route::delete('/pages/about/statistics/{id}', [AdminAboutUsController::class, 'destroyStatistic'])->name('about-us.statistics.destroy');
            Route::patch('/pages/about/statistics/{id}/toggle-status', [AdminAboutUsController::class, 'toggleStatisticStatus'])->name('about-us.statistics.toggle-status');
            Route::get('/pages/about/core-values', [AdminAboutUsController::class, 'coreValues'])->name('about-us.core-values');
            Route::post('/pages/about/core-values', [AdminAboutUsController::class, 'storeCoreValue'])->name('about-us.core-values.store');
            Route::put('/pages/about/core-values/{id}', [AdminAboutUsController::class, 'updateCoreValue'])->name('about-us.core-values.update');
            Route::delete('/pages/about/core-values/{id}', [AdminAboutUsController::class, 'destroyCoreValue'])->name('about-us.core-values.destroy');
            Route::patch('/pages/about/core-values/{id}/toggle-status', [AdminAboutUsController::class, 'toggleCoreValueStatus'])->name('about-us.core-values.toggle-status');
            Route::get('/pages/about/milestones', [AdminAboutUsController::class, 'milestones'])->name('about-us.milestones');
            Route::post('/pages/about/milestones', [AdminAboutUsController::class, 'storeMilestone'])->name('about-us.milestones.store');
            Route::put('/pages/about/milestones/{id}', [AdminAboutUsController::class, 'updateMilestone'])->name('about-us.milestones.update');
            Route::delete('/pages/about/milestones/{id}', [AdminAboutUsController::class, 'destroyMilestone'])->name('about-us.milestones.destroy');
            Route::patch('/pages/about/milestones/{id}/toggle-status', [AdminAboutUsController::class, 'toggleMilestoneStatus'])->name('about-us.milestones.toggle-status');
            Route::get('/pages/about/capabilities', [AdminAboutUsController::class, 'capabilities'])->name('about-us.capabilities');
            Route::post('/pages/about/capabilities', [AdminAboutUsController::class, 'storeCapability'])->name('about-us.capabilities.store');
            Route::put('/pages/about/capabilities/{id}', [AdminAboutUsController::class, 'updateCapability'])->name('about-us.capabilities.update');
            Route::delete('/pages/about/capabilities/{id}', [AdminAboutUsController::class, 'destroyCapability'])->name('about-us.capabilities.destroy');
            Route::patch('/pages/about/capabilities/{id}/toggle-status', [AdminAboutUsController::class, 'toggleCapabilityStatus'])->name('about-us.capabilities.toggle-status');
            Route::get('/pages/about/clients', [AdminAboutUsController::class, 'clients'])->name('about-us.clients');
            Route::post('/pages/about/clients', [AdminAboutUsController::class, 'storeClient'])->name('about-us.clients.store');
            Route::put('/pages/about/clients/{id}', [AdminAboutUsController::class, 'updateClient'])->name('about-us.clients.update');
            Route::delete('/pages/about/clients/{id}', [AdminAboutUsController::class, 'destroyClient'])->name('about-us.clients.destroy');
            Route::patch('/pages/about/clients/{id}/toggle-status', [AdminAboutUsController::class, 'toggleClientStatus'])->name('about-us.clients.toggle-status');
            Route::get('/pages/about/certifications', [AdminAboutUsController::class, 'certifications'])->name('about-us.certifications');
            Route::post('/pages/about/certifications', [AdminAboutUsController::class, 'storeCertification'])->name('about-us.certifications.store');
            Route::put('/pages/about/certifications/{id}', [AdminAboutUsController::class, 'updateCertification'])->name('about-us.certifications.update');
            Route::delete('/pages/about/certifications/{id}', [AdminAboutUsController::class, 'destroyCertification'])->name('about-us.certifications.destroy');
            Route::patch('/pages/about/certifications/{id}/toggle-status', [AdminAboutUsController::class, 'toggleCertificationStatus'])->name('about-us.certifications.toggle-status');
            Route::get('/pages/about/why-choose-us', [AdminAboutUsController::class, 'whyChooseUs'])->name('about-us.why-choose-us');
            Route::post('/pages/about/why-choose-us', [AdminAboutUsController::class, 'storeWhyChooseUs'])->name('about-us.why-choose-us.store');
            Route::put('/pages/about/why-choose-us/{id}', [AdminAboutUsController::class, 'updateWhyChooseUs'])->name('about-us.why-choose-us.update');
            Route::delete('/pages/about/why-choose-us/{id}', [AdminAboutUsController::class, 'destroyWhyChooseUs'])->name('about-us.why-choose-us.destroy');
            Route::patch('/pages/about/why-choose-us/{id}/toggle-status', [AdminAboutUsController::class, 'toggleWhyChooseUsStatus'])->name('about-us.why-choose-us.toggle-status');
        });

        // ── Website Config ──────────────────────────────────────────
        Route::middleware('permission:view-website-config')->group(function () {
            Route::get('/website-config', [WebsiteConfigController::class, 'index'])->name('website-config');
            Route::get('/website-config/colors', [WebsiteConfigController::class, 'getThemeColors'])->name('website-config.colors');
        });
        Route::middleware('permission:edit-website-config')->group(function () {
            Route::put('/website-config/theme', [WebsiteConfigController::class, 'updateTheme'])->name('website-config.theme.update');
            Route::put('/website-config/font', [WebsiteConfigController::class, 'updateFont'])->name('website-config.font.update');
            Route::post('/website-config/theme/reset', [WebsiteConfigController::class, 'resetTheme'])->name('website-config.theme.reset');
            Route::post('/website-config/upload', [WebsiteConfigController::class, 'uploadBranding'])->name('website-config.upload');
            Route::put('/website-config/branding', [WebsiteConfigController::class, 'updateBranding'])->name('website-config.branding.update');
        });

        // ── User Management (super_admin & admin only) ──────────────
        Route::middleware('permission:view-users')->group(function () {
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
        });
        Route::middleware('permission:create-users')->group(function () {
            Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
            Route::post('/users', [UserController::class, 'store'])->name('users.store');
        });
        Route::middleware('permission:edit-users')->group(function () {
            Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
        });
        Route::middleware('permission:delete-users')->group(function () {
            Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
        });

        // ── Roles & Permissions Management ──────────────────────────
        Route::middleware('permission:manage-roles')->group(function () {
            Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
            Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create');
            Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
            Route::get('/roles/{id}/edit', [RoleController::class, 'edit'])->name('roles.edit');
            Route::put('/roles/{id}', [RoleController::class, 'update'])->name('roles.update');
            Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->name('roles.destroy');
        });
    });

    // ── Role Prefix Routes (permission-gated) ──────────────────────────
    // Non-admin roles access admin pages via their prefix, e.g. /editor/plans.
    // Every route mirrors the same permission middleware as /admin/* routes.
    $rolePrefixes = ['staff', 'editor', 'viewer', 'manager'];

    foreach ($rolePrefixes as $rolePrefix) {
        if ($rolePrefix === 'admin') {
            continue;
        }

        Route::prefix($rolePrefix)->name($rolePrefix . '.')->middleware([AdminMiddleware::class])->group(function () use ($rolePrefix) {
            // Dashboard
            Route::middleware('permission:view-dashboard')->group(function () {
                Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
            });

            // Profile
            Route::middleware('permission:edit-own-profile')->group(function () {
                Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
                Route::put('/profile', [AdminProfileController::class, 'updateProfile'])->name('profile.update');
                Route::put('/profile/password', [AdminProfileController::class, 'updatePassword'])->name('profile.password.update');
            });

            // Plans
            Route::middleware('permission:view-plans')->group(function () {
                Route::get('/plans', [AdminPlanController::class, 'index'])->name('plans.index');
            });
            Route::middleware('permission:create-plans')->group(function () {
                Route::get('/plans/create', [AdminPlanController::class, 'create'])->name('plans.create');
                Route::post('/plans', [AdminPlanController::class, 'store'])->name('plans.store');
            });
            Route::middleware('permission:edit-plans')->group(function () {
                Route::get('/plans/{id}/edit', [AdminPlanController::class, 'edit'])->name('plans.edit');
                Route::put('/plans/{id}', [AdminPlanController::class, 'update'])->name('plans.update');
                Route::patch('/plans/{id}/toggle-status', [AdminPlanController::class, 'toggleStatus'])->name('plans.toggle-status');
            });
            Route::middleware('permission:delete-plans')->group(function () {
                Route::delete('/plans/{id}', [AdminPlanController::class, 'destroy'])->name('plans.destroy');
            });

            // Plan Categories
            Route::middleware('permission:view-plan-categories')->group(function () {
                Route::get('/plan-categories', [PlanCategoryController::class, 'index'])->name('plan-categories.index');
            });
            Route::middleware('permission:create-plan-categories')->group(function () {
                Route::post('/plan-categories', [PlanCategoryController::class, 'store'])->name('plan-categories.store');
            });
            Route::middleware('permission:edit-plan-categories')->group(function () {
                Route::put('/plan-categories/{id}', [PlanCategoryController::class, 'update'])->name('plan-categories.update');
            });
            Route::middleware('permission:delete-plan-categories')->group(function () {
                Route::delete('/plan-categories/{id}', [PlanCategoryController::class, 'destroy'])->name('plan-categories.destroy');
            });

            // Services
            Route::middleware('permission:view-services')->group(function () {
                Route::get('/services', [AdminServiceController::class, 'index'])->name('services.index');
            });
            Route::middleware('permission:create-services')->group(function () {
                Route::post('/services', [AdminServiceController::class, 'store'])->name('services.store');
            });
            Route::middleware('permission:edit-services')->group(function () {
                Route::put('/services/{id}', [AdminServiceController::class, 'update'])->name('services.update');
            });
            Route::middleware('permission:delete-services')->group(function () {
                Route::delete('/services/{id}', [AdminServiceController::class, 'destroy'])->name('services.destroy');
            });

            // Homepage
            Route::middleware('permission:view-homepage')->group(function () {
                Route::get('/homepage', [HomepageController::class, 'index'])->name('homepage.index');
            });
            Route::middleware('permission:edit-homepage')->group(function () {
                Route::get('/homepage/{section}/edit', [HomepageController::class, 'edit'])->name('homepage.edit');
                Route::put('/homepage/{section}', [HomepageController::class, 'update'])->name('homepage.update');
            });
            Route::middleware('permission:manage-homepage-partners')->group(function () {
                Route::get('/homepage/partners', [HomepageController::class, 'partners'])->name('homepage.partners');
            });
            Route::middleware('permission:manage-homepage-intro-features')->group(function () {
                Route::get('/homepage/intro-features', [HomepageController::class, 'introFeatures'])->name('homepage.intro-features');
            });
            Route::middleware('permission:manage-homepage-testimonials')->group(function () {
                Route::get('/homepage/testimonials', [HomepageController::class, 'testimonials'])->name('homepage.testimonials');
            });
            Route::middleware('permission:manage-homepage-faqs')->group(function () {
                Route::get('/homepage/faqs', [HomepageController::class, 'faqs'])->name('homepage.faqs');
            });
            Route::middleware('permission:manage-homepage-coverage')->group(function () {
                Route::get('/homepage/coverage', [HomepageController::class, 'coverage'])->name('homepage.coverage');
            });

            // Hero Config
            Route::middleware('permission:view-hero-config')->group(function () {
                Route::get('/hero-config', [HeroConfigController::class, 'index'])->name('hero-config');
            });
            Route::middleware('permission:edit-hero-config')->group(function () {
                Route::put('/hero-config', [HeroConfigController::class, 'update'])->name('hero-config.update');
            });

            // Contact Messages
            Route::middleware('permission:view-contact-messages')->group(function () {
                Route::get('/contact-messages', [AdminContactMessageController::class, 'index'])->name('contact-messages.index');
                Route::get('/contact-messages/{id}', [AdminContactMessageController::class, 'show'])->name('contact-messages.show');
            });

            // Quick Contact Methods
            Route::middleware('permission:manage-quick-contact-methods')->group(function () {
                Route::get('/contact/quick-methods', [AdminQuickContactMethodController::class, 'index'])->name('quick-contact-methods.index');
            });

            // Inquiry Types
            Route::middleware('permission:manage-inquiry-types')->group(function () {
                Route::get('/contact/inquiry-types', [AdminInquiryTypeController::class, 'index'])->name('inquiry-types.index');
            });

            // Office Locations
            Route::middleware('permission:manage-office-locations')->group(function () {
                Route::get('/contact/locations', [AdminOfficeLocationController::class, 'index'])->name('office-locations.index');
            });

            // Pages
            Route::middleware('permission:manage-plans-page')->group(function () {
                Route::get('/pages/plans', [PlansPageController::class, 'index'])->name('pages.plans');
            });
            Route::middleware('permission:manage-contact-page')->group(function () {
                Route::get('/pages/contact', [AdminContactPageController::class, 'index'])->name('contact-page');
            });
            Route::middleware('permission:manage-about-page')->group(function () {
                Route::get('/pages/about', [AdminAboutUsController::class, 'index'])->name('about-us.index');
            });

            // Website Config
            Route::middleware('permission:view-website-config')->group(function () {
                Route::get('/website-config', [WebsiteConfigController::class, 'index'])->name('website-config');
            });

            // Roles & Users
            Route::middleware('permission:manage-roles')->group(function () {
                Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
            });
            Route::middleware('permission:view-users')->group(function () {
                Route::get('/users', [UserController::class, 'index'])->name('users.index');
            });
        });
    }
});
