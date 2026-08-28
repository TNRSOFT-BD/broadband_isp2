<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePlanCategoryRequest;
use App\Http\Requests\Admin\UpdatePlanCategoryRequest;
use App\Services\PlanCategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PlanCategoryController extends Controller
{
    public function __construct(
        private PlanCategoryService $categoryService,
    ) {}

    /**
     * List plan categories.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/PlanCategories/Index', [
            'categories' => $this->categoryService->getAllCategories()
                ->map(fn ($category) => [
                    ...$category->only(['id', 'name', 'slug', 'description', 'icon', 'sort_order']),
                    'plans_count' => $category->plans_count,
                ]),
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(StorePlanCategoryRequest $request): RedirectResponse
    {
        $this->categoryService->createCategory($request->validated());

        return redirect()
            ->route('admin.plan-categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Update an existing category.
     */
    public function update(UpdatePlanCategoryRequest $request, int $id): RedirectResponse
    {
        $this->categoryService->updateCategory($id, $request->validated());

        return redirect()
            ->route('admin.plan-categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Delete a category.
     */
    public function destroy(int $id): RedirectResponse
    {
        $this->categoryService->deleteCategory($id);

        return redirect()
            ->route('admin.plan-categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}
