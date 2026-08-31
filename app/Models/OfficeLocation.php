<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficeLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'address',
        'phone',
        'email',
        'google_maps_url',
        'location_query',
        'map_url',
        'map_embed_url',
        'latitude',
        'longitude',
        'office_hours',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public const TYPES = [
        'head_office' => 'Head Office',
        'branch' => 'Branch Office',
        'care_center' => 'Customer Care Center',
        'regional' => 'Regional Office',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}
