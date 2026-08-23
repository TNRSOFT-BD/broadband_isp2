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
import { Link, usePage } from '@inertiajs/react';
import { Menu, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { type ReactNode } from 'react';

interface NavLink {
    title: string;
    href: string;
}

const navLinks: NavLink[] = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '#' },
    { title: 'Services', href: '/services' },
    { title: 'Plans', href: '/plans' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' },
];

interface PublicNavbarProps {
    children?: ReactNode;
}

export function PublicNavbar({ children }: PublicNavbarProps) {
    const page = usePage();
    const currentUrl = page.url;

    return (
        <div className="flex min-h-screen flex-col">
            {/* Top Info Bar */}
            <div className="border-b border-white/10 bg-[#0f172a] text-sm text-slate-400">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <a href="tel:+18001234567" className="flex items-center gap-2 transition-colors hover:text-white">
                            <Phone className="h-3.5 w-3.5" />
                            <span>+1 (800) 123-4567</span>
                        </a>
                        <a href="mailto:support@vibranet.com" className="hidden items-center gap-2 transition-colors hover:text-white sm:flex">
                            <Mail className="h-3.5 w-3.5" />
                            <span>support@vibranet.com</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="transition-colors hover:text-white" aria-label="Facebook">
                            <Facebook className="h-4 w-4" />
                        </a>
                        <a href="#" className="transition-colors hover:text-white" aria-label="Twitter">
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a href="#" className="transition-colors hover:text-white" aria-label="Instagram">
                            <Instagram className="h-4 w-4" />
                        </a>
                        <a href="#" className="transition-colors hover:text-white" aria-label="LinkedIn">
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
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

                            return (
                                <Link
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
                        <Link href="#" className="futuristic-btn">
                            <span className="relative z-10">Selfcare</span>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>                                <SheetContent side="right" className="w-[300px] bg-white p-0">
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
                                                <Link href="#" className="futuristic-btn futuristic-btn-mobile w-full justify-center">
                                                    Selfcare
                                                </Link>
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
        </div>
    );
}
