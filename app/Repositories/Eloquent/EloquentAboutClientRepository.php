<?php

namespace App\Repositories\Eloquent;

use App\Models\AboutClient;
use App\Repositories\Contracts\AboutClientRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class EloquentAboutClientRepository implements AboutClientRepositoryInterface
{
    public function getActiveOrdered(): Collection
    {
        return AboutClient::query()->active()->ordered()->get();
    }

    public function getAll(): Collection
    {
        return AboutClient::query()->ordered()->get();
    }

    public function findById(int $id): ?AboutClient
    {
        return AboutClient::find($id);
    }

    public function create(array $data): AboutClient
    {
        return AboutClient::create($data);
    }

    public function update(int $id, array $data): AboutClient
    {
        $client = AboutClient::findOrFail($id);
        $client->update($data);

        return $client->fresh();
    }

    public function delete(int $id): bool
    {
        return (bool) AboutClient::destroy($id);
    }

    public function toggleStatus(int $id): AboutClient
    {
        $client = AboutClient::findOrFail($id);
        $client->update(['is_active' => ! $client->is_active]);

        return $client->fresh();
    }
}
