<?php

namespace App\DTOs;

use App\Models\Theme;

class ThemeDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly bool $isActive,
        public readonly array $colors,
        public readonly ?string $createdAt = null,
        public readonly ?string $updatedAt = null,
    ) {}

    /**
     * Create DTO from Theme model.
     */
    public static function fromModel(Theme $theme): self
    {
        return new self(
            id: $theme->id,
            name: $theme->name,
            isActive: $theme->is_active,
            colors: $theme->colors ?? [],
            createdAt: $theme->created_at?->toISOString(),
            updatedAt: $theme->updated_at?->toISOString(),
        );
    }

    /**
     * Convert to array for Inertia props.
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'is_active' => $this->isActive,
            'colors' => $this->colors,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt,
        ];
    }
}
