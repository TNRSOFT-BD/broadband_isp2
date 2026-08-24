<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_page_settings', function (Blueprint $table) {
            $table->json('office_hours_entries')->nullable()->after('hours_description');
            $table->json('helpful_resources')->nullable()->after('resources_description');
            $table->json('faq_items')->nullable()->after('faq_description');
        });
    }

    public function down(): void
    {
        Schema::table('contact_page_settings', function (Blueprint $table) {
            $table->dropColumn(['office_hours_entries', 'helpful_resources', 'faq_items']);
        });
    }
};
