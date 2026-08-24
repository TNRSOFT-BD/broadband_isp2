<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCertification extends Model
{
    use HasFactory;

    protected $fillable = [
        'icon', 'title', 'description', 'certificate_number',
        'issuing_organization', 'issue_date', 'expiry_date',
        'certificate_image', 'verification_url', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'issue_date' => 'date',
        'expiry_date' => 'date',
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
