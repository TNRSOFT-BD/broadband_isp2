<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceLogoRequest;
use App\Http\Requests\Admin\StoreServiceRequest;
use App\Http\Requests\Admin\UpdateServiceRequest;
use App\Models\Service;
use App\Services\ServiceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function __construct(
        private ServiceService $serviceService,
    ) {}

    /**
     * List all OTT/digital services.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => $this->serviceService->getAllServices()->map(fn ($service) => [
                ...$service->only(['id', 'name', 'slug', 'category', 'logo', 'description', 'website_url', 'is_active', 'sort_order']),
                'category_label' => $service->category_label,
                'plans_count' => $service->plans_count,
            ]),
            'categories' => collect(Service::CATEGORIES)
                ->map(fn ($label, $value) => ['value' => $value, 'label' => $label])
                ->values()
                ->all(),
        ]);
    }

    /**
     * Store a newly created service.
     */
    public function store(StoreServiceRequest $request): RedirectResponse
    {
        $this->serviceService->createService($request->validated());

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    /**
     * Update an existing service.
     */
    public function update(UpdateServiceRequest $request, int $id): RedirectResponse
    {
        $this->serviceService->updateService($id, $request->validated());

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    /**
     * Delete a service.
     */
    public function destroy(int $id): RedirectResponse
    {
        $this->serviceService->deleteService($id);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }

    /**
     * Upload a service logo and return its URL.
     */
    public function upload(StoreServiceLogoRequest $request): JsonResponse
    {
        $url = $this->serviceService->storeLogo($request->file('logo'));

        return response()->json(['url' => $url]);
    }

}
