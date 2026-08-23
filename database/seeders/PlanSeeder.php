<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\PlanCategory;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PlanSeeder extends Seeder
{
    /**
     * Seed sample plans with features and bundled services.
     *
     * @return void
     */
    public function run(): void
    {
        $categories = PlanCategory::query()->pluck('id', 'slug');
        $services = Service::query()->pluck('id', 'slug');

        $plans = [
            [
                'category' => 'home-internet',
                'name' => 'Starter Fiber',
                'tagline' => 'Perfect for everyday browsing',
                'description' => 'A dependable entry-level fiber connection for small households. Stream, browse and video-call without interruptions.',
                'speed' => '25', 'speed_unit' => 'Mbps', 'download_speed' => '25', 'upload_speed' => '12',
                'monthly_price' => 800, 'quarterly_price' => 2200, 'yearly_price' => 8200, 'setup_fee' => 1000,
                'vat_information' => 'All prices include VAT.',
                'contract_duration' => 'No lock-in',
                'fair_usage_policy' => null,
                'terms_conditions' => 'Prices may change with regulatory adjustments. Router provided on refundable deposit.',
                'badge_text' => null, 'is_featured' => false, 'is_recommended' => false, 'is_active' => true, 'sort_order' => 10,
                'features' => [
                    ['title' => 'Unlimited Data', 'icon' => 'infinity', 'description' => 'No data caps or throttling'],
                    ['title' => 'Free Installation', 'icon' => 'wrench', 'description' => 'On orders above 3 months'],
                    ['title' => '24/7 Support', 'icon' => 'headset', 'description' => 'Round-the-clock helpline'],
                ],
                'services' => ['toffee' => ['duration' => '3 months free']],
            ],
            [
                'category' => 'streaming',
                'name' => 'Stream Boost',
                'tagline' => 'Built for binge-watchers',
                'description' => 'Optimized bandwidth for 4K streaming across multiple devices, with premium OTT services included.',
                'speed' => '50', 'speed_unit' => 'Mbps', 'download_speed' => '50', 'upload_speed' => '25',
                'monthly_price' => 1200, 'quarterly_price' => 3300, 'yearly_price' => 12500, 'setup_fee' => 500,
                'vat_information' => 'All prices include VAT.',
                'contract_duration' => 'No lock-in',
                'fair_usage_policy' => 'Fair usage applies after 1TB/month.',
                'terms_conditions' => 'OTT subscriptions are valid for the duration of the active billing cycle.',
                'badge_text' => 'Best for Streaming', 'is_featured' => false, 'is_recommended' => true, 'is_active' => true, 'sort_order' => 20,
                'features' => [
                    ['title' => '4K Ready', 'icon' => 'tv', 'description' => 'Stream on up to 5 devices'],
                    ['title' => 'Netflix Included', 'icon' => 'play', 'description' => '6 months complimentary access'],
                    ['title' => 'Priority Streaming', 'icon' => 'zap', 'description' => 'QoS optimized for video traffic'],
                    ['title' => 'Dual-band Router', 'icon' => 'wifi', 'description' => 'WiFi 6 router included'],
                ],
                'services' => [
                    'netflix' => ['duration' => '6 months free'],
                    'chorki' => ['duration' => '12 months free'],
                    'hoichoi' => ['duration' => '6 months free'],
                ],
            ],
            [
                'category' => 'gaming',
                'name' => 'Gamer Pro',
                'tagline' => 'Dominate every match',
                'description' => 'Ultra-low latency routing engineered for competitive gaming. Ping under 10ms to regional game servers.',
                'speed' => '100', 'speed_unit' => 'Mbps', 'download_speed' => '100', 'upload_speed' => '100',
                'monthly_price' => 1800, 'quarterly_price' => 5000, 'yearly_price' => 18500, 'setup_fee' => 0,
                'vat_information' => 'All prices include VAT.',
                'contract_duration' => 'No lock-in',
                'fair_usage_policy' => 'Unlimited; sustained-usage policy applies.',
                'terms_conditions' => 'Latency guarantees apply to supported regional routes only.',
                'badge_text' => 'Lowest Latency', 'is_featured' => true, 'is_recommended' => false, 'is_active' => true, 'sort_order' => 30,
                'features' => [
                    ['title' => '<10ms Ping', 'icon' => 'gauge', 'description' => 'Direct game-server peering'],
                    ['title' => 'Symmetric Speeds', 'icon' => 'upload', 'description' => 'Equal upload and download'],
                    ['title' => 'DDoS Protection', 'icon' => 'shield', 'description' => 'Enterprise-grade firewall'],
                    ['title' => 'Static IP Option', 'icon' => 'map-pin', 'description' => 'Available on request'],
                    ['title' => 'VIP Support', 'icon' => 'headset', 'description' => 'Priority gamer hotline'],
                ],
                'services' => [
                    'youtube-premium' => ['duration' => '3 months free'],
                    'iptv-bundle' => [],
                ],
            ],
            [
                'category' => 'business',
                'name' => 'Business Suite',
                'tagline' => 'Keep your business always-on',
                'description' => 'Dedicated symmetric bandwidth with SLA-backed uptime, static IP and next-business-day support visits.',
                'speed' => '200', 'speed_unit' => 'Mbps', 'download_speed' => '200', 'upload_speed' => '200',
                'monthly_price' => 4500, 'quarterly_price' => 12800, 'yearly_price' => 48000, 'setup_fee' => 0,
                'vat_information' => 'VAT withheld at source as per NBR rules.',
                'contract_duration' => '12 months recommended',
                'fair_usage_policy' => null,
                'terms_conditions' => 'SLA covers 99.5% monthly uptime with service credits for breaches.',
                'badge_text' => 'SLA Backed', 'is_featured' => false, 'is_recommended' => false, 'is_active' => true, 'sort_order' => 40,
                'features' => [
                    ['title' => '99.5% Uptime SLA', 'icon' => 'activity', 'description' => 'Service credits if missed'],
                    ['title' => '/29 Static IP Block', 'icon' => 'network', 'description' => 'Host your own services'],
                    ['title' => 'NBD On-site Support', 'icon' => 'truck', 'description' => 'Next-business-day visits'],
                    ['title' => 'Cloud Storage 1TB', 'icon' => 'cloud', 'description' => 'Secure offsite backup'],
                ],
                'services' => [
                    'cloud-storage' => ['custom_label' => '1TB Business Vault'],
                    'iptv-bundle' => [],
                ],
            ],
            [
                'category' => 'premium',
                'name' => 'Hyper Max',
                'tagline' => 'The fastest we offer',
                'description' => 'Gigabit-class fiber with everything unlocked: every OTT bundle, VIP support and concierge installation.',
                'speed' => '1', 'speed_unit' => 'Gbps', 'download_speed' => '1024', 'upload_speed' => '1024',
                'monthly_price' => 9000, 'quarterly_price' => 25500, 'yearly_price' => 96000, 'setup_fee' => 0,
                'vat_information' => 'All prices include VAT.',
                'contract_duration' => 'No lock-in',
                'fair_usage_policy' => null,
                'terms_conditions' => 'Device-dependent speeds; wired connection required for full throughput.',
                'badge_text' => 'Most Popular', 'is_featured' => true, 'is_recommended' => false, 'is_active' => true, 'sort_order' => 50,
                'features' => [
                    ['title' => '1 Gbps Symmetric', 'icon' => 'rocket', 'description' => 'Fiber to the home'],
                    ['title' => 'Every OTT Included', 'icon' => 'gift', 'description' => 'Full entertainment bundle'],
                    ['title' => 'Concierge Install', 'icon' => 'star', 'description' => 'Same-day white-glove setup'],
                    ['title' => 'WiFi 7 Mesh', 'icon' => 'wifi', 'description' => 'Whole-home coverage'],
                    ['title' => 'Dedicated Manager', 'icon' => 'user-check', 'description' => 'Personal account manager'],
                ],
                'services' => [
                    'netflix' => ['custom_label' => 'Premium 4K screens'],
                    'chorki' => [], 'bongo' => [], 'hoichoi' => [], 'toffee' => [],
                    'youtube-premium' => [], 'cloud-storage' => [], 'iptv-bundle' => [],
                ],
            ],
            [
                'category' => 'home-internet',
                'name' => 'Family Value',
                'tagline' => 'Smart choice for families',
                'description' => 'Balanced speed and price for households with multiple simultaneous users and smart-home devices.',
                'speed' => '75', 'speed_unit' => 'Mbps', 'download_speed' => '75', 'upload_speed' => '35',
                'monthly_price' => 1500, 'quarterly_price' => 4200, 'yearly_price' => 15800, 'setup_fee' => 500,
                'vat_information' => 'All prices include VAT.',
                'contract_duration' => 'Quarterly billing saves 7%',
                'fair_usage_policy' => 'Fair usage applies after 2TB/month.',
                'terms_conditions' => 'Standard terms apply.',
                'badge_text' => null, 'is_featured' => false, 'is_recommended' => false, 'is_active' => true, 'sort_order' => 15,
                'features' => [
                    ['title' => 'Unlimited Data', 'icon' => 'infinity', 'description' => 'No data caps'],
                    ['title' => 'Parental Controls', 'icon' => 'shield', 'description' => 'Per-device scheduling'],
                    ['title' => 'Mesh WiFi Ready', 'icon' => 'wifi', 'description' => 'Add extenders anytime'],
                    ['title' => 'Free Router', 'icon' => 'router', 'description' => 'AC1200 dual-band'],
                ],
                'services' => [
                    'bongo' => ['duration' => '6 months free'],
                    'toffee' => [],
                ],
            ],
        ];

        foreach ($plans as $planData) {
            $features = $planData['features'];
            $servicePivot = $planData['services'];
            $categoryId = $categories[$planData['category']] ?? null;

            unset($planData['features'], $planData['services'], $planData['category']);

            $plan = Plan::updateOrCreate(
                ['slug' => Str::slug($planData['name'])],
                [...$planData, 'plan_category_id' => $categoryId],
            );

            // Features: replace-all keeps sort order deterministic.
            $plan->features()->delete();
            foreach ($features as $index => $feature) {
                $plan->features()->create([...$feature, 'sort_order' => $index]);
            }

            $sync = [];
            foreach ($servicePivot as $serviceSlug => $pivotData) {
                if (! isset($services[$serviceSlug])) {
                    continue;
                }
                $sync[$services[$serviceSlug]] = [
                    'custom_label' => $pivotData['custom_label'] ?? null,
                    'custom_note' => $pivotData['custom_note'] ?? null,
                    'duration' => $pivotData['duration'] ?? null,
                    'is_included' => true,
                    'is_featured' => in_array($serviceSlug, ['netflix']),
                    'sort_order' => count($sync),
                ];
            }
            $plan->services()->sync($sync);
        }
    }
}
