import PlanCard from '@/components/plans/plan-card';
import PlanCategoryFilter from '@/components/plans/plan-category-filter';
import PlanComparison from '@/components/plans/plan-comparison';
import PlansHero from '@/components/plans/plans-hero';
import PublicLayout from '@/layouts/public-layout';
import { type Plan, type PlanCategory, type PlansPageSettings } from '@/types/plans';
import { Head, usePage } from '@inertiajs/react';
import { GitCompareArrows } from 'lucide-react';
import { useMemo, useState } from 'react';

interface PlansIndexProps extends Record<string, unknown> {
    pageSettings: PlansPageSettings;
    categories: PlanCategory[];
    plans: Plan[];
}

export default function PlansIndex() {
    const { pageSettings, categories, plans } = usePage<PlansIndexProps>().props;

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [compareIds, setCompareIds] = useState<number[]>([]);
    const [comparisonOpen, setComparisonOpen] = useState(false);

    const filteredPlans = useMemo(() => {
        if (!activeCategory) return plans;
        return plans.filter((plan) => plan.category?.slug === activeCategory);
    }, [plans, activeCategory]);

    const comparedPlans = useMemo(
        () => compareIds.map((id) => plans.find((plan) => plan.id === id)).filter((plan): plan is Plan => Boolean(plan)),
        [compareIds, plans],
    );

    const toggleCompare = (planId: number) => {
        setCompareIds((current) =>
            current.includes(planId) ? current.filter((id) => id !== planId) : current.length >= 3 ? current : [...current, planId],
        );
    };

    // Sort: featured first, then recommended, then by original order
    const sortedPlans = useMemo(() => {
        const weight = (plan: Plan) => (plan.is_featured ? 0 : plan.is_recommended ? 1 : 2);
        return [...filteredPlans].sort((a, b) => weight(a) - weight(b));
    }, [filteredPlans]);

    return (
        <PublicLayout>
            <Head>
                <title>{pageSettings.meta_title ?? 'Internet Plans'}</title>
                {pageSettings.meta_description && <meta name="description" content={pageSettings.meta_description} />}
                {pageSettings.meta_keywords && <meta name="keywords" content={pageSettings.meta_keywords} />}
                <meta property="og:title" content={pageSettings.meta_title ?? 'Internet Plans'} />
                {pageSettings.meta_description && <meta property="og:description" content={pageSettings.meta_description} />}
                <meta property="og:type" content="website" />
            </Head>

            {/* Hero */}
            <PlansHero settings={pageSettings} />

            {/* Category navigation */}
            {categories.length > 0 && (
                <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Plan categories">
                    <div className="rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-xl shadow-gray-200/50 backdrop-blur">
                        <PlanCategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
                    </div>
                </section>
            )}

            {/* Plans grid */}
            <section id="plans-section" className="mx-auto max-w-7xl scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8">
                {(pageSettings.section_plans_title || pageSettings.section_category_title) && (
                    <header className="mb-10 text-center">
                        {activeCategory === null && pageSettings.section_category_title && (
                            <>
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{pageSettings.section_plans_title}</h2>
                                {pageSettings.section_plans_description && (
                                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">{pageSettings.section_plans_description}</p>
                                )}
                            </>
                        )}
                        {activeCategory !== null && (
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {categories.find((c) => c.slug === activeCategory)?.name} Plans
                            </h2>
                        )}
                    </header>
                )}

                {sortedPlans.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                        {sortedPlans.map((plan) => (
                            <div key={plan.id} className="flex">
                                <PlanCard
                                    plan={plan}
                                    currencySymbol={pageSettings.currency_symbol}
                                    isSelectedForCompare={compareIds.includes(plan.id)}
                                    onToggleCompare={toggleCompare}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty state */
                    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <GitCompareArrows className="h-10 w-10 text-gray-300" aria-hidden="true" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-700">No plans available</h3>
                        <p className="mt-1 text-sm text-gray-500">We're updating our offerings. Please check back soon or contact support.</p>
                        {activeCategory !== null && (
                            <button type="button" onClick={() => setActiveCategory(null)} className="mt-5 text-sm font-medium text-[var(--isp-primary)] hover:underline">
                                View all plans
                            </button>
                        )}
                    </div>
                )}
            </section>


            {/* Floating comparison bar + dialog */}
            {comparedPlans.length >= 1 && (
                <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
                    <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white py-2 pl-5 pr-2 shadow-2xl shadow-gray-400/30">
                        <span className="text-sm font-medium text-gray-600">
                            {comparedPlans.length} selected{compareIds.length >= 1 ? ` (max 3)` : ''}
                        </span>
                        <div className="flex items-center gap-1.5">
                            {comparedPlans.map((plan) => (
                                <button
                                    key={plan.id}
                                    type="button"
                                    onClick={() => toggleCompare(plan.id)}
                                    aria-label={`Remove ${plan.name} from comparison`}
                                    className="rounded-full bg-[var(--isp-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--isp-primary)] transition-colors hover:bg-red-100 hover:text-red-600"
                                >
                                    {plan.name} ×
                                </button>
                            ))}
                        </div>
                        {comparedPlans.length >= 2 && (
                            <button
                                type="button"
                                onClick={() => setComparisonOpen(true)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--isp-primary)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--isp-primary-dark)]"
                            >
                                Compare Now
                            </button>
                        )}
                    </div>
                </div>
            )}

            <PlanComparison plans={comparedPlans} currencySymbol={pageSettings.currency_symbol} open={comparisonOpen} onClose={() => setComparisonOpen(false)} />
        </PublicLayout>
    );
}
