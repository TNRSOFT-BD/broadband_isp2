<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_page_settings', function (Blueprint $table) {
            $table->id();

            // Hero section
            $table->string('hero_eyebrow', 255)->default('Get in Touch');
            $table->string('hero_title', 255)->default('We\'re Here to Keep You Connected');
            $table->string('hero_highlight', 255)->nullable();
            $table->text('hero_description')->nullable();
            $table->string('hero_background_image', 512)->nullable();
            $table->string('hero_cta_primary_text', 100)->default('Send Message');
            $table->string('hero_cta_primary_url', 512)->default('#contact-form');
            $table->string('hero_cta_secondary_text', 100)->default('Call Us');
            $table->string('hero_cta_secondary_url', 512)->nullable();

            // Quick Contact section
            $table->boolean('quick_contact_enabled')->default(true);
            $table->string('quick_contact_title', 255)->default('Quick Contact');
            $table->text('quick_contact_description')->nullable();

            // Contact Form section
            $table->boolean('contact_form_enabled')->default(true);
            $table->string('contact_form_title', 255)->default('Send Us a Message');
            $table->text('contact_form_description')->nullable();
            $table->string('contact_form_success_message', 1000)->default('Thank you! Your message has been received. We will get back to you shortly.');

            // Office Locations section
            $table->boolean('locations_enabled')->default(true);
            $table->string('locations_title', 255)->default('Our Offices');
            $table->text('locations_description')->nullable();

            // Office Hours section
            $table->boolean('hours_enabled')->default(true);
            $table->string('hours_title', 255)->default('Support Availability');
            $table->text('hours_description')->nullable();

            // Helpful Resources section
            $table->boolean('resources_enabled')->default(true);
            $table->string('resources_title', 255)->default('Helpful Resources');
            $table->text('resources_description')->nullable();

            // FAQ section
            $table->boolean('faq_enabled')->default(true);
            $table->string('faq_title', 255)->default('Frequently Asked Questions');
            $table->text('faq_description')->nullable();
            $table->json('faq_selected_ids')->nullable(); // selected FAQ IDs to show

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
        Schema::dropIfExists('contact_page_settings');
    }
};
