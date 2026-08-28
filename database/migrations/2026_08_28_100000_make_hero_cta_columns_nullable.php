<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_settings', function (Blueprint $table) {
            $table->string('cta_primary_text', 255)->nullable()->change();
            $table->string('cta_primary_url', 512)->nullable()->change();
            $table->string('cta_secondary_text', 255)->nullable()->change();
            $table->string('cta_secondary_url', 512)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('hero_settings', function (Blueprint $table) {
            $table->string('cta_primary_text', 255)->default('Get Connected')->nullable(false)->change();
            $table->string('cta_primary_url', 512)->default('#')->nullable(false)->change();
            $table->string('cta_secondary_text', 255)->default('Check Availability')->nullable(false)->change();
            $table->string('cta_secondary_url', 512)->default('#')->nullable(false)->change();
        });
    }
};
