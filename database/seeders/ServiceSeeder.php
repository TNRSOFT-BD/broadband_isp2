<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Seed the OTT/digital services.
     */
    public function run(): void
    {
        $services = [
            ['name' => 'Netflix', 'category' => 'ott', 'description' => 'Unlimited movies, TV shows and more.', 'website_url' => 'https://netflix.com'],
            ['name' => 'Chorki', 'category' => 'ott', 'description' => 'Premium Bengali films and originals.', 'website_url' => 'https://chorki.com'],
            ['name' => 'Bongo', 'category' => 'entertainment', 'description' => 'Bengali entertainment on demand.', 'website_url' => 'https://bongobd.com'],
            ['name' => 'Hoichoi', 'category' => 'streaming', 'description' => 'Bengali web series and movies.', 'website_url' => 'https://hoichoi.tv'],
            ['name' => 'Toffee', 'category' => 'streaming', 'description' => 'Live TV, sports and dramas.', 'website_url' => 'https://toffee.com.bd'],
            ['name' => 'YouTube Premium', 'category' => 'entertainment', 'description' => 'Ad-free videos plus YouTube Music.', 'website_url' => 'https://youtube.com/premium'],
            ['name' => 'Cloud Storage', 'category' => 'cloud_storage', 'description' => 'Secure cloud backup storage.', 'website_url' => null],
            ['name' => 'IPTV Bundle', 'category' => 'iptv', 'description' => '200+ live HD channels.', 'website_url' => null],
        ];

        foreach ($services as $index => $service) {
            Service::updateOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($service['name'])],
                [
                    ...$service,
                    'logo' => null,
                    'is_active' => true,
                    'sort_order' => ($index + 1) * 10,
                ],
            );
        }
    }
}
