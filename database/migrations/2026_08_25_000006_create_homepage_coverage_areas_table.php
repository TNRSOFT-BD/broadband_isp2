<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('homepage_coverage_areas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->nullable(); // division, district, zone, area
            $table->string('status')->default('active'); // active, coming_soon, planned
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('homepage_coverage_areas');
    }
};
