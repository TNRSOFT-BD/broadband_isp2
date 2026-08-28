import { Link, usePage } from '@inertiajs/react';
import { Wifi, Zap, Shield, Clock } from 'lucide-react';

const defaultFeatures = [
    { icon: Zap, label: 'Lightning Fast', desc: 'Up to 1 Gbps' },
    { icon: Shield, label: 'Secure Network', desc: 'DDoS Protection' },
    { icon: Clock, label: '99.9% Uptime', desc: 'Guaranteed' },
    { icon: Wifi, label: 'Wide Coverage', desc: 'City-wide' },
];

interface HeroProps {
    hero?: {
        background_image: string | null;
        badge_text: string;
        heading_line1: string;
        heading_highlight: string;
        heading_line2: string;
        subtitle: string;
        cta_primary_text: string;
        cta_primary_url: string;
        cta_secondary_text: string;
        cta_secondary_url: string;
        badge_color: string;
        heading_color: string;
        highlight_color: string;
        subtitle_color: string;
        cta_primary_bg: string;
        cta_primary_text_color: string;
        cta_secondary_border: string;
        cta_secondary_text_color: string;
        feature_card_bg: string;
        feature_card_border: string;
        feature_label_color: string;
        feature_desc_color: string;
        overlay_color: string;
    };
}

export default function HeroSection() {
    const { props } = usePage<HeroProps>();
    const h = props.hero;

    // Fallback defaults
    const hero = {
        background_image: h?.background_image ?? '/storage/hero/hero-default.avif',
        badge_text: h?.badge_text ?? 'Next Generation Internet',
        heading_line1: h?.heading_line1 ?? 'The Future of',
        heading_highlight: h?.heading_highlight ?? 'Connectivity',
        heading_line2: h?.heading_line2 ?? 'Starts Here',
        subtitle: h?.subtitle ?? 'Experience blazing-fast internet with zero buffering. Powered by cutting-edge fiber technology designed for the modern world.',
        cta_primary_text: h?.cta_primary_text ?? '',
        cta_primary_url: h?.cta_primary_url ?? '',
        cta_secondary_text: h?.cta_secondary_text ?? '',
        cta_secondary_url: h?.cta_secondary_url ?? '',
        badge_color: h?.badge_color ?? '#2563EB',
        heading_color: h?.heading_color ?? '#ffffff',
        highlight_color: h?.highlight_color ?? '#2563EB',
        subtitle_color: h?.subtitle_color ?? '#cbd5e1',
        cta_primary_bg: h?.cta_primary_bg ?? '#2563EB',
        cta_primary_text_color: h?.cta_primary_text_color ?? '#ffffff',
        cta_secondary_border: h?.cta_secondary_border ?? '#ffffff',
        cta_secondary_text_color: h?.cta_secondary_text_color ?? '#ffffff',
        feature_card_bg: h?.feature_card_bg ?? 'rgba(255,255,255,0.05)',
        feature_card_border: h?.feature_card_border ?? 'rgba(255,255,255,0.1)',
        feature_label_color: h?.feature_label_color ?? '#ffffff',
        feature_desc_color: h?.feature_desc_color ?? '#94a3b8',
        overlay_color: h?.overlay_color ?? '#0a0e1a',
    };

    return (
        <section className="relative min-h-0 lg:min-h-screen overflow-hidden" style={{ background: hero.overlay_color }}>
            {/* Background Image */}
            {hero.background_image && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${hero.background_image})` }}
                />
            )}

            {/* Dark Overlay */}
            <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, ${hero.overlay_color}e6, ${hero.overlay_color}70, ${hero.overlay_color}f5)` }}
            />

            {/* Animated Grid Lines */}
            <div className="hero-grid absolute inset-0 opacity-[0.03]" />

            {/* Floating Particles */}
            <div className="hero-particles absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute h-1 w-1 rounded-full"
                        style={{
                            background: hero.badge_color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Glow Orbs */}
            <div className="glow-orb absolute -left-32 top-1/4 h-64 w-64 rounded-full blur-[100px]" style={{ background: `${hero.badge_color}1a` }} />
            <div className="glow-orb absolute -right-32 top-1/2 h-64 w-64 rounded-full blur-[100px]" style={{ background: `${hero.highlight_color}1a` }} />

            {/* Content */}
            <div className="relative z-10 flex min-h-0 lg:min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
                {/* Badge */}
                <div
                    className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium backdrop-blur-md"
                    style={{
                        color: hero.badge_color,
                        border: `1px solid ${hero.badge_color}4d`,
                        background: `${hero.badge_color}1a`,
                    }}
                >
                    <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: hero.badge_color }} />
                    {hero.badge_text}
                </div>

                {/* Main Heading */}
                <h1
                    className="hero-title mb-6 max-w-4xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
                    style={{ color: hero.heading_color }}
                >
                    {hero.heading_line1}{' '}
                    <span className="relative inline-block">
                        <span
                            className="relative z-10 bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${hero.highlight_color}, ${hero.badge_color})`,
                            }}
                        >
                            {hero.heading_highlight}
                        </span>
                        <span
                            className="absolute bottom-0 left-0 h-[3px] w-full"
                            style={{ background: `linear-gradient(to right, ${hero.highlight_color}, ${hero.badge_color})` }}
                        />
                    </span>
                    <br />
                    {hero.heading_line2}
                </h1>

                {/* Subtitle */}
                <p
                    className="hero-subtitle mb-10 max-w-2xl text-lg sm:text-xl"
                    style={{ color: hero.subtitle_color }}
                >
                    {hero.subtitle}
                </p>

                {/* CTA Buttons */}
                {(hero.cta_primary_text || hero.cta_secondary_text) && (
                    <div className="hero-cta mb-16 flex flex-col items-center gap-4 sm:flex-row">
                        {hero.cta_primary_text && (
                            <Link
                                href={hero.cta_primary_url}
                                className="hero-btn-primary group relative inline-flex items-center gap-2 overflow-hidden px-8 py-3.5 text-base font-semibold transition-all duration-300"
                                style={{
                                    background: hero.cta_primary_bg,
                                    color: hero.cta_primary_text_color,
                                    clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                                }}
                            >
                                <span className="relative z-10">{hero.cta_primary_text}</span>
                                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] transition-transform duration-500 group-hover:translate-x-[100%]" />
                            </Link>
                        )}
                        {hero.cta_secondary_text && hero.cta_secondary_url && (
                            <Link
                                href={hero.cta_secondary_url}
                                className="hero-btn-secondary group inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3.5 text-base font-semibold backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                                style={{
                                    border: `1px solid ${hero.cta_secondary_border}33`,
                                    color: hero.cta_secondary_text_color,
                                }}
                            >
                                <span>{hero.cta_secondary_text}</span>
                                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        )}
                    </div>
                )}

                {/* Feature Cards */}
                <div className="hero-features mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
                    {defaultFeatures.map((feature, i) => (
                        <div
                            key={feature.label}
                            className="feature-card group flex flex-col items-center gap-2 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                            style={{
                                background: `${hero.feature_card_bg}0d`,
                                border: `1px solid ${hero.feature_card_border}1a`,
                                animationDelay: `${i * 0.1}s`,
                            }}
                        >
                            <feature.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: hero.badge_color }} />
                            <span className="text-sm font-semibold" style={{ color: hero.feature_label_color }}>{feature.label}</span>
                            <span className="text-xs" style={{ color: hero.feature_desc_color }}>{feature.desc}</span>
                        </div>
                    ))}
                </div>

            </div>

            <style>{`
                .hero-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: gridPulse 8s ease-in-out infinite;
                }
                @keyframes gridPulse {
                    0%, 100% { opacity: 0.03; }
                    50% { opacity: 0.06; }
                }
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-100vh) scale(0); opacity: 0; }
                }
                .particle { animation: floatUp linear infinite; }
                .glow-orb { animation: glowPulse 6s ease-in-out infinite; }
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .hero-badge { animation: fadeUp 0.8s ease-out 0.2s both; }
                .hero-title { animation: fadeUp 0.8s ease-out 0.4s both; }
                .hero-subtitle { animation: fadeUp 0.8s ease-out 0.6s both; }
                .hero-cta { animation: fadeUp 0.8s ease-out 0.8s both; }
                .hero-features { animation: fadeUp 0.8s ease-out 1s both; }
                .feature-card { animation: fadeUp 0.6s ease-out both; }
                .hero-btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s ease;
                }
                .hero-btn-primary:hover::before { left: 100%; }
            `}</style>
        </section>
    );
}
