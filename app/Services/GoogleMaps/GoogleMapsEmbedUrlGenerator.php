<?php

namespace App\Services\GoogleMaps;

class GoogleMapsEmbedUrlGenerator
{
    /**
     * Generate an embed URL from latitude and longitude.
     */
    public function fromCoordinates(float $latitude, float $longitude): string
    {
        return "https://www.google.com/maps?q={$latitude},{$longitude}&output=embed";
    }

    /**
     * Generate an embed URL from a location query string.
     */
    public function fromQuery(string $query): string
    {
        $encoded = urlencode($query);

        return "https://www.google.com/maps?q={$encoded}&output=embed";
    }

    /**
     * Generate the best embed URL based on available data.
     *
     * Priority: coordinates > location_query > null
     */
    public function generate(?float $latitude, ?float $longitude, ?string $locationQuery): ?string
    {
        if ($latitude !== null && $longitude !== null) {
            return $this->fromCoordinates($latitude, $longitude);
        }

        if ($locationQuery !== null && trim($locationQuery) !== '') {
            return $this->fromQuery($locationQuery);
        }

        return null;
    }

    /**
     * Validate latitude range.
     */
    public function isValidLatitude(float $lat): bool
    {
        return $lat >= -90 && $lat <= 90;
    }

    /**
     * Validate longitude range.
     */
    public function isValidLongitude(float $lng): bool
    {
        return $lng >= -180 && $lng <= 180;
    }
}
