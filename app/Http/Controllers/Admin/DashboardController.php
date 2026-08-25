<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\OfficeLocation;
use App\Models\Plan;
use App\Models\PlanCategory;
use App\Models\Service;
use App\Models\HeroSetting;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard with real-time stats.
     */
    public function index(): Response
    {
        // Plan stats
        $totalPlans = Plan::count();
        $activePlans = Plan::where('is_active', true)->count();
        $featuredPlans = Plan::where('is_featured', true)->count();
        $totalCategories = PlanCategory::count();

        // Service stats
        $totalServices = Service::count();
        $activeServices = Service::where('is_active', true)->count();

        // Contact message stats
        $totalMessages = ContactMessage::count();
        $newMessages = ContactMessage::where('status', 'new')->count();
        $inProgressMessages = ContactMessage::where('status', 'in_progress')->count();
        $resolvedMessages = ContactMessage::where('status', 'resolved')->count();

        // Location stats
        $totalLocations = OfficeLocation::count();
        $activeLocations = OfficeLocation::where('is_active', true)->count();

        // Hero config status
        $heroConfigured = HeroSetting::where('is_active', true)->exists();

        // Site settings
        $siteName = SiteSetting::value('site_name');

        // Recent contact messages (last 5)
        $recentMessages = ContactMessage::with('inquiryType:id,name')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn ($msg) => [
                'id' => $msg->id,
                'name' => $msg->name,
                'email' => $msg->email,
                'subject' => $msg->subject,
                'status' => $msg->status,
                'inquiry_type' => $msg->inquiryType?->name,
                'created_at' => $msg->created_at->diffForHumans(),
            ]);

        // Recent plans (last 5)
        $recentPlans = Plan::with('category:id,name')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn ($plan) => [
                'id' => $plan->id,
                'name' => $plan->name,
                'speed' => $plan->speed . ' ' . $plan->speed_unit,
                'monthly_price' => number_format($plan->monthly_price, 2),
                'is_active' => $plan->is_active,
                'is_featured' => $plan->is_featured,
                'category' => $plan->category?->name,
                'created_at' => $plan->created_at->diffForHumans(),
            ]);

        return Inertia::render('dashboard', [
            'stats' => [
                'plans' => [
                    'total' => $totalPlans,
                    'active' => $activePlans,
                    'featured' => $featuredPlans,
                    'categories' => $totalCategories,
                ],
                'services' => [
                    'total' => $totalServices,
                    'active' => $activeServices,
                ],
                'messages' => [
                    'total' => $totalMessages,
                    'new' => $newMessages,
                    'in_progress' => $inProgressMessages,
                    'resolved' => $resolvedMessages,
                ],
                'locations' => [
                    'total' => $totalLocations,
                    'active' => $activeLocations,
                ],
                'hero_configured' => $heroConfigured,
                'site_name' => $siteName,
            ],
            'recentMessages' => $recentMessages,
            'recentPlans' => $recentPlans,
        ]);
    }
}
