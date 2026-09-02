<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LegalPage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'page_type',
        'short_description',
        'content_json',
        'content_html',
        'status',
        'published_at',
        'last_updated_at',
        'show_last_updated',
        'meta_title',
        'meta_description',
        'og_title',
        'og_description',
        'og_image',
        'cta_enabled',
        'cta_title',
        'cta_description',
        'cta_button_text',
        'cta_button_url',
        'sort_order',
    ];

    protected $casts = [
        'content_json' => 'array',
        'show_last_updated' => 'boolean',
        'cta_enabled' => 'boolean',
        'published_at' => 'datetime',
        'last_updated_at' => 'datetime',
    ];

    /**
     * Get the public slug-based route path.
     */
    public function getPublicPathAttribute(): string
    {
        return '/legal/'.$this->slug;
    }

    /**
     * Check if the page is published.
     */
    public function isPublished(): bool
    {
        return $this->status === 'published';
    }

    /**
     * Scope to only published pages.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
