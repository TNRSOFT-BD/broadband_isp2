<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\StoreContactMessageRequest;
use App\Models\ContactMessage;
use App\Models\OfficeLocation;
use App\Services\ContactInquiryTypeService;
use App\Services\ContactMessageService;
use App\Services\ContactPageSettingsService;
use App\Services\OfficeLocationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(
        private ContactPageSettingsService $pageSettingsService,
        private ContactInquiryTypeService $inquiryTypeService,
        private ContactMessageService $messageService,
        private OfficeLocationService $officeLocationService,
    ) {}

    /**
     * Display the public contact page.
     */
    public function index(): Response
    {
        $settings = $this->pageSettingsService->getPublicSettings();

        return Inertia::render('contact/Index', [
            'pageSettings' => $settings,
            'inquiryTypes' => $this->inquiryTypeService->getActiveTypes()
                ->map(fn ($type) => $type->only(['id', 'name', 'slug', 'description'])),
            'officeLocations' => $this->officeLocationService->getActiveLocations()
                ->map(fn (OfficeLocation $location) => [
                    'id' => $location->id,
                    'name' => $location->name,
                    'slug' => $location->slug,
                    'type' => $location->type,
                    'address' => $location->address,
                    'phone' => $location->phone,
                    'email' => $location->email,
                    'map_url' => $location->map_url,
                    'map_embed_url' => $location->map_embed_url,
                    'latitude' => $location->latitude,
                    'longitude' => $location->longitude,
                    'office_hours' => $location->office_hours,
                ]),
        ]);
    }

    /**
     * Handle contact form submission.
     */
    public function submit(StoreContactMessageRequest $request): RedirectResponse
    {
        // Spam protection: rate limiting
        $throttleKey = 'contact:' . Str::lower($request->input('email', ''));

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            return back()->withErrors([
                'email' => 'Too many submissions. Please wait a moment before trying again.',
            ]);
        }

        RateLimiter::hit($throttleKey, 60);

        $this->messageService->createMessage($request->validated());

        return redirect()
            ->route('contact.index')
            ->with('success', $this->pageSettingsService->getPublicSettings()['contact_form_success_message'] ?? 'Thank you! Your message has been received.');
    }
}
