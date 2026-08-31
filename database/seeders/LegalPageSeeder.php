<?php

namespace Database\Seeders;

use App\Models\LegalPage;
use Illuminate\Database\Seeder;

class LegalPageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Terms & Conditions',
                'slug' => 'terms-and-conditions',
                'page_type' => 'terms',
                'short_description' => 'Please read these terms and conditions carefully before using our services.',
                'content_json' => null,
                'content_html' => null,
                'status' => 'published',
                'published_at' => now(),
                'show_last_updated' => true,
                'meta_title' => 'Terms & Conditions',
                'meta_description' => 'Read the terms and conditions governing the use of our internet services.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'page_type' => 'privacy',
                'short_description' => 'Learn how we collect, use, and protect your personal information.',
                'content_json' => null,
                'content_html' => null,
                'status' => 'published',
                'published_at' => now(),
                'show_last_updated' => true,
                'meta_title' => 'Privacy Policy',
                'meta_description' => 'Understand how we collect, use, and safeguard your personal data.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Refund Policy',
                'slug' => 'refund-policy',
                'page_type' => 'refund',
                'short_description' => 'Understand our refund and cancellation policies.',
                'content_json' => null,
                'content_html' => null,
                'status' => 'published',
                'published_at' => now(),
                'show_last_updated' => true,
                'meta_title' => 'Refund Policy',
                'meta_description' => 'Learn about our refund and cancellation procedures.',
                'sort_order' => 3,
            ],
        ];

        foreach ($pages as $pageData) {
            LegalPage::updateOrCreate(
                ['slug' => $pageData['slug']],
                $pageData
            );
        }
    }
}
