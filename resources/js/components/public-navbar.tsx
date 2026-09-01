import IspLogo from '@/components/isp-logo';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import SiteFooter from '@/components/site-footer';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { type ReactNode, useState, useEffect, useCallback, useRef } from 'react';

interface NavLink {
    title: string;
    href: string;
}

const navLinks: NavLink[] = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Plans', href: '/plans' },
    { title: 'Contact', href: '/contact' },
];

interface PublicNavbarProps {
    children?: ReactNode;
}

export function PublicNavbar({ children }: PublicNavbarProps) {
    const page = usePage();
    const currentUrl = page.url;
    const thirdPartyLinks = (page.props as any).thirdPartyLinks as Record<string, string> | undefined;
    const selfcareUrl = thirdPartyLinks?.selfcare || '#';

    // Smart navbar: hide on scroll down, show on scroll up
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const onScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentY = window.scrollY;

                    // Always visible at top
                    if (currentY <= 10) {
                        setIsHidden(false);
                        lastScrollY.current = currentY;
                        ticking.current = false;
                        return;
                    }

                    // Scrolling UP → show navbar
                    if (currentY < lastScrollY.current) {
                        setIsHidden(false);
                    }
                    // Scrolling DOWN → hide navbar
                    else if (currentY > lastScrollY.current + 5) {
                        setIsHidden(true);
                    }

                    lastScrollY.current = currentY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip">
            {/* Spacer — keeps content below the fixed header */}
            <div className="h-16" aria-hidden="true" />

            {/* Main Navigation */}
            <header className={`fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-transform duration-300 ease-in-out ${
                isHidden ? '-translate-y-full' : 'translate-y-0'
            }`}>
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <IspLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => {
                            const isActive = link.href === '/'
                                ? currentUrl === '/'
                                : currentUrl.startsWith(link.href);

                            return (                                    <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'relative rounded-md px-4 py-2 text-base font-medium transition-colors',
                                        isActive
                                            ? 'text-[var(--isp-primary)]'
                                            : 'text-gray-600 hover:text-[var(--isp-primary)]'
                                    )}
                                >
                                    {link.title}
                                </Link>
                            );
                        })}
                    </nav>                    {/* Desktop CTA */}
                    <div className="hidden items-center gap-4 lg:flex">
                        <style>{`
                            .futuristic-btn {
                                position: relative;
                                background: var(--isp-primary);
                                padding: 0.625rem 2rem;
                                font-size: 0.875rem;
                                font-weight: 600;
                                color: white;
                                text-decoration: none;
                                display: inline-flex;
                                align-items: center;
                                gap: 0.5rem;
                                overflow: hidden;
                                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                                clip-path: polygon(
                                    12px 0%,
                                    100% 0%,
                                    calc(100% - 12px) 100%,
                                    0% 100%
                                );
                            }
                            .futuristic-btn::before {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: -100%;
                                width: 100%;
                                height: 100%;
                                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
                                transition: left 0.5s ease;
                            }
                            .futuristic-btn:hover::before {
                                left: 100%;
                            }
                            .futuristic-btn:hover {
                                background: var(--isp-primary-dark);
                                transform: scale(1.03);
                            }
                            .futuristic-btn:active {
                                transform: scale(0.97);
                            }
                            .futuristic-btn-mobile {
                                clip-path: polygon(
                                    10px 0%,
                                    calc(100% - 10px) 0%,
                                    100% 10px,
                                    100% calc(100% - 10px),
                                    calc(100% - 10px) 100%,
                                    10px 100%,
                                    0% calc(100% - 10px),
                                    0% 10px
                                );
                            }
                        `}</style>
                        <Link href="/paybill" className="futuristic-btn">
                            <span className="relative z-10">PayBill</span>
                        </Link>
                        <a href={selfcareUrl} target="_blank" rel="noopener noreferrer" className="futuristic-btn">
                            <span className="relative z-10">Selfcare</span>
                        </a>
                    </div>

                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] bg-white p-0">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <div className="flex h-full flex-col">
                                    {/* Mobile Header */}
                                    <div className="flex h-16 items-center border-b border-gray-200 px-6">
                                        <Link href="/" className="flex items-center">
                                            <IspLogo />
                                        </Link>
                                    </div>

                                    {/* Mobile Nav Links */}
                                    <nav className="flex-1 overflow-y-auto px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            {navLinks.map((link) => {
                                                const isActive = link.href === '/'
                                                    ? currentUrl === '/'
                                                    : currentUrl.startsWith(link.href);

                                                return (
                                                    <SheetClose asChild key={link.href}>
                                                        <Link
                                                            href={link.href}
                                                            className={cn(
                                                                'rounded-md px-4 py-3 text-base font-medium transition-colors',
                                                                isActive
                                                                    ? 'bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]'
                                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-[var(--isp-primary)]'
                                                            )}
                                                        >
                                                            {link.title}
                                                        </Link>
                                                    </SheetClose>
                                                );
                                            })}
                                        </div>
                                    </nav>

                                    {/* Mobile CTA */}
                                    <div className="border-t border-gray-200 bg-white p-6">
                                        <div className="flex flex-col gap-3">
                                            <SheetClose asChild>
                                                <Link href="/paybill" className="futuristic-btn futuristic-btn-mobile w-full justify-center">
                                                    PayBill
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <a href={selfcareUrl} target="_blank" rel="noopener noreferrer" className="futuristic-btn futuristic-btn-mobile w-full justify-center">
                                                    Selfcare
                                                </a>
                                            </SheetClose>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
