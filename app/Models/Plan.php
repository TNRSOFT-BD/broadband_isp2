<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_category_id',
        'name',
        'slug',
        'tagline',
        'description',
        'speed',
        'speed_unit',
        'download_speed',
        'upload_speed',
        'monthly_price',
        'quarterly_price',
        'yearly_price',
        'setup_fee',
        'vat_information',
        'contract_duration',
        'fair_usage_policy',
        'terms_conditions',
        'badge_text',
        'is_featured',
        'is_recommended',
        'is_active',
        'sort_order',
        'cta_text',
        'cta_url',
    ];

    protected $casts = [
        'monthly_price' => 'decimal:2',
        'quarterly_price' => 'decimal:2',
        'yearly_price' => 'decimal:2',
        'setup_fee' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_recommended' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(PlanCategory::class, 'plan_category_id');
    }

    public function features(): HasMany
    {
        return $this->hasMany(PlanFeature::class)->orderBy('sort_order')->orderBy('id');
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'plan_service')
            ->withPivot([
                'custom_label',
                'custom_note',
                'duration',
                'is_included',
                'is_featured',
                'sort_order',
            ])
            ->orderBy('plan_service.sort_order')
            ->orderBy('plan_service.id');
    }
}
