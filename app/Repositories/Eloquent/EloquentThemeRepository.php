<?php

namespace App\Repositories\Eloquent;

use App\Models\Theme;
use App\Repositories\Contracts\ThemeRepositoryInterface;
use Illuminate\Support\Collection;

class EloquentThemeRepository implements ThemeRepositoryInterface
{
    /**
     * Get all themes.
     */
    public function all(): Collection
    {
        return Theme::all();
    }

    /**
     * Find theme by ID.
     */
    public function findById(int $id): ?Theme
    {
        return Theme::find($id);
    }

    /**
     * Get the active theme.
     */
    public function getActive(): ?Theme
    {
        return Theme::where('is_active', true)->first();
    }

    /**
     * Create a new theme.
     */
    public function create(array $data): Theme
    {
        return Theme::create($data);
    }

    /**
     * Update an existing theme.
     */
    public function update(int $id, array $data): Theme
    {
        $theme = Theme::findOrFail($id);
        $theme->update($data);

        return $theme;
    }

    /**
     * Delete a theme.
     */
    public function delete(int $id): bool
    {
        return Theme::destroy($id) > 0;
    }

    /**
     * Set a theme as active.
     */
    public function activate(int $id): bool
    {
        $theme = Theme::findOrFail($id);

        return $theme->activate();
    }
}
