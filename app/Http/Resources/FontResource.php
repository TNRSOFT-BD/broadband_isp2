<?php

namespace App\Http\Resources;

use App\DTOs\FontDTO;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin FontDTO
 */
class FontResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
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
