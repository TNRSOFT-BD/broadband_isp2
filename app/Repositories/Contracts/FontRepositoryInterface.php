<?php

namespace App\Repositories\Contracts;

use App\Models\Font;
use Illuminate\Support\Collection;

interface FontRepositoryInterface
{
    /**
     * Get all fonts.
     */
    public function all(): Collection;

    /**
     * Find font by ID.
     */
    public function findById(int $id): ?Font;

    /**
     * Get the active font.
     */
    public function getActive(): ?Font;

    /**
     * Create a new font.
     */
    public function create(array $data): Font;

    /**
     * Update an existing font.
     */
    public function update(int $id, array $data): Font;

    /**
     * Delete a font.
     */
    public function delete(int $id): bool;

    /**
     * Set a font as active.
     */
    public function activate(int $id): bool;
}
