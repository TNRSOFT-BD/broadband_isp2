<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Font extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'family', 'url', 'is_active', 'font_style', 'weight', 'css_family',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the active font.
     */
    public static function getActive(): ?self
    {
        return static::where('is_active', true)->first();
    }

    /**
     * Set this font as active and deactivate others.
     */
    public function activate(): bool
    {
        static::query()->where('id', '!=', $this->id)->update(['is_active' => false]);

        return $this->update(['is_active' => true]);
    }

    /**
     * Get the CSS-safe font family name.
     */
    public function getCssFamilyAttribute(): string
    {
        return strtolower(str_replace(' ', '-', $this->family));
    }
}
