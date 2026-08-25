import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    const site = usePage().props.site as
        | { site_name?: string | null; logo?: string | null }
        | undefined;
    const logoUrl = site?.logo ?? null;
    const siteName = site?.site_name ?? 'Laravel Starter Kit';

    return (
        <>
            <div className="flex items-center justify-center">
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt="Site logo"
                        className="h-10 w-10 object-contain"
                    />
                ) : (
                    <AppLogoIcon className="h-10 w-10 fill-current text-white dark:text-black" />
                )}
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">{siteName}</span>
            </div>
        </>
    );
}
