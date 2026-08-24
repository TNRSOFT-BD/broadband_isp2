<?php

namespace Database\Seeders;

use App\Models\AboutPageSetting;
use App\Models\AboutStatistic;
use App\Models\AboutCoreValue;
use App\Models\AboutMilestone;
use App\Models\AboutCapability;
use App\Models\AboutClient;
use App\Models\AboutCertification;
use App\Models\AboutWhyChooseUs;
use Illuminate\Database\Seeder;

class AboutUsSeeder extends Seeder
{
    public function run(): void
    {
        // Page settings
        AboutPageSetting::updateOrCreate(
            ['id' => 1],
            array_merge(AboutPageSetting::getDefaults(), ['is_active' => true]),
        );

        // Statistics
        $stats = [
            ['label' => 'Years of Experience', 'value' => '15', 'suffix' => '+', 'icon' => 'TrendingUp', 'sort_order' => 1],
            ['label' => 'Happy Customers', 'value' => '10K', 'suffix' => '+', 'icon' => 'Users', 'sort_order' => 2],
            ['label' => 'Network Reliability', 'value' => '99.9', 'suffix' => '%', 'icon' => 'Wifi', 'sort_order' => 3],
            ['label' => 'Customer Support', 'value' => '24/7', 'icon' => 'Headphones', 'sort_order' => 4],
            ['label' => 'Coverage Areas', 'value' => '50', 'suffix' => '+', 'icon' => 'Globe', 'sort_order' => 5],
            ['label' => 'Enterprise Clients', 'value' => '200', 'suffix' => '+', 'icon' => 'Building2', 'sort_order' => 6],
        ];
        foreach ($stats as $stat) {
            AboutStatistic::create($stat);
        }

        // Core Values
        $values = [
            ['icon' => 'Shield', 'title' => 'Reliability', 'description' => 'We build and maintain services our customers can depend on — every day, without compromise.', 'sort_order' => 1],
            ['icon' => 'Heart', 'title' => 'Customer First', 'description' => 'Every decision starts with understanding and improving the customer experience.', 'sort_order' => 2],
            ['icon' => 'Zap', 'title' => 'Innovation', 'description' => 'We continuously explore better technologies and smarter solutions to stay ahead.', 'sort_order' => 3],
            ['icon' => 'BookOpen', 'title' => 'Integrity', 'description' => 'We operate with transparency, responsibility, and accountability in everything we do.', 'sort_order' => 4],
            ['icon' => 'Award', 'title' => 'Excellence', 'description' => 'We focus on quality in our network, services, and customer support — nothing less.', 'sort_order' => 5],
            ['icon' => 'Globe', 'title' => 'Connectivity for Growth', 'description' => 'We believe better connectivity creates more opportunities for people and businesses.', 'sort_order' => 6],
        ];
        foreach ($values as $value) {
            AboutCoreValue::create($value);
        }

        // Milestones
        $milestones = [
            ['year' => '2015', 'title' => 'The Beginning', 'description' => 'The journey begins with a vision to provide reliable internet connectivity to our community.', 'sort_order' => 1],
            ['year' => '2017', 'title' => 'Network Expansion', 'description' => 'Expanded network coverage and introduced high-speed broadband services to new areas.', 'sort_order' => 2],
            ['year' => '2020', 'title' => 'Major Milestone', 'description' => 'Reached a significant milestone in customer growth and expanded our network infrastructure.', 'sort_order' => 3],
            ['year' => '2022', 'title' => 'Enterprise Solutions', 'description' => 'Expanded business and enterprise connectivity solutions to serve organizations of all sizes.', 'sort_order' => 4],
            ['year' => '2024', 'title' => 'Next Generation', 'description' => 'Strengthened infrastructure and introduced next-generation digital services for the future.', 'sort_order' => 5],
            ['year' => 'Today', 'title' => 'Continuing Forward', 'description' => 'Continuing to connect more people, businesses, and possibilities with reliable technology.', 'sort_order' => 6],
        ];
        foreach ($milestones as $milestone) {
            AboutMilestone::create($milestone);
        }

        // Capabilities
        $capabilities = [
            ['icon' => 'Wifi', 'title' => 'High-Speed Fiber Network', 'description' => 'Fiber-to-the-home and business connections delivering speeds up to 1 Gbps.', 'sort_order' => 1],
            ['icon' => 'Server', 'title' => 'Reliable Infrastructure', 'description' => 'Redundant network architecture ensuring maximum uptime and reliability.', 'sort_order' => 2],
            ['icon' => 'Building2', 'title' => 'Enterprise Connectivity', 'description' => 'Dedicated leased lines and managed connectivity for businesses.', 'sort_order' => 3],
            ['icon' => 'Clock', 'title' => '24/7 Network Monitoring', 'description' => 'Round-the-clock monitoring to detect and resolve issues proactively.', 'sort_order' => 4],
            ['icon' => 'Headphones', 'title' => 'Dedicated Support', 'description' => 'Expert technical support available whenever you need assistance.', 'sort_order' => 5],
            ['icon' => 'TrendingUp', 'title' => 'Scalable Solutions', 'description' => 'Flexible plans that grow with your needs, from home to enterprise.', 'sort_order' => 6],
        ];
        foreach ($capabilities as $cap) {
            AboutCapability::create($cap);
        }

        // Clients
        $clients = [
            ['name' => 'Financial Institutions', 'category' => 'Financial', 'sort_order' => 1],
            ['name' => 'Corporate Organizations', 'category' => 'Corporate', 'sort_order' => 2],
            ['name' => 'Educational Institutions', 'category' => 'Education', 'sort_order' => 3],
            ['name' => 'Government Organizations', 'category' => 'Government', 'sort_order' => 4],
            ['name' => 'SMEs', 'category' => 'SME', 'sort_order' => 5],
            ['name' => 'Residential Customers', 'category' => 'Residential', 'sort_order' => 6],
        ];
        foreach ($clients as $client) {
            AboutClient::create($client);
        }

        // Certifications
        $certs = [
            ['icon' => 'Shield', 'title' => 'Quality Policy', 'description' => 'We are committed to maintaining the highest standards of service quality and continuous improvement across all operations.', 'sort_order' => 1],
            ['icon' => 'Lock', 'title' => 'Information Security', 'description' => 'Our systems and processes are designed to protect customer data and ensure the security of our network infrastructure.', 'sort_order' => 2],
            ['icon' => 'CheckCircle2', 'title' => 'Regulatory Compliance', 'description' => 'We operate in full compliance with regulatory body regulations and industry standards.', 'sort_order' => 3],
            ['icon' => 'Award', 'title' => 'Industry Certifications', 'description' => 'Holding industry certification since 2020, demonstrating our commitment to quality.', 'sort_order' => 4],
            ['icon' => 'Globe', 'title' => 'ISP License', 'description' => 'Licensed ISP operator, authorized to provide internet and connectivity services.', 'sort_order' => 5],
        ];
        foreach ($certs as $cert) {
            AboutCertification::create($cert);
        }

        // Why Choose Us
        $whyChooseUs = [
            ['icon' => 'Shield', 'title' => 'Reliable & Stable Connectivity', 'description' => 'Consistent performance you can count on, day after day.', 'sort_order' => 1],
            ['icon' => 'Headphones', 'title' => 'Fast & Responsive Support', 'description' => 'Expert help available 24/7 to resolve any issue quickly.', 'sort_order' => 2],
            ['icon' => 'Server', 'title' => 'Modern Network Infrastructure', 'description' => 'Built with the latest fiber technology for maximum speed and reliability.', 'sort_order' => 3],
            ['icon' => 'Users', 'title' => 'Flexible Plans for Every Need', 'description' => 'From basic home broadband to enterprise-grade solutions.', 'sort_order' => 4],
            ['icon' => 'Home', 'title' => 'Solutions for Home & Business', 'description' => 'Tailored connectivity solutions for residential and commercial use.', 'sort_order' => 5],
            ['icon' => 'TrendingUp', 'title' => 'Continuous Improvement', 'description' => 'We constantly upgrade our network to deliver better performance.', 'sort_order' => 6],
        ];
        foreach ($whyChooseUs as $item) {
            AboutWhyChooseUs::create($item);
        }
    }
}
