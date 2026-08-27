import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserPlus, Save, Shield } from 'lucide-react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface Role {
    id: number;
    name: string;
}

interface UsersCreateProps {
    roles: Role[];
}

export default function UsersCreate({ roles }: UsersCreateProps) {
    const { adminUrl } = useAdminUrl();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Users', href: adminUrl('/users') },
        { title: 'Create', href: adminUrl('/users/create') },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [] as number[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    const toggleRole = (roleId: number) => {
        setData('roles', data.roles.includes(roleId)
            ? data.roles.filter((r) => r !== roleId)
            : [...data.roles, roleId]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.users.index')}
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create User</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Add a new admin panel user with roles.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl">
                    {/* User Details */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--isp-primary) 10%, transparent)' }}>
                                <UserPlus className="h-5 w-5" style={{ color: 'var(--isp-primary)' }} />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-gray-900">User Details</h2>
                                <p className="text-xs text-gray-500">Basic user information</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                    placeholder="Min 8 characters"
                                />
                                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                    placeholder="Repeat password"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Roles */}
                    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="text-sm font-bold text-gray-900 mb-4">Assign Roles</h2>
                        {errors.roles && <p className="mb-3 text-xs text-red-500">{errors.roles}</p>}

                        <div className="grid gap-2 sm:grid-cols-2">
                            {roles.map((role) => (
                                <label
                                    key={role.id}
                                    className="flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.roles.includes(role.id)}
                                        onChange={() => toggleRole(role.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-[var(--isp-primary)] focus:ring-[var(--isp-primary)]"
                                    />
                                    <Shield className="h-4 w-4 text-gray-400" />
                                    <span className="capitalize font-medium">{role.name.replace(/_/g, ' ')}</span>
                                </label>
                            ))}
                        </div>

                        {roles.length === 0 && (
                            <p className="text-sm text-gray-500 italic">No roles available. Create roles first.</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-[var(--isp-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Creating...' : 'Create User'}
                        </button>
                        <Link
                            href={route('admin.users.index')}
                            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
