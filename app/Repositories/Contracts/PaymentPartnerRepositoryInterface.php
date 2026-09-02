<?php

namespace App\Repositories\Contracts;

use App\Models\PaymentPartner;
use Illuminate\Database\Eloquent\Collection;

interface PaymentPartnerRepositoryInterface
{
    public function getAll(): Collection;

    public function getActive(): ?PaymentPartner;

    public function findById(int $id): ?PaymentPartner;

    public function create(array $data): PaymentPartner;

    public function update(int $id, array $data): PaymentPartner;

    public function delete(int $id): bool;

    public function deactivateAll(): void;

    public function activate(int $id): PaymentPartner;
}
