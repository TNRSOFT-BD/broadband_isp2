<?php

namespace App\Services\GoogleMaps;

class GoogleMapsUrlValidator
{
    private const ALLOWED_DOMAINS = [
        'maps.app.goo.gl',
        'goo.gl',
        'google.com',
        'www.google.com',
        'maps.google.com',
    ];

    private const BLOCKED_IP_PATTERNS = [
        '/^127\./',
        '/^10\./',
        '/^172\.(1[6-9]|2[0-9]|3[01])\./',
        '/^192\.168\./',
        '/^0\./',
        '/^localhost/i',
        '/^\[::1\]$/',
    ];

    /**
     * Check if a URL is a valid Google Maps URL.
     */
    public function isValidGoogleMapsUrl(string $url): bool
    {
        $url = trim($url);

        if (empty($url)) {
            return false;
        }

        $parsed = parse_url($url);

        if (! $parsed || ! isset($parsed['host'])) {
            return false;
        }

        $host = strtolower($parsed['host']);

        // Remove www. prefix for comparison
        $host = preg_replace('/^www\./', '', $host);

        foreach (self::ALLOWED_DOMAINS as $domain) {
            $normalized = preg_replace('/^www\./', '', $domain);
            if ($host === $normalized || str_ends_with($host, '.' . $normalized)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if a URL is a short link that needs resolution.
     */
    public function isShortLink(string $url): bool
    {
        $parsed = parse_url($url);

        if (! $parsed || ! isset($parsed['host'])) {
            return false;
        }

        $host = strtolower($parsed['host']);

        return str_contains($host, 'maps.app.goo.gl')
            || str_contains($host, 'goo.gl')
            || str_contains($host, 'maps.goo.gl');
    }

    /**
     * Check if a resolved URL points to a blocked IP.
     */
    public function isBlockedIp(string $url): bool
    {
        $parsed = parse_url($url);

        if (! $parsed || ! isset($parsed['host'])) {
            return true;
        }

        $host = $parsed['host'];

        foreach (self::BLOCKED_IP_PATTERNS as $pattern) {
            if (preg_match($pattern, $host)) {
                return true;
            }
        }

        return false;
    }
}
