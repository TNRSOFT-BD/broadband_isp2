<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * Checks if the authenticated user has the specified permission.
     * Usage: ->middleware('permission:edit-plans')
     */
    public function handle(Request $request, Closure $next, string ...$permissions): Response
    {
        if (! auth()->check()) {
            abort(401);
        }

        $user = auth()->user();

        // Super admin bypasses all permission checks
        if ($user->hasRole('super_admin')) {
            return $next($request);
        }

        foreach ($permissions as $permission) {
            if (! $user->hasPermissionTo($permission)) {
                abort(403, 'Unauthorized. Required permission: ' . $permission);
            }
        }

        return $next($request);
    }
}
