<?php

namespace App\Support;

use Illuminate\Support\Facades\Auth;

class RoleUrl
{
    /**
     * Rewrite a URL to use the current user's role prefix.
     *
     * Example: RoleUrl::to('/admin/dashboard') → '/staff/dashboard' (for staff role)
     *          RoleUrl::to('/admin/dashboard') → '/admin/dashboard' (for admin role)
     */
    public static function to(string $url): string
    {
        $user = Auth::user();

        if (! $user) {
            return $url;
        }

        $primaryRole = $user->roles->first();
        $prefix = $primaryRole?->prefix ?? 'admin';

        // If prefix is admin, no rewrite needed
        if ($prefix === 'admin') {
            return $url;
        }

        // Replace /admin/ with the role prefix
        if (str_starts_with($url, '/admin/')) {
            return '/' . $prefix . substr($url, 6); // 6 = strlen('/admin')
        }

        if ($url === '/admin') {
            return '/' . $prefix;
        }

        return $url;
    }

    /**
     * Get the current user's admin prefix.
     */
    public static function getPrefix(): string
    {
        $user = Auth::user();

        if (! $user) {
            return 'admin';
        }

        $primaryRole = $user->roles->first();

        return $primaryRole?->prefix ?? 'admin';
    }
}
