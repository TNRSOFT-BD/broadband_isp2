interface MilestoneItem {
    id: number; year: string; title: string; description: string; image: string | null; image_alt: string | null;
}

export default function Timeline({ items }: { items: MilestoneItem[] }) {
    const accent = 'var(--isp-primary)';
    const lineColor = `color-mix(in srgb, ${accent} 20%, transparent)`;
    const dotBg = `color-mix(in srgb, ${accent} 10%, transparent)`;
    const cols = items.length;

    if (items.length === 0) return null;

    return (
        <section className="relative bg-white py-6 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                        Our Journey
                    </h2>
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                    <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Building the Future, Step by Step</h3>
                </div>

                {/* ═══ MOBILE TIMELINE ═══ */}
                <div className="relative md:hidden">
                    <div className="absolute left-4 top-0 h-full w-0.5" style={{ background: lineColor }} />
                    <div className="space-y-8">
                        {items.map((milestone, i) => (
                            <div key={milestone.id} className="relative flex items-start gap-6">
                                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white shadow-md" style={{ background: accent }}>
                                    <span className="text-[10px] font-bold text-white">{i + 1}</span>
                                </div>
                                <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
                                    <span className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold" style={{ background: dotBg, color: accent }}>{milestone.year}</span>
                                    <h4 className="mb-1 text-lg font-bold text-gray-900">{milestone.title}</h4>
                                    <p className="text-sm leading-relaxed text-gray-600">{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═══ DESKTOP TIMELINE ═══ */}
                <div className="hidden md:block">
                    <div className="relative mb-6">
                        <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2" style={{ background: lineColor }} />
                        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                            {items.map((milestone, i) => (
                                <div key={milestone.id} className="flex flex-col items-center">
                                    <span className="mb-2 rounded-full px-3 py-1 text-xs font-bold" style={{ background: dotBg, color: accent }}>{milestone.year}</span>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-md" style={{ background: accent }}>
                                        <span className="text-[10px] font-bold text-white">{i + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                        {items.map((milestone) => (
                            <div key={milestone.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50">
                                <h4 className="mb-1 text-base font-bold text-gray-900">{milestone.title}</h4>
                                <p className="text-sm leading-relaxed text-gray-600">{milestone.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
