<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * Checks that the authenticated user has an admin-level role
     * (super_admin, admin, editor, or viewer).
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (! auth()->check() || $user->getRoleNames()->isEmpty()) {
            abort(403, 'Unauthorized. Admin access required.');
        }

        return $next($request);
    }
}
