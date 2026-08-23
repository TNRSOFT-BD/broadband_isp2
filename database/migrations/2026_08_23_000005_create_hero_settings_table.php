<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            $table->string('background_image')->nullable();
            $table->string('badge_text', 255)->default('Next Generation Internet');
            $table->string('heading_line1', 255)->default('The Future of');
            $table->string('heading_highlight', 255)->default('Connectivity');
            $table->string('heading_line2', 255)->default('Starts Here');
            $table->string('subtitle', 1000)->nullable();
            $table->string('cta_primary_text', 255)->default('Get Connected');
            $table->string('cta_primary_url', 512)->default('#');
            $table->string('cta_secondary_text', 255)->default('Check Availability');
            $table->string('cta_secondary_url', 512)->default('#');

            // Color settings
            $table->string('badge_color', 7)->default('#2563EB');
            $table->string('heading_color', 7)->default('#ffffff');
            $table->string('highlight_color', 7)->default('#2563EB');
            $table->string('subtitle_color', 7)->default('#cbd5e1');
            $table->string('cta_primary_bg', 7)->default('#2563EB');
            $table->string('cta_primary_text_color', 7)->default('#ffffff');
            $table->string('cta_secondary_border', 7)->default('#ffffff');
            $table->string('cta_secondary_text_color', 7)->default('#ffffff');
            $table->string('feature_card_bg', 7)->default('#ffffff');
            $table->string('feature_card_border', 7)->default('#ffffff');
            $table->string('feature_label_color', 7)->default('#ffffff');
            $table->string('feature_desc_color', 7)->default('#94a3b8');
            $table->string('overlay_color', 7)->default('#0a0e1a');

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};
