import { usePage } from '@inertiajs/react';

/**
 * Hook to generate admin URLs with the user's role-specific prefix.
 *
 * Usage:
 *   const { adminUrl } = useAdminUrl();
 *   adminUrl('/dashboard')    → '/staff/dashboard' (for staff role)
 *   adminUrl('/dashboard')    → '/admin/dashboard' (for admin role)
 *   adminUrl('/plans')        → '/staff/plans' or '/admin/plans'
 */
export function useAdminUrl() {
    const { props } = usePage();
    const adminPrefix = (props as Record<string, unknown>).admin_prefix as string | undefined;
    const prefix = adminPrefix || 'admin';

    /**
     * Generate a URL with the user's admin prefix.
     * @param path - The admin path (without the prefix), e.g. '/dashboard', '/plans'
     * @returns The full URL with the role prefix, e.g. '/staff/dashboard'
     */
    function adminUrl(path: string): string {
        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;

        // If prefix is 'admin', just use the standard path
        if (prefix === 'admin') {
            return '/' + cleanPath;
        }

        // For non-admin prefixes, rewrite the URL
        // If path starts with 'admin/', replace it
        if (cleanPath.startsWith('admin/')) {
            return '/' + prefix + '/' + cleanPath.slice(6); // 6 = 'admin/'.length
        }

        return '/' + prefix + '/' + cleanPath;
    }

    return { adminUrl, adminPrefix: prefix };
}
