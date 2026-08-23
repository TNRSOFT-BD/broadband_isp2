<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlansPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_eyebrow',
        'hero_title',
        'hero_highlight',
        'hero_description',
        'background_image',
        'cta_primary_text',
        'cta_primary_url',
        'cta_secondary_text',
        'cta_secondary_url',
        'section_category_title',
        'section_category_description',
        'section_plans_title',
        'section_plans_description',
        'cta_section_enabled',
        'cta_section_title',
        'cta_section_description',
        'cta_section_primary_text',
        'cta_section_primary_url',
        'cta_section_secondary_text',
        'cta_section_secondary_url',
        'cta_section_background_image',
        'currency_symbol',
        'currency_code',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'is_active',
    ];

    protected $casts = [
        'cta_section_enabled' => 'boolean',
        'is_active' => 'boolean',
    ];

    public static function getActive(): ?self
    {
        return static::where('is_active', true)->first();
    }

    /**
     * Get default plans page settings.
     */
    public static function getDefaults(): array
    {
        return [
            'hero_eyebrow' => 'Choose Your Connection',
            'hero_title' => 'Internet Plans Designed for Your',
            'hero_highlight' => 'Digital Life',
            'hero_description' => 'Explore high-speed internet packages built for streaming, gaming, work, entertainment, and everything in between.',
            'background_image' => null,
            'cta_primary_text' => 'Get Started',
            'cta_primary_url' => '#plans-section',
            'cta_secondary_text' => 'Contact Us',
            'cta_secondary_url' => '/contact',
            'section_category_title' => 'Browse by Category',
            'section_category_description' => 'Find the perfect connection type for your home, business, or gaming setup.',
            'section_plans_title' => 'Our Internet Plans',
            'section_plans_description' => 'Transparent pricing. Blazing speeds. Premium entertainment bundled in.',
            'cta_section_enabled' => true,
            'cta_section_title' => 'Ready for a Better Internet Experience?',
            'cta_section_description' => 'Choose the plan that fits your lifestyle and get connected today.',
            'cta_section_primary_text' => 'Get Started',
            'cta_section_primary_url' => '/plans',
            'cta_section_secondary_text' => 'Contact Us',
            'cta_section_secondary_url' => '/contact',
            'cta_section_background_image' => null,
            'currency_symbol' => '$',
            'currency_code' => 'USD',
            'meta_title' => null,
            'meta_description' => null,
            'meta_keywords' => null,
            'is_active' => true,
        ];
    }
}
