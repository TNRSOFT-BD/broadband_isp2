<?php

namespace App\Http\Controllers;

use App\Services\LegalPageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LegalPageController extends Controller
{
    public function __construct(
        private LegalPageService $legalPageService,
    ) {}

    /**
     * Display a legal page by slug.
     */
    public function show(string $slug): Response
    {
        $page = $this->legalPageService->getPublishedBySlug($slug);

        if (! $page) {
            abort(404);
        }

        return Inertia::render('Legal/Show', [
            'page' => $page->toArray(),
        ]);
    }
}
