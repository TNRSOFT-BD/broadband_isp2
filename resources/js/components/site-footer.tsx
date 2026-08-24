import IspLogo from '@/components/isp-logo';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '#' },
    { title: 'Plans', href: '/plans' },
    { title: 'Contact', href: '/contact' },
];

const serviceLinks = [
    { title: 'Fiber Internet', href: '#' },
    { title: 'Business Solutions', href: '#' },
    { title: 'Home broadband', href: '#' },
    { title: 'Dedicated Leased Lines', href: '#' },
];

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function SiteFooter() {
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
                <div className="mt-8 grid gap-8 text-center sm:grid-cols-2 md:text-left lg:grid-cols-3">
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

                    {/* Services */}
                    <div className="hidden sm:block">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Our Services</h3>
                        <div className="mx-auto mt-1 mb-3 h-0.5 w-8 rounded-full bg-[var(--isp-primary)] md:mx-0" />
                        <ul className="space-y-3">
                            {serviceLinks.map((link) => (
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

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
                        <div className="mx-auto mt-1 mb-3 h-0.5 w-8 rounded-full bg-[var(--isp-primary)] md:mx-0" />
                        <ul className="space-y-3">
                            <li className="flex items-start justify-center gap-2.5 md:justify-start">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Call Us</p>
                                    <a href="tel:+18001234567" className="text-sm text-slate-300 transition-colors hover:text-white">
                                        +1 (800) 123-4567
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start justify-center gap-2.5 md:justify-start">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Email Us</p>
                                    <a href="mailto:support@vibranet.com" className="text-sm text-slate-300 transition-colors hover:text-white">
                                        support@vibranet.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start justify-center gap-2.5 md:justify-start">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Visit Us</p>
                                    <p className="text-sm text-slate-300">123 Tech Avenue, Digital City</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 border-t border-white/10 pt-5">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-xs text-slate-500">
                            &copy; {new Date().getFullYear()} VibraNet. All rights reserved.
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
