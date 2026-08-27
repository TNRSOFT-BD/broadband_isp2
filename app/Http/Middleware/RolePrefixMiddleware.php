<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RolePrefixMiddleware
{
    /**
     * If a user with a non-admin role hits /admin/*, redirect to their prefix.
     * Admin/super_admin users stay on /admin/*.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (! $user) {
            return $next($request);
        }

        $primaryRole = $user->roles->first();
        $prefix = $primaryRole?->prefix;

        // Admin/super_admin stay on /admin/*
        if (! $prefix || $prefix === 'admin') {
            return $next($request);
        }

        $uri = $request->path();

        // If hitting /admin/* and user has a different prefix, redirect
        if (str_starts_with($uri, 'admin/')) {
            $rest = substr($uri, 6); // Remove 'admin/' (6 chars)
            $redirectUrl = '/' . $prefix . '/' . $rest;

            return redirect()->to($redirectUrl, 302, ['Cache-Control' => 'no-cache']);
        }

        return $next($request);
    }
}
