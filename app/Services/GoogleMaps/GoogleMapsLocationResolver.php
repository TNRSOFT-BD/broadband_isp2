<?php

namespace App\Services\GoogleMaps;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GoogleMapsLocationResolver
{
    private const MAX_REDIRECTS = 5;
    private const TIMEOUT_SECONDS = 10;

    public function __construct(
        private GoogleMapsUrlValidator $validator,
    ) {}

    /**
     * Resolve a Google Maps URL and extract location data.
     *
     * @return array{success: bool, latitude: ?float, longitude: ?float, location_query: ?string, resolved_url: ?string, error: ?string}
     */
    public function resolve(string $url): array
    {
        $url = trim($url);

        if (! $this->validator->isValidGoogleMapsUrl($url)) {
            return [
                'success' => false,
                'latitude' => null,
                'longitude' => null,
                'location_query' => null,
                'resolved_url' => null,
                'error' => 'Invalid Google Maps URL. Please paste a link from Google Maps.',
            ];
        }

        // Try to extract coordinates directly from the URL first
        $extracted = $this->extractFromUrl($url);
        if ($extracted['latitude'] !== null || $extracted['location_query'] !== null) {
            return [
                'success' => true,
                'latitude' => $extracted['latitude'],
                'longitude' => $extracted['longitude'],
                'location_query' => $extracted['location_query'],
                'resolved_url' => $url,
                'error' => null,
            ];
        }

        // If it's a short link, try to resolve it
        if ($this->validator->isShortLink($url)) {
            $resolved = $this->resolveShortLink($url);
            if ($resolved !== null) {
                $extracted = $this->extractFromUrl($resolved);
                return [
                    'success' => true,
                    'latitude' => $extracted['latitude'],
                    'longitude' => $extracted['longitude'],
                    'location_query' => $extracted['location_query'],
                    'resolved_url' => $resolved,
                    'error' => null,
                ];
            }
        }

        // Fallback: if we could not extract coordinates or a meaningful name,
        // do NOT store the raw URL as a location query (it would produce a
        // broken map embed). Report failure so the admin can enter the
        // location name or coordinates manually.
        return [
            'success' => false,
            'latitude' => null,
            'longitude' => null,
            'location_query' => null,
            'resolved_url' => $url,
            'error' => 'We could not automatically detect the location from this link. Please enter a location name or coordinates manually.',
        ];
    }

    /**
     * Extract coordinates or location query from a Google Maps URL.
     */
    private function extractFromUrl(string $url): array
    {
        $result = ['latitude' => null, 'longitude' => null, 'location_query' => null];

        $parsed = parse_url($url);
        if (! $parsed) {
            return $result;
        }

        $query = $parsed['query'] ?? '';
        parse_str($query, $params);

        // Check for @lat,lng pattern in path
        $path = $parsed['path'] ?? '';
        if (preg_match('/@(-?\d+\.?\d*),(-?\d+\.?\d*)/', $path, $matches)) {
            $result['latitude'] = (float) $matches[1];
            $result['longitude'] = (float) $matches[2];
            return $result;
        }

        // Check for q=lat,lng pattern
        if (isset($params['q']) && preg_match('/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/', $params['q'], $matches)) {
            $result['latitude'] = (float) $matches[1];
            $result['longitude'] = (float) $matches[2];
            return $result;
        }

        // Check for query= pattern
        if (isset($params['query']) && preg_match('/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/', $params['query'], $matches)) {
            $result['latitude'] = (float) $matches[1];
            $result['longitude'] = (float) $matches[2];
            return $result;
        }

        // Check for place name in q= or query=
        if (isset($params['q']) && ! preg_match('/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/', $params['q'])) {
            $result['location_query'] = urldecode($params['q']);
            return $result;
        }

        if (isset($params['query'])) {
            $result['location_query'] = urldecode($params['query']);
            return $result;
        }

        // Check for place/ path segment
        if (preg_match('/\/place\/([^\/]+)/', $path, $matches)) {
            $result['location_query'] = str_replace('+', ' ', urldecode($matches[1]));
            return $result;
        }

        return $result;
    }

    /**
     * Safely resolve a short URL by following redirects.
     */
    private function resolveShortLink(string $url): ?string
    {
        try {
            $response = Http::withOptions([
                'max_redirects' => self::MAX_REDIRECTS,
                'timeout' => self::TIMEOUT_SECONDS,
                'connect_timeout' => 5,
            ])->withHeaders([
                'User-Agent' => 'Mozilla/5.0 (compatible; ISP-App/1.0)',
            ])->get($url);

            if ($response->successful()) {
                $finalUrl = $response->effectiveUri()?->__toString() ?? $url;

                if ($this->validator->isValidGoogleMapsUrl($finalUrl) && ! $this->validator->isBlockedIp($finalUrl)) {
                    return $finalUrl;
                }
            }
        } catch (\Exception $e) {
            Log::warning('Google Maps URL resolution failed: ' . $e->getMessage());
        }

        return null;
    }
}
