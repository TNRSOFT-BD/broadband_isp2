import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminUrl } from '@/hooks/use-admin-url';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Globe, Link2, Save, ArrowUpRight, User, CreditCard, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
    [key: string]: unknown;
    thirdPartyLinks: Record<string, string>;
    paybillClientId: string | null;
}

interface FieldDiff {
    key: string;
    label: string;
    oldValue: string;
    newValue: string;
}

export default function ThirdPartyLinksIndex() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: '3rd Party Site Config', href: adminUrl('/third-party-links') },
    ];

    const { thirdPartyLinks, paybillClientId } = usePage<PageProps>().props;
    const { errors, flash } = usePage<SharedData>().props as SharedData & {
        errors: Record<string, string>;
        flash?: { success?: string };
    };

    const [confirmText, setConfirmText] = useState('');

    const form = useForm({
        selfcare_url: thirdPartyLinks?.selfcare ?? '',
        paybill_client_id: paybillClientId ?? '',
    });

    // Original values for comparison
    const original = {
        selfcare_url: thirdPartyLinks?.selfcare ?? '',
        paybill_client_id: paybillClientId ?? '',
    };

    // Field definitions
    const fields = [
        { key: 'selfcare_url', label: 'Self Care Portal URL', oldVal: original.selfcare_url, newVal: form.data.selfcare_url },
        { key: 'paybill_client_id', label: 'PayBill Customer ID', oldVal: original.paybill_client_id, newVal: form.data.paybill_client_id },
    ];

    // Calculate diffs
    const diffs: FieldDiff[] = fields
        .filter((f) => f.oldVal !== f.newVal)
        .map((f) => ({
            key: f.key,
            label: f.label,
            oldValue: f.oldVal || '(empty)',
            newValue: f.newVal || '(empty)',
        }));

    const hasChanges = diffs.length > 0;
    const isConfirmValid = confirmText === 'CONFIRM';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(route('admin.third-party-links.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmText('');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="3rd Party Site Config" />

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">3rd Party Site Config</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Manage external service links and payment configuration.</p>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Self Care Portal Card */}
                    <Card className="overflow-hidden border-primary/20">
                        <div className="flex items-center gap-2 bg-primary/5 px-6 py-3">
                            <Globe className="h-4 w-4 text-primary" />
                            <h2 className="text-sm font-semibold text-primary">Self Care Portal</h2>
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                                Header Button
                            </span>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                                {/* Preview */}
                                <div className="flex items-center gap-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-5 lg:min-w-[280px]">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                        <User className="h-7 w-7 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-gray-900">Selfcare Button</p>
                                        <p className="mt-0.5 text-xs text-muted-foreground">Appears in the website header</p>
                                        {form.data.selfcare_url ? (
                                            <a
                                                href={form.data.selfcare_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline"
                                            >
                                                Visit Portal
                                                <ArrowUpRight className="h-3 w-3" />
                                            </a>
                                        ) : (
                                            <p className="mt-2 text-xs italic text-muted-foreground">Not configured yet</p>
                                        )}
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="selfcare-url" className="flex items-center gap-2 text-sm font-semibold">
                                            <Link2 className="h-4 w-4 text-primary" />
                                            Self Care Portal URL
                                        </Label>
                                        <Input
                                            id="selfcare-url"
                                            type="url"
                                            value={form.data.selfcare_url}
                                            onChange={(e) => form.setData('selfcare_url', e.target.value)}
                                            placeholder="https://selfcare.example.com"
                                            className="font-mono text-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Customers will be redirected to this URL when they click the "Selfcare" button in the header. Opens in a new tab.
                                        </p>
                                        {errors['selfcare_url'] && (
                                            <p className="text-xs text-destructive">{errors['selfcare_url']}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* PayBill Configuration Card */}
                    <Card className="overflow-hidden border-amber-200/60">
                        <div className="flex items-center gap-2 bg-amber-50 px-6 py-3">
                            <ShieldAlert className="h-4 w-4 text-amber-600" />
                            <h2 className="text-sm font-semibold text-amber-700">PayBill Configuration</h2>
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                                Sensitive
                            </span>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                                {/* Preview */}
                                <div className="flex items-center gap-4 rounded-xl border border-dashed border-amber-300/50 bg-amber-50/50 p-5 lg:min-w-[280px]">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                                        <CreditCard className="h-7 w-7 text-amber-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-gray-900">PayBill Page</p>
                                        <p className="mt-0.5 text-xs text-muted-foreground">Payment gateway integration</p>
                                        {form.data.paybill_client_id ? (
                                            <p className="mt-2 font-mono text-xs text-amber-700">Customer ID: {form.data.paybill_client_id}</p>
                                        ) : (
                                            <p className="mt-2 text-xs italic text-muted-foreground">Not configured yet</p>
                                        )}
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="paybill-customer-id" className="flex items-center gap-2 text-sm font-semibold">
                                            <CreditCard className="h-4 w-4 text-amber-600" />
                                            PayBill Customer ID
                                        </Label>
                                        <Input
                                            id="paybill-customer-id"
                                            value={form.data.paybill_client_id}
                                            onChange={(e) => form.setData('paybill_client_id', e.target.value)}
                                            placeholder="e.g. 381"
                                            className="max-w-sm font-mono text-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            This customer ID is used for the PayBill page payment URL (https://soft.nrlink.net/pay.php?c=ID).
                                        </p>
                                        {errors['paybill_client_id'] && (
                                            <p className="text-xs text-destructive">{errors['paybill_client_id']}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Change Diff + Confirmation — shows when ANY field changed */}
                    {hasChanges && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-amber-800">
                                        You have {diffs.length} unsaved change{diffs.length > 1 ? 's' : ''}
                                    </p>

                                    {/* Diff list */}
                                    <div className="space-y-2">
                                        {diffs.map((diff) => (
                                            <div key={diff.key} className="flex flex-col gap-1">
                                                <span className="text-xs font-medium text-amber-700">{diff.label}</span>
                                                <div className="flex items-center gap-2 text-xs font-mono">
                                                    <span className="rounded bg-red-100 px-2 py-1 text-red-700 line-through">
                                                        {diff.oldValue}
                                                    </span>
                                                    <span className="text-muted-foreground">→</span>
                                                    <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                                                        {diff.newValue}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Input */}
                            <div className="space-y-2">
                                <Label htmlFor="confirm-save" className="text-xs font-semibold text-amber-800">
                                    Type <span className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">CONFIRM</span> to save changes
                                </Label>
                                <Input
                                    id="confirm-save"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                    placeholder="Type CONFIRM"
                                    className="max-w-xs font-mono text-sm border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                                />
                                {!isConfirmValid && confirmText.length > 0 && (
                                    <p className="text-xs text-amber-600">
                                        Must be exactly "CONFIRM" (case-sensitive)
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={form.processing || (hasChanges && !isConfirmValid)}
                            className="gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {form.processing ? 'Saving...' : 'Save All Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
