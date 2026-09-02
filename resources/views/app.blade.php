<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @php
            $siteBranding = app(\App\Services\SiteSettingsService::class)->get();
        @endphp

        <title inertia>{{ $siteBranding['site_name'] ?? config('app.name', 'Laravel') }}</title>

        @if(!empty($siteBranding['favicon']))
            @php
                $faviconExt = strtolower(pathinfo($siteBranding['favicon'], PATHINFO_EXTENSION));
                $faviconType = match ($faviconExt) {
                    'svg' => 'image/svg+xml',
                    'ico' => 'image/x-icon',
                    'jpg', 'jpeg' => 'image/jpeg',
                    default => 'image/png',
                };
            @endphp
            <link rel="icon" type="{{ $faviconType }}" href="{{ $siteBranding['favicon'] }}">
            <link rel="apple-touch-icon" href="{{ $siteBranding['favicon'] }}">
        @endif

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        {{-- Prevent the browser from restoring the scroll position on a full page
             reload. This runs in <head>, before the browser applies any scroll
             restoration, so the page never jumps to (or flashes) a mid-page section
             like the "Explore Our Digital Services" section. --}}
        <script>
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);

            // Re-assert top on pageshow (bfcache) — single call only, no repeating
            // timeouts that would fight the user's own scrolling.
            window.addEventListener('pageshow', function () {
                if (window.scrollY !== 0 || document.documentElement.scrollTop !== 0) {
                    window.scrollTo(0, 0);
                }
            });
        </script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
