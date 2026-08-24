import { useState } from 'react';

export type Appearance = 'light';

export function initializeTheme() {
    // No-op: dark mode removed
}

export function useAppearance() {
    const [appearance] = useState<Appearance>('light');

    return { appearance, updateAppearance: () => {} };
}
