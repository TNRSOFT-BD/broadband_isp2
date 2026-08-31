<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('homepage_services', function (Blueprint $table) {
            $table->foreignId('homepage_service_category_id')
                ->nullable()
                ->after('title')
                ->constrained('homepage_service_categories')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('homepage_services', function (Blueprint $table) {
            $table->dropForeign(['homepage_service_category_id']);
            $table->dropColumn('homepage_service_category_id');
        });
    }
};
