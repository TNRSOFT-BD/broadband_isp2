<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOfficeLocationRequest;
use App\Models\OfficeLocation;
use App\Services\OfficeLocationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminOfficeLocationController extends Controller
{
    public function __construct(
        private OfficeLocationService $locationService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/OfficeLocations/Index', [
            'locations' => $this->locationService->getAllLocations()
                ->map(fn (OfficeLocation $location) => [
                    'id' => $location->id,
                    'name' => $location->name,
                    'slug' => $location->slug,
                    'type' => $location->type,
                    'address' => $location->address,
                    'phone' => $location->phone,
                    'email' => $location->email,
                    'sort_order' => $location->sort_order,
                    'is_active' => $location->is_active,
                ]),
            'locationTypes' => OfficeLocation::TYPES,
        ]);
    }

    public function store(StoreOfficeLocationRequest $request): RedirectResponse
    {
        $this->locationService->createLocation($request->validated());

        return redirect()
            ->route('admin.office-locations.index')
            ->with('success', 'Office location created.');
    }

    public function update(StoreOfficeLocationRequest $request, int $id): RedirectResponse
    {
        $this->locationService->updateLocation($id, $request->validated());

        return redirect()
            ->route('admin.office-locations.index')
            ->with('success', 'Office location updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->locationService->deleteLocation($id);

        return redirect()
            ->route('admin.office-locations.index')
            ->with('success', 'Office location deleted.');
    }

    public function toggleStatus(int $id): RedirectResponse
    {
        $this->locationService->toggleStatus($id);

        return back()->with('success', 'Office location status updated.');
    }
}
