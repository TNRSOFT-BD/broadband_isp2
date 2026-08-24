<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuickContactMethod extends Model
{
    use HasFactory;

    public const ICONS = [
        'Phone' => 'Phone',
        'Mail' => 'Mail',
        'MessageCircle' => 'MessageCircle',
        'Headphones' => 'Headphones',
        'MapPin' => 'MapPin',
        'Globe' => 'Globe',
        'Clock' => 'Clock',
        'HelpCircle' => 'HelpCircle',
    ];

    protected $fillable = [
        'icon',
        'label',
        'value',
        'description',
        'href',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('label');
    }
}
