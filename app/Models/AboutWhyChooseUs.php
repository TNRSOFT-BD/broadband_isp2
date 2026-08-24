<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutWhyChooseUs extends Model
{
    use HasFactory;

    protected $table = 'about_why_choose_us';

    protected $fillable = [
        'icon', 'title', 'description', 'sort_order', 'is_active',
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
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
