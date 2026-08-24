import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import type { ContactMessage } from '@/types/contact';
import { Head, router, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Contact Messages', href: '/admin/contact-messages' },
    { title: 'Message Detail', href: '#' },
];

interface PageProps extends Record<string, unknown> {
    message: ContactMessage;
    statuses: Record<string, string>;
}

export default function ContactMessagesShow() {
    const { message, statuses } = usePage<PageProps>().props;
    const { flash } = usePage<SharedData>().props as SharedData & { flash?: { success?: string } };
    const [currentStatus, setCurrentStatus] = useState(message.status);

    const handleStatusChange = (newStatus: string) => {
        setCurrentStatus(newStatus);
        router.patch(route('admin.contact-messages.update-status', message.id), { status: newStatus }, { preserveState: true });
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
            <Head title={`Message: ${message.subject}`} />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <a href={route('admin.contact-messages.index')}>
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Back
                        </a>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold tracking-tight">{message.subject}</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            From {message.name} • {new Date(message.created_at).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {statusBadge(currentStatus)}
                        <Select value={currentStatus} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(statuses).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4" />
                        {flash.success}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Sender info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Sender Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium">{message.name}</p>
                                    <p className="text-xs text-gray-500">Name</p>
                                </div>
                            </div>
                            {message.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <a href={`mailto:${message.email}`} className="text-sm font-medium text-[var(--isp-primary)] hover:underline">
                                            {message.email}
                                        </a>
                                        <p className="text-xs text-gray-500">Email</p>
                                    </div>
                                </div>
                            )}
                            {message.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <a href={`tel:${message.phone}`} className="text-sm font-medium text-[var(--isp-primary)] hover:underline">
                                            {message.phone}
                                        </a>
                                        <p className="text-xs text-gray-500">Phone</p>
                                    </div>
                                </div>
                            )}
                            {message.inquiryType && (
                                <div className="border-t pt-3">
                                    <p className="text-xs text-gray-500">Inquiry Type</p>
                                    <p className="text-sm font-medium">{message.inquiryType.name}</p>
                                </div>
                            )}
                            <div className="border-t pt-3">
                                <p className="text-xs text-gray-500">Submitted</p>
                                <p className="text-sm font-medium">{new Date(message.created_at).toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Message content */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Message</CardTitle>
                            <CardDescription>Full message content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg bg-gray-50 p-6">
                                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                                    {message.message}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
