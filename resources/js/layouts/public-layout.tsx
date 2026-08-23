import { PublicNavbar } from '@/components/public-navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { type ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <ThemeProvider>
            <PublicNavbar>{children}</PublicNavbar>
        </ThemeProvider>
    );
}
