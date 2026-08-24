<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quick_contact_methods', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->default('Phone');
            $table->string('label');
            $table->string('value');
            $table->string('description')->nullable();
            $table->string('href')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quick_contact_methods');
    }
};
