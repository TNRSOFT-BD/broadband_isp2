<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_page_settings', function (Blueprint $table) {
            $table->id();

            // Hero section
            $table->string('hero_eyebrow', 255)->default('ABOUT OUR COMPANY');
            $table->string('hero_title', 255)->default('Connecting People, Businesses & Possibilities');
            $table->text('hero_description')->nullable();
            $table->string('hero_primary_cta_text', 100)->default('Explore Packages');
            $table->string('hero_primary_cta_url', 512)->default('/plans');
            $table->string('hero_secondary_cta_text', 100)->default('Contact Us');
            $table->string('hero_secondary_cta_url', 512)->default('/contact');
            $table->string('hero_image', 512)->nullable();
            $table->string('hero_image_alt', 255)->nullable();

            // Company introduction
            $table->string('company_eyebrow', 255)->default('Who We Are');
            $table->string('company_title', 255)->nullable();
            $table->text('company_content')->nullable();
            $table->string('company_image', 512)->nullable();
            $table->string('company_image_alt', 255)->nullable();

            // Vision & Mission
            $table->string('vision_title', 255)->default('Our Vision');
            $table->text('vision_description')->nullable();
            $table->string('vision_icon', 50)->default('Eye');
            $table->string('mission_title', 255)->default('Our Mission');
            $table->text('mission_description')->nullable();
            $table->string('mission_icon', 50)->default('Target');

            // Network capabilities section
            $table->string('capabilities_eyebrow', 255)->default('Our Capabilities');
            $table->string('capabilities_title', 255)->default('Built for Reliable Connectivity');
            $table->text('capabilities_description')->nullable();
            $table->string('capabilities_image', 512)->nullable();
            $table->string('capabilities_image_alt', 255)->nullable();

            // Clients section
            $table->string('clients_title', 255)->default('Trusted by Homes, Businesses & Organizations');
            $table->text('clients_description')->nullable();

            // Certifications section
            $table->string('certifications_title', 255)->default('Committed to Quality & Security');
            $table->text('certifications_description')->nullable();

            // CTA section
            $table->string('cta_eyebrow', 255)->nullable();
            $table->string('cta_title', 255)->default('Ready for a Better Connection?');
            $table->text('cta_description')->nullable();
            $table->string('cta_primary_button_text', 100)->default('Explore Packages');
            $table->string('cta_primary_button_url', 512)->default('/plans');
            $table->string('cta_secondary_button_text', 100)->default('Contact Us');
            $table->string('cta_secondary_button_url', 512)->default('/contact');
            $table->string('cta_background_image', 512)->nullable();
            $table->string('cta_background_image_alt', 255)->nullable();

            // Section visibility
            $table->boolean('hero_enabled')->default(true);
            $table->boolean('company_enabled')->default(true);
            $table->boolean('statistics_enabled')->default(true);
            $table->boolean('vision_mission_enabled')->default(true);
            $table->boolean('core_values_enabled')->default(true);
            $table->boolean('timeline_enabled')->default(true);
            $table->boolean('capabilities_enabled')->default(true);
            $table->boolean('clients_enabled')->default(true);
            $table->boolean('certifications_enabled')->default(true);
            $table->boolean('why_choose_us_enabled')->default(true);
            $table->boolean('cta_enabled')->default(true);

            // SEO
            $table->string('meta_title', 255)->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords', 500)->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_page_settings');
    }
};
