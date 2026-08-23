import ServiceLogo from '@/components/plans/service-logo';
import PublicLayout from '@/layouts/public-layout';
import { type Plan, type PlansPageSettings } from '@/types/plans';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Check, Clock, Download, FileText, Gauge, ShieldCheck, Upload } from 'lucide-react';

interface PlanShowProps extends Record<string, unknown> {
    pageSettings: PlansPageSettings;
    plan: Plan;
}

export default function PlanShow() {
    const { pageSettings, plan } = usePage<PlanShowProps>().props;

    const currency = pageSettings.currency_symbol;
    const accent = 'var(--isp-primary)';
    const overlay = '#0a0e1a';

    const pricingTiers = [
        { label: 'Monthly', price: plan.monthly_price, note: 'Billed monthly' },
        ...(plan.quarterly_price ? [{ label: 'Quarterly', price: plan.quarterly_price, note: 'Every 3 months' }] : []),
        ...(plan.yearly_price ? [{ label: 'Yearly', price: plan.yearly_price, note: 'Best value' }] : []),
    ];

    return (
        <PublicLayout>
            <Head>
                <title>{`${plan.name} — ${plan.speed} ${plan.speed_unit}`}</title>
                <meta name="description" content={plan.description ?? plan.tagline ?? `${plan.name}: ${plan.speed} ${plan.speed_unit} internet for ${currency}${Number(plan.monthly_price)}/month.`} />
                <meta property="og:title" content={plan.name} />
                <meta property="og:type" content="website" />
            </Head>

            {/* Hero */}
            <section className="relative overflow-hidden" style={{ background: overlay }}>
                <div className="plans-grid absolute inset-0 opacity-[0.04]" aria-hidden="true" />
                <div className="plans-detail-orb absolute -left-24 top-1/3 h-72 w-72 rounded-full blur-[120px]" style={{ background: `color-mix(in srgb, ${accent} 14%, transparent)` }} aria-hidden="true" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <Link href="/plans" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> Back to all plans
                    </Link>

                    <div className="mt-8 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-xl">
                            {plan.category && (
                                <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    {plan.category.name}
                                </span>
                            )}
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{plan.name}</h1>
                            {plan.tagline && <p className="mt-2 text-lg text-slate-400">{plan.tagline}</p>}
                        </div>

                        {/* Speed + price panel */}
                        <div className="w-full max-w-sm rounded-2xl p-[1.5px]" style={{ background: `linear-gradient(160deg, ${accent}, color-mix(in srgb, var(--isp-accent) 70%, transparent))` }}>
                            <div className="rounded-2xl bg-[#0d1424] p-6">
                                <div className="text-center">
                                    <span className="block text-5xl font-extrabold tracking-tight text-white">
                                        {plan.speed}
                                        <span className="ml-1 align-middle text-lg font-semibold uppercase text-slate-400">{plan.speed_unit}</span>
                                    </span>
                                    <span className="mt-6 block text-sm text-slate-400">Starting at</span>
                                    <span className="mt-1 block text-3xl font-bold text-white">
                                        {currency}{Number(plan.monthly_price).toLocaleString()}
                                        <span className="text-base font-medium text-slate-400"> / month</span>
                                    </span>
                                    {(plan.setup_fee !== null && Number(plan.setup_fee) > 0) && (
                                        <span className="mt-1 block text-xs text-slate-500">+ {currency}{Number(plan.setup_fee)} one-time setup fee</span>
                                    )}
                                    <a
                                        href={plan.cta_url ?? '#contact'}
                                        className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden py-3 text-sm font-semibold text-white"
                                        style={{ background: `linear-gradient(to right, ${accent}, var(--isp-secondary))`, clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
                                    >
                                        <span className="relative z-10">{plan.cta_text ?? 'Get This Plan'}</span>
                                        <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {[
                            { icon: Download, label: 'Download', value: plan.download_speed ? `${plan.download_speed} Mbps` : `Up to ${plan.speed} Mbps` },
                            { icon: Upload, label: 'Upload', value: plan.upload_speed ? `${plan.upload_speed} Mbps` : 'Balanced' },
                            { icon: Gauge, label: 'Latency', value: 'Ultra Low' },
                            { icon: ShieldCheck, label: 'Uptime', value: '99.9%' },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm">
                                <stat.icon className="h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</p>
                                    <p className="text-sm font-semibold text-white">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Body */}
            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Main column */}
                    <div className="space-y-10 lg:col-span-2">
                        {/* Overview */}
                        {plan.description && (
                            <section aria-labelledby="overview-heading">
                                <h2 id="overview-heading" className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <FileText className="h-5 w-5" style={{ color: accent }} /> Plan Overview
                                </h2>
                                <p className="leading-relaxed text-gray-600 whitespace-pre-line">{plan.description}</p>
                            </section>
                        )}

                        {/* Features */}
                        {plan.features.length > 0 && (
                            <section aria-labelledby="features-heading">
                                <h2 id="features-heading" className="mb-4 text-xl font-bold text-gray-900">Everything Included</h2>
                                <ul className="grid gap-3 sm:grid-cols-2">
                                    {plan.features.map((feature) => (
                                        <li key={`${feature.title}-${feature.id ?? ''}`} className="group flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[var(--isp-primary)]/30 hover:shadow-md">
                                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--isp-primary)]/10">
                                                <Check className="h-3.5 w-3.5" style={{ color: accent }} aria-hidden="true" />
                                            </span>
                                            <div>
                                                <p className="font-medium text-gray-800">{feature.title}</p>
                                                {feature.description && <p className="mt-0.5 text-sm text-gray-500">{feature.description}</p>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Services */}
                        {plan.services.length > 0 && (
                            <section aria-labelledby="services-heading">
                                <h2 id="services-heading" className="mb-4 text-xl font-bold text-gray-900">Included Entertainment &amp; Digital Services</h2>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {plan.services.map((service) => (
                                        <div key={`${service.slug}-${service.id}`} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                                            <ServiceLogo name={service.custom_label ?? service.name} logo={service.logo} />
                                            <div className="min-w-0">
                                                <p className="truncate font-semibold text-gray-800">{service.custom_label ?? service.name}</p>
                                                {service.duration ? (
                                                    <p className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Clock className="h-3 w-3" /> {service.duration}
                                                    </p>
                                                ) : service.description ? (
                                                    <p className="truncate text-xs text-gray-500">{service.description}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Pricing */}
                        <section aria-labelledby="pricing-heading" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 id="pricing-heading" className="mb-4 text-lg font-bold text-gray-900">Pricing Options</h2>
                            <div className="space-y-3">
                                {pricingTiers.map((tier, index) => {
                                    const monthlyEquivalent = tier.label === 'Quarterly'
                                        ? Number(tier.price) / 3
                                        : tier.label === 'Yearly'
                                            ? Number(tier.price) / 12
                                            : Number(tier.price);
                                    const savings = tier.label !== 'Monthly' ? ((Number(plan.monthly_price) - monthlyEquivalent) / Number(plan.monthly_price)) * 100 : 0;

                                    return (
                                        <div key={tier.label} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${index === 0 ? 'border-gray-200' : 'border-[var(--isp-primary)]/25 bg-[var(--isp-primary)]/[0.04]'}`}>
                                            <div>
                                                <p className="font-semibold text-gray-800">{tier.label}</p>
                                                <p className="text-xs text-gray-500">{tier.note}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">{currency}{Number(tier.price).toLocaleString()}</p>
                                                {savings > 0.5 && <p className="text-xs font-medium" style={{ color: 'var(--isp-success)' }}>Save {savings.toFixed(0)}%</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {plan.vat_information && <p className="mt-4 text-xs text-gray-400">{plan.vat_information}</p>}
                        </section>

                        {/* Contract & FUP */}
                        <section aria-labelledby="terms-heading" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 id="terms-heading" className="mb-4 text-lg font-bold text-gray-900">Good to Know</h2>
                            <dl className="space-y-4 text-sm">
                                {plan.contract_duration && (
                                    <div>
                                        <dt className="font-semibold text-gray-700">Contract Duration</dt>
                                        <dd className="mt-1 text-gray-500">{plan.contract_duration}</dd>
                                    </div>
                                )}
                                {plan.fair_usage_policy && (
                                    <div>
                                        <dt className="font-semibold text-gray-700">Fair Usage Policy</dt>
                                        <dd className="mt-1 leading-relaxed text-gray-500 whitespace-pre-line">{plan.fair_usage_policy}</dd>
                                    </div>
                                )}
                                {!plan.contract_duration && !plan.fair_usage_policy && (
                                    <dd className="text-gray-500">No long-term commitment required.</dd>
                                )}
                            </dl>
                        </section>

                        {/* Terms */}
                        {plan.terms_conditions && (
                            <details className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <summary className="cursor-pointer text-sm font-semibold text-gray-700 marker:text-[var(--isp-primary)]">Terms &amp; Conditions</summary>
                                <p className="mt-3 text-xs leading-relaxed text-gray-500 whitespace-pre-line">{plan.terms_conditions}</p>
                            </details>
                        )}
                    </aside>
                </div>
            </main>

            <style>{`
                .plans-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                    background-size: 60px 60px;
                }
                .plans-detail-orb { animation: detailGlow 9s ease-in-out infinite; }
                @keyframes detailGlow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.15); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .plans-detail-orb { animation: none !important; }
                }
            `}</style>
        </PublicLayout>
    );
}
