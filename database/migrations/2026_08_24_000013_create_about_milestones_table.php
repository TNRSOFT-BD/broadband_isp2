<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_milestones', function (Blueprint $table) {
            $table->id();
            $table->string('year', 50);
            $table->string('title', 255);
            $table->text('description');
            $table->string('image', 512)->nullable();
            $table->string('image_alt', 255)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_milestones');
    }
};
