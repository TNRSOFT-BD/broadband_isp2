<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('intro_features', function (Blueprint $table) {
            $table->id();
            $table->string('label');           // e.g. "Fiber"
            $table->string('sub_label')->nullable(); // e.g. "Optic"
            $table->string('icon')->nullable(); // Lucide icon name
            $table->string('color')->nullable(); // hex color override, null = use accent
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('intro_features');
    }
};
