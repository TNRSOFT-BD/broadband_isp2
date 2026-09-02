<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOfficeLocationRequest;
use App\Models\OfficeLocation;
use App\Services\GoogleMaps\GoogleMapsEmbedUrlGenerator;
use App\Services\GoogleMaps\GoogleMapsLocationResolver;
use App\Services\OfficeLocationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminOfficeLocationController extends Controller
{
    public function __construct(
        private OfficeLocationService $locationService,
        private GoogleMapsLocationResolver $resolver,
        private GoogleMapsEmbedUrlGenerator $embedGenerator,
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
                    'google_maps_url' => $location->google_maps_url,
                    'location_query' => $location->location_query,
                    'latitude' => $location->latitude,
                    'longitude' => $location->longitude,
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

    /**
     * Resolve a Google Maps URL and return location data.
     */
    public function resolveLocation(): JsonResponse
    {
        $url = request()->input('url', '');

        $result = $this->resolver->resolve($url);

        if ($result['latitude'] !== null && $result['longitude'] !== null) {
            $result['embed_url'] = $this->embedGenerator->fromCoordinates($result['latitude'], $result['longitude']);
        } elseif ($result['location_query'] !== null) {
            $result['embed_url'] = $this->embedGenerator->fromQuery($result['location_query']);
        } else {
            $result['embed_url'] = null;
        }

        return response()->json($result);
    }
}
