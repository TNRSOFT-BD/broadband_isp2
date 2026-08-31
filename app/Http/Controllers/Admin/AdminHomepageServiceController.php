<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreHomepageServiceImageRequest;
use App\Http\Requests\Admin\StoreHomepageServiceRequest;
use App\Http\Requests\Admin\UpdateHomepageServiceRequest;
use App\Models\HomepageSetting;
use App\Repositories\Contracts\HomepageServiceCategoryRepositoryInterface;
use App\Services\HomepageServiceItemService;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminHomepageServiceController extends Controller
{
    public function __construct(
        private HomepageServiceItemService $service,
        private HomepageServiceCategoryRepositoryInterface $categoryRepository,
    ) {}

    /**
     * List all homepage services.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/HomepageServices/Index', [
            'services' => $this->service->getAllItems()->map(fn ($item) => [
                ...$item->only([
                    'id', 'title', 'description', 'image', 'link',
                    'open_in_new_tab', 'is_active', 'sort_order',
                ]),
                'homepage_service_category_id' => $item->homepage_service_category_id,
            ]),
            'categories' => $this->categoryRepository->getOrdered()->map(fn ($cat) => $cat->only([
                'id', 'name', 'slug',
            ])),
            'sectionSettings' => $this->service->getSectionSettings(),
        ]);
    }

    /**
     * Store a newly created homepage service.
     */
    public function store(StoreHomepageServiceRequest $request): RedirectResponse
    {
        $this->service->createItem($request->validated());

        return redirect()
            ->route('admin.homepage-services.index')
            ->with('success', 'Homepage service created successfully.');
    }

    /**
     * Update an existing homepage service.
     */
    public function update(UpdateHomepageServiceRequest $request, int $id): RedirectResponse
    {
        $this->service->updateItem($id, $request->validated());

        return redirect()
            ->route('admin.homepage-services.index')
            ->with('success', 'Homepage service updated successfully.');
    }

    /**
     * Delete a homepage service.
     */
    public function destroy(int $id): RedirectResponse
    {
        $this->service->deleteItem($id);

        return redirect()
            ->route('admin.homepage-services.index')
            ->with('success', 'Homepage service deleted successfully.');
    }

    /**
     * Upload a homepage service image and return its URL.
     */
    public function upload(StoreHomepageServiceImageRequest $request): JsonResponse
    {
        $url = $this->service->storeImage($request->file('image'));

        return response()->json(['url' => $url]);
    }

    // ── Category CRUD ──────────────────────────────────────────────

    /**
     * Store a new homepage service category.
     */
    public function storeCategory(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:homepage_service_categories,slug'],
            'description' => ['nullable', 'string', 'max:500'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        // Auto-generate slug from name if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        $this->categoryRepository->create($validated);

        return redirect()
            ->route('admin.homepage-services.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Update an existing homepage service category.
     */
    public function updateCategory(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('homepage_service_categories', 'slug')->ignore($id)],
            'description' => ['nullable', 'string', 'max:500'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);
        }

        $this->categoryRepository->update($id, $validated);

        return redirect()
            ->route('admin.homepage-services.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Delete a homepage service category.
     */
    public function destroyCategory(int $id): RedirectResponse
    {
        $this->categoryRepository->delete($id);

        return redirect()
            ->route('admin.homepage-services.index')
            ->with('success', 'Category deleted successfully.');
    }

    /**
     * Update section settings (title, subtitle, is_active).
     */
    public function updateSectionSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:500'],
            'is_active' => ['boolean'],
        ]);

        HomepageSetting::updateOrCreate(
            ['section_key' => 'services_section'],
            [
                'data' => [
                    'title' => $validated['title'],
                    'subtitle' => $validated['subtitle'] ?? '',
                ],
                'is_active' => $validated['is_active'] ?? true,
            ]
        );

        // Flush homepage cache
        app(\App\Services\HomepageService::class)->flushCache();

        return redirect()
            ->route('admin.homepage-services.index')
            ->with('success', 'Services section settings updated successfully.');
    }
}
