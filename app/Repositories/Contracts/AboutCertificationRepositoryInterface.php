<?php

namespace App\Repositories\Contracts;

use App\Models\AboutCertification;
use Illuminate\Database\Eloquent\Collection;

interface AboutCertificationRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?AboutCertification;

    public function create(array $data): AboutCertification;

    public function update(int $id, array $data): AboutCertification;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): AboutCertification;
}
