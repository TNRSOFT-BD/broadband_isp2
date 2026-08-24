<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateContactPageSettingsRequest;
use App\Services\ContactPageSettingsService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminContactPageController extends Controller
{
    public function __construct(
        private ContactPageSettingsService $pageSettingsService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/ContactPage/Index', [
            'settings' => $this->pageSettingsService->getSettings(),
        ]);
    }

    public function update(UpdateContactPageSettingsRequest $request): RedirectResponse
    {
        $this->pageSettingsService->saveSettings($request->validated());

        return redirect()
            ->route('admin.contact-page')
            ->with('success', 'Contact page settings saved.');
    }
}
