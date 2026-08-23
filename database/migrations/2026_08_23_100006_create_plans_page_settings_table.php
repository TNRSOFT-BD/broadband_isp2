<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans_page_settings', function (Blueprint $table) {
            $table->id();

            // Hero section
            $table->string('hero_eyebrow', 255)->default('Choose Your Connection');
            $table->string('hero_title', 255)->default('Internet Plans Designed for Your');
            $table->string('hero_highlight', 255)->default('Digital Life');
            $table->string('hero_description', 1000)->nullable();
            $table->string('background_image', 512)->nullable();
            $table->string('cta_primary_text', 100)->default('Get Started');
            $table->string('cta_primary_url', 512)->default('#plans-section');
            $table->string('cta_secondary_text', 100)->default('Contact Us');
            $table->string('cta_secondary_url', 512)->default('/contact');

            // Category section
            $table->string('section_category_title', 255)->nullable();
            $table->string('section_category_description', 500)->nullable();

            // Plans section
            $table->string('section_plans_title', 255)->nullable();
            $table->string('section_plans_description', 500)->nullable();

            // CTA section
            $table->boolean('cta_section_enabled')->default(true);
            $table->string('cta_section_title', 255)->default('Ready for a Better Internet Experience?');
            $table->string('cta_section_description', 500)->nullable();
            $table->string('cta_section_primary_text', 100)->default('Get Started');
            $table->string('cta_section_primary_url', 512)->default('#');
            $table->string('cta_section_secondary_text', 100)->default('Contact Us');
            $table->string('cta_section_secondary_url', 512)->default('#');
            $table->string('cta_section_background_image', 512)->nullable();

            // Currency
            $table->string('currency_symbol', 10)->default('$');
            $table->string('currency_code', 10)->default('USD');

            // SEO
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_description', 500)->nullable();
            $table->string('meta_keywords', 500)->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans_page_settings');
    }
};
