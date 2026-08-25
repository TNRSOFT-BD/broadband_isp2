<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomepageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_key',
        'data',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'data' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Find a section by its key.
     */
    public static function findByKey(string $key): ?self
    {
        return static::where('section_key', $key)->first();
    }

    /**
     * Get a section's data, with optional default.
     */
    public static function getSectionData(string $key, array $default = []): array
    {
        $section = static::findByKey($key);

        if (! $section || ! $section->is_active) {
            return $default;
        }

        return array_merge($default, $section->data ?? []);
    }

    /**
     * Scope: only active sections.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: ordered by sort_order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
