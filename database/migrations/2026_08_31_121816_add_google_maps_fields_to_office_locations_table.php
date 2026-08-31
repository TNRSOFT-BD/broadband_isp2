<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('office_locations', function (Blueprint $table) {
            $table->string('google_maps_url', 1024)->nullable()->after('email');
            $table->string('location_query', 500)->nullable()->after('google_maps_url');
        });
    }

    public function down(): void
    {
        Schema::table('office_locations', function (Blueprint $table) {
            $table->dropColumn(['google_maps_url', 'location_query']);
        });
    }
};
