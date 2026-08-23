<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('tagline', 255)->nullable();
            $table->text('description')->nullable();

            // Speed
            $table->string('speed', 20);
            $table->string('speed_unit', 10)->default('Mbps');
            $table->string('download_speed', 20)->nullable();
            $table->string('upload_speed', 20)->nullable();

            // Pricing
            $table->decimal('monthly_price', 10, 2);
            $table->decimal('quarterly_price', 10, 2)->nullable();
            $table->decimal('yearly_price', 10, 2)->nullable();
            $table->decimal('setup_fee', 10, 2)->default(0);
            $table->string('vat_information', 255)->nullable();

            // Terms & policies
            $table->string('contract_duration', 100)->nullable();
            $table->text('fair_usage_policy')->nullable();
            $table->text('terms_conditions')->nullable();

            // Status & presentation
            $table->string('badge_text', 50)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_recommended')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);

            // CTA overrides
            $table->string('cta_text', 100)->nullable();
            $table->string('cta_url', 512)->nullable();

            $table->timestamps();

            $table->index(['plan_category_id', 'is_active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
