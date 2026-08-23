<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePlansPageSettingsRequest;
use App\Services\PlansPageSettingsService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PlansPageController extends Controller
{
    public function __construct(
        private PlansPageSettingsService $settingsService,
    ) {}

    /**
     * Show the plans page CMS editor.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/PlansPage/Index', [
            'settings' => $this->settingsService->getSettings(),
        ]);
    }

    /**
     * Update the plans page CMS content.
     */
    public function update(UpdatePlansPageSettingsRequest $request): RedirectResponse
    {
        $this->settingsService->saveSettings($request->validated());

        return redirect()
            ->route('admin.pages.plans')
            ->with('success', 'Plans page settings updated successfully.');
    }
}
