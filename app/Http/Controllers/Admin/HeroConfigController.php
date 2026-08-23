<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHeroImageRequest;
use App\Http\Requests\Admin\UpdateHeroRequest;
use App\Services\HeroService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HeroConfigController extends Controller
{
    public function __construct(
        private HeroService $heroService,
    ) {}

    /**
     * Show the hero config page.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/HeroConfig/Index', [
            'hero' => $this->heroService->getActiveHero(),
        ]);
    }

    /**
     * Upload hero background image.
     */
    public function upload(StoreHeroImageRequest $request): JsonResponse
    {
        return response()->json([
            'url' => $this->heroService->storeImage($request->file('image')),
        ]);
    }

    /**
     * Update hero settings.
     */
    public function update(UpdateHeroRequest $request): RedirectResponse
    {
        $this->heroService->saveHero([
            ...$request->validated(),
            'is_active' => true,
        ]);

        return redirect()
            ->route('admin.hero-config')
            ->with('success', 'Hero settings updated successfully.');
    }
}
