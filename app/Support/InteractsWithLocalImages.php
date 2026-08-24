<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

trait InteractsWithLocalImages
{
    /**
     * Delete an image file from the local public disk when the given URL points to it.
     * External URLs (CDN, third-party) are ignored.
     */
    protected function deleteLocalImage(?string $url): void
    {
        if (! $url || ! str_starts_with($url, '/storage/')) {
            return;
        }

        Storage::disk('public')->delete(str_replace('/storage/', '', $url));
    }

    /**
     * Delete the old local image after a successful save when the field's value changed.
     *
     * @param  array<string, mixed>  $old
     * @param  array<string, mixed>  $new
     * @param  list<string>  $fields
     */
    protected function deleteReplacedImages(array $old, array $new, array $fields): void
    {
        foreach ($fields as $field) {
            $oldValue = $old[$field] ?? null;
            $newValue = $new[$field] ?? null;

            if ($oldValue && $oldValue !== $newValue) {
                $this->deleteLocalImage($oldValue);
            }
        }
    }
}
