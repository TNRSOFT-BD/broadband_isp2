<?php

namespace Database\Seeders;

use App\Models\Font;
use App\Models\HeroSetting;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Seed default theme
        Theme::create([
            'name' => 'Default Theme',
            'is_active' => true,
            'colors' => [
                'primary' => '#2563EB',
                'primary_dark' => '#1E40AF',
                'secondary' => '#0891B2',
                'accent' => '#06B6D4',
                'success' => '#10B981',
                'warning' => '#F59E0B',
                'error' => '#EF4444',
            ],
        ]);

        // Seed default font
        Font::create([
            'name' => 'Inter',
            'family' => 'Inter',
            'url' => 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            'weight' => '400,500,600,700',
            'css_family' => 'Inter',
            'is_active' => true,
            'font_style' => 'regular',
        ]);

        // Seed default hero settings
        HeroSetting::create(array_merge(HeroSetting::getDefaults(), [
            'is_active' => true,
        ]));

        // Seed plans page content
        $this->call([
            PlansPageSettingsSeeder::class,
            PlanCategorySeeder::class,
            ServiceSeeder::class,
            PlanSeeder::class,
            AboutUsSeeder::class,
        ]);
    }
}
