import IspLogo from '@/components/isp-logo';
import { Link, usePage } from '@inertiajs/react';
import { Phone, Mail, MapPin, MessageCircle, Headphones, Globe, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { type ReactNode } from 'react';

const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about' },
    { title: 'Plans', href: '/plans' },
    { title: 'Contact', href: '/contact' },
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

interface LegalPageLink {
    title: string;
    slug: string;
}

interface SocialMediaItem {
    id: number;
    name: string;
    image: string;
    link: string;
}

export default function SiteFooter() {
    const page = usePage();
    const site = page.props.site as { site_name?: string | null } | undefined;
    const quickContactMethods = (page.props.footerContactMethods as QuickContactMethod[] | undefined) ?? [];
    const legalPages = (page.props.legalPages as LegalPageLink[] | undefined) ?? [];
    const socialMediaItems = (page.props.socialMediaItems as SocialMediaItem[] | undefined) ?? [];

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
                {/* Main row: Logo left, Links + Contact right */}
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12 text-center md:text-left">
                    {/* Left: Logo + tagline + social */}
                    <div className="flex-1">
                        <Link href="/" className="inline-block">
                            <IspLogo />
                        </Link>
                        <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-slate-400 md:mx-0">
                            Empowering your digital world with ultra-fast, reliable internet connectivity. Experience the future of broadband today.
                        </p>
                        {socialMediaItems.length > 0 && (
                            <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                                {socialMediaItems.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.link}
                                        aria-label={social.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--isp-primary)] hover:text-white"
                                    >
                                        <img
                                            src={social.image}
                                            alt={social.name}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                        />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Quick Links + Contact Us */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:w-1/2">
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
                            {legalPages.map((link) => (
                                <Link
                                    key={link.slug}
                                    href={`/legal/${link.slug}`}
                                    className="text-xs text-slate-500 transition-colors hover:text-slate-300"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
