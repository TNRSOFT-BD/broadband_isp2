<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreLegalPageRequest;
use App\Http\Requests\Admin\UpdateLegalPageRequest;
use App\Services\LegalPageService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminLegalPageController extends Controller
{
    public function __construct(
        private LegalPageService $legalPageService,
    ) {}

    /**
     * Display a listing of legal pages.
     */
    public function index(): Response
    {
        $search = request('search', '');
        $pages = $this->legalPageService->paginate(15, $search);

        return Inertia::render('Admin/LegalPages/Index', [
            'pages' => $pages,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for creating a new legal page.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/LegalPages/Create');
    }

    /**
     * Store a newly created legal page.
     */
    public function store(StoreLegalPageRequest $request): RedirectResponse
    {
        $this->legalPageService->create($request->validated());

        return redirect()
            ->route('admin.legal-pages.index')
            ->with('success', 'Legal page created successfully.');
    }

    /**
     * Show the form for editing the specified legal page.
     * Accepts either an integer ID or a string slug.
     */
    public function edit(int|string $id): Response
    {
        $page = is_numeric($id)
            ? $this->legalPageService->getById((int) $id)
            : $this->legalPageService->getBySlug((string) $id);

        if (! $page) {
            abort(404);
        }

        return Inertia::render('Admin/LegalPages/Edit', [
            'page' => $page->toArray(),
        ]);
    }

    /**
     * Update the specified legal page.
     * Accepts either an integer ID or a string slug.
     */
    public function update(UpdateLegalPageRequest $request, int|string $id): RedirectResponse
    {
        $page = is_numeric($id)
            ? $this->legalPageService->getById((int) $id)
            : $this->legalPageService->getBySlug((string) $id);

        if (! $page) {
            abort(404);
        }

        $this->legalPageService->update($page->id, $request->validated());

        return redirect()
            ->route('admin.legal-pages.index')
            ->with('success', 'Legal page updated successfully.');
    }

    /**
     * Remove the specified legal page.
     * Accepts either an integer ID or a string slug.
     */
    public function destroy(int|string $id): RedirectResponse
    {
        $page = is_numeric($id)
            ? $this->legalPageService->getById((int) $id)
            : $this->legalPageService->getBySlug((string) $id);

        if (! $page) {
            abort(404);
        }

        $this->legalPageService->delete($page->id);

        return redirect()
            ->route('admin.legal-pages.index')
            ->with('success', 'Legal page deleted successfully.');
    }

    /**
     * Preview a legal page (requires auth).
     * Accepts either an integer ID or a string slug.
     */
    public function preview(int|string $id): Response
    {
        $page = is_numeric($id)
            ? $this->legalPageService->getById((int) $id)
            : $this->legalPageService->getBySlug((string) $id);

        if (! $page) {
            abort(404);
        }

        return Inertia::render('Legal/Show', [
            'page' => $page->toArray(),
            'isPreview' => true,
        ]);
    }
}
