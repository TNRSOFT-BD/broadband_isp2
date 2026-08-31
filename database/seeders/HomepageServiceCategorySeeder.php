<?php

namespace Database\Seeders;

use App\Models\HomepageServiceCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HomepageServiceCategorySeeder extends Seeder
{
    /**
     * Seed the homepage service categories.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'FTP', 'icon' => '📁', 'description' => 'File Transfer Protocol services', 'sort_order' => 10],
            ['name' => 'Live TV', 'icon' => '📺', 'description' => 'Live television streaming services', 'sort_order' => 20],
        ];

        foreach ($categories as $category) {
            HomepageServiceCategory::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                $category,
            );
        }

        // Set existing services (without a category) to FTP
        $ftpCategoryId = HomepageServiceCategory::where('slug', 'ftp')->first()?->id;

        if ($ftpCategoryId) {
            \App\Models\HomepageServiceItem::query()
                ->whereNull('homepage_service_category_id')
                ->update(['homepage_service_category_id' => $ftpCategoryId]);
        }
    }
}
