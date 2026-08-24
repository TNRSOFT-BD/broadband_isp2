<?php

namespace App\Repositories\Contracts;

use App\Models\AboutWhyChooseUs;
use Illuminate\Database\Eloquent\Collection;

interface AboutWhyChooseUsRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?AboutWhyChooseUs;

    public function create(array $data): AboutWhyChooseUs;

    public function update(int $id, array $data): AboutWhyChooseUs;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): AboutWhyChooseUs;
}
