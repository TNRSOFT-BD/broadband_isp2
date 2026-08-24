<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_certifications', function (Blueprint $table) {
            $table->id();
            $table->string('icon', 50)->default('Shield');
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('certificate_number', 255)->nullable();
            $table->string('issuing_organization', 255)->nullable();
            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('certificate_image', 512)->nullable();
            $table->string('verification_url', 512)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_certifications');
    }
};
