<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateFontRequest;
use App\Http\Requests\UpdateThemeRequest;
use App\Http\Resources\FontResource;
use App\Http\Resources\ThemeResource;
use App\Services\FontService;
use App\Services\ThemeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteConfigController extends Controller
{
    public function __construct(
        private ThemeService $themeService,
        private FontService $fontService,
    ) {}

    /**
     * Show the website configuration page.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/WebsiteConfig/Index', [
            'themes' => ThemeResource::collection($this->themeService->getAllThemes())->resolve(),
            'fonts' => FontResource::collection($this->fontService->getAllFonts())->resolve(),
            'activeTheme' => $this->themeService->getActiveTheme()
                ? ThemeResource::make($this->themeService->getActiveTheme())->resolve()
                : null,
            'activeFont' => $this->fontService->getActiveFont()
                ? FontResource::make($this->fontService->getActiveFont())->resolve()
                : null,
        ]);
    }

    /**
     * Update the active theme colors.
     */
    public function updateTheme(UpdateThemeRequest $request): RedirectResponse
    {
        $this->themeService->updateOrCreateActive($request->validated());

        return redirect()
            ->route('admin.website-config')
            ->with('success', 'Theme updated successfully.');
    }

    /**
     * Update the active font.
     */
    public function updateFont(UpdateFontRequest $request): RedirectResponse
    {
        $this->fontService->updateOrCreateActive($request->validated());

        return redirect()
            ->route('admin.website-config')
            ->with('success', 'Font updated successfully.');
    }

    /**
     * Reset theme to default colors.
     */
    public function resetTheme(): RedirectResponse
    {
        $this->themeService->resetToDefault();

        return redirect()
            ->route('admin.website-config')
            ->with('success', 'Theme reset to default.');
    }

    /**
     * Get current theme colors (API endpoint for live preview).
     */
    public function getThemeColors(): JsonResponse
    {
        return response()->json([
            'colors' => $this->themeService->getActiveThemeColors(),
        ]);
    }
}
