import { usePage } from '@inertiajs/react';

/**
 * Read the freshest CSRF token available.
 *
 * Prefers the Inertia `csrf_token` prop because Laravel re-shares it on every
 * request (see HandleInertiaRequests), so it tracks token rotations that the
 * static <meta name="csrf-token"> tag misses during SPA navigation.
 */
export function getCsrfToken(): string {
    const { props } = usePage();
    const fromProps = (props as Record<string, unknown>).csrf_token as string | undefined;
    if (fromProps) {
        return fromProps;
    }

    return (
        (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content ?? ''
    );
}
