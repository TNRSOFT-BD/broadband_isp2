<?php

namespace Database\Seeders;

use App\Models\PlanCategory;
use Illuminate\Database\Seeder;

class PlanCategorySeeder extends Seeder
{
    /**
     * Seed the plan categories.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Home Internet', 'icon' => '🏠', 'description' => 'Reliable fiber connectivity for the whole family.', 'sort_order' => 10],
            ['name' => 'Gaming', 'icon' => '🎮', 'description' => 'Ultra low latency for competitive play.', 'sort_order' => 20],
            ['name' => 'Streaming', 'icon' => '📺', 'description' => 'Buffer-free 4K streaming on every device.', 'sort_order' => 30],
            ['name' => 'Business', 'icon' => '💼', 'description' => 'Dedicated bandwidth with SLA-backed uptime.', 'sort_order' => 40],
            ['name' => 'Premium', 'icon' => '⚡', 'description' => 'Our fastest speeds with VIP support.', 'sort_order' => 50],
        ];

        foreach ($categories as $category) {
            PlanCategory::updateOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($category['name'])],
                $category,
            );
        }
    }
}
