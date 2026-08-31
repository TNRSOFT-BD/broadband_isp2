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
             like the "Explore Our Digital Services" section. Re-assert top after
             load/pageshow as an extra safety net for browsers that restore late. --}}
        <script>
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);

            // Re-assert top over a widening window of time so the page never lands on
            // (or flashes) a mid-page section after a reload. Some browsers re-apply
            // scroll restoration after the 'load' event, so we re-pin the top position
            // at several points up to ~1s to beat that late restoration.
            var pinned = false;
            function pinTop() {
                try {
                    if (window.scrollY !== 0 || document.documentElement.scrollTop !== 0) {
                        window.scrollTo(0, 0);
                    }
                } catch (e) {}
                if (!pinned) {
                    pinned = true;
                    [0, 50, 150, 300, 600, 1000].forEach(function (t) {
                        setTimeout(function () {
                            try { window.scrollTo(0, 0); } catch (e) {}
                        }, t);
                    });
                }
            }
            window.addEventListener('pageshow', pinTop);
            window.addEventListener('load', pinTop);
            pinTop();
        </script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
