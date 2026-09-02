<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePaymentPartnerImageRequest;
use App\Http\Requests\Admin\StorePaymentPartnerRequest;
use App\Http\Requests\Admin\UpdatePaymentPartnerRequest;
use App\Services\PaymentPartnerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminPaymentPartnerController extends Controller
{
    public function __construct(
        private PaymentPartnerService $paymentPartnerService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/PaymentPartners/Index', [
            'partners' => $this->paymentPartnerService->getAll()
                ->map(fn ($partner) => $partner->only(['id', 'name', 'image', 'website_link', 'is_active'])),
        ]);
    }

    public function store(StorePaymentPartnerRequest $request): RedirectResponse
    {
        $this->paymentPartnerService->createPartner($request->validated());

        return redirect()
            ->route('admin.payment-partners.index')
            ->with('success', 'Payment partner created successfully.');
    }

    public function update(UpdatePaymentPartnerRequest $request, int $id): RedirectResponse
    {
        $this->paymentPartnerService->updatePartner($id, $request->validated());

        return redirect()
            ->route('admin.payment-partners.index')
            ->with('success', 'Payment partner updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->paymentPartnerService->deletePartner($id);

        return redirect()
            ->route('admin.payment-partners.index')
            ->with('success', 'Payment partner deleted successfully.');
    }

    public function activate(int $id): RedirectResponse
    {
        $this->paymentPartnerService->activatePartner($id);

        return redirect()
            ->route('admin.payment-partners.index')
            ->with('success', 'Payment partner activated. All other partners have been deactivated.');
    }

    public function deactivate(): RedirectResponse
    {
        $this->paymentPartnerService->deactivateAll();

        return redirect()
            ->route('admin.payment-partners.index')
            ->with('success', 'All payment partners have been deactivated.');
    }

    public function upload(StorePaymentPartnerImageRequest $request): JsonResponse
    {
        $url = $this->paymentPartnerService->storeImage($request->file('image'));

        return response()->json(['url' => $url]);
    }
}
