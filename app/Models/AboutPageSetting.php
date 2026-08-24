<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutPageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_eyebrow', 'hero_title', 'hero_description',
        'hero_primary_cta_text', 'hero_primary_cta_url',
        'hero_secondary_cta_text', 'hero_secondary_cta_url',
        'hero_image', 'hero_image_alt',
        'company_eyebrow', 'company_title', 'company_content',
        'company_image', 'company_image_alt',
        'vision_title', 'vision_description', 'vision_icon',
        'mission_title', 'mission_description', 'mission_icon',
        'capabilities_eyebrow', 'capabilities_title', 'capabilities_description',
        'capabilities_image', 'capabilities_image_alt',
        'clients_title', 'clients_description',
        'certifications_title', 'certifications_description',
        'cta_eyebrow', 'cta_title', 'cta_description',
        'cta_primary_button_text', 'cta_primary_button_url',
        'cta_secondary_button_text', 'cta_secondary_button_url',
        'cta_background_image', 'cta_background_image_alt',
        'hero_enabled', 'company_enabled', 'statistics_enabled',
        'vision_mission_enabled', 'core_values_enabled', 'timeline_enabled',
        'capabilities_enabled', 'clients_enabled', 'certifications_enabled',
        'why_choose_us_enabled', 'cta_enabled',
        'meta_title', 'meta_description', 'meta_keywords',
        'is_active',
    ];

    protected $casts = [
        'hero_enabled' => 'boolean',
        'company_enabled' => 'boolean',
        'statistics_enabled' => 'boolean',
        'vision_mission_enabled' => 'boolean',
        'core_values_enabled' => 'boolean',
        'timeline_enabled' => 'boolean',
        'capabilities_enabled' => 'boolean',
        'clients_enabled' => 'boolean',
        'certifications_enabled' => 'boolean',
        'why_choose_us_enabled' => 'boolean',
        'cta_enabled' => 'boolean',
        'is_active' => 'boolean',
    ];

    public static function getActive(): ?self
    {
        return static::where('is_active', true)->first();
    }

    public static function getDefaults(): array
    {
        return [
            'hero_eyebrow' => 'ABOUT OUR COMPANY',
            'hero_title' => 'Connecting People, Businesses & Possibilities',
            'hero_description' => 'We are committed to delivering reliable, high-performance internet and digital connectivity solutions that empower people, businesses, and communities to stay connected and move forward.',
            'hero_primary_cta_text' => 'Explore Packages',
            'hero_primary_cta_url' => '/plans',
            'hero_secondary_cta_text' => 'Contact Us',
            'hero_secondary_cta_url' => '/contact',
            'hero_image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
            'hero_image_alt' => 'Network infrastructure',
            'company_eyebrow' => 'Who We Are',
            'company_title' => null,
            'company_content' => "We are a trusted internet service provider and technology company dedicated to delivering high-speed, reliable connectivity to homes, businesses, and organizations. Since our founding, we have built a reputation for quality service, technical excellence, and customer-first values.\n\nOur network infrastructure spans across the region, serving thousands of customers with fiber broadband, business connectivity, and digital solutions designed for the modern world. We combine cutting-edge technology with responsive support to ensure our customers always stay connected.\n\nFrom residential broadband to enterprise-grade connectivity, we provide scalable solutions tailored to the unique needs of every customer. Our team of experienced engineers and support professionals work around the clock to maintain network reliability and deliver exceptional service.",
            'company_image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
            'company_image_alt' => 'Network infrastructure',
            'vision_title' => 'Our Vision',
            'vision_description' => 'To become a trusted leader in digital connectivity by making reliable technology and seamless communication accessible to everyone — empowering communities, businesses, and individuals to thrive in a connected world.',
            'vision_icon' => 'Eye',
            'mission_title' => 'Our Mission',
            'mission_description' => 'To deliver dependable, high-quality connectivity and digital solutions that empower people and organizations to achieve more — through continuous innovation, unwavering reliability, and a deep commitment to customer satisfaction.',
            'mission_icon' => 'Target',
            'capabilities_eyebrow' => 'Our Capabilities',
            'capabilities_title' => 'Built for Reliable Connectivity',
            'capabilities_description' => 'Our network infrastructure is designed from the ground up to deliver consistent, high-performance connectivity. We invest in the latest technology to ensure our customers always have access to fast, reliable internet.',
            'capabilities_image' => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
            'capabilities_image_alt' => 'Network infrastructure',
            'clients_title' => 'Trusted by Homes, Businesses & Organizations',
            'clients_description' => 'We serve a diverse range of customers, from individual households to large enterprises and government institutions, providing tailored connectivity solutions for every need.',
            'certifications_title' => 'Committed to Quality & Security',
            'certifications_description' => 'We are committed to maintaining reliable services, protecting information, and continuously improving our technology and operational standards.',
            'cta_eyebrow' => null,
            'cta_title' => 'Ready for a Better Connection?',
            'cta_description' => 'Explore our internet packages or get in touch with our team to find the perfect solution for your home or business.',
            'cta_primary_button_text' => 'Explore Packages',
            'cta_primary_button_url' => '/plans',
            'cta_secondary_button_text' => 'Contact Us',
            'cta_secondary_button_url' => '/contact',
            'cta_background_image' => null,
            'cta_background_image_alt' => null,
            'hero_enabled' => true,
            'company_enabled' => true,
            'statistics_enabled' => true,
            'vision_mission_enabled' => true,
            'core_values_enabled' => true,
            'timeline_enabled' => true,
            'capabilities_enabled' => true,
            'clients_enabled' => true,
            'certifications_enabled' => true,
            'why_choose_us_enabled' => true,
            'cta_enabled' => true,
            'meta_title' => 'About Us',
            'meta_description' => 'Learn about our company — connecting people, businesses, and possibilities with reliable, high-performance internet connectivity.',
            'meta_keywords' => null,
            'is_active' => true,
        ];
    }
}
