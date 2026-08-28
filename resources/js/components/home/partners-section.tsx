interface Partner {
    id: number;
    name: string;
    logo: string | null;
    website_url: string | null;
}

function PartnerCard({ partner, accent, accentAlt }: { partner: Partner; accent: string; accentAlt: string }) {
    const inner = (
        <div className="group relative flex shrink-0 items-center gap-3 rounded-xl border px-5 py-3 transition-all duration-300 hover:-translate-y-0.5"
            style={{
                borderColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                background: 'color-mix(in srgb, rgba(0,0,0,0.02) 100%, transparent)',
                minWidth: '200px',
            }}
        >
            {/* Top glow */}
            <div
                className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                aria-hidden="true"
            />

            {partner.logo ? (
                <img src={partner.logo} alt={partner.name} className="h-8 w-auto shrink-0 object-contain transition-all duration-300 group-hover:scale-110" loading="lazy" />
            ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${accent} 15%, transparent)` }}>
                    <span className="text-sm font-bold" style={{ color: accent }}>{partner.name.charAt(0)}</span>
                </div>
            )}
            <span className="whitespace-nowrap text-sm font-medium text-gray-600 transition-colors duration-300 group-hover:text-gray-900">
                {partner.name}
            </span>

            {/* Corner dots */}
            <span className="pointer-events-none absolute left-1 top-1 h-1 w-1 rounded-full" style={{ background: `color-mix(in srgb, ${accent} 30%, transparent)` }} aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-1 right-1 h-1 w-1 rounded-full" style={{ background: `color-mix(in srgb, ${accentAlt} 30%, transparent)` }} aria-hidden="true" />
        </div>
    );

    return partner.website_url ? (
        <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="shrink-0">
            {inner}
        </a>
    ) : (
        <div className="shrink-0">{inner}</div>
    );
}

export default function PartnersSection({ partners }: { partners: Partner[] }) {
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    if (partners.length === 0) return null;

    const mid = Math.ceil(partners.length / 2);
    const row1 = partners.slice(0, mid);
    const row2 = partners.slice(mid);
    const row2Final = row2.length > 0 ? row2 : row1;

    return (
        <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
            {/* Grid */}
            <div className="pm-grid absolute inset-0 opacity-[0.025]" aria-hidden="true" />

            {/* Glow orbs */}
            <div className="pm-orb absolute -left-20 top-1/3 h-72 w-72 rounded-full blur-[120px]" style={{ background: `color-mix(in srgb, ${accent} 5%, transparent)` }} aria-hidden="true" />
            <div className="pm-orb-slow absolute -right-20 bottom-1/3 h-72 w-72 rounded-full blur-[120px]" style={{ background: `color-mix(in srgb, ${accentAlt} 4%, transparent)` }} aria-hidden="true" />

            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="pm-particle absolute h-1 w-1 rounded-full" style={{
                        background: i % 3 === 0 ? accent : i % 3 === 1 ? accentAlt : '#8B5CF6',
                        left: `${(i * 10 + 3) % 100}%`,
                        top: `${(i * 14 + 5) % 90}%`,
                        animationDelay: `${(i % 5) * 1.5}s`,
                        animationDuration: `${4 + (i % 3)}s`,
                    }} />
                ))}
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="pm-fade mb-12 text-center sm:mb-16">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>Partners</h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">Trusted by Organizations That Move Forward</h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">Powering connectivity for industry leaders across the nation.</p>
                </div>

                {/* Row 1 — scrolls left */}
                <div className="pm-marquee-wrap relative mb-6 py-4">
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 sm:w-32" style={{ background: 'linear-gradient(90deg, white, transparent)' }} aria-hidden="true" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 sm:w-32" style={{ background: 'linear-gradient(270deg, white, transparent)' }} aria-hidden="true" />
                    <div className="pm-track pm-left flex gap-4">
                        {[...row1, ...row1, ...row1].map((p, i) => (
                            <PartnerCard key={`r1-${i}`} partner={p} accent={accent} accentAlt={accentAlt} />
                        ))}
                    </div>
                </div>

                {/* Row 2 — scrolls right */}
                <div className="pm-marquee-wrap relative py-4">
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 sm:w-32" style={{ background: 'linear-gradient(90deg, white, transparent)' }} aria-hidden="true" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 sm:w-32" style={{ background: 'linear-gradient(270deg, white, transparent)' }} aria-hidden="true" />
                    <div className="pm-track pm-right flex gap-4">
                        {[...row2Final, ...row2Final, ...row2Final].map((p, i) => (
                            <PartnerCard key={`r2-${i}`} partner={p} accent={accent} accentAlt={accentAlt} />
                        ))}
                    </div>
                </div>

                {/* Bottom HUD line */}
                <div className="pm-fade mt-12 flex items-center justify-center gap-3">
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${accent} 15%, transparent))` }} />
                    <div className="pm-dot h-2 w-2 rotate-45" style={{ background: accent }} />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">End of Directory</span>
                    <div className="pm-dot h-2 w-2 rotate-45" style={{ background: accent }} />
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 15%, transparent), transparent)` }} />
                </div>
            </div>

            <style>{`
                .pm-grid {
                    background-image: linear-gradient(rgba(128,128,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.12) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: pmGridPulse 8s ease-in-out infinite;
                }
                @keyframes pmGridPulse { 0%, 100% { opacity: 0.02; } 50% { opacity: 0.05; } }
                .pm-orb { animation: pmOrbPulse 7s ease-in-out infinite; }
                .pm-orb-slow { animation: pmOrbPulse 9s ease-in-out infinite reverse; }
                @keyframes pmOrbPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
                @keyframes pmFloatUp {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    10% { opacity: 0.5; }
                    90% { opacity: 0.5; }
                    100% { transform: translateY(-40vh) scale(0); opacity: 0; }
                }
                .pm-particle { animation: pmFloatUp linear infinite; }
                @keyframes pmFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .pm-fade { animation: pmFadeUp 0.6s ease-out 0.1s both; }
                .pm-dot { animation: pmDotBlink 2s ease-in-out infinite; }
                @keyframes pmDotBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

                .pm-marquee-wrap {
                    overflow: hidden;
                    mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
                    -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
                }
                .pm-track { width: max-content; }
                .pm-left { animation: pmScrollLeft 25s linear infinite; }
                .pm-right { animation: pmScrollRight 30s linear infinite; }
                .pm-marquee-wrap:hover .pm-track { animation-play-state: paused; }
                @keyframes pmScrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
                @keyframes pmScrollRight { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(0); } }

                @media (prefers-reduced-motion: reduce) {
                    .pm-grid, .pm-orb, .pm-orb-slow, .pm-particle, .pm-fade, .pm-left, .pm-right, .pm-dot { animation: none !important; }
                    .pm-fade { opacity: 1; transform: none; }
                    .pm-track { transform: none; }
                }
            `}</style>
        </section>
    );
}
