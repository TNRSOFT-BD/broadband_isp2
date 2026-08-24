<?php

use App\Http\Controllers\Admin\AdminAboutUsController;
use App\Http\Controllers\Admin\AdminContactMessageController;
use App\Http\Controllers\Admin\AdminContactPageController;
use App\Http\Controllers\Admin\AdminInquiryTypeController;
use App\Http\Controllers\Admin\AdminQuickContactMethodController;
use App\Http\Controllers\Admin\AdminOfficeLocationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroConfigController;
use App\Http\Controllers\Admin\PlanCategoryController;
use App\Http\Controllers\Admin\PlanController as AdminPlanController;
use App\Http\Controllers\Admin\PlansPageController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\WebsiteConfigController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlanController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about.index');

// Public plans pages
Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');
Route::get('/plans/{slug}', [PlanController::class, 'show'])->name('plans.show');

// Contact page
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')->name('admin.')->middleware(AdminMiddleware::class)->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Plans management
        Route::get('/plans', [AdminPlanController::class, 'index'])->name('plans.index');
        Route::get('/plans/create', [AdminPlanController::class, 'create'])->name('plans.create');
        Route::post('/plans', [AdminPlanController::class, 'store'])->name('plans.store');
        Route::get('/plans/{id}/edit', [AdminPlanController::class, 'edit'])->name('plans.edit');
        Route::put('/plans/{id}', [AdminPlanController::class, 'update'])->name('plans.update');
        Route::delete('/plans/{id}', [AdminPlanController::class, 'destroy'])->name('plans.destroy');
        Route::patch('/plans/{id}/toggle-status', [AdminPlanController::class, 'toggleStatus'])->name('plans.toggle-status');

        // OTT / digital services management
        Route::post('/services/upload', [AdminServiceController::class, 'upload'])->name('services.upload');
        Route::get('/services', [AdminServiceController::class, 'index'])->name('services.index');
        Route::post('/services', [AdminServiceController::class, 'store'])->name('services.store');
        Route::put('/services/{id}', [AdminServiceController::class, 'update'])->name('services.update');
        Route::delete('/services/{id}', [AdminServiceController::class, 'destroy'])->name('services.destroy');

        // Plan categories
        Route::get('/plan-categories', [PlanCategoryController::class, 'index'])->name('plan-categories.index');
        Route::post('/plan-categories', [PlanCategoryController::class, 'store'])->name('plan-categories.store');
        Route::put('/plan-categories/{id}', [PlanCategoryController::class, 'update'])->name('plan-categories.update');
        Route::delete('/plan-categories/{id}', [PlanCategoryController::class, 'destroy'])->name('plan-categories.destroy');

        // Plans page CMS
        Route::get('/pages/plans', [PlansPageController::class, 'index'])->name('pages.plans');
        Route::put('/pages/plans', [PlansPageController::class, 'update'])->name('pages.plans.update');
        Route::post('/pages/plans/upload', [PlansPageController::class, 'upload'])->name('pages.plans.upload');

        Route::get('/hero-config', [HeroConfigController::class, 'index'])->name('hero-config');
        Route::put('/hero-config', [HeroConfigController::class, 'update'])->name('hero-config.update');
        Route::post('/hero-config/upload', [HeroConfigController::class, 'upload'])->name('hero-config.upload');

        // Quick contact methods
        Route::get('/contact/quick-methods', [AdminQuickContactMethodController::class, 'index'])->name('quick-contact-methods.index');
        Route::post('/contact/quick-methods', [AdminQuickContactMethodController::class, 'store'])->name('quick-contact-methods.store');
        Route::put('/contact/quick-methods/{id}', [AdminQuickContactMethodController::class, 'update'])->name('quick-contact-methods.update');
        Route::delete('/contact/quick-methods/{id}', [AdminQuickContactMethodController::class, 'destroy'])->name('quick-contact-methods.destroy');
        Route::patch('/contact/quick-methods/{id}/toggle-status', [AdminQuickContactMethodController::class, 'toggleStatus'])->name('quick-contact-methods.toggle-status');

        // Contact management
        Route::get('/contact-messages', [AdminContactMessageController::class, 'index'])->name('contact-messages.index');
        Route::get('/contact-messages/{id}', [AdminContactMessageController::class, 'show'])->name('contact-messages.show');
        Route::patch('/contact-messages/{id}/status', [AdminContactMessageController::class, 'updateStatus'])->name('contact-messages.update-status');
        Route::delete('/contact-messages/{id}', [AdminContactMessageController::class, 'destroy'])->name('contact-messages.destroy');

        // Inquiry types
        Route::get('/contact/inquiry-types', [AdminInquiryTypeController::class, 'index'])->name('inquiry-types.index');
        Route::post('/contact/inquiry-types', [AdminInquiryTypeController::class, 'store'])->name('inquiry-types.store');
        Route::put('/contact/inquiry-types/{id}', [AdminInquiryTypeController::class, 'update'])->name('inquiry-types.update');
        Route::delete('/contact/inquiry-types/{id}', [AdminInquiryTypeController::class, 'destroy'])->name('inquiry-types.destroy');
        Route::patch('/contact/inquiry-types/{id}/toggle-status', [AdminInquiryTypeController::class, 'toggleStatus'])->name('inquiry-types.toggle-status');

        // Office locations
        Route::get('/contact/locations', [AdminOfficeLocationController::class, 'index'])->name('office-locations.index');
        Route::post('/contact/locations', [AdminOfficeLocationController::class, 'store'])->name('office-locations.store');
        Route::put('/contact/locations/{id}', [AdminOfficeLocationController::class, 'update'])->name('office-locations.update');
        Route::delete('/contact/locations/{id}', [AdminOfficeLocationController::class, 'destroy'])->name('office-locations.destroy');
        Route::patch('/contact/locations/{id}/toggle-status', [AdminOfficeLocationController::class, 'toggleStatus'])->name('office-locations.toggle-status');

        // Contact page CMS
        Route::get('/pages/contact', [AdminContactPageController::class, 'index'])->name('contact-page');
        Route::put('/pages/contact', [AdminContactPageController::class, 'update'])->name('contact-page.update');
        Route::post('/pages/contact/upload', [AdminContactPageController::class, 'upload'])->name('contact-page.upload');

        // About Us page CMS
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

        Route::get('/website-config', [WebsiteConfigController::class, 'index'])->name('website-config');
        Route::put('/website-config/theme', [WebsiteConfigController::class, 'updateTheme'])->name('website-config.theme.update');
        Route::put('/website-config/font', [WebsiteConfigController::class, 'updateFont'])->name('website-config.font.update');
        Route::post('/website-config/theme/reset', [WebsiteConfigController::class, 'resetTheme'])->name('website-config.theme.reset');
        Route::get('/website-config/colors', [WebsiteConfigController::class, 'getThemeColors'])->name('website-config.colors');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
