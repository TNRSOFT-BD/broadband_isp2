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
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
