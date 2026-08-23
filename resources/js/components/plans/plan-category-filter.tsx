import { type PlanCategory } from '@/types/plans';
import { cn } from '@/lib/utils';
import { LayoutGrid, Zap } from 'lucide-react';

interface PlanCategoryFilterProps {
    categories: PlanCategory[];
    activeCategory: string | null;
    onSelect: (slug: string | null) => void;
}

export default function PlanCategoryFilter({ categories, activeCategory, onSelect }: PlanCategoryFilterProps) {
    const items = [
        { slug: null, name: 'All Plans', icon: LayoutGrid },
        ...categories.map((category) => ({ slug: category.slug, name: category.name, icon: Zap })),
    ];

    return (
        <div
            role="tablist"
            aria-label="Filter plans by category"
            className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                                    border: '1px solid transparent',
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
    );
}
