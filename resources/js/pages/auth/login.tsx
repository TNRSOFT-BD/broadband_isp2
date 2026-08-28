import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => setData('password', ''),
        });
    };

    return (
        <AuthSplitLayout
            title="Welcome Back"
            description="Sign in to access your account and manage your services."
            eyebrow="SECURE LOGIN"
        >
            <Head title="Log in" />

            {/* Status message */}
            {status && (
                <div className="auth-status-message auth-status-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {status}
                </div>
            )}

            {/* General auth error */}
            {errors.email && !errors.email.includes('required') && (
                <div className="auth-error-alert" role="alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    {errors.email}
                </div>
            )}

            <form onSubmit={submit}>
                {/* Email field */}
                <div className="auth-field-group">
                    <label className="auth-field-label" htmlFor="email">
                        <Mail size={13} strokeWidth={2} />
                        Email Address
                    </label>
                    <div className="auth-input-wrap">
                        <input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="you@example.com"
                            disabled={processing}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className={`auth-input auth-input-has-icon ${errors.email ? 'auth-input-auth-error' : ''}`}
                        />
                    </div>
                    {errors.email && (
                        <p className="auth-input-error" id="email-error" role="alert">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="12" />
                                <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password field */}
                <div className="auth-field-group">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <label className="auth-field-label" htmlFor="password" style={{ marginBottom: 0 }}>
                            <Lock size={13} strokeWidth={2} />
                            Password
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                tabIndex={5}
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    color: 'var(--isp-primary, #2563EB)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                }}
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <div className="auth-input-wrap">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter your password"
                            disabled={processing}
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                            className={`auth-input auth-input-has-icon ${errors.password ? 'auth-input-auth-error' : ''}`}
                            style={{ paddingRight: '2.75rem' }}
                        />
                        <button
                            type="button"
                            className="auth-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            title={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <EyeOff size={18} strokeWidth={1.5} />
                            ) : (
                                <Eye size={18} strokeWidth={1.5} />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="auth-input-error" id="password-error" role="alert">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="12" />
                                <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Remember me + Forgot password row */}
                <div className="auth-remember-row">
                    <div className="auth-remember-left">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', !!checked)}
                            tabIndex={3}
                            disabled={processing}
                        />
                        <label htmlFor="remember" className="auth-remember-label">
                            Remember me
                        </label>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="auth-signin-btn"
                    tabIndex={4}
                    disabled={processing}
                >
                    {processing && (
                        <LoaderCircle
                            className="auth-spinner"
                            size={16}
                            strokeWidth={2}
                        />
                    )}
                    <span className="auth-signin-btn-label">
                        {processing ? 'Signing in...' : 'Sign In'}
                    </span>
                </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
                <span className="auth-divider-text">or</span>
            </div>

            {/* Back to website */}
            <div style={{ textAlign: 'center' }}>
                <Link
                    href="/"
                    tabIndex={6}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        color: 'var(--muted-foreground)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                    }}
                >
                    <ArrowLeft size={14} strokeWidth={2} />
                    Back to website
                </Link>
            </div>

            {/* Security badge */}
            <div className="auth-security-badge">
                <ShieldCheck size={14} strokeWidth={2} />
                <span>Secured with 256-bit encryption</span>
            </div>
        </AuthSplitLayout>
    );
}
