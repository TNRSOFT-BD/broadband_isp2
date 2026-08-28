import { useState, useRef, useEffect } from 'react';
import { type PlanCategory } from '@/types/plans';
import { cn } from '@/lib/utils';
import { LayoutGrid, Zap, ChevronDown, Check } from 'lucide-react';

interface PlanCategoryFilterProps {
    categories: PlanCategory[];
    activeCategory: string | null;
    onSelect: (slug: string | null) => void;
}

export default function PlanCategoryFilter({ categories, activeCategory, onSelect }: PlanCategoryFilterProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const items = [
        { slug: null, name: 'All Plans', icon: LayoutGrid },
        ...categories.map((category) => ({ slug: category.slug, name: category.name, icon: Zap })),
    ];

    const activeItem = items.find((i) => i.slug === activeCategory) ?? items[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (slug: string | null) => {
        onSelect(slug);
        setOpen(false);
    };

    return (
        <>
            {/* ── <800px: Custom dropdown ── */}
            <div className="cat-mobile-select" ref={dropdownRef}>
                <div className="relative">
                    {/* Trigger */}
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="flex w-full items-center gap-3 rounded-2xl border border-gray-200/80 bg-gradient-to-br from-white to-gray-50 py-3.5 pl-4 pr-4 text-left shadow-lg shadow-gray-200/40 transition-all duration-300 focus:border-[var(--isp-primary)] focus:shadow-xl focus:shadow-[var(--isp-primary)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--isp-primary)]/20 active:scale-[0.98]"
                    >
                        <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                            style={{ background: 'linear-gradient(135deg, var(--isp-primary), var(--isp-accent))' }}
                        >
                            <activeItem.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="flex-1 truncate text-sm font-semibold text-gray-800">{activeItem.name}</span>
                        <ChevronDown
                            className={cn(
                                'h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300',
                                open && 'rotate-180 text-[var(--isp-primary)]',
                            )}
                        />
                    </button>

                    {/* Dropdown list */}
                    <div
                        className={cn(
                            'absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-300/30 transition-all duration-200',
                            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none',
                        )}
                    >
                        <div className="max-h-64 overflow-y-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {items.map((item, i) => {
                                const isActive = item.slug === activeCategory;
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.slug ?? 'all'}
                                        type="button"
                                        onClick={() => handleSelect(item.slug)}
                                        className={cn(
                                            'flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-all duration-150',
                                            isActive
                                                ? 'bg-gradient-to-r from-[var(--isp-primary)]/10 to-[var(--isp-accent)]/5 text-[var(--isp-primary)]'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                        )}
                                        style={{ animationDelay: `${i * 30}ms` }}
                                    >
                                        <div
                                            className={cn(
                                                'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200',
                                                isActive
                                                    ? 'bg-[var(--isp-primary)]/15'
                                                    : 'bg-gray-100',
                                            )}
                                        >
                                            <Icon className={cn('h-3.5 w-3.5', isActive ? 'text-[var(--isp-primary)]' : 'text-gray-400')} />
                                        </div>
                                        <span className="flex-1">{item.name}</span>
                                        {isActive && (
                                            <Check className="h-4 w-4 shrink-0 text-[var(--isp-primary)]" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── >=800px: Button pills ── */}
            <div
                role="tablist"
                aria-label="Filter plans by category"
                className="cat-desktop-pills flex flex-wrap justify-start gap-1.5 sm:gap-2 lg:flex-nowrap lg:overflow-x-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
            >
                {items.map((item) => {
                    const isActive = item.slug === activeCategory;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.slug ?? 'all'}
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onSelect(item.slug)}
                            className={cn(
                                'group inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
                                isActive
                                    ? 'text-white'
                                    : 'border border-gray-200 bg-white text-gray-600 hover:border-[var(--isp-primary)]/40 hover:text-[var(--isp-primary)]',
                            )}
                            style={
                                isActive
                                    ? {
                                        background: `linear-gradient(135deg, var(--isp-primary), var(--isp-primary-dark))`,
                                        border: 'none',
                                    }
                                    : undefined
                            }
                        >
                            <Icon className={cn('h-4 w-4 transition-transform duration-300', !isActive && 'group-hover:scale-110')} />
                            {item.name}
                        </button>
                    );
                })}
            </div>

            <style>{`
                .cat-mobile-select { display: none; }
                .cat-desktop-pills { display: flex; }
                @media (max-width: 800px) {
                    .cat-mobile-select { display: block; }
                    .cat-desktop-pills { display: none !important; }
                }
            `}</style>
        </>
    );
}
