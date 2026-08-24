<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('label', 100);
            $table->string('value', 50);
            $table->string('prefix', 10)->nullable();
            $table->string('suffix', 10)->nullable();
            $table->text('description')->nullable();
            $table->string('icon', 50)->default('TrendingUp');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_statistics');
    }
};
