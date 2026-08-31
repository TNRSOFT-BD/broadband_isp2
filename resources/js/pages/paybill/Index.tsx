import PublicLayout from '@/layouts/public-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CreditCard, ArrowRight, Shield, Clock, CheckCircle, Wifi } from 'lucide-react';


interface PayBillProps {
    [key: string]: unknown;
    paybillClientId: string | null;
    siteName: string | null;
}

const steps = [
    {
        icon: Wifi,
        title: 'Enter Details',
        description: 'Provide your username or mobile number linked to your account.',
    },
    {
        icon: CreditCard,
        title: 'Review Bill',
        description: 'Check your current due amount and billing period.',
    },
    {
        icon: CheckCircle,
        title: 'Pay Securely',
        description: 'Complete payment through our secure payment gateway.',
    },
];

export default function PayBillIndex() {
    const { paybillClientId, siteName } = usePage<PayBillProps>().props;
    const { data, setData } = useForm({
        q: '',
    });

    const paymentUrl = 'https://soft.nrlink.net/pay.php';
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';
    const overlay = '#0a0e1a';

    return (
        <PublicLayout>
            <Head>
                <title>{`Pay Bill - ${siteName ?? 'PayBill'}`}</title>
                <meta name="description" content={`Pay your bill online securely at ${siteName ?? 'PayBill'}. Fast, safe, and available 24/7.`} />
            </Head>

            {/* ── Hero Section ── */}
            <section className="relative overflow-hidden" style={{ background: overlay }}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
                    <div className="paybill-hero-grid absolute inset-0" />
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {[...Array(14)].map((_, i) => (
                        <div
                            key={i}
                            className="paybill-hero-particle absolute h-1 w-1 rounded-full"
                            style={{
                                background: i % 2 === 0 ? accent : accentAlt,
                                left: `${(i * 7.2 + 3) % 100}%`,
                                top: `${(i * 14.3 + 8) % 90}%`,
                                animationDelay: `${(i % 5) * 1.2}s`,
                                animationDuration: `${3.8 + (i % 4)}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Glow orbs */}
                <div
                    className="glow-orb paybill-orb absolute -left-32 top-1/3 h-72 w-72 rounded-full blur-[110px]"
                    style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
                    aria-hidden="true"
                />
                <div
                    className="glow-orb paybill-orb-slow absolute -right-32 top-2/3 h-72 w-72 rounded-full blur-[110px]"
                    style={{ background: `color-mix(in srgb, ${accentAlt} 10%, transparent)` }}
                    aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-24 pt-20 text-center sm:px-6 lg:px-8 lg:pt-24">
                    {/* Eyebrow badge */}
                    <div
                        className="paybill-hero-fade mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium backdrop-blur-md"
                        style={{
                            color: accent,
                            border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
                            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                        }}
                    >
                        <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
                        Online Payment
                    </div>

                    {/* Heading */}
                    <h1 className="paybill-hero-fade-delayed mb-6 max-w-4xl text-xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                        Pay Your Bill{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, ${accent}, ${accentAlt})` }}
                        >
                            Effortlessly
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="paybill-hero-fade-late mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
                        Quickly and securely pay your internet bill online. Enter your username or mobile number to get started — it only takes a minute.
                    </p>
                </div>

                {/* Bottom fade */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />

                <style>{`
                    .paybill-hero-grid {
                        background-image:
                            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
                        background-size: 60px 60px;
                        animation: paybillGridPulse 8s ease-in-out infinite;
                    }
                    @keyframes paybillGridPulse {
                        0%, 100% { opacity: 0.03; }
                        50% { opacity: 0.07; }
                    }
                    @keyframes paybillFloatUp {
                        0% { transform: translateY(0) scale(1); opacity: 0; }
                        10% { opacity: 0.6; }
                        90% { opacity: 0.6; }
                        100% { transform: translateY(-60vh) scale(0); opacity: 0; }
                    }
                    .paybill-hero-particle { animation: paybillFloatUp linear infinite; }
                    .glow-orb.paybill-orb { animation: paybillGlowPulse 7s ease-in-out infinite; }
                    .glow-orb.paybill-orb-slow { animation: paybillGlowPulse 9s ease-in-out infinite reverse; }
                    @keyframes paybillGlowPulse {
                        0%, 100% { opacity: 0.5; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.15); }
                    }
                    @keyframes paybillFadeUp {
                        from { opacity: 0; transform: translateY(28px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .paybill-hero-fade { animation: paybillFadeUp 0.8s ease-out 0.15s both; }
                    .paybill-hero-fade-delayed { animation: paybillFadeUp 0.8s ease-out 0.35s both; }
                    .paybill-hero-fade-late { animation: paybillFadeUp 0.8s ease-out 0.55s both; }
                    @media (prefers-reduced-motion: reduce) {
                        .paybill-hero-grid, .paybill-hero-particle, .paybill-orb, .paybill-orb-slow,
                        .paybill-hero-fade, .paybill-hero-fade-delayed, .paybill-hero-fade-late {
                            animation: none !important;
                        }
                        .paybill-hero-fade, .paybill-hero-fade-delayed, .paybill-hero-fade-late {
                            opacity: 1;
                            transform: none;
                        }
                    }
                `}</style>
            </section>

            {/* ── Payment Form ── */}
            <section className="relative -mt-12 pb-10">
                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
                            {/* Icon + title */}
                            <div className="mb-8 text-center">
                                <div
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                                    style={{ background: `color-mix(in srgb, var(--isp-primary) 10%, transparent)` }}
                                >
                                    <CreditCard className="h-8 w-8" style={{ color: 'var(--isp-primary)' }} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Bill Payment</h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Enter your Username or Mobile Number to proceed with payment.
                                </p>
                            </div>

                            <form method="GET" action={paymentUrl} className="space-y-5">
                                <input type="hidden" name="c" value={paybillClientId ?? ''} />

                                <div className="space-y-2">
                                    <label htmlFor="q" className="block text-sm font-semibold text-gray-700">
                                        Username / Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        id="q"
                                        name="q"
                                        value={data.q}
                                        onChange={(e) => setData('q', e.target.value)}
                                        placeholder="e.g. john_doe or 01XXXXXXXXX"
                                        required
                                        className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!paybillClientId}
                                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden px-8 py-3.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                    style={{
                                        background: 'var(--isp-primary)',
                                        clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                                    }}
                                >
                                    <span className="relative z-10">Pay Now</span>
                                    <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                                </button>

                                {!paybillClientId && (
                                    <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
                                        Payment is not configured. Please contact support.
                                    </div>
                                )}
                            </form>

                            {/* Trust indicators */}
                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <Shield className="h-3.5 w-3.5" />
                                        SSL Secured
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        Instant
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <CheckCircle className="h-3.5 w-3.5" />
                                        Verified
                                    </span>
                                </div>
                                <p className="mt-3 text-center text-xs text-gray-400">
                                    Secure payment powered by{' '}
                                    <span className="font-medium text-gray-500">{siteName}</span>
                                </p>
                            </div>

                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="py-10 sm:py-14">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>
                            How It Works
                        </h2>
                        <div className="mx-auto mb-4 h-1 w-12 rounded-full" style={{ background: accent }} />
                        <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Three Simple Steps
                        </h3>
                        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
                            Paying your bill has never been easier. Just follow these quick steps.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-3">
                        {steps.map((step, i) => (
                            <div key={step.title} className="relative text-center">
                                {/* Connector line */}
                                {i < steps.length - 1 && (
                                    <div className="absolute left-1/2 top-10 hidden h-[2px] w-full sm:block" style={{ background: `linear-gradient(to right, ${accent}40, ${accentAlt}40)` }} />
                                )}
                                <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-lg">
                                    <step.icon className="h-8 w-8" style={{ color: accent }} />
                                    <span
                                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                                        style={{ background: accent }}
                                    >
                                        {i + 1}
                                    </span>
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h4>
                                <p className="text-sm leading-relaxed text-gray-500">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </PublicLayout>
    );
}
