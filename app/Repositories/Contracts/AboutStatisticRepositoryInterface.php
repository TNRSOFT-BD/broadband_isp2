<?php

namespace App\Repositories\Contracts;

use App\Models\AboutStatistic;
use Illuminate\Database\Eloquent\Collection;

interface AboutStatisticRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?AboutStatistic;

    public function create(array $data): AboutStatistic;

    public function update(int $id, array $data): AboutStatistic;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): AboutStatistic;
}
