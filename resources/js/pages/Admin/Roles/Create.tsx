import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Shield, Save } from 'lucide-react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface Permission {
    id: number;
    name: string;
    group: string;
    guard_name: string;
}

interface RolesCreateProps {
    permissions: Record<string, Permission>;
}

export default function RolesCreate({ permissions }: RolesCreateProps) {
    const { adminUrl } = useAdminUrl();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Roles & Permissions', href: adminUrl('/roles') },
        { title: 'Create', href: adminUrl('/roles/create') },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        prefix: '',
        permissions: [] as number[],
    });

    // Group permissions by their prefix
    const groupedPermissions: Record<string, { permission: Permission; checked: boolean }[]> = {};
    const permissionEntries = Object.values(permissions);

    for (const perm of permissionEntries) {
        const parts = perm.name.split('-');
        const groupKey = parts[0] === 'view' || parts[0] === 'create' || parts[0] === 'edit' || parts[0] === 'delete'
            ? parts.slice(1).join('-') || parts[0]
            : perm.name;

        const readableGroup = groupKey
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());

        if (!groupedPermissions[readableGroup]) {
            groupedPermissions[readableGroup] = [];
        }
        groupedPermissions[readableGroup].push({ permission: perm, checked: false });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.roles.store'));
    };

    const togglePermission = (id: number) => {
        setData('permissions', data.permissions.includes(id)
            ? data.permissions.filter((p) => p !== id)
            : [...data.permissions, id]
        );
    };

    const toggleGroup = (groupName: string) => {
        const groupPerms = groupedPermissions[groupName].map((p) => p.permission.id);
        const allSelected = groupPerms.every((id) => data.permissions.includes(id));

        if (allSelected) {
            setData('permissions', data.permissions.filter((id) => !groupPerms.includes(id)));
        } else {
            setData('permissions', [...new Set([...data.permissions, ...groupPerms])]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.roles.index')}
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Role</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Define a new role with specific permissions.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl">
                    {/* Role Name */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--isp-primary) 10%, transparent)' }}>
                                <Shield className="h-5 w-5" style={{ color: 'var(--isp-primary)' }} />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-gray-900">Role Information</h2>
                                <p className="text-xs text-gray-500">Basic role details</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Role Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value.toLowerCase())}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                placeholder="e.g., content_editor"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            <p className="mt-1 text-xs text-gray-500">
                                Stored in lowercase automatically. Used as the URL prefix when URL Prefix is left empty.
                            </p>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="prefix" className="block text-sm font-medium text-gray-700">
                                URL Prefix
                            </label>
                            <input
                                type="text"
                                id="prefix"
                                value={data.prefix}
                                onChange={(e) => setData('prefix', e.target.value.toLowerCase())}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[var(--isp-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--isp-primary)]"
                                placeholder="e.g., editor"
                            />
                            {errors.prefix && <p className="mt-1 text-xs text-red-500">{errors.prefix}</p>}
                        </div>
                    </div>

                    {/* Permissions */}
                    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="text-sm font-bold text-gray-900 mb-4">Permissions</h2>
                        {errors.permissions && <p className="mb-3 text-xs text-red-500">{errors.permissions}</p>}

                        <div className="space-y-6">
                            {Object.entries(groupedPermissions).map(([groupName, perms]) => {
                                const allSelected = perms.every((p) => data.permissions.includes(p.permission.id));
                                const someSelected = perms.some((p) => data.permissions.includes(p.permission.id));

                                return (
                                    <div key={groupName}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <input
                                                type="checkbox"
                                                checked={allSelected}
                                                ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                                                onChange={() => toggleGroup(groupName)}
                                                className="h-4 w-4 rounded border-gray-300 text-[var(--isp-primary)] focus:ring-[var(--isp-primary)]"
                                            />
                                            <span className="text-sm font-semibold text-gray-700">{groupName}</span>
                                        </div>
                                        <div className="ml-6 grid gap-2 sm:grid-cols-2">
                                            {perms.map(({ permission }) => (
                                                <label
                                                    key={permission.id}
                                                    className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={data.permissions.includes(permission.id)}
                                                        onChange={() => togglePermission(permission.id)}
                                                        className="h-4 w-4 rounded border-gray-300 text-[var(--isp-primary)] focus:ring-[var(--isp-primary)]"
                                                    />
                                                    <span className="capitalize">{permission.name.replace(/-/g, ' ')}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-[var(--isp-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Creating...' : 'Create Role'}
                        </button>
                        <Link
                            href={route('admin.roles.index')}
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
