<?php

namespace App\Services;

use App\DTOs\ThemeDTO;
use App\Models\Theme;
use App\Repositories\Contracts\ThemeRepositoryInterface;
use Illuminate\Support\Collection;

class ThemeService
{
    public function __construct(
        private ThemeRepositoryInterface $themeRepository,
    ) {}

    /**
     * Get all themes as DTOs.
     */
    public function getAllThemes(): Collection
    {
        return $this->themeRepository->all()->map(fn ($theme) => ThemeDTO::fromModel($theme));
    }

    /**
     * Get theme by ID as DTO.
     */
    public function getThemeById(int $id): ?ThemeDTO
    {
        $theme = $this->themeRepository->findById($id);

        return $theme ? ThemeDTO::fromModel($theme) : null;
    }

    /**
     * Get the active theme as DTO.
     */
    public function getActiveTheme(): ?ThemeDTO
    {
        $theme = $this->themeRepository->getActive();

        return $theme ? ThemeDTO::fromModel($theme) : null;
    }

    /**
     * Create a new theme.
     */
    public function createTheme(array $data): ThemeDTO
    {
        $theme = $this->themeRepository->create($data);

        return ThemeDTO::fromModel($theme);
    }

    /**
     * Update an existing theme.
     */
    public function updateTheme(int $id, array $data): ThemeDTO
    {
        $theme = $this->themeRepository->update($id, $data);

        return ThemeDTO::fromModel($theme);
    }

    /**
     * Update the active theme or create one if none exists.
     */
    public function updateOrCreateActive(array $data): ThemeDTO
    {
        $activeTheme = $this->getActiveTheme();

        if ($activeTheme) {
            return $this->updateTheme($activeTheme->id, $data);
        }

        return $this->createTheme([
            ...$data,
            'is_active' => true,
        ]);
    }

    /**
     * Reset the active theme to the default color palette.
     */
    public function resetToDefault(): ThemeDTO
    {
        return $this->updateOrCreateActive([
            'name' => 'Default Theme',
            'colors' => Theme::DEFAULT_COLORS,
            'is_active' => true,
        ]);
    }

    /**
     * Delete a theme.
     */
    public function deleteTheme(int $id): bool
    {
        return $this->themeRepository->delete($id);
    }

    /**
     * Set a theme as active.
     */
    public function activateTheme(int $id): bool
    {
        return $this->themeRepository->activate($id);
    }

    /**
     * Get active theme colors as CSS variables.
     */
    public function getActiveThemeColors(): array
    {
        $theme = $this->themeRepository->getActive();

        if (! $theme) {
            return Theme::DEFAULT_COLORS;
        }

        return $theme->toCssVariables();
    }
}
