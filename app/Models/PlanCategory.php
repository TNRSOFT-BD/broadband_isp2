<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PlanCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'sort_order',
    ];

    public function plans(): HasMany
    {
        return $this->hasMany(Plan::class);
    }

    public function activePlans(): HasMany
    {
        return $this->hasMany(Plan::class)->where('is_active', true);
    }
}
