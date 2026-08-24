<?php

use App\Http\Controllers\Admin\AdminContactMessageController;
use App\Http\Controllers\Admin\AdminContactPageController;
use App\Http\Controllers\Admin\AdminInquiryTypeController;
use App\Http\Controllers\Admin\AdminOfficeLocationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroConfigController;
use App\Http\Controllers\Admin\PlanCategoryController;
use App\Http\Controllers\Admin\PlanController as AdminPlanController;
use App\Http\Controllers\Admin\PlansPageController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\WebsiteConfigController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlanController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

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

        Route::get('/hero-config', [HeroConfigController::class, 'index'])->name('hero-config');
        Route::put('/hero-config', [HeroConfigController::class, 'update'])->name('hero-config.update');
        Route::post('/hero-config/upload', [HeroConfigController::class, 'upload'])->name('hero-config.upload');

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

        Route::get('/website-config', [WebsiteConfigController::class, 'index'])->name('website-config');
        Route::put('/website-config/theme', [WebsiteConfigController::class, 'updateTheme'])->name('website-config.theme.update');
        Route::put('/website-config/font', [WebsiteConfigController::class, 'updateFont'])->name('website-config.font.update');
        Route::post('/website-config/theme/reset', [WebsiteConfigController::class, 'resetTheme'])->name('website-config.theme.reset');
        Route::get('/website-config/colors', [WebsiteConfigController::class, 'getThemeColors'])->name('website-config.colors');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
