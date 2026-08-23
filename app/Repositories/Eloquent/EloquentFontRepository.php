<?php

namespace App\Repositories\Eloquent;

use App\Models\Font;
use App\Repositories\Contracts\FontRepositoryInterface;
use Illuminate\Support\Collection;

class EloquentFontRepository implements FontRepositoryInterface
{
    /**
     * Get all fonts.
     */
    public function all(): Collection
    {
        return Font::all();
    }

    /**
     * Find font by ID.
     */
    public function findById(int $id): ?Font
    {
        return Font::find($id);
    }

    /**
     * Get the active font.
     */
    public function getActive(): ?Font
    {
        return Font::where('is_active', true)->first();
    }

    /**
     * Create a new font.
     */
    public function create(array $data): Font
    {
        return Font::create($data);
    }

    /**
     * Update an existing font.
     */
    public function update(int $id, array $data): Font
    {
        $font = Font::findOrFail($id);
        $font->update($data);

        return $font;
    }

    /**
     * Delete a font.
     */
    public function delete(int $id): bool
    {
        return Font::destroy($id) > 0;
    }

    /**
     * Set a font as active.
     */
    public function activate(int $id): bool
    {
        $font = Font::findOrFail($id);

        return $font->activate();
    }
}
