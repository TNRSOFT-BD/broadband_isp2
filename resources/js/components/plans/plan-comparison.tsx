import ServiceLogo from '@/components/plans/service-logo';
import { type Plan } from '@/types/plans';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Check, Minus, X } from 'lucide-react';

interface PlanComparisonProps {
    plans: Plan[];
    currencySymbol: string;
    open: boolean;
    onClose: () => void;
}

function ComparisonCell({ has, children }: { has?: boolean; children?: React.ReactNode }) {
    if (has === undefined) return <td className="px-4 py-3 text-sm text-gray-500">{children ?? <Minus className="mx-auto h-4 w-4 text-gray-300" />}</td>;
    if (!has) {
        return (
            <td className="px-4 py-3">
                <X className="mx-auto h-4 w-4 text-gray-300" aria-label="Not included" />
            </td>
        );
    }
    return <td className="px-4 py-3">{children}</td>;
}

export default function PlanComparison({ plans, currencySymbol, open, onClose }: PlanComparisonProps) {
    if (plans.length === 0) return null;

    const maxFeatureCount = Math.max(...plans.map((p) => p.features.length));

    return (
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent className="max-w-3xl overflow-hidden rounded-xl sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Compare Plans</DialogTitle>
                    <DialogDescription>
                        Side-by-side comparison of {plans.length} selected {plans.length === 1 ? 'plan' : 'plans'}.
                    </DialogDescription>
                </DialogHeader>

                <div className="-mx-1 overflow-x-auto px-1 pb-2">
                    <table className="w-full min-w-[560px] border-collapse text-left">
                        <caption className="sr-only">Internet plan comparison table</caption>
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th scope="col" className="w-36 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Feature
                                </th>
                                {plans.map((plan) => (
                                    <th key={plan.id} scope="col" className="px-4 py-3 text-center">
                                        <span className={cn('block font-bold', plan.is_featured ? 'text-[var(--isp-primary)]' : 'text-gray-900')}>{plan.name}</span>
                                        <span className="mt-1 block text-xs font-normal text-gray-400">
                                            {plan.speed} {plan.speed_unit}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <th scope="row" className="px-4 py-3 text-sm font-medium text-gray-600">Monthly Price</th>
                                {plans.map((plan) => (
                                    <td key={plan.id} className="px-4 py-3 text-center">
                                        <span className="font-bold text-gray-900">{currencySymbol}{Number(plan.monthly_price).toLocaleString()}</span>
                                        <span className="block text-xs text-gray-400">/ month</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th scope="row" className="px-4 py-3 text-sm font-medium text-gray-600">Speed</th>
                                {plans.map((plan) => (
                                    <td key={plan.id} className="px-4 py-3 text-center text-sm text-gray-700">
                                        {plan.speed} {plan.speed_unit}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th scope="row" className="px-4 py-3 text-sm font-medium text-gray-600">Download / Upload</th>
                                {plans.map((plan) => (
                                    <ComparisonCell key={plan.id} has={Boolean(plan.download_speed)}>
                                        <span className="block text-center text-sm text-gray-700">
                                            {plan.download_speed ?? '—'} ↓
                                            <br />
                                            {plan.upload_speed ?? '—'} ↑
                                        </span>
                                    </ComparisonCell>
                                ))}
                            </tr>
                            <tr>
                                <th scope="row" className="px-4 py-3 text-sm font-medium text-gray-600">Setup Fee</th>
                                {plans.map((plan) => (
                                    <td key={plan.id} className="px-4 py-3 text-center text-sm text-gray-700">
                                        {Number(plan.setup_fee) > 0 ? `${currencySymbol}${Number(plan.setup_fee)}` : 'Free'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th scope="row" className="px-4 py-3 text-sm font-medium text-gray-600">Contract</th>
                                {plans.map((plan) => (
                                    <td key={plan.id} className="px-4 py-3 text-center text-sm text-gray-700">
                                        {plan.contract_duration ?? 'No lock-in'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <th scope="row" className="px-4 py-3 align-top text-sm font-medium text-gray-600">OTT &amp; Services</th>
                                {plans.map((plan) => (
                                    <td key={plan.id} className="px-4 py-3">
                                        {plan.services.length > 0 ? (
                                            <div className="flex flex-wrap items-center justify-center gap-1.5">
                                                {plan.services.map((service) => (
                                                    <ServiceLogo key={`${plan.id}-${service.id}`} name={service.custom_label ?? service.name} logo={service.logo} className="h-8 w-8" />
                                                ))}
                                            </div>
                                        ) : (
                                            <Minus className="mx-auto h-4 w-4 text-gray-300" />
                                        )}
                                    </td>
                                ))}
                            </tr>
                            {[...Array(maxFeatureCount)].map((_, featureIndex) => (
                                <tr key={`feature-${featureIndex}`}>
                                    <th scope="row" className="px-4 py-3 text-sm font-medium text-gray-600">
                                        {featureIndex === 0 ? 'Key Features' : ''}
                                    </th>
                                    {plans.map((plan) => {
                                        const feature = plan.features[featureIndex];
                                        return <ComparisonCell key={plan.id} has={feature !== undefined}>{feature?.title}</ComparisonCell>;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {plans.map((plan) => (
                        <a
                            key={plan.id}
                            href={plan.cta_url ?? `/plans/${plan.slug}`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[var(--isp-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--isp-primary-dark)]"
                        >
                            <Check className="h-4 w-4" />
                            Choose {plan.name}
                        </a>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
