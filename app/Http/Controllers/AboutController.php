<?php

namespace App\Http\Controllers;

use App\Services\AboutUsService;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __construct(
        private AboutUsService $aboutUsService,
    ) {}

    public function index(): Response
    {
        $about = $this->aboutUsService->getPublicData();

        return Inertia::render('about/Index', [
            'about' => $about,
        ]);
    }
}
