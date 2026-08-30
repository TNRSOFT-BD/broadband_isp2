import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, Shield, Plus, Trash2, Edit3, Users } from 'lucide-react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface Role {
    id: number;
    name: string;
    guard_name: string;
    permissions_count: number;
    created_at: string;
}

interface RolesIndexProps {
    roles: Role[];
    flash?: { success?: string };
}

export default function RolesIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Roles & Permissions', href: adminUrl('/roles') },
    ];

    const { roles, flash } = usePage().props as unknown as RolesIndexProps;
    const userPermissions = usePage().props.auth?.user?.permissions as string[] | undefined;

    const canManageRoles = userPermissions?.includes('manage-roles') ?? false;

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the "${name}" role?`)) {
            router.delete(route('admin.roles.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles & Permissions" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Roles & Permissions</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage admin roles and their permissions.
                        </p>
                    </div>
                    {canManageRoles && (
                        <Link
                            href={route('admin.roles.create')}
                            className="inline-flex items-center gap-2 rounded-lg bg-[var(--isp-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
                        >
                            <Plus className="h-4 w-4" />
                            Create Role
                        </Link>
                    )}
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" /> {flash.success}
                    </div>
                )}

                {/* Roles Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-[var(--isp-primary)]/30 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--isp-primary) 10%, transparent)' }}>
                                    <Shield className="h-5 w-5" style={{ color: 'var(--isp-primary)' }} />
                                </div>
                                {canManageRoles && (
                                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Link
                                            href={route('admin.roles.edit', role.id)}
                                            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(role.id, role.name)}
                                            className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <h3 className="mt-3 text-sm font-bold text-gray-900 capitalize">{role.name.replace(/_/g, ' ')}</h3>
                            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                                <Users className="h-3.5 w-3.5" />
                                <span>{role.permissions_count} permission{role.permissions_count !== 1 ? 's' : ''}</span>
                            </div>

                            {canManageRoles && (
                                <div className="mt-3">
                                    <Link
                                        href={route('admin.roles.edit', role.id)}
                                        className="flex items-center gap-1 text-xs font-medium transition-colors"
                                        style={{ color: 'var(--isp-primary)' }}
                                    >
                                        Manage Permissions <Edit3 className="h-3 w-3" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {roles.length === 0 && (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
                        No roles found. Create your first role to get started.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
