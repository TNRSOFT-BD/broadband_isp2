import IspLogo from '@/components/isp-logo';
import { Link, usePage } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, MessageCircle, Headphones, Globe, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { type ReactNode } from 'react';

const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about' },
    { title: 'Plans', href: '/plans' },
    { title: 'Contact', href: '/contact' },
];

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const iconMap: Record<string, ReactNode> = {
    Phone: <Phone className="h-4 w-4" />,
    Mail: <Mail className="h-4 w-4" />,
    MessageCircle: <MessageCircle className="h-4 w-4" />,
    Headphones: <Headphones className="h-4 w-4" />,
    MapPin: <MapPin className="h-4 w-4" />,
    Globe: <Globe className="h-4 w-4" />,
    Clock: <Clock className="h-4 w-4" />,
    HelpCircle: <HelpCircle className="h-4 w-4" />,
};

interface QuickContactMethod {
    id: number;
    icon: string;
    label: string;
    value: string;
    description?: string | null;
    href?: string | null;
}

export default function SiteFooter() {
    const page = usePage();
    const site = page.props.site as { site_name?: string | null } | undefined;
    const quickContactMethods = (page.props.footerContactMethods as QuickContactMethod[] | undefined) ?? [];

    // Only show contact methods that have both label and value
    const validContactMethods = quickContactMethods.filter((m) => m.label && m.value);

    return (
        <footer className="relative overflow-hidden bg-[#0b1120]">
            {/* Top glow accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--isp-primary)]/50 to-transparent" />

            {/* Glow orbs */}
            <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[var(--isp-primary)]/5 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[var(--isp-accent)]/5 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:px-8">
                {/* Brand row - full width */}
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <Link href="/" className="inline-block">
                            <IspLogo />
                        </Link>
                        <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-slate-400 md:mx-0">
                            Empowering your digital world with ultra-fast, reliable internet connectivity. Experience the future of broadband today.
                        </p>
                        {/* Social icons */}
                        <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
                            {socialLinks
                                .filter((social) => social.href && social.href !== '#')
                                .map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--isp-primary)]/50 hover:bg-[var(--isp-primary)]/10 hover:text-[var(--isp-primary)]"
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Links grid - separate row */}
                <div className="mt-8 grid gap-8 text-center sm:grid-cols-2 md:text-left lg:grid-cols-2">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
                        <div className="mx-auto mt-1 mb-3 h-0.5 w-8 rounded-full bg-[var(--isp-primary)] md:mx-0" />
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                                    >
                                        <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        <span className="transition-transform duration-200 group-hover:translate-x-1">{link.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info - Dynamic from Quick Contact Methods */}
                    {validContactMethods.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
                            <div className="mx-auto mt-1 mb-3 h-0.5 w-8 rounded-full bg-[var(--isp-primary)] md:mx-0" />
                            <ul className="space-y-3">
                                {validContactMethods.map((method) => (
                                    <li key={method.id} className="flex items-start justify-center gap-2.5 md:justify-start">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]">
                                            {iconMap[method.icon] ?? <Phone className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500">{method.label}</p>
                                            {(() => {
                                                const resolvedHref = method.href && method.href !== '#'
                                                    ? method.href
                                                    : method.icon === 'Phone'
                                                        ? `tel:${method.value}`
                                                        : method.icon === 'Mail'
                                                            ? `mailto:${method.value}`
                                                            : null;
                                                return resolvedHref ? (
                                                    <a href={resolvedHref} className="text-sm text-slate-300 transition-colors hover:text-white">
                                                        {method.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm text-slate-300">{method.value}</p>
                                                );
                                            })()}
                                            {method.description && (
                                                <p className="text-xs text-slate-500">{method.description}</p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Bottom bar */}
                <div className="mt-10 border-t border-white/10 pt-5">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-xs text-slate-500">
                            &copy; {new Date().getFullYear()}{' '}
                            {site?.site_name ?? 'VibraNet'}
                            . All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs text-slate-500 transition-colors hover:text-slate-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-xs text-slate-500 transition-colors hover:text-slate-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-xs text-slate-500 transition-colors hover:text-slate-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
