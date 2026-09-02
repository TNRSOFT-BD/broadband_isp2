<?php

namespace App\Services;

use App\Models\PaymentPartner;
use App\Repositories\Contracts\PaymentPartnerRepositoryInterface;
use App\Support\InteractsWithLocalImages;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class PaymentPartnerService
{
    use InteractsWithLocalImages;

    public function __construct(
        private PaymentPartnerRepositoryInterface $paymentPartnerRepository,
    ) {}

    public function getAll(): Collection
    {
        return $this->paymentPartnerRepository->getAll();
    }

    public function getActive(): ?PaymentPartner
    {
        return $this->paymentPartnerRepository->getActive();
    }

    public function findById(int $id): ?PaymentPartner
    {
        return $this->paymentPartnerRepository->findById($id);
    }

    /**
     * Create a new payment partner (always starts as disabled/inactive).
     */
    public function createPartner(array $data): PaymentPartner
    {
        // Enforce: new partners are always inactive
        $data['is_active'] = false;

        return $this->paymentPartnerRepository->create($data);
    }

    /**
     * Update an existing payment partner.
     * Handles image replacement safely.
     */
    public function updatePartner(int $id, array $data): PaymentPartner
    {
        $previous = $this->paymentPartnerRepository->findById($id)?->only(['image']) ?? [];

        $saved = $this->paymentPartnerRepository->update($id, $data);

        $this->deleteReplacedImages($previous, $saved->only(['image']), ['image']);

        return $saved;
    }

    /**
     * Delete a payment partner and its associated image.
     */
    public function deletePartner(int $id): bool
    {
        $partner = $this->paymentPartnerRepository->findById($id);

        if ($partner?->image) {
            $this->deleteLocalImage($partner->image);
        }

        return $this->paymentPartnerRepository->delete($id);
    }

    /**
     * Activate a payment partner, automatically deactivating all others.
     * Enforces the single-active-partner rule.
     */
    public function activatePartner(int $id): PaymentPartner
    {
        return $this->paymentPartnerRepository->activate($id);
    }

    /**
     * Deactivate all payment partners.
     */
    public function deactivateAll(): void
    {
        $this->paymentPartnerRepository->deactivateAll();
    }

    /**
     * Store an uploaded payment partner image and return its public URL.
     */
    public function storeImage(UploadedFile $file): string
    {
        $path = $file->store('payment-partners', 'public');

        return '/storage/' . $path;
    }
}
