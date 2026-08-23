<?php

namespace App\Http\Middleware;

use App\Services\FontService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApplyFontMiddleware
{
    public function __construct(
        private FontService $fontService,
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

        $font = $this->fontService->getActiveFontDetails();

        if (! $font) {
            return $response;
        }

        $content = $response->getContent();
        if ($content === null || strpos($content, '</head>') === false) {
            return $response;
        }

        $inject = '';

        // Inject Google Fonts link if URL is provided
        if (! empty($font['url'])) {
            $inject .= '<link rel="stylesheet" href="'.htmlspecialchars($font['url']).'">'.PHP_EOL;
        }

        // Inject font-family CSS variable
        $family = $font['css_family'] ?? $font['family'] ?? 'Inter';
        $inject .= '<style id="dynamic-font">:root { --font-sans: \''.$family.'\', ui-sans-serif, system-ui, sans-serif; }</style>';

        $content = str_replace('</head>', $inject.'</head>', $content);
        $response->setContent($content);

        return $response;
    }
}
