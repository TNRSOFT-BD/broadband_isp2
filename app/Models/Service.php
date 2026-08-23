<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Service extends Model
{
    use HasFactory;

    public const CATEGORIES = [
        'ott' => 'OTT',
        'streaming' => 'Streaming',
        'entertainment' => 'Entertainment',
        'gaming' => 'Gaming',
        'security' => 'Security',
        'cloud_storage' => 'Cloud Storage',
        'iptv' => 'IPTV',
        'other' => 'Other',
    ];

    protected $fillable = [
        'name',
        'slug',
        'category',
        'logo',
        'description',
        'website_url',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function plans(): BelongsToMany
    {
        return $this->belongsToMany(Plan::class, 'plan_service')
            ->withPivot([
                'custom_label',
                'custom_note',
                'duration',
                'is_included',
                'is_featured',
                'sort_order',
            ]);
    }

    /**
     * Human-readable category label.
     */
    public function getCategoryLabelAttribute(): string
    {
        return self::CATEGORIES[$this->category] ?? ucfirst($this->category);
    }
}
