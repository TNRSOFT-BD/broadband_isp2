import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, UserPlus, Trash2, Edit3, Shield, Mail } from 'lucide-react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface UserRole {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    roles: UserRole[];
    created_at: string;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface UsersIndexProps {
    users: PaginatedUsers;
    flash?: { success?: string };
}

export default function UsersIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Users', href: adminUrl('/users') },
    ];

    const { users, flash } = usePage().props as unknown as UsersIndexProps;
    const userPermissions = usePage().props.auth?.user?.permissions as string[] | undefined;

    const canCreateUsers = userPermissions?.includes('create-users') ?? false;
    const canEditUsers = userPermissions?.includes('edit-users') ?? false;
    const canDeleteUsers = userPermissions?.includes('delete-users') ?? false;

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete user "${name}"?`)) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Management" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Users Management</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage admin panel users and their roles.
                        </p>
                    </div>
                    {canCreateUsers && (
                        <Link
                            href={route('admin.users.create')}
                            className="inline-flex items-center gap-2 rounded-lg bg-[var(--isp-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90"
                        >
                            <UserPlus className="h-4 w-4" />
                            Add User
                        </Link>
                    )}
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" /> {flash.success}
                    </div>
                )}

                {/* Users Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Roles</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                                    {(canEditUsers || canDeleteUsers) && (
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="transition-colors hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                                                    <Mail className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.map((role) => (
                                                    <span
                                                        key={role.id}
                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                                                    >
                                                        <Shield className="h-3 w-3" />
                                                        {role.name.replace(/_/g, ' ')}
                                                    </span>
                                                ))}
                                                {user.roles.length === 0 && (
                                                    <span className="text-xs text-gray-400 italic">No role</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                        {(canEditUsers || canDeleteUsers) && (
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    {canEditUsers && (
                                                        <Link
                                                            href={route('admin.users.edit', user.id)}
                                                            className="rounded p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            <Edit3 className="h-4 w-4" />
                                                        </Link>
                                                    )}
                                                    {canDeleteUsers && (
                                                        <button
                                                            onClick={() => handleDelete(user.id, user.name)}
                                                            className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.data.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No users found.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {((users.current_page - 1) * users.per_page) + 1} to{' '}
                            {Math.min(users.current_page * users.per_page, users.total)} of {users.total} users
                        </p>
                        <div className="flex items-center gap-2">
                            {users.current_page > 1 && (
                                <Link
                                    href={route('admin.users.index', { page: users.current_page - 1 })}
                                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={route('admin.users.index', { page })}
                                    className={`rounded-lg px-3 py-1.5 text-sm ${page === users.current_page
                                        ? 'bg-[var(--isp-primary)] text-white'
                                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ))}
                            {users.current_page < users.last_page && (
                                <Link
                                    href={route('admin.users.index', { page: users.current_page + 1 })}
                                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
