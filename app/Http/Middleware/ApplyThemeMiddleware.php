<?php

namespace App\Http\Middleware;

use App\Services\ThemeService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApplyThemeMiddleware
{
    public function __construct(
        private ThemeService $themeService,
    ) {}

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Skip for Inertia JSON requests (only inject on full HTML page loads)
        if ($request->header('X-Inertia')) {
            return $response;
        }

        $colors = $this->themeService->getActiveThemeColors();

        $content = $response->getContent();
        if ($content === null || strpos($content, '</head>') === false) {
            return $response;
        }

        $css = ':root {'.PHP_EOL;
        $css .= '  --isp-primary: '.($colors['primary'] ?? '#2563EB').';'.PHP_EOL;
        $css .= '  --isp-primary-dark: '.($colors['primary_dark'] ?? '#1E40AF').';'.PHP_EOL;
        $css .= '  --isp-secondary: '.($colors['secondary'] ?? '#0891B2').';'.PHP_EOL;
        $css .= '  --isp-accent: '.($colors['accent'] ?? '#06B6D4').';'.PHP_EOL;
        $css .= '  --isp-success: '.($colors['success'] ?? '#10B981').';'.PHP_EOL;
        $css .= '  --isp-warning: '.($colors['warning'] ?? '#F59E0B').';'.PHP_EOL;
        $css .= '  --isp-error: '.($colors['error'] ?? '#EF4444').';'.PHP_EOL;
        $css .= '}'.PHP_EOL;

        $styleTag = '<style id="dynamic-theme">'.$css.'</style>';
        $content = str_replace('</head>', $styleTag.'</head>', $content);
        $response->setContent($content);

        return $response;
    }
}
