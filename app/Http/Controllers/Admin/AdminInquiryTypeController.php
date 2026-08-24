<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreInquiryTypeRequest;
use App\Services\ContactInquiryTypeService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminInquiryTypeController extends Controller
{
    public function __construct(
        private ContactInquiryTypeService $inquiryTypeService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/InquiryTypes/Index', [
            'inquiryTypes' => $this->inquiryTypeService->getAllTypes()
                ->map(fn ($type) => $type->only(['id', 'name', 'slug', 'description', 'target_department', 'email_recipient', 'sort_order', 'is_active'])),
        ]);
    }

    public function store(StoreInquiryTypeRequest $request): RedirectResponse
    {
        $this->inquiryTypeService->createType($request->validated());

        return redirect()
            ->route('admin.inquiry-types.index')
            ->with('success', 'Inquiry type created.');
    }

    public function update(StoreInquiryTypeRequest $request, int $id): RedirectResponse
    {
        $this->inquiryTypeService->updateType($id, $request->validated());

        return redirect()
            ->route('admin.inquiry-types.index')
            ->with('success', 'Inquiry type updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->inquiryTypeService->deleteType($id);

        return redirect()
            ->route('admin.inquiry-types.index')
            ->with('success', 'Inquiry type deleted.');
    }

    public function toggleStatus(int $id): RedirectResponse
    {
        $this->inquiryTypeService->toggleStatus($id);

        return back()->with('success', 'Inquiry type status updated.');
    }
}
