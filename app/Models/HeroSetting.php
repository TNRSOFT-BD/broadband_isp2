<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'background_image',
        'badge_text',
        'heading_line1',
        'heading_highlight',
        'heading_line2',
        'subtitle',
        'cta_primary_text',
        'cta_primary_url',
        'cta_secondary_text',
        'cta_secondary_url',
        'badge_color',
        'heading_color',
        'highlight_color',
        'subtitle_color',
        'cta_primary_bg',
        'cta_primary_text_color',
        'cta_secondary_border',
        'cta_secondary_text_color',
        'feature_card_bg',
        'feature_card_border',
        'feature_label_color',
        'feature_desc_color',
        'overlay_color',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public static function getActive(): ?self
    {
        return static::where('is_active', true)->first();
    }

    /**
     * Get default hero settings.
     */
    public static function getDefaults(): array
    {
        return [
            'background_image' => '/storage/hero/hero-default.avif',
            'badge_text' => 'Next Generation Internet',
            'heading_line1' => 'The Future of',
            'heading_highlight' => 'Connectivity',
            'heading_line2' => 'Starts Here',
            'subtitle' => 'Experience blazing-fast internet with zero buffering. Powered by cutting-edge fiber technology designed for the modern world.',
            'cta_primary_text' => 'Get Connected',
            'cta_primary_url' => '#',
            'cta_secondary_text' => 'Check Availability',
            'cta_secondary_url' => '#',
            'badge_color' => '#2563EB',
            'heading_color' => '#ffffff',
            'highlight_color' => '#2563EB',
            'subtitle_color' => '#cbd5e1',
            'cta_primary_bg' => '#2563EB',
            'cta_primary_text_color' => '#ffffff',
            'cta_secondary_border' => '#ffffff',
            'cta_secondary_text_color' => '#ffffff',
            'feature_card_bg' => '#ffffff',
            'feature_card_border' => '#ffffff',
            'feature_label_color' => '#ffffff',
            'feature_desc_color' => '#94a3b8',
            'overlay_color' => '#0a0e1a',
        ];
    }
}
