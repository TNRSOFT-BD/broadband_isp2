<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateAboutPageSettingsRequest;
use App\Http\Requests\Admin\StoreAboutStatisticRequest;
use App\Http\Requests\Admin\StoreAboutCoreValueRequest;
use App\Http\Requests\Admin\StoreAboutMilestoneRequest;
use App\Http\Requests\Admin\StoreAboutCapabilityRequest;
use App\Http\Requests\Admin\StoreAboutClientRequest;
use App\Http\Requests\Admin\StoreAboutCertificationRequest;
use App\Http\Requests\Admin\StoreAboutImageRequest;
use App\Http\Requests\Admin\StoreAboutWhyChooseUsRequest;
use App\Services\AboutUsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminAboutUsController extends Controller
{
    public function __construct(
        private AboutUsService $aboutUsService,
    ) {}

    /* ─── Overview ─── */

    public function index(): Response
    {
        $settings = $this->aboutUsService->getSettings();

        return Inertia::render('Admin/AboutUs/Index', [
            'settings' => $settings,
            'statisticsCount' => $this->aboutUsService->getAllStatistics()->count(),
            'coreValuesCount' => $this->aboutUsService->getAllCoreValues()->count(),
            'milestonesCount' => $this->aboutUsService->getAllMilestones()->count(),
            'capabilitiesCount' => $this->aboutUsService->getAllCapabilities()->count(),
            'clientsCount' => $this->aboutUsService->getAllClients()->count(),
            'certificationsCount' => $this->aboutUsService->getAllCertifications()->count(),
            'whyChooseUsCount' => $this->aboutUsService->getAllWhyChooseUs()->count(),
        ]);
    }

    /* ─── Image Upload ─── */

    public function upload(StoreAboutImageRequest $request): JsonResponse
    {
        return response()->json([
            'url' => $this->aboutUsService->storeImage($request->file('image')),
        ]);
    }

    /* ─── Settings Update ─── */

    public function update(UpdateAboutPageSettingsRequest $request): RedirectResponse
    {
        $this->aboutUsService->saveSettings($request->validated());

        return redirect()
            ->route('admin.about-us.index')
            ->with('success', 'About Us page settings saved.');
    }

    /* ─── Statistics CRUD ─── */

    public function statistics()
    {
        return Inertia::render('Admin/AboutUs/Statistics', [
            'statistics' => $this->aboutUsService->getAllStatistics(),
        ]);
    }

    public function storeStatistic(StoreAboutStatisticRequest $request): RedirectResponse
    {
        $this->aboutUsService->createStatistic($request->validated());

        return redirect()->route('admin.about-us.statistics')->with('success', 'Statistic created.');
    }

    public function updateStatistic(StoreAboutStatisticRequest $request, int $id): RedirectResponse
    {
        $this->aboutUsService->updateStatistic($id, $request->validated());

        return redirect()->route('admin.about-us.statistics')->with('success', 'Statistic updated.');
    }

    public function destroyStatistic(int $id): RedirectResponse
    {
        $this->aboutUsService->deleteStatistic($id);

        return redirect()->route('admin.about-us.statistics')->with('success', 'Statistic deleted.');
    }

    public function toggleStatisticStatus(int $id): RedirectResponse
    {
        $this->aboutUsService->toggleStatisticStatus($id);

        return back()->with('success', 'Statistic status updated.');
    }

    /* ─── Core Values CRUD ─── */

    public function coreValues()
    {
        return Inertia::render('Admin/AboutUs/CoreValues', [
            'coreValues' => $this->aboutUsService->getAllCoreValues(),
        ]);
    }

    public function storeCoreValue(StoreAboutCoreValueRequest $request): RedirectResponse
    {
        $this->aboutUsService->createCoreValue($request->validated());

        return redirect()->route('admin.about-us.core-values')->with('success', 'Core value created.');
    }

    public function updateCoreValue(StoreAboutCoreValueRequest $request, int $id): RedirectResponse
    {
        $this->aboutUsService->updateCoreValue($id, $request->validated());

        return redirect()->route('admin.about-us.core-values')->with('success', 'Core value updated.');
    }

    public function destroyCoreValue(int $id): RedirectResponse
    {
        $this->aboutUsService->deleteCoreValue($id);

        return redirect()->route('admin.about-us.core-values')->with('success', 'Core value deleted.');
    }

    public function toggleCoreValueStatus(int $id): RedirectResponse
    {
        $this->aboutUsService->toggleCoreValueStatus($id);

        return back()->with('success', 'Core value status updated.');
    }

    /* ─── Milestones CRUD ─── */

    public function milestones()
    {
        return Inertia::render('Admin/AboutUs/Milestones', [
            'milestones' => $this->aboutUsService->getAllMilestones(),
        ]);
    }

    public function storeMilestone(StoreAboutMilestoneRequest $request): RedirectResponse
    {
        $this->aboutUsService->createMilestone($request->validated());

        return redirect()->route('admin.about-us.milestones')->with('success', 'Milestone created.');
    }

    public function updateMilestone(StoreAboutMilestoneRequest $request, int $id): RedirectResponse
    {
        $this->aboutUsService->updateMilestone($id, $request->validated());

        return redirect()->route('admin.about-us.milestones')->with('success', 'Milestone updated.');
    }

    public function destroyMilestone(int $id): RedirectResponse
    {
        $this->aboutUsService->deleteMilestone($id);

        return redirect()->route('admin.about-us.milestones')->with('success', 'Milestone deleted.');
    }

    public function toggleMilestoneStatus(int $id): RedirectResponse
    {
        $this->aboutUsService->toggleMilestoneStatus($id);

        return back()->with('success', 'Milestone status updated.');
    }

    /* ─── Capabilities CRUD ─── */

    public function capabilities()
    {
        return Inertia::render('Admin/AboutUs/Capabilities', [
            'capabilities' => $this->aboutUsService->getAllCapabilities(),
        ]);
    }

    public function storeCapability(StoreAboutCapabilityRequest $request): RedirectResponse
    {
        $this->aboutUsService->createCapability($request->validated());

        return redirect()->route('admin.about-us.capabilities')->with('success', 'Capability created.');
    }

    public function updateCapability(StoreAboutCapabilityRequest $request, int $id): RedirectResponse
    {
        $this->aboutUsService->updateCapability($id, $request->validated());

        return redirect()->route('admin.about-us.capabilities')->with('success', 'Capability updated.');
    }

    public function destroyCapability(int $id): RedirectResponse
    {
        $this->aboutUsService->deleteCapability($id);

        return redirect()->route('admin.about-us.capabilities')->with('success', 'Capability deleted.');
    }

    public function toggleCapabilityStatus(int $id): RedirectResponse
    {
        $this->aboutUsService->toggleCapabilityStatus($id);

        return back()->with('success', 'Capability status updated.');
    }

    /* ─── Clients CRUD ─── */

    public function clients()
    {
        return Inertia::render('Admin/AboutUs/Clients', [
            'clients' => $this->aboutUsService->getAllClients(),
        ]);
    }

    public function storeClient(StoreAboutClientRequest $request): RedirectResponse
    {
        $this->aboutUsService->createClient($request->validated());

        return redirect()->route('admin.about-us.clients')->with('success', 'Client created.');
    }

    public function updateClient(StoreAboutClientRequest $request, int $id): RedirectResponse
    {
        $this->aboutUsService->updateClient($id, $request->validated());

        return redirect()->route('admin.about-us.clients')->with('success', 'Client updated.');
    }

    public function destroyClient(int $id): RedirectResponse
    {
        $this->aboutUsService->deleteClient($id);

        return redirect()->route('admin.about-us.clients')->with('success', 'Client deleted.');
    }

    public function toggleClientStatus(int $id): RedirectResponse
    {
        $this->aboutUsService->toggleClientStatus($id);

        return back()->with('success', 'Client status updated.');
    }

    /* ─── Certifications CRUD ─── */

    public function certifications()
    {
        return Inertia::render('Admin/AboutUs/Certifications', [
            'certifications' => $this->aboutUsService->getAllCertifications(),
        ]);
    }

    public function storeCertification(StoreAboutCertificationRequest $request): RedirectResponse
    {
        $this->aboutUsService->createCertification($request->validated());

        return redirect()->route('admin.about-us.certifications')->with('success', 'Certification created.');
    }

    public function updateCertification(StoreAboutCertificationRequest $request, int $id): RedirectResponse
    {
        $this->aboutUsService->updateCertification($id, $request->validated());

        return redirect()->route('admin.about-us.certifications')->with('success', 'Certification updated.');
    }

    public function destroyCertification(int $id): RedirectResponse
    {
        $this->aboutUsService->deleteCertification($id);

        return redirect()->route('admin.about-us.certifications')->with('success', 'Certification deleted.');
    }

    public function toggleCertificationStatus(int $id): RedirectResponse
    {
        $this->aboutUsService->toggleCertificationStatus($id);

        return back()->with('success', 'Certification status updated.');
    }

    /* ─── Why Choose Us CRUD ─── */

    public function whyChooseUs()
    {
        return Inertia::render('Admin/AboutUs/WhyChooseUs', [
            'whyChooseUs' => $this->aboutUsService->getAllWhyChooseUs(),
        ]);
    }

    public function storeWhyChooseUs(StoreAboutWhyChooseUsRequest $request): RedirectResponse
    {
        $this->aboutUsService->createWhyChooseUs($request->validated());

        return redirect()->route('admin.about-us.why-choose-us')->with('success', 'Item created.');
    }

    public function updateWhyChooseUs(StoreAboutWhyChooseUsRequest $request, int $id): RedirectResponse
    {
        $this->aboutUsService->updateWhyChooseUs($id, $request->validated());

        return redirect()->route('admin.about-us.why-choose-us')->with('success', 'Item updated.');
    }

    public function destroyWhyChooseUs(int $id): RedirectResponse
    {
        $this->aboutUsService->deleteWhyChooseUs($id);

        return redirect()->route('admin.about-us.why-choose-us')->with('success', 'Item deleted.');
    }

    public function toggleWhyChooseUsStatus(int $id): RedirectResponse
    {
        $this->aboutUsService->toggleWhyChooseUsStatus($id);

        return back()->with('success', 'Item status updated.');
    }
}
