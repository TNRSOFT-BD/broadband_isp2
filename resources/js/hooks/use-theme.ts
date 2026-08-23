import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface ThemeColors {
    primary: string;
    primary_dark: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
}

interface ThemeProps {
    theme?: {
        colors: ThemeColors;
    };
}

/**
 * Hook to apply dynamic theme colors from server-side configuration.
 * Updates CSS custom properties based on the active theme.
 */
export function useTheme() {
    const { props } = usePage<ThemeProps>();
    const colors = props.theme?.colors;

    useEffect(() => {
        if (!colors) return;

        const root = document.documentElement;

        // Update ISP-specific CSS variables
        root.style.setProperty('--isp-primary', colors.primary);
        root.style.setProperty('--isp-primary-dark', colors.primary_dark);
        root.style.setProperty('--isp-secondary', colors.secondary);
        root.style.setProperty('--isp-accent', colors.accent);
        root.style.setProperty('--isp-success', colors.success);
        root.style.setProperty('--isp-warning', colors.warning);
        root.style.setProperty('--isp-error', colors.error);

        // Update shadcn/ui CSS variables that map to ISP colors
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--accent', colors.accent);
        root.style.setProperty('--destructive', colors.error);
        root.style.setProperty('--ring', colors.primary);
        root.style.setProperty('--sidebar-primary', colors.primary);
        root.style.setProperty('--sidebar-ring', colors.primary);
    }, [colors]);

    return { colors };
}
