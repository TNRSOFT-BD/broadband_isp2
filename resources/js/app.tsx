import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { route as routeFn } from 'ziggy-js';


declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

let companyName = appName;

// Disable browser scroll restoration to prevent unwanted scroll jumps on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

createInertiaApp({
    title: (title) => `${title} - ${companyName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const site = props.initialPage.props.site as { site_name?: string | null } | undefined;
        if (site?.site_name) {
            companyName = site.site_name;
        }
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});


