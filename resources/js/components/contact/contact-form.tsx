import { type ContactPageSettings, type ContactInquiryType } from '@/types/contact';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactFormProps {
    settings: ContactPageSettings;
    inquiryTypes: ContactInquiryType[];
    successMessage?: string;
}

export default function ContactForm({ settings, inquiryTypes, successMessage }: ContactFormProps) {
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        inquiry_type_id: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/contact', {
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    if (!settings.contact_form_enabled) return null;

    if (submitted) {
        return (
            <section id="contact-form" className="relative bg-white py-10 sm:py-14">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-green-200 bg-white p-12 text-center shadow-sm">
                        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                        <h3 className="mt-6 text-xl font-bold text-gray-900">Message Sent!</h3>
                        <p className="mt-3 text-gray-500">
                            {successMessage || settings.contact_form_success_message}
                        </p>
                        <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--isp-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--isp-primary-dark)]"
                        >
                            Send Another Message
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact-form" className="relative bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-8 text-center">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                        {settings.contact_form_title}
                    </h2>
                    {settings.contact_form_description && (
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 text-justify">
                            {settings.contact_form_description}
                        </p>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Name */}
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                placeholder="Your full name"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                placeholder="+1 (555) 000-0000"
                            />
                            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        {/* Inquiry Type */}
                        <div className="sm:col-span-2">
                            <label htmlFor="inquiry_type_id" className="block text-sm font-semibold text-gray-700">
                                Inquiry Type
                            </label>
                            <select
                                id="inquiry_type_id"
                                value={data.inquiry_type_id}
                                onChange={(e) => setData('inquiry_type_id', e.target.value)}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm transition-colors focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                            >
                                <option value="">Select inquiry type...</option>
                                {inquiryTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {errors.inquiry_type_id && <p className="mt-1 text-xs text-red-500">{errors.inquiry_type_id}</p>}
                        </div>

                        {/* Subject */}
                        <div className="sm:col-span-2">
                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                                Subject <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="subject"
                                required
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                placeholder="How can we help you?"
                            />
                            {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                        </div>

                        {/* Message */}
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                placeholder="Tell us more about your inquiry..."
                            />
                            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden px-8 py-3.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            style={{
                                background: 'var(--isp-primary)',
                                clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                            }}
                        >
                            {processing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                            <span className="relative z-10">{processing ? 'Sending...' : 'Send Message'}</span>
                            <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
