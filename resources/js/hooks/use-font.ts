import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface FontProps {
    font?: {
        name: string;
        family: string;
        url: string | null;
        weight: string;
        font_style: string;
        css_family: string;
    };
}

/** Font style to CSS font-weight mapping */
const fontStyleMap: Record<string, string> = {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
};

/**
 * Hook to apply dynamic font from server-side configuration.
 * Injects Google Fonts link and updates CSS font-family and font-weight.
 */
export function useFont() {
    const { props } = usePage<FontProps>();
    const font = props.font;

    useEffect(() => {
        if (!font) return;

        // Apply font-weight based on font_style setting
        const cssWeight = fontStyleMap[font.font_style] ?? '400';

        // Dynamically build Google Fonts URL to include the selected weight
        // This avoids 'faux bold' (browser-synthesized bold) which looks blurry
        if (font.family) {
            const weightParam = cssWeight;
            const dynamicUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}:wght@${weightParam}&display=swap`;

            const existingLink = document.querySelector(`link[data-font-family="${font.family}"]`) as HTMLLinkElement | null;
            if (existingLink) {
                existingLink.href = dynamicUrl;
            } else {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = dynamicUrl;
                link.setAttribute('data-font-family', font.family);
                document.head.appendChild(link);
            }
        }

        // Also keep the full weight URL if provided
        if (font.url) {
            const existingFull = document.querySelector(`link[href="${font.url}"]`);
            if (!existingFull) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = font.url;
                document.head.appendChild(link);
            }
        }

        // Update CSS font-family variable
        const root = document.documentElement;
        root.style.setProperty(
            '--font-sans',
            `'${font.family}', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`
        );

        root.style.setProperty('--font-weight', cssWeight);
        // Apply to body only, not :root to avoid overriding specific element weights
        document.body.style.fontWeight = cssWeight;
        // Improve font rendering to reduce blurry/thick appearance
        document.body.style.webkitFontSmoothing = 'antialiased';
        document.body.style.mozOsxFontSmoothing = 'grayscale';
        document.body.style.textRendering = 'optimizeLegibility';
    }, [font]);

    return { font };
}
