import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface HudStat {
    value: string;
    label: string;
}

interface HudPanel {
    label: string;
    position: string;
    stats: HudStat[];
}

interface IntroData {
    eyebrow: string;
    title: string;
    subtitle?: string | null;
    description: string;
    cta_text: string;
    cta_url: string;
    highlights?: string[];
    trust_badge?: string | null;
    hud_panels?: HudPanel[];
}

export default function IntroSection({ data }: { data: IntroData }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    return (
        <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
            {/* Subtle grid background */}
            <div className="intro-grid absolute inset-0 opacity-[0.025]" aria-hidden="true" />

            {/* Glow orbs */}
            <div
                className="intro-orb absolute -right-20 top-1/4 h-72 w-72 rounded-full blur-[120px]"
                style={{ background: `color-mix(in srgb, ${accent} 8%, transparent)` }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Content */}
                    <div className="intro-fade text-center sm:text-center lg:text-left">
                        <h2
                            className="mb-3 text-center font-bold uppercase tracking-wider sm:text-center lg:text-left" style={{ fontSize: '12.25px', color: accent }}
                        >
                            {data.eyebrow}
                        </h2>
                        <div className="mx-auto mb-6 h-1 w-12 rounded-full sm:mx-auto lg:mx-0" style={{ background: accent }} />

                        <h3 className="mb-3 text-center text-xl font-bold leading-tight text-gray-900 sm:text-center sm:text-3xl lg:text-left lg:text-5xl">
                            {data.title}
                        </h3>

                        {data.subtitle && (
                            <p className="mb-4 text-center text-base font-semibold sm:text-center lg:text-left" style={{ color: accent }}>{data.subtitle}</p>
                        )}

                        <p className="mx-auto mb-6 max-w-lg text-center text-base leading-relaxed text-gray-600 text-justify sm:text-center lg:mx-0 lg:text-left">
                            {data.description}
                        </p>

                        {data.highlights && data.highlights.length > 0 && (
                            <ul className="mx-auto mb-6 max-w-md space-y-2 sm:mx-auto lg:mx-0">
                                {data.highlights.map((item, i) => (
                                    <li key={i} className="flex items-center justify-center gap-2 text-sm text-gray-700 sm:justify-center lg:justify-start">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: accent }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex justify-center lg:justify-start">
                            <Link
                                href={data.cta_url}
                                className="intro-btn group relative inline-flex items-center gap-2 overflow-hidden px-7 py-3 text-sm font-semibold text-white transition-all duration-300"
                                style={{
                                    background: accent,
                                    clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                                }}
                            >
                                <span className="relative z-10">{data.cta_text}</span>
                                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                            </Link>
                        </div>

                        {data.trust_badge && (
                            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400 sm:justify-center lg:justify-start">
                                <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                {data.trust_badge}
                            </p>
                        )}
                    </div>

                    {/* Right side — Animated Network Visual */}
                    <div className="intro-fade-delayed relative flex items-center justify-center">
                        {/* ── MOBILE: Simplified visual ── */}
                        <div className="md:hidden relative flex h-64 w-full items-center justify-center">
                            {/* Background glow disc */}
                            <div
                                className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{
                                    background: `radial-gradient(circle, color-mix(in srgb, ${accent} 10%, transparent) 0%, color-mix(in srgb, ${accentAlt} 4%, transparent) 40%, transparent 70%)`,
                                }}
                                aria-hidden="true"
                            />

                            {/* Simple orbital ring */}
                            <div className="intro-orbit absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: `color-mix(in srgb, ${accent} 15%, transparent)` }} aria-hidden="true" />
                            <div className="intro-orbit-reverse absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 10%, transparent)` }} aria-hidden="true" />

                            {/* Pulsing ring dots */}
                            {[0, 90, 180, 270].map((deg, i) => (
                                <div
                                    key={`mob-dot-${i}`}
                                    className="intro-ring-dot absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                    style={{
                                        background: i % 2 === 0 ? accent : accentAlt,
                                        transform: `rotate(${deg}deg) translateX(88px) rotate(-${deg}deg)`,
                                        transformOrigin: '0 0',
                                        boxShadow: `0 0 6px ${i % 2 === 0 ? accent : accentAlt}`,
                                        animationDelay: `${i * 0.6}s`,
                                    }}
                                    aria-hidden="true"
                                />
                            ))}

                            {/* Central hub */}
                            <div
                                className="intro-pulse relative z-10 flex h-16 w-16 items-center justify-center"
                                style={{
                                    background: `linear-gradient(135deg, ${accent}, ${accentAlt})`,
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                    boxShadow: `0 0 60px color-mix(in srgb, ${accent} 30%, transparent)`,
                                }}
                            >
                                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                </svg>
                            </div>

                            {/* Animated data particles (simplified) */}
                            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                                <circle r="2" fill={accent} opacity="0.4" className="intro-trail">
                                    <animateMotion dur="4s" repeatCount="indefinite" path="M200,200 L100,50" />
                                </circle>
                                <circle r="2" fill={accentAlt} opacity="0.35" className="intro-trail">
                                    <animateMotion dur="5s" repeatCount="indefinite" path="M200,200 L320,320" />
                                </circle>
                                <circle r="1.5" fill={accent} opacity="0.3" className="intro-trail">
                                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M200,200 L60,200" />
                                </circle>
                            </svg>
                        </div>

                        {/* ── DESKTOP+: Full animation ── */}
                        <div className="hidden md:block relative h-[24rem] w-full sm:h-[30rem] lg:h-[34rem]">

                            {/* Background glow disc */}
                            <div
                                className="intro-glow-disc absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{
                                    background: `radial-gradient(circle, color-mix(in srgb, ${accent} 7%, transparent) 0%, color-mix(in srgb, ${accentAlt} 3%, transparent) 40%, transparent 70%)`,
                                }}
                                aria-hidden="true"
                            />

                            {/* Second glow disc — offset */}
                            <div
                                className="intro-glow-disc-2 absolute left-[55%] top-[45%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{
                                    background: `radial-gradient(circle, color-mix(in srgb, ${accentAlt} 5%, transparent) 0%, transparent 65%)`,
                                }}
                                aria-hidden="true"
                            />

                            {/* Hexagonal frame (SVG) — 3 layers */}
                            <svg className="intro-hex absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 sm:h-[32rem] sm:w-[32rem]" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                                <polygon points="200,20 360,105 360,295 200,380 40,295 40,105" stroke={accent} strokeWidth="0.6" strokeDasharray="6 4" opacity="0.1" />
                                <polygon points="200,45 335,118 335,282 200,355 65,282 65,118" stroke={accentAlt} strokeWidth="0.5" strokeDasharray="4 6" opacity="0.07" />
                                <polygon points="200,70 310,130 310,270 200,330 90,270 90,130" stroke={accent} strokeWidth="0.4" strokeDasharray="3 5" opacity="0.05" />
                            </svg>

                            {/* Rotating gradient ring (conic gradient) */}
                            <div
                                className="intro-gradient-ring absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{
                                    background: `conic-gradient(from 0deg, transparent 0%, color-mix(in srgb, ${accent} 15%, transparent) 25%, transparent 50%, color-mix(in srgb, ${accentAlt} 12%, transparent) 75%, transparent 100%)`,
                                    mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
                                    WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
                                }}
                                aria-hidden="true"
                            />

                            {/* Orbital rings — 5 rings */}
                            <div className="intro-orbit absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: `color-mix(in srgb, ${accent} 18%, transparent)` }} aria-hidden="true" />
                            <div className="intro-orbit-reverse absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 14%, transparent)` }} aria-hidden="true" />
                            <div className="intro-orbit absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: `color-mix(in srgb, ${accent} 10%, transparent)` }} aria-hidden="true" />
                            <div className="intro-orbit-reverse absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed" style={{ borderColor: `color-mix(in srgb, ${accent} 6%, transparent)` }} aria-hidden="true" />
                            <div className="intro-orbit absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 4%, transparent)` }} aria-hidden="true" />

                            {/* Pulsing ring dots on inner orbit */}
                            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                                <div
                                    key={`ring-dot-${i}`}
                                    className="intro-ring-dot absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                    style={{
                                        background: i % 2 === 0 ? accent : accentAlt,
                                        transform: `rotate(${deg}deg) translateX(80px) rotate(-${deg}deg)`,
                                        transformOrigin: '0 0',
                                        boxShadow: `0 0 8px ${i % 2 === 0 ? accent : accentAlt}`,
                                        animationDelay: `${i * 0.5}s`,
                                    }}
                                    aria-hidden="true"
                                />
                            ))}

                            {/* Central hub — hexagonal clip */}
                            <div
                                className="intro-pulse absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                                style={{
                                    background: `linear-gradient(135deg, ${accent}, ${accentAlt})`,
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                    boxShadow: `0 0 80px color-mix(in srgb, ${accent} 35%, transparent)`,
                                }}
                            >
                                <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                </svg>
                            </div>

                            {/* Corner HUD brackets — outer + inner */}
                            <span className="intro-bracket pointer-events-none absolute left-[8%] top-[6%] h-10 w-10 border-l-2 border-t-2" style={{ borderColor: `color-mix(in srgb, ${accent} 25%, transparent)` }} aria-hidden="true" />
                            <span className="intro-bracket pointer-events-none absolute right-[8%] top-[6%] h-10 w-10 border-r-2 border-t-2" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 25%, transparent)`, animationDelay: '0.75s' }} aria-hidden="true" />
                            <span className="intro-bracket pointer-events-none absolute bottom-[6%] right-[8%] h-10 w-10 border-b-2 border-r-2" style={{ borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`, animationDelay: '1.5s' }} aria-hidden="true" />
                            <span className="intro-bracket pointer-events-none absolute bottom-[6%] left-[8%] h-10 w-10 border-b-2 border-l-2" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 25%, transparent)`, animationDelay: '2.25s' }} aria-hidden="true" />
                            {/* Inner smaller brackets */}
                            <span className="intro-bracket pointer-events-none absolute left-[18%] top-[16%] h-5 w-5 border-l border-t" style={{ borderColor: `color-mix(in srgb, ${accent} 18%, transparent)`, animationDelay: '3s' }} aria-hidden="true" />
                            <span className="intro-bracket pointer-events-none absolute right-[18%] top-[16%] h-5 w-5 border-r border-t" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 18%, transparent)`, animationDelay: '3.5s' }} aria-hidden="true" />
                            <span className="intro-bracket pointer-events-none absolute bottom-[16%] right-[18%] h-5 w-5 border-b border-r" style={{ borderColor: `color-mix(in srgb, ${accent} 18%, transparent)`, animationDelay: '4s' }} aria-hidden="true" />
                            <span className="intro-bracket pointer-events-none absolute bottom-[16%] left-[18%] h-5 w-5 border-b border-l" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 18%, transparent)`, animationDelay: '4.5s' }} aria-hidden="true" />

                            {/* Data readout HUD panels — dynamic from DB */}
                            {data.hud_panels?.map((panel, pi) => {
                                const posMap: Record<string, { cls: string; color: string; dotColor: string; animClass: string }> = {
                                    'top-left':      { cls: 'left-2 top-4 sm:left-4', color: accent,    dotColor: '#10B981', animClass: 'intro-hud-panel' },
                                    'top-center':    { cls: 'left-1/2 top-4 -translate-x-1/2', color: accent,    dotColor: '#10B981', animClass: 'intro-hud-panel' },
                                    'top-right':     { cls: 'right-2 top-4 sm:right-4', color: accentAlt, dotColor: accent,   animClass: 'intro-hud-panel-2' },
                                    'middle-left':   { cls: 'left-2 top-1/2 -translate-y-1/2 sm:left-4', color: accent,    dotColor: '#10B981', animClass: 'intro-hud-panel' },
                                    'middle-right':  { cls: 'right-2 top-1/2 -translate-y-1/2 sm:right-4', color: accentAlt, dotColor: accent,   animClass: 'intro-hud-panel-2' },
                                    'bottom-left':   { cls: 'left-2 bottom-4 sm:left-4', color: accent,    dotColor: '#10B981', animClass: 'intro-hud-panel' },
                                    'bottom-center': { cls: 'left-1/2 bottom-4 -translate-x-1/2', color: accentAlt, dotColor: accent,   animClass: 'intro-hud-panel-2' },
                                    'bottom-right':  { cls: 'right-2 bottom-4 sm:right-4', color: accentAlt, dotColor: accent,   animClass: 'intro-hud-panel-2' },
                                };
                                const pos = posMap[panel.position] ?? posMap['top-left'];
                                return (
                                <div key={pi} className={`pointer-events-none absolute z-20 rounded-lg border p-2.5 ${pos.animClass} ${pos.cls}`} style={{ borderColor: `color-mix(in srgb, ${pos.color} 15%, transparent)`, background: 'color-mix(in srgb, white 85%, transparent)', backdropFilter: 'blur(8px)' }}>
                                    <div className="mb-1 flex items-center gap-1.5">
                                        <span className="intro-hud-dot h-1.5 w-1.5 rounded-full" style={{ background: pos.dotColor }} />
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{panel.label}</span>
                                    </div>
                                    {panel.stats?.map((stat, si) => (
                                        <p key={si} className="font-mono text-[13px]" style={{ color: si === 0 ? pos.color : 'rgb(156,163,175)' }}>
                                            <span className={si === 0 ? 'font-bold' : ''}>{stat.value}</span>{' '}
                                            <span className={si === 0 ? 'font-normal text-gray-400' : 'text-gray-300'}>{stat.label}</span>
                                        </p>
                                    ))}
                                </div>
                                );
                            })}

                            {/* Connection lines (SVG) with animated dots */}
                            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                                {/* Main lines from center to each node */}
                                <line x1="50%" y1="50%" x2="12%" y2="18%" stroke={accent} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="50%" y1="50%" x2="82%" y2="15%" stroke={accentAlt} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="50%" y1="50%" x2="92%" y2="50%" stroke={accent} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="50%" y1="50%" x2="82%" y2="82%" stroke={accentAlt} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="50%" y1="50%" x2="12%" y2="82%" stroke={accent} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="50%" y1="50%" x2="5%" y2="50%" stroke={accentAlt} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
                                {/* Cross connections between nodes */}
                                <line x1="12%" y1="18%" x2="82%" y2="15%" stroke={accent} strokeOpacity="0.06" strokeWidth="0.5" />
                                <line x1="82%" y1="15%" x2="92%" y2="50%" stroke={accentAlt} strokeOpacity="0.06" strokeWidth="0.5" />
                                <line x1="92%" y1="50%" x2="82%" y2="82%" stroke={accent} strokeOpacity="0.06" strokeWidth="0.5" />
                                <line x1="82%" y1="82%" x2="12%" y2="82%" stroke={accentAlt} strokeOpacity="0.06" strokeWidth="0.5" />
                                <line x1="12%" y1="82%" x2="5%" y2="50%" stroke={accent} strokeOpacity="0.06" strokeWidth="0.5" />
                                <line x1="5%" y1="50%" x2="12%" y2="18%" stroke={accentAlt} strokeOpacity="0.06" strokeWidth="0.5" />
                                {/* Secondary cross lines */}
                                <line x1="12%" y1="18%" x2="5%" y2="50%" stroke={accent} strokeOpacity="0.04" strokeWidth="0.3" />
                                <line x1="82%" y1="15%" x2="12%" y2="18%" stroke={accentAlt} strokeOpacity="0.04" strokeWidth="0.3" />
                                <line x1="12%" y1="82%" x2="82%" y2="82%" stroke={accent} strokeOpacity="0.04" strokeWidth="0.3" />

                                {/* Animated data particles along lines */}
                                <circle r="3" fill={accent} opacity="0.5" className="intro-trail">
                                    <animateMotion dur="3s" repeatCount="indefinite" path="M200,200 L48,72" />
                                </circle>
                                <circle r="2.5" fill={accentAlt} opacity="0.4" className="intro-trail">
                                    <animateMotion dur="4s" repeatCount="indefinite" path="M200,200 L328,60" />
                                </circle>
                                <circle r="2" fill={accent} opacity="0.45" className="intro-trail">
                                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M200,200 L368,200" />
                                </circle>
                                <circle r="2.5" fill={accentAlt} opacity="0.35" className="intro-trail">
                                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M200,200 L328,328" />
                                </circle>
                                <circle r="2" fill={accent} opacity="0.4" className="intro-trail">
                                    <animateMotion dur="3.8s" repeatCount="indefinite" path="M200,200 L48,328" />
                                </circle>
                                <circle r="2" fill={accentAlt} opacity="0.35" className="intro-trail">
                                    <animateMotion dur="5s" repeatCount="indefinite" path="M200,200 L20,200" />
                                </circle>
                                {/* Return particles (node to center) */}
                                <circle r="1.5" fill={accent} opacity="0.3" className="intro-trail">
                                    <animateMotion dur="4s" repeatCount="indefinite" path="M48,72 L200,200" />
                                </circle>
                                <circle r="1.5" fill={accentAlt} opacity="0.25" className="intro-trail">
                                    <animateMotion dur="5s" repeatCount="indefinite" path="M328,328 L200,200" />
                                </circle>

                                {/* Additional floating particles */}
                                {[...Array(16)].map((_, i) => (
                                    <circle
                                        key={i}
                                        cx={`${(i * 25 + 10) % 100}%`}
                                        cy={`${(i * 19 + 8) % 100}%`}
                                        r={1 + (i % 3) * 0.3}
                                        fill={i % 3 === 0 ? accent : i % 3 === 1 ? accentAlt : '#94a3b8'}
                                        opacity="0.15"
                                        className="intro-data-particle"
                                        style={{ animationDelay: `${(i % 8) * 0.9}s`, animationDuration: `${3 + (i % 5)}s` }}
                                    />
                                ))}
                            </svg>

                            {/* Scanline sweep */}
                            <div className="intro-scanline pointer-events-none absolute inset-x-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentAlt}, transparent)` }} aria-hidden="true" />
                            {/* Second scanline — slower, accent */}
                            <div className="intro-scanline-2 pointer-events-none absolute inset-x-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .intro-grid {
                    background-image:
                        linear-gradient(rgba(128, 128, 128, 0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(128, 128, 128, 0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                }
                .intro-orb { animation: introOrbPulse 8s ease-in-out infinite; }
                @keyframes introOrbPulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }
                .intro-glow-disc { animation: introGlowPulse 6s ease-in-out infinite; }
                .intro-glow-disc-2 { animation: introGlowPulse2 8s ease-in-out infinite reverse; }
                @keyframes introGlowPulse {
                    0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
                }
                @keyframes introGlowPulse2 {
                    0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.12); }
                }
                @keyframes introFadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .intro-fade { animation: introFadeUp 0.7s ease-out 0.1s both; }
                .intro-fade-delayed { animation: introFadeUp 0.7s ease-out 0.3s both; }
                .intro-gradient-ring { animation: introGradRingSpin 12s linear infinite; }
                @keyframes introGradRingSpin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .intro-hex { animation: introHexSpin 60s linear infinite; }
                @keyframes introHexSpin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .intro-pulse { animation: introPulseGlow 3s ease-in-out infinite; }
                @keyframes introPulseGlow {
                    0%, 100% { box-shadow: 0 0 60px color-mix(in srgb, var(--isp-primary) 25%, transparent); }
                    50% { box-shadow: 0 0 120px color-mix(in srgb, var(--isp-primary) 45%, transparent), 0 0 200px color-mix(in srgb, var(--isp-accent) 15%, transparent); }
                }
                .intro-orbit { animation: introOrbitSpin 25s linear infinite; }
                .intro-orbit-reverse { animation: introOrbitSpin 35s linear infinite reverse; }
                @keyframes introOrbitSpin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .intro-bracket { animation: introBracketPulse 3s ease-in-out infinite; }
                @keyframes introBracketPulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.9; }
                }
                .intro-ring-dot { animation: introRingDotPulse 2s ease-in-out infinite; }
                @keyframes introRingDotPulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
                .intro-hud-panel { animation: introFadeUp 0.6s ease-out 0.6s both; }
                .intro-hud-panel-2 { animation: introFadeUp 0.6s ease-out 0.8s both; }
                .intro-hud-dot { animation: introHudDotBlink 2s ease-in-out infinite; }
                @keyframes introHudDotBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                .intro-data-particle { animation: introParticleBlink linear infinite; }
                @keyframes introParticleBlink {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.35; }
                }
                .intro-scanline { animation: introScanSweep 5s linear infinite; }
                .intro-scanline-2 { animation: introScanSweep2 7s linear infinite 2s; }
                @keyframes introScanSweep {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 0.25; }
                    90% { opacity: 0.25; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes introScanSweep2 {
                    0% { top: 100%; opacity: 0; }
                    10% { opacity: 0.15; }
                    90% { opacity: 0.15; }
                    100% { top: 0%; opacity: 0; }
                }
                .intro-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s ease;
                }
                .intro-btn:hover::before { left: 100%; }

                @media (prefers-reduced-motion: reduce) {
                    .intro-grid, .intro-orb, .intro-glow-disc, .intro-glow-disc-2, .intro-fade, .intro-fade-delayed,
                    .intro-hex, .intro-pulse, .intro-orbit, .intro-orbit-reverse,
                    .intro-bracket,
                    .intro-gradient-ring, .intro-ring-dot,
                    .intro-hud-panel, .intro-hud-panel-2, .intro-hud-dot,
                    .intro-data-particle, .intro-scanline, .intro-scanline-2, .intro-trail,
                    .intro-btn::before {
                        animation: none !important;
                    }
                    .intro-fade, .intro-fade-delayed { opacity: 1; transform: none; }
                }
            `}</style>
        </section>
    );
}
