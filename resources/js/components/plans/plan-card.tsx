import ServiceLogo from '@/components/plans/service-logo';
import { type Plan } from '@/types/plans';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Check, ChevronDown, GitCompareArrows, Star } from 'lucide-react';
import { useState } from 'react';

interface PlanCardProps {
    plan: Plan;
    currencySymbol: string;
    isSelectedForCompare?: boolean;
    onToggleCompare?: (planId: number) => void;
}

const INITIAL_FEATURES = 3;
const INITIAL_SERVICES = 4;

export default function PlanCard({ plan, currencySymbol, isSelectedForCompare = false, onToggleCompare }: PlanCardProps) {
    const [expandedServices, setExpandedServices] = useState(false);

    const featured = plan.is_featured || plan.is_recommended;
    // Featured cards show every feature; general cards show the first three.
    const visibleFeatures = featured ? plan.features : plan.features.slice(0, INITIAL_FEATURES);
    const badgeText = plan.badge_text ?? (plan.is_featured ? 'Most Popular' : plan.is_recommended ? 'Recommended' : null);
    const ctaUrl = plan.cta_url ?? `/plans/${plan.slug}`;
    const ctaText = plan.cta_text ?? 'Get This Plan';
    const hiddenServiceCount = plan.services.length - INITIAL_SERVICES;

    return (
        <article className={cn('group relative flex h-full w-full flex-col rounded-2xl transition-all duration-300', featured ? 'bg-[var(--isp-primary)] text-white shadow-xl' : 'bg-white')}>
            {!featured && <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl border border-gray-200 transition-colors duration-300 group-hover:border-[var(--isp-primary)]/30" />}

            {/* Floating badge */}
            {badgeText && (
                <span
                    className={cn(
                        'absolute -top-3.5 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full px-4 py-1 text-xs font-semibold shadow-md',
                        featured ? 'bg-white text-[var(--isp-primary)]' : 'text-white',
                    )}
                    style={
                        featured
                            ? undefined
                            : {
                                  background: 'var(--isp-primary)',
                                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                                  paddingInline: '1.25rem',
                              }
                    }
                >
                    <Star className={cn('h-3 w-3', featured ? 'fill-[var(--isp-accent)] text-[var(--isp-accent)]' : 'fill-current')} aria-hidden="true" />
                    {badgeText}
                </span>
            )}

            <div className="flex flex-1 flex-col">
                <div className="p-6 pt-7">
                    {/* Header */}
                    <div className="mb-1 flex items-start justify-between gap-3">
                        <div>
                            <h3 className={cn('font-bold', featured ? 'text-xl text-white' : 'text-lg text-gray-900')}>{plan.name}</h3>
                            {plan.tagline && <p className={cn('mt-0.5', featured ? 'text-sm font-bold text-white' : 'text-sm text-gray-500')}>{plan.tagline}</p>}
                        </div>
                        {onToggleCompare && (
                            <button
                                type="button"
                                onClick={() => onToggleCompare(plan.id)}
                                aria-pressed={isSelectedForCompare}
                                aria-label={`Add ${plan.name} to comparison`}
                                title="Compare"
                                className={cn(
                                    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                                    featured
                                        ? isSelectedForCompare
                                            ? 'border-transparent bg-white text-[var(--isp-primary)]'
                                            : 'border-white/40 text-white/80 hover:border-white hover:text-white'
                                        : isSelectedForCompare
                                          ? 'border-transparent text-white'
                                          : 'border-gray-300 text-gray-400 hover:border-[var(--isp-primary)] hover:text-[var(--isp-primary)]',
                                )}
                                style={
                                    !featured && isSelectedForCompare
                                        ? { background: 'var(--isp-primary)', boxShadow: '0 2px 10px -2px color-mix(in srgb, var(--isp-primary) 60%, transparent)' }
                                        : undefined
                                }
                            >
                                <GitCompareArrows className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Dominant speed display */}
                    <div
                        className="relative mt-5 overflow-hidden rounded-xl px-4 py-5 text-center"
                        style={featured ? { background: 'rgba(255, 255, 255, 0.12)' } : { background: 'linear-gradient(135deg, #0a0e1af2, #101b33f2)' }}
                    >
                        <div className="relative">
                            <span className="block text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                                {plan.speed}
                                <span className="ml-1 align-middle text-base font-semibold uppercase tracking-wide text-slate-400">{plan.speed_unit}</span>
                            </span>
                            <span className={cn('mt-1 block text-xs font-bold uppercase tracking-[0.2em]', featured ? 'text-white/90' : '')} style={featured ? undefined : { color: 'var(--isp-accent)' }}>
                                High-Speed Internet
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mt-5 flex items-baseline justify-center gap-1">
                        <span className={cn('text-xl font-bold', featured ? 'text-white' : 'text-gray-900')}>
                            {currencySymbol}
                            {Number(plan.monthly_price).toLocaleString(undefined, { minimumFractionDigits: 0 })}
                        </span>
                        <span className={cn('text-sm', featured ? 'font-semibold text-white' : 'text-gray-500')}>/ month</span>
                    </div>
                    {(Number(plan.setup_fee) > 0) && (
                        <p className={cn('mt-1 text-center text-xs', featured ? 'font-semibold text-white/90' : 'text-gray-500')}>+ {currencySymbol}{Number(plan.setup_fee)} one-time setup</p>
                    )}

                    {/* Description (featured only) */}
                    {featured && plan.description && (
                        <p className="mt-4 line-clamp-3 text-base font-bold leading-relaxed text-white/90">{plan.description}</p>
                    )}

                    {/* Features */}
                    <ul className="mt-6 space-y-2.5">
                        {visibleFeatures.map((feature) => (
                            <li key={feature.title} className="flex items-start gap-2">
                                <Check className={cn('mt-0.5 h-4 w-4 shrink-0', featured ? 'text-white' : '')} style={featured ? undefined : { color: 'var(--isp-success)' }} aria-hidden="true" />
                                <span className={cn(featured ? 'text-base font-bold text-white/95' : 'text-sm text-gray-600')}>
                                    {feature.title}
                                    {feature.description && <span className={cn('block', featured ? 'text-sm font-semibold text-white/70' : 'text-xs text-gray-400')}>{feature.description}</span>}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Included services */}
                    {plan.services.length > 0 && (
                        <div className={cn('mt-6 border-t pt-5', featured ? 'border-white/20' : 'border-gray-100')}>
                            <p className={cn('mb-3 text-xs font-semibold uppercase tracking-wider', featured ? 'text-white/80' : 'text-gray-400')}>Included Entertainment &amp; Services</p>
                            <div className="flex flex-wrap items-center gap-2.5">
                                {plan.services.slice(0, expandedServices ? undefined : INITIAL_SERVICES).map((service) => (
                                    <ServiceLogo key={`${service.id}-${service.slug}`} name={service.custom_label ?? service.name} logo={service.logo} className="h-10 w-10" />
                                ))}
                                {hiddenServiceCount > 0 && !expandedServices && (
                                    <button
                                        type="button"
                                        onClick={() => setExpandedServices(true)}
                                        className={cn(
                                            'inline-flex h-10 items-center rounded-lg border border-dashed px-3 text-xs font-semibold transition-colors',
                                            featured ? 'border-white/40 text-white/80 hover:border-white hover:text-white' : 'border-gray-300 text-gray-500 hover:border-[var(--isp-primary)] hover:text-[var(--isp-primary)]',
                                        )}
                                    >
                                        +{hiddenServiceCount} More
                                    </button>
                                )}
                                {expandedServices && hiddenServiceCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setExpandedServices(false)}
                                        className={cn(
                                            'inline-flex h-10 items-center gap-1 rounded-lg px-2 text-xs font-medium transition-colors',
                                            featured ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-600',
                                        )}
                                        aria-label="Show fewer services"
                                    >
                                        Less<ChevronDown className="h-3.5 w-3.5 rotate-180" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-auto p-6 pt-2">
                    {(plan.cta_text || plan.cta_url) && (
                        <a
                            href={ctaUrl}
                            className={cn(
                                'group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden py-3 text-sm font-semibold transition-colors',
                                featured ? 'bg-white text-[var(--isp-primary)] hover:bg-white/95' : 'text-white',
                            )}
                            style={
                                featured
                                    ? { clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }
                                    : {
                                          background: 'var(--isp-primary)',
                                          clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                                      }
                            }
                        >
                            <span className="relative z-10">{ctaText}</span>
                            <span className={cn('absolute inset-0 -translate-x-[100%] transition-transform duration-500 group-hover/btn:translate-x-[100%]', featured ? 'bg-[var(--isp-primary)]/10' : 'bg-white/15')} />
                        </a>
                    )}
                    <Link
                        href={`/plans/${plan.slug}`}
                        className={cn(
                            'group/view mt-3 relative inline-flex w-full items-center justify-center gap-2 overflow-hidden py-3 text-sm font-semibold transition-colors',
                            featured ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                        )}
                        style={{
                            clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                        }}
                    >
                        <span className="relative z-10">View Plan Details</span>
                        <span className={cn('absolute inset-0 -translate-x-[100%] transition-transform duration-500 group-hover/view:translate-x-[100%]', featured ? 'bg-white/10' : 'bg-gray-300/50')} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
