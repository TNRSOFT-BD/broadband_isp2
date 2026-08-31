import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { Link } from '@inertiajs/react';

interface HomepageServicesItem {
    id: number;
    title: string;
    category: string | null;
    description: string | null;
    image: string;
    link: string;
    open_in_new_tab: boolean;
}

interface HomepageServicesData {
    title: string;
    subtitle: string;
    categories: string[];
    items: HomepageServicesItem[];
}

export default function HomepageServicesSection({ data }: { data: HomepageServicesData }) {
    const [isPaused, setIsPaused] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const accent = 'var(--isp-primary)';

    const allItems = data.items ?? [];
    const categories = data.categories ?? [];

    const filteredItems = activeCategory === 'all'
        ? allItems
        : allItems.filter((item) => item.category === activeCategory);

    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const animRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const speed = 0.04; // pixels per ms

    // Check if items overflow the container
    useLayoutEffect(() => {
        const container = containerRef.current;
        const measure = measureRef.current;
        if (!container || !measure) return;

        const check = () => {
            setIsOverflowing(measure.scrollWidth > container.clientWidth);
        };
        check();

        const ro = new ResizeObserver(check);
        ro.observe(container);
        return () => ro.disconnect();
    }, [filteredItems.length]);

    // Duplicate items enough times for seamless infinite scroll (only when overflowing)
    const repeatCount = isOverflowing ? Math.max(4, Math.ceil(3 / Math.max(filteredItems.length, 1)) * 2) : 1;
    const trackItems = isOverflowing
        ? Array.from({ length: repeatCount }, () => filteredItems).flat()
        : filteredItems;

    const animate = useCallback((time: number) => {
        if (!trackRef.current || !isOverflowing) return;
        if (lastTimeRef.current === 0) lastTimeRef.current = time;
        const delta = time - lastTimeRef.current;
        lastTimeRef.current = time;

        if (!isPaused) {
            const trackWidth = trackRef.current.scrollWidth / repeatCount;
            setTranslateX((prev) => {
                const next = prev - speed * delta;
                return next <= -trackWidth ? 0 : next;
            });
        }
        animRef.current = requestAnimationFrame(animate);
    }, [isPaused, isOverflowing, repeatCount]);

    useEffect(() => {
        if (!isOverflowing) {
            setTranslateX(0);
            return;
        }
        lastTimeRef.current = 0;
        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [animate, isOverflowing]);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    const tabItems = [{ key: 'all', label: 'All' }, ...categories.map((c) => ({ key: c, label: c }))];

    return (
        <section id="digital-services" className="relative w-full overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
            <style>{`
                .homepage-marquee {
                    overflow: hidden;
                    white-space: nowrap;
                    -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
                    mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
                }
                .homepage-marquee-track {
                    display: inline-flex;
                    gap: 1.5rem;
                    padding: 0.5rem;
                    will-change: transform;
                }
                @media (prefers-reduced-motion: reduce) {
                    .homepage-marquee-track {
                        overflow-x: auto;
                        white-space: nowrap;
                    }
                }
            `}</style>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center sm:mb-12">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Entertainment Zone
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                        {data.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
                        {data.subtitle}
                    </p>
                </div>

                {/* Category Tabs */}
                {tabItems.length > 1 && (
                    <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
                        {tabItems.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveCategory(tab.key)}
                                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                    activeCategory === tab.key
                                        ? 'text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                style={activeCategory === tab.key ? { background: accent } : {}}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Hidden measure element — renders items once to measure natural width */}
            <div ref={measureRef} className="absolute invisible pointer-events-none" aria-hidden>
                <div className="inline-flex gap-6 p-2">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="h-52 w-80 shrink-0" />
                    ))}
                </div>
            </div>

            <div
                ref={containerRef}
                className={`${isOverflowing ? 'homepage-marquee' : ''} w-full`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
                aria-label="Digital services infinite scroll"
            >
                <div
                    ref={trackRef}
                    className="homepage-marquee-track"
                    style={
                        isOverflowing
                            ? { transform: `translateX(${translateX}px)` }
                            : { display: 'flex', justifyContent: 'center' }
                    }
                >
                    {trackItems.length > 0 ? (
                        trackItems.map((item, idx) => {
                            const inner = (
                                <>
                                    <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <span className="absolute inset-0 flex items-end p-4">
                                        <span className="flex w-full items-end justify-between gap-3">
                                            <span className="min-w-0">
                                                <span className="block truncate text-base font-semibold text-white">
                                                    {item.title}
                                                </span>
                                                {item.description && (
                                                    <span className="mt-1 block truncate text-xs text-gray-300/90">
                                                        {item.description}
                                                    </span>
                                                )}
                                            </span>
                                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M7 17L17 7" />
                                                    <path d="M7 7h10v10" />
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                    <span
                                        className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-300 group-hover:w-full"
                                        style={{ background: accent }}
                                    />
                                </>
                            );

                            return item.link ? (
                                <Link
                                    key={`${item.id}-${idx}`}
                                    href={item.link}
                                    target={item.open_in_new_tab ? '_blank' : undefined}
                                    rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
                                    className="homepage-marquee-card group relative inline-flex h-52 w-80 shrink-0 snap-start overflow-hidden rounded-2xl bg-cover bg-center"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                >
                                    {inner}
                                </Link>
                            ) : (
                                <div
                                    key={`${item.id}-${idx}`}
                                    className="homepage-marquee-card group relative inline-flex h-52 w-80 shrink-0 snap-start overflow-hidden rounded-2xl bg-cover bg-center"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                >
                                    {inner}
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex h-52 w-full items-center justify-center text-gray-500">
                            No services available.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
