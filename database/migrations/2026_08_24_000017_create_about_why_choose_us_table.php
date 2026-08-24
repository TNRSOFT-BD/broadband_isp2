<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_why_choose_us', function (Blueprint $table) {
            $table->id();
            $table->string('icon', 50)->default('Shield');
            $table->string('title', 100);
            $table->text('description');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_why_choose_us');
    }
};
