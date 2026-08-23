<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;

    /**
     * Default color palette used as fallback everywhere.
     *
     * @var array<string, string>
     */
    public const DEFAULT_COLORS = [
        'primary' => '#2563EB',
        'primary_dark' => '#1E40AF',
        'secondary' => '#0891B2',
        'accent' => '#06B6D4',
        'success' => '#10B981',
        'warning' => '#F59E0B',
        'error' => '#EF4444',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'is_active',
        'colors',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'colors' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the active theme.
     */
    public static function getActive(): ?self
    {
        return static::where('is_active', true)->first();
    }

    /**
     * Set this theme as active and deactivate others.
     */
    public function activate(): bool
    {
        static::query()->where('id', '!=', $this->id)->update(['is_active' => false]);

        return $this->update(['is_active' => true]);
    }

    /**
     * Get a specific color value.
     */
    public function getColor(string $key, string $default = '#2563EB'): string
    {
        return $this->colors[$key] ?? $default;
    }

    /**
     * Get all colors as CSS custom properties.
     */
    public function toCssVariables(): array
    {
        return array_merge(self::DEFAULT_COLORS, $this->colors ?? []);
    }
}
