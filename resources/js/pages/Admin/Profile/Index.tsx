import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock, Save, Shield, Mail, CheckCircle2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Profile', href: '/admin/profile' },
];

interface UserData {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
}

interface PageProps {
    user: UserData;
    flash?: { success?: string; error?: string };
}

export default function AdminProfile() {
    const { user, flash } = usePage().props as unknown as PageProps;
    const accent = 'var(--isp-primary)';
    const accentAlt = 'var(--isp-accent)';

    const profileForm = useForm({
        name: user.name,
        email: user.email,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.put(route('admin.profile.update'));
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.put(route('admin.profile.password.update'), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Profile" />

            <div className="relative flex h-full flex-1 flex-col gap-6 overflow-hidden p-6">
                {/* Background grid */}
                <div className="profile-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

                {/* Glow orbs */}
                <div
                    className="profile-orb absolute -right-20 -top-20 h-80 w-80 rounded-full blur-[120px]"
                    style={{ background: `color-mix(in srgb, ${accent} 14%, transparent)` }}
                    aria-hidden="true"
                />
                <div
                    className="profile-orb-slow absolute -left-20 bottom-20 h-64 w-64 rounded-full blur-[100px]"
                    style={{ background: `color-mix(in srgb, ${accentAlt} 10%, transparent)` }}
                    aria-hidden="true"
                />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="profile-particle absolute h-1 w-1 rounded-full"
                            style={{
                                background: i % 2 === 0 ? accent : accentAlt,
                                left: `${(i * 9.5 + 5) % 100}%`,
                                top: `${(i * 16.7 + 10) % 90}%`,
                                animationDelay: `${(i % 4) * 1.5}s`,
                                animationDuration: `${4 + (i % 3)}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Flash message */}
                {flash?.success && (
                    <div
                        className="relative z-10 flex items-center gap-3 rounded-lg border px-5 py-3.5 text-sm font-medium backdrop-blur-md"
                        style={{
                            color: accent,
                            borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
                            background: `color-mix(in srgb, ${accent} 8%, transparent)`,
                        }}
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        {flash.success}
                    </div>
                )}

                {/* Page Header */}
                <div className="relative z-10">
                    <div className="mb-1 flex items-center gap-2">
                        <div
                            className="profile-fade flex h-8 w-8 items-center justify-center rounded-lg"
                            style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
                        >
                            <User className="h-4 w-4" style={{ color: accent }} />
                        </div>
                        <h1 className="profile-fade text-2xl font-bold tracking-tight text-foreground">
                            Profile Settings
                        </h1>
                    </div>
                    <p className="profile-fade-delayed ml-10 text-sm text-muted-foreground">
                        Manage your account credentials and personal information
                    </p>
                </div>

                <div className="relative z-10 grid gap-6 xl:grid-cols-2">
                    {/* Profile Information Card */}
                    <div className="profile-card group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                            background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                        }}
                    >
                        {/* Top edge glow */}
                        <div
                            className="absolute inset-x-0 top-0 h-px"
                            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                            aria-hidden="true"
                        />

                        {/* Scanline */}
                        <div className="profile-scan pointer-events-none absolute inset-x-0 h-[1px]"
                            style={{ background: `linear-gradient(90deg, transparent, ${accentAlt}, transparent)` }}
                            aria-hidden="true"
                        />

                        <div className="relative p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                                    style={{
                                        borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
                                        background: `color-mix(in srgb, ${accent} 8%, transparent)`,
                                    }}
                                >
                                    <User className="h-5 w-5" style={{ color: accent }} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">Profile Information</h2>
                                    <p className="text-xs text-muted-foreground">Update your account name and email address</p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            value={profileForm.data.name}
                                            onChange={(e) => profileForm.setData('name', e.target.value)}
                                            required
                                            autoComplete="name"
                                            placeholder="Enter your full name"
                                            className="profile-input h-11 rounded-lg border-gray-200 bg-white pl-10 text-sm transition-all duration-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)] dark:border-gray-700 dark:bg-gray-800/50"
                                        />
                                        <User
                                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {profileForm.errors.name && (
                                        <p className="text-xs text-red-500">{profileForm.errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) => profileForm.setData('email', e.target.value)}
                                            required
                                            autoComplete="username"
                                            placeholder="you@example.com"
                                            className="profile-input h-11 rounded-lg border-gray-200 bg-white pl-10 text-sm transition-all duration-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)] dark:border-gray-700 dark:bg-gray-800/50"
                                        />
                                        <Mail
                                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {profileForm.errors.email && (
                                        <p className="text-xs text-red-500">{profileForm.errors.email}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 pt-2">
                                    <button
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="profile-btn group relative inline-flex items-center gap-2 overflow-hidden px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
                                        style={{
                                            background: accent,
                                            clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                                        }}
                                    >
                                        <Save className="h-4 w-4" />
                                        <span className="relative z-10">
                                            {profileForm.processing ? 'Saving...' : 'Save Profile'}
                                        </span>
                                        <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                                    </button>

                                    {profileForm.recentlySuccessful && (
                                        <span
                                            className="flex items-center gap-1.5 text-xs font-medium"
                                            style={{ color: accent }}
                                        >
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Saved
                                        </span>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* HUD corner brackets */}
                        <span className="profile-bracket pointer-events-none absolute -left-1.5 -top-1.5 h-5 w-5 border-l-2 border-t-2" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 40%, transparent)` }} aria-hidden="true" />
                        <span className="profile-bracket pointer-events-none absolute -right-1.5 -top-1.5 h-5 w-5 border-r-2 border-t-2" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 40%, transparent)`, animationDelay: '0.75s' }} aria-hidden="true" />
                        <span className="profile-bracket pointer-events-none absolute -bottom-1.5 -right-1.5 h-5 w-5 border-b-2 border-r-2" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 40%, transparent)`, animationDelay: '1.5s' }} aria-hidden="true" />
                        <span className="profile-bracket pointer-events-none absolute -bottom-1.5 -left-1.5 h-5 w-5 border-b-2 border-l-2" style={{ borderColor: `color-mix(in srgb, ${accentAlt} 40%, transparent)`, animationDelay: '2.25s' }} aria-hidden="true" />
                    </div>

                    {/* Password Card */}
                    <div className="profile-card group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                            background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                        }}
                    >
                        {/* Top edge glow */}
                        <div
                            className="absolute inset-x-0 top-0 h-px"
                            style={{ background: `linear-gradient(90deg, transparent, ${accentAlt}, transparent)` }}
                            aria-hidden="true"
                        />

                        {/* Scanline */}
                        <div className="profile-scan pointer-events-none absolute inset-x-0 h-[1px]"
                            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, animationDelay: '2.5s' }}
                            aria-hidden="true"
                        />

                        <div className="relative p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                                    style={{
                                        borderColor: `color-mix(in srgb, ${accentAlt} 25%, transparent)`,
                                        background: `color-mix(in srgb, ${accentAlt} 8%, transparent)`,
                                    }}
                                >
                                    <Shield className="h-5 w-5" style={{ color: accentAlt }} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">Security</h2>
                                    <p className="text-xs text-muted-foreground">Change your password to stay secure</p>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current_password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Current Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="current_password"
                                            type="password"
                                            value={passwordForm.data.current_password}
                                            onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                            autoComplete="current-password"
                                            placeholder="Enter current password"
                                            className="profile-input h-11 rounded-lg border-gray-200 bg-white pl-10 text-sm transition-all duration-200 focus:border-[var(--isp-accent)] focus:ring-[var(--isp-accent)] dark:border-gray-700 dark:bg-gray-800/50"
                                        />
                                        <Lock
                                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {passwordForm.errors.current_password && (
                                        <p className="text-xs text-red-500">{passwordForm.errors.current_password}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="password"
                                            value={passwordForm.data.password}
                                            onChange={(e) => passwordForm.setData('password', e.target.value)}
                                            autoComplete="new-password"
                                            placeholder="Enter new password"
                                            className="profile-input h-11 rounded-lg border-gray-200 bg-white pl-10 text-sm transition-all duration-200 focus:border-[var(--isp-accent)] focus:ring-[var(--isp-accent)] dark:border-gray-700 dark:bg-gray-800/50"
                                        />
                                        <Lock
                                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {passwordForm.errors.password && (
                                        <p className="text-xs text-red-500">{passwordForm.errors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={passwordForm.data.password_confirmation}
                                            onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                            autoComplete="new-password"
                                            placeholder="Confirm new password"
                                            className="profile-input h-11 rounded-lg border-gray-200 bg-white pl-10 text-sm transition-all duration-200 focus:border-[var(--isp-accent)] focus:ring-[var(--isp-accent)] dark:border-gray-700 dark:bg-gray-800/50"
                                        />
                                        <Shield
                                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-2">
                                    <button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        className="profile-btn group relative inline-flex items-center gap-2 overflow-hidden px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
                                        style={{
                                            background: accentAlt,
                                            clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                                        }}
                                    >
                                        <Lock className="h-4 w-4" />
                                        <span className="relative z-10">
                                            {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                        </span>
                                        <span className="absolute inset-0 -translate-x-[100%] bg-white/15 transition-transform duration-500 group-hover:translate-x-[100%]" />
                                    </button>

                                    {passwordForm.recentlySuccessful && (
                                        <span
                                            className="flex items-center gap-1.5 text-xs font-medium"
                                            style={{ color: accentAlt }}
                                        >
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Updated
                                        </span>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* HUD corner brackets */}
                        <span className="profile-bracket pointer-events-none absolute -left-1.5 -top-1.5 h-5 w-5 border-l-2 border-t-2" style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)` }} aria-hidden="true" />
                        <span className="profile-bracket pointer-events-none absolute -right-1.5 -top-1.5 h-5 w-5 border-r-2 border-t-2" style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`, animationDelay: '0.75s' }} aria-hidden="true" />
                        <span className="profile-bracket pointer-events-none absolute -bottom-1.5 -right-1.5 h-5 w-5 border-b-2 border-r-2" style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`, animationDelay: '1.5s' }} aria-hidden="true" />
                        <span className="profile-bracket pointer-events-none absolute -bottom-1.5 -left-1.5 h-5 w-5 border-b-2 border-l-2" style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`, animationDelay: '2.25s' }} aria-hidden="true" />
                    </div>
                </div>

                {/* Status Bar */}
                <div className="profile-fade-late relative z-10 flex items-center justify-between rounded-lg border px-5 py-3"
                    style={{
                        borderColor: 'color-mix(in srgb, var(--border) 100%, transparent)',
                        background: 'color-mix(in srgb, var(--card) 100%, transparent)',
                    }}
                >
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Account Active
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">Last updated: {new Date(user.email_verified_at ?? Date.now()).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        <span className="hidden sm:inline">Session secured</span>
                    </div>
                </div>
            </div>

            <style>{`\n                .profile-grid {\n                    background-image:\n                        linear-gradient(rgba(128, 128, 128, 0.15) 1px, transparent 1px),\n                        linear-gradient(90deg, rgba(128, 128, 128, 0.15) 1px, transparent 1px);\n                    background-size: 60px 60px;\n                    animation: profileGridPulse 8s ease-in-out infinite;\n                }\n                @keyframes profileGridPulse {\n                    0%, 100% { opacity: 0.03; }\n                    50% { opacity: 0.07; }\n                }\n                @keyframes profileFloatUp {\n                    0% { transform: translateY(0) scale(1); opacity: 0; }\n                    10% { opacity: 0.5; }\n                    90% { opacity: 0.5; }\n                    100% { transform: translateY(-50vh) scale(0); opacity: 0; }\n                }\n                .profile-particle { animation: profileFloatUp linear infinite; }\n                .profile-orb { animation: profileOrbPulse 7s ease-in-out infinite; }\n                .profile-orb-slow { animation: profileOrbPulse 9s ease-in-out infinite reverse; }\n                @keyframes profileOrbPulse {\n                    0%, 100% { opacity: 0.4; transform: scale(1); }\n                    50% { opacity: 0.8; transform: scale(1.1); }\n                }\n                .profile-scan {\n                    top: 0;\n                    animation: profileScanSweep 6s linear infinite;\n                }\n                @keyframes profileScanSweep {\n                    0% { top: -3%; opacity: 0; }\n                    10% { opacity: 0.3; }\n                    90% { opacity: 0.3; }\n                    100% { top: 103%; opacity: 0; }\n                }\n                .profile-bracket { animation: profileBracketPulse 3s ease-in-out infinite; }\n                @keyframes profileBracketPulse {\n                    0%, 100% { opacity: 0.4; }\n                    50% { opacity: 0.9; }\n                }\n                @keyframes profileFadeUp {\n                    from { opacity: 0; transform: translateY(20px); }\n                    to { opacity: 1; transform: translateY(0); }\n                }\n                .profile-fade { animation: profileFadeUp 0.6s ease-out 0.1s both; }\n                .profile-fade-delayed { animation: profileFadeUp 0.6s ease-out 0.25s both; }\n                .profile-fade-late { animation: profileFadeUp 0.6s ease-out 0.4s both; }\n                .profile-card { animation: profileFadeUp 0.6s ease-out 0.3s both; }\n                .profile-card:nth-child(2) { animation-delay: 0.45s; }\n                .profile-btn::before {\n                    content: '';\n                    position: absolute;\n                    top: 0;\n                    left: -100%;\n                    width: 100%;\n                    height: 100%;\n                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n                    transition: left 0.5s ease;\n                }\n                .profile-btn:hover::before { left: 100%; }\n                .profile-input {\n                    transition: border-color 0.2s, box-shadow 0.2s;\n                }\n                .profile-input:focus {\n                    box-shadow: 0 0 0 2px color-mix(in srgb, var(--isp-primary) 15%, transparent);\n                }\n                @media (prefers-reduced-motion: reduce) {\n                    .profile-grid, .profile-particle, .profile-orb, .profile-orb-slow,\n                    .profile-scan, .profile-bracket, .profile-fade, .profile-fade-delayed,\n                    .profile-fade-late, .profile-card, .profile-btn::before {\n                        animation: none !important;\n                    }\n                    .profile-fade, .profile-fade-delayed, .profile-fade-late, .profile-card {\n                        opacity: 1;\n                        transform: none;\n                    }\n                }\n            `}</style>
        </AppLayout>
    );
}
