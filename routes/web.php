<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlanController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about.index');

// Public plans pages
Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');
Route::get('/plans/{slug}', [PlanController::class, 'show'])->name('plans.show');

// Contact page
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

require __DIR__.'/admin.php';
require __DIR__.'/auth.php';
