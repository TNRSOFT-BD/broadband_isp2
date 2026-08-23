<?php

namespace App\Services;

use App\DTOs\FontDTO;
use App\Repositories\Contracts\FontRepositoryInterface;
use Illuminate\Support\Collection;

class FontService
{
    public function __construct(
        private FontRepositoryInterface $fontRepository,
    ) {}

    /**
     * Get all fonts as DTOs.
     */
    public function getAllFonts(): Collection
    {
        return $this->fontRepository->all()->map(fn ($font) => FontDTO::fromModel($font));
    }

    /**
     * Get font by ID as DTO.
     */
    public function getFontById(int $id): ?FontDTO
    {
        $font = $this->fontRepository->findById($id);

        return $font ? FontDTO::fromModel($font) : null;
    }

    /**
     * Get the active font as DTO.
     */
    public function getActiveFont(): ?FontDTO
    {
        $font = $this->fontRepository->getActive();

        return $font ? FontDTO::fromModel($font) : null;
    }

    /**
     * Create a new font.
     */
    public function createFont(array $data): FontDTO
    {
        $font = $this->fontRepository->create($data);

        return FontDTO::fromModel($font);
    }

    /**
     * Update an existing font.
     */
    public function updateFont(int $id, array $data): FontDTO
    {
        $font = $this->fontRepository->update($id, $data);

        return FontDTO::fromModel($font);
    }

    /**
     * Update the active font or create one if none exists.
     */
    public function updateOrCreateActive(array $data): FontDTO
    {
        $activeFont = $this->getActiveFont();

        if ($activeFont) {
            return $this->updateFont($activeFont->id, $data);
        }

        return $this->createFont([
            ...$data,
            'is_active' => true,
        ]);
    }

    /**
     * Delete a font.
     */
    public function deleteFont(int $id): bool
    {
        return $this->fontRepository->delete($id);
    }

    /**
     * Set a font as active.
     */
    public function activateFont(int $id): bool
    {
        return $this->fontRepository->activate($id);
    }

    /**
     * Get active font details for layout injection.
     */
    public function getActiveFontDetails(): ?array
    {
        $font = $this->fontRepository->getActive();

        if (! $font) {
            return null;
        }

        return [
            'name' => $font->name,
            'family' => $font->family,
            'url' => $font->url,
            'weight' => $font->weight,
            'font_style' => $font->font_style ?? 'regular',
            'css_family' => $font->css_family,
        ];
    }
}
