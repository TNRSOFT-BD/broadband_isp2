<?php

namespace App\Http\Controllers;

use App\Services\SiteSettingsService;
use Inertia\Inertia;
use Inertia\Response;

class PayBillController extends Controller
{
    public function __construct(
        private SiteSettingsService $siteSettingsService,
    ) {}

    /**
     * Display the public Pay Bill page.
     */
    public function index(): Response
    {
        $settings = $this->siteSettingsService->get();

        return Inertia::render('paybill/Index', [
            'paybillClientId' => $settings['paybill_client_id'] ?? null,
            'siteName' => $settings['site_name'] ?? config('app.name'),
        ]);
    }
}
