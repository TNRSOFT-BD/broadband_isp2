'use client';

import { useFont } from '@/hooks/use-font';
import { useTheme } from '@/hooks/use-theme';
import { type ReactNode } from 'react';

interface ThemeProviderProps {
    children: ReactNode;
}

/**
 * ThemeProvider wraps the application and applies dynamic theme colors
 * and font settings from the server-side configuration.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
    // Apply dynamic theme colors
    useTheme();

    // Apply dynamic font
    useFont();

    return <>{children}</>;
}
