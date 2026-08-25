<?php

namespace App\Http\Controllers;

use App\Services\HomepageService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private HomepageService $homepageService,
    ) {}

    /**
     * Show the public homepage with all dynamic sections.
     */
    public function index(): Response
    {
        return Inertia::render('welcome', $this->homepageService->getHomepageData());
    }
}
