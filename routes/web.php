<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroConfigController;
use App\Http\Controllers\Admin\WebsiteConfigController;
use App\Http\Controllers\HomeController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::prefix('admin')->name('admin.')->middleware(AdminMiddleware::class)->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('/hero-config', [HeroConfigController::class, 'index'])->name('hero-config');
        Route::put('/hero-config', [HeroConfigController::class, 'update'])->name('hero-config.update');
        Route::post('/hero-config/upload', [HeroConfigController::class, 'upload'])->name('hero-config.upload');

        Route::get('/website-config', [WebsiteConfigController::class, 'index'])->name('website-config');
        Route::put('/website-config/theme', [WebsiteConfigController::class, 'updateTheme'])->name('website-config.theme.update');
        Route::put('/website-config/font', [WebsiteConfigController::class, 'updateFont'])->name('website-config.font.update');
        Route::post('/website-config/theme/reset', [WebsiteConfigController::class, 'resetTheme'])->name('website-config.theme.reset');
        Route::get('/website-config/colors', [WebsiteConfigController::class, 'getThemeColors'])->name('website-config.colors');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
