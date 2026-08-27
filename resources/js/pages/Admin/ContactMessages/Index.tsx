import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { ContactMessage } from '@/types/contact';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Eye, Trash2, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface PageProps extends Record<string, unknown> {
    messages: {
        data: ContactMessage[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    inquiryTypes: Array<{ id: number; name: string; slug: string }>;
    filters: { search: string; status: string; inquiry_type_id: string };
    counts: { total: number; new: number; in_progress: number; resolved: number };
    statuses: Record<string, string>;
}

export default function ContactMessagesIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Contact Messages', href: adminUrl('/contact-messages') },
    ];

    const { messages, inquiryTypes, filters, counts, statuses } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };

    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');

    const handleSearch = () => {
        router.get(route('admin.contact-messages.index'), { search, status }, { preserveState: true });
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        router.get(route('admin.contact-messages.index'), { search, status: value }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('admin.contact-messages.destroy', id));
        }
    };

    const statusBadge = (messageStatus: string) => {
        const colors: Record<string, string> = {
            new: 'bg-blue-100 text-blue-800',
            read: 'bg-gray-100 text-gray-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            replied: 'bg-purple-100 text-purple-800',
            resolved: 'bg-green-100 text-green-800',
            archived: 'bg-gray-100 text-gray-500',
        };

        return (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[messageStatus] ?? 'bg-gray-100 text-gray-600'}`}>
                {statuses[messageStatus] ?? messageStatus}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Messages" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Contact Messages</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage inquiries and messages from the contact form.
                    </p>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" />
                        {flash.success}
                    </div>
                )}

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-4">
                    {[
                        { label: 'Total', value: counts.total, icon: <MessageSquare className="h-4 w-4" /> },
                        { label: 'New', value: counts.new, icon: <Mail className="h-4 w-4" /> },
                        { label: 'In Progress', value: counts.in_progress, icon: <Eye className="h-4 w-4" /> },
                        { label: 'Resolved', value: counts.resolved, icon: <CheckCircle2 className="h-4 w-4" /> },
                    ].map((stat) => (
                        <Card key={stat.label}>
                            <CardContent className="flex items-center gap-3 p-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex-1">
                                <Label htmlFor="search">Search</Label>
                                <Input
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder="Search by name, email, or subject..."
                                    className="mt-1"
                                />
                            </div>
                            <div className="w-full sm:w-48">
                                <Label>Status</Label>
                                <Select value={status} onValueChange={handleStatusChange}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        {Object.entries(statuses).map(([key, label]) => (
                                            <SelectItem key={key} value={key}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button onClick={handleSearch} className="mt-1">Search</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Messages table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Messages ({messages.total})</CardTitle>
                        <CardDescription>All contact form submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {messages.data.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <Mail className="mx-auto h-12 w-12 text-gray-300" />
                                <p className="mt-4 text-sm">No messages found.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 font-medium">Name</th>
                                            <th className="px-4 py-3 font-medium">Email</th>
                                            <th className="px-4 py-3 font-medium">Subject</th>
                                            <th className="px-4 py-3 font-medium">Inquiry Type</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Date</th>
                                            <th className="px-4 py-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {messages.data.map((message) => (
                                            <tr key={message.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">{message.name}</td>
                                                <td className="px-4 py-3 text-gray-500">{message.email ?? '—'}</td>
                                                <td className="px-4 py-3">
                                                    <Link
                                                        href={route('admin.contact-messages.show', message.id)}
                                                        className="text-[var(--isp-primary)] hover:underline"
                                                    >
                                                        {message.subject}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-3 text-gray-500">
                                                    {message.inquiryType?.name ?? '—'}
                                                </td>
                                                <td className="px-4 py-3">{statusBadge(message.status)}</td>
                                                <td className="px-4 py-3 text-gray-500">
                                                    {new Date(message.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route('admin.contact-messages.show', message.id)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(message.id)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {messages.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing {((messages.current_page - 1) * messages.per_page) + 1} to{' '}
                                    {Math.min(messages.current_page * messages.per_page, messages.total)} of{' '}
                                    {messages.total}
                                </p>
                                <div className="flex gap-2">
                                    {Array.from({ length: messages.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={page === messages.current_page ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() =>
                                                router.get(route('admin.contact-messages.index'), {
                                                    ...filters,
                                                    page,
                                                }, { preserveState: true })
                                            }
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
