<?php

namespace App\DTOs;

use App\Models\Font;

class FontDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $family,
        public readonly ?string $url,
        public readonly bool $isActive,
        public readonly string $fontStyle,
        public readonly string $weight,
        public readonly ?string $createdAt = null,
        public readonly ?string $updatedAt = null,
    ) {}

    /**
     * Create DTO from Font model.
     */
    public static function fromModel(Font $font): self
    {
        return new self(
            id: $font->id,
            name: $font->name,
            family: $font->family,
            url: $font->url,
            isActive: $font->is_active,
            fontStyle: $font->font_style ?? 'regular',
            weight: $font->weight,
            createdAt: $font->created_at?->toISOString(),
            updatedAt: $font->updated_at?->toISOString(),
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
            'family' => $this->family,
            'url' => $this->url,
            'is_active' => $this->isActive,
            'font_style' => $this->fontStyle,
            'weight' => $this->weight,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt,
        ];
    }
}
