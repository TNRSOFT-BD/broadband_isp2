<?php

namespace Database\Seeders;

use App\Models\PlansPageSetting;
use Illuminate\Database\Seeder;

class PlansPageSettingsSeeder extends Seeder
{
    /**
     * Seed the plans page CMS settings.
     */
    public function run(): void
    {
        PlansPageSetting::updateOrCreate(
            ['id' => 1],
            array_merge(PlansPageSetting::getDefaults(), ['is_active' => true]),
        );
    }
}
