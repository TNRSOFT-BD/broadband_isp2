<?php

namespace App\Repositories\Contracts;

use App\Models\SocialMediaItem;
use Illuminate\Database\Eloquent\Collection;

interface SocialMediaRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?SocialMediaItem;

    public function create(array $data): SocialMediaItem;

    public function update(int $id, array $data): SocialMediaItem;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): SocialMediaItem;
}
