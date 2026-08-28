interface SciFiImageFrameProps {
    src: string;
    alt: string;
}

const OCTAGON_CLIP =
    'polygon(18px 0%, calc(100% - 18px) 0%, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 18px)';

export default function SciFiImageFrame({ src, alt }: SciFiImageFrameProps) {
    return (
        <div className="group relative">
            {/* ── MOBILE: Simple clean frame ── */}
            <div className="md:hidden">
                <div className="relative overflow-hidden rounded-2xl border-2" style={{ borderColor: 'var(--isp-primary)' }}>
                    <img
                        src={src}
                        alt={alt}
                        className="block aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Subtle gradient overlay */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{ background: 'rgba(10, 14, 26, 0.08)' }}
                        aria-hidden="true"
                    />
                    {/* Bottom gradient scrim */}
                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0e1a]/60 to-transparent"
                        aria-hidden="true"
                    />
                </div>
                {/* Simple accent bar under image */}
                <div className="mt-2 h-1 w-20 mx-auto rounded-full" style={{ background: 'var(--isp-primary)' }} />
            </div>

            {/* ── DESKTOP+: Full sci-fi frame ── */}
            <div className="hidden md:block">
                {/* Glow orbs */}
                <div
                    className="sci-frame-orb absolute -bottom-8 -left-8 -z-10 h-48 w-48 rounded-full blur-[110px]"
                    style={{ background: 'color-mix(in srgb, var(--isp-primary) 24%, transparent)' }}
                    aria-hidden="true"
                />
                <div
                    className="sci-frame-orb-slow absolute -right-8 -top-8 -z-10 h-44 w-44 rounded-full blur-[110px]"
                    style={{ background: 'color-mix(in srgb, var(--isp-accent) 20%, transparent)' }}
                    aria-hidden="true"
                />

                {/* Primary edge frame (octagon clip) */}
                <div
                    className="sci-frame relative"
                    style={{
                        clipPath: OCTAGON_CLIP,
                        background: 'var(--isp-primary)',
                        padding: '3px',
                    }}
                >
                    <div className="relative overflow-hidden" style={{ clipPath: OCTAGON_CLIP }}>
                        <img
                            src={src}
                            alt={alt}
                            className="block aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />

                        {/* Dark tint for depth */}
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{ background: 'rgba(10, 14, 26, 0.12)' }}
                            aria-hidden="true"
                        />

                        {/* Animated tech grid */}
                        <div className="sci-frame-grid pointer-events-none absolute inset-0" aria-hidden="true" />

                        {/* Dark scrim */}
                        <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0e1a]/85 to-transparent"
                            aria-hidden="true"
                        />

                        {/* Scanline sweep */}
                        <div
                            className="sci-frame-scan pointer-events-none absolute inset-x-0 h-[2px]"
                            style={{ background: 'linear-gradient(90deg, transparent, var(--isp-accent), transparent)' }}
                            aria-hidden="true"
                        />

                        {/* Shimmer sweep on hover */}
                        <span
                            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[150%] transition-transform duration-700 ease-out group-hover:translate-x-[250%]"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }}
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* HUD corner brackets */}
                <span
                    className="sci-frame-bracket absolute -left-2.5 -top-2.5 h-7 w-7 border-l-2 border-t-2"
                    style={{ borderColor: 'var(--isp-accent)' }}
                    aria-hidden="true"
                />
                <span
                    className="sci-frame-bracket absolute -right-2.5 -top-2.5 h-7 w-7 border-r-2 border-t-2"
                    style={{ borderColor: 'var(--isp-accent)', animationDelay: '0.75s' }}
                    aria-hidden="true"
                />
                <span
                    className="sci-frame-bracket absolute -bottom-2.5 -right-2.5 h-7 w-7 border-b-2 border-r-2"
                    style={{ borderColor: 'var(--isp-accent)', animationDelay: '1.5s' }}
                    aria-hidden="true"
                />
                <span
                    className="sci-frame-bracket absolute -bottom-2.5 -left-2.5 h-7 w-7 border-b-2 border-l-2"
                    style={{ borderColor: 'var(--isp-accent)', animationDelay: '2.25s' }}
                    aria-hidden="true"
                />
            </div>

            <style>{`
                .sci-frame-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: sciGridPulse 8s ease-in-out infinite;
                }
                @keyframes sciGridPulse {
                    0%, 100% { opacity: 0.08; }
                    50% { opacity: 0.16; }
                }
                .sci-frame-orb { animation: sciOrbPulse 7s ease-in-out infinite; }
                .sci-frame-orb-slow { animation: sciOrbPulse 9s ease-in-out infinite reverse; }
                @keyframes sciOrbPulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.15); }
                }
                .sci-frame-scan {
                    top: 0;
                    animation: sciScanSweep 5s linear infinite;
                }
                @keyframes sciScanSweep {
                    0% { top: -3%; opacity: 0; }
                    12% { opacity: 0.35; }
                    88% { opacity: 0.35; }
                    100% { top: 103%; opacity: 0; }
                }
                .sci-frame-bracket { animation: sciBracketPulse 3s ease-in-out infinite; }
                @keyframes sciBracketPulse {
                    0%, 100% { opacity: 0.55; }
                    50% { opacity: 1; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .sci-frame-grid, .sci-frame-orb, .sci-frame-orb-slow,
                    .sci-frame-scan, .sci-frame-bracket {
                        animation: none !important;
                    }
                    .sci-frame-scan { display: none; }
                }
            `}</style>
        </div>
    );
}
