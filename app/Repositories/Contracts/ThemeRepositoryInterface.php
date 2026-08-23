<?php

namespace App\Repositories\Contracts;

use App\Models\Theme;
use Illuminate\Support\Collection;

interface ThemeRepositoryInterface
{
    /**
     * Get all themes.
     */
    public function all(): Collection;

    /**
     * Find theme by ID.
     */
    public function findById(int $id): ?Theme;

    /**
     * Get the active theme.
     */
    public function getActive(): ?Theme;

    /**
     * Create a new theme.
     */
    public function create(array $data): Theme;

    /**
     * Update an existing theme.
     */
    public function update(int $id, array $data): Theme;

    /**
     * Delete a theme.
     */
    public function delete(int $id): bool;

    /**
     * Set a theme as active.
     */
    public function activate(int $id): bool;
}
