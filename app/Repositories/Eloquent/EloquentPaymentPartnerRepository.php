<?php

namespace App\Repositories\Eloquent;

use App\Models\PaymentPartner;
use App\Repositories\Contracts\PaymentPartnerRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EloquentPaymentPartnerRepository implements PaymentPartnerRepositoryInterface
{
    public function getAll(): Collection
    {
        return PaymentPartner::query()->latest()->get();
    }

    public function getActive(): ?PaymentPartner
    {
        return PaymentPartner::query()->active()->first();
    }

    public function findById(int $id): ?PaymentPartner
    {
        return PaymentPartner::find($id);
    }

    public function create(array $data): PaymentPartner
    {
        return PaymentPartner::create($data);
    }

    public function update(int $id, array $data): PaymentPartner
    {
        $partner = PaymentPartner::findOrFail($id);
        $partner->update($data);

        return $partner->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) PaymentPartner::destroy($id);
    }

    public function deactivateAll(): void
    {
        PaymentPartner::query()->where('is_active', true)->update(['is_active' => false]);
    }

    public function activate(int $id): PaymentPartner
    {
        return DB::transaction(function () use ($id) {
            // Deactivate all other partners first
            $this->deactivateAll();

            // Activate the selected partner
            $partner = PaymentPartner::findOrFail($id);
            $partner->update(['is_active' => true]);

            return $partner->fresh();
        });
    }
}
