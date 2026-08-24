<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutCertification;
use App\Repositories\Contracts\AboutCertificationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentAboutCertificationRepository implements AboutCertificationRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return AboutCertification::query()->active()->ordered()->get();
    }

    public function getAll(): Collection
    {
        return AboutCertification::query()->ordered()->get();
    }

    public function findById(int $id): ?AboutCertification
    {
        return AboutCertification::find($id);
    }

    public function create(array $data): AboutCertification
    {
        return AboutCertification::create($data);
    }

    public function update(int $id, array $data): AboutCertification
    {
        $cert = AboutCertification::findOrFail($id);
        $cert->update($data);

        return $cert->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) AboutCertification::destroy($id);
    }

    public function toggleStatus(int $id): AboutCertification
    {
        $cert = AboutCertification::findOrFail($id);
        $cert->update(['is_active' => ! $cert->is_active]);

        return $cert->fresh();
    }
}
