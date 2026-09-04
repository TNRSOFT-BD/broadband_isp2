<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePlanRequest;
use App\Http\Requests\Admin\UpdatePlanRequest;
use App\Models\Plan;
use App\Services\PlanCategoryService;
use App\Services\PlansPageSettingsService;
use App\Services\PlanService;
use App\Services\ServiceService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    public function __construct(
        private PlanService $planService,
        private PlanCategoryService $categoryService,
        private ServiceService $serviceService,
        private PlansPageSettingsService $pageSettingsService,
    ) {}

    /**
     * List plans with search and filters.
     */
    public function index(): Response
    {
        $filters = [
            'search' => request()->input('search'),
            'category' => request()->input('category'),
            'status' => request()->input('status'),
        ];

        return Inertia::render('Admin/Plans/Index', [
            'plans' => $this->planService->getFilteredPlans($filters),
            'categories' => $this->categoryService->getAllCategories()
                ->map(fn ($category) => $category->only(['id', 'name', 'slug'])),
            'filters' => $filters,
            'stats' => [
                'total' => Plan::count(),
                'active' => Plan::where('is_active', true)->count(),
                'featured' => Plan::where('is_featured', true)->count(),
            ],
            'pageSettings' => $this->pageSettingsService->getPublicSettings(),
        ]);
    }

    /**
     * Show the create plan form.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Plans/Create', [
            'categories' => $this->categoryService->getAllCategories()
                ->map(fn ($category) => $category->only(['id', 'name', 'slug'])),
            'services' => $this->serviceService->getActiveServices()
                ->map(fn ($service) => $service->only(['id', 'name', 'slug', 'logo'])),
        ]);
    }

    /**
     * Store a newly created plan.
     */
    public function store(StorePlanRequest $request): RedirectResponse
    {
        $this->planService->createPlan($request->validated());

        return redirect()
            ->route('admin.plans.index')
            ->with('success', 'Plan created successfully.');
    }

    /**
     * Show the edit plan form.
     */
    public function edit(int $id): Response
    {
        $plan = $this->planService->findById($id);

        abort_if(! $plan, 404);

        return Inertia::render('Admin/Plans/Edit', [
            'plan' => [
                ...$plan->toArray(),
                'features' => $plan->features->map(fn ($feature) => $feature->only(['id', 'title', 'icon', 'description', 'sort_order'])),
                'services' => $plan->services->map(fn ($service) => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'logo' => $service->logo,
                    'custom_label' => $service->pivot->custom_label,
                    'custom_note' => $service->pivot->custom_note,
                    'duration' => $service->pivot->duration,
                    'is_included' => (bool) $service->pivot->is_included,
                    'is_featured' => (bool) $service->pivot->is_featured,
                    'sort_order' => $service->pivot->sort_order,
                ]),
            ],
            'categories' => $this->categoryService->getAllCategories()
                ->map(fn ($category) => $category->only(['id', 'name', 'slug'])),
            'services' => $this->serviceService->getActiveServices()
                ->map(fn ($service) => $service->only(['id', 'name', 'slug', 'logo'])),
        ]);
    }

    /**
     * Update an existing plan.
     */
    public function update(UpdatePlanRequest $request, int $id): RedirectResponse
    {
        $this->planService->updatePlan($id, $request->validated());

        return redirect()
            ->route('admin.plans.index')
            ->with('success', 'Plan updated successfully.');
    }

    /**
     * Delete a plan.
     */
    public function destroy(int $id): RedirectResponse
    {
        $this->planService->deletePlan($id);

        return redirect()
            ->route('admin.plans.index')
            ->with('success', 'Plan deleted successfully.');
    }

    /**
     * Toggle a plan's active status.
     */
    public function toggleStatus(int $id): RedirectResponse
    {
        $plan = $this->planService->toggleStatus($id);

        return redirect()
            ->route('admin.plans.index')
            ->with('success', "Plan marked as {$this->statusLabel($plan->is_active)}.");
    }

    private function statusLabel(bool $isActive): string
    {
        return $isActive ? 'active' : 'inactive';
    }
}
