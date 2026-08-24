<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreQuickContactMethodRequest;
use App\Services\QuickContactMethodService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminQuickContactMethodController extends Controller
{
    public function __construct(
        private QuickContactMethodService $methodService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/QuickContactMethods/Index', [
            'methods' => $this->methodService->getAllMethods()
                ->map(fn ($method) => $method->only(['id', 'icon', 'label', 'value', 'description', 'href', 'sort_order', 'is_active', 'show_in_footer'])),
            'icons' => \App\Models\QuickContactMethod::ICONS,
        ]);
    }

    public function store(StoreQuickContactMethodRequest $request): RedirectResponse
    {
        $this->methodService->createMethod($request->validated());

        return redirect()
            ->route('admin.quick-contact-methods.index')
            ->with('success', 'Contact method created.');
    }

    public function update(StoreQuickContactMethodRequest $request, int $id): RedirectResponse
    {
        $this->methodService->updateMethod($id, $request->validated());

        return redirect()
            ->route('admin.quick-contact-methods.index')
            ->with('success', 'Contact method updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->methodService->deleteMethod($id);

        return redirect()
            ->route('admin.quick-contact-methods.index')
            ->with('success', 'Contact method deleted.');
    }

    public function toggleStatus(int $id): RedirectResponse
    {
        $this->methodService->toggleStatus($id);

        return back()->with('success', 'Contact method status updated.');
    }
}
