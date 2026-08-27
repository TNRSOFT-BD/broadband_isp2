import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Plus, Trash2, Edit3, Zap, Globe, Shield, Headphones, Clock, Wifi, Server, Activity, Cpu, Signal, Lock, Star } from 'lucide-react';
import { useAdminUrl } from '@/hooks/use-admin-url';


const availableIcons = [
    { name: 'Zap', label: 'Zap' },
    { name: 'Globe', label: 'Globe' },
    { name: 'Shield', label: 'Shield' },
    { name: 'Headphones', label: 'Headphones' },
    { name: 'Clock', label: 'Clock' },
    { name: 'Wifi', label: 'Wifi' },
    { name: 'Server', label: 'Server' },
    { name: 'Activity', label: 'Activity' },
    { name: 'Cpu', label: 'CPU' },
    { name: 'Signal', label: 'Signal' },
    { name: 'Lock', label: 'Lock' },
    { name: 'Star', label: 'Star' },
];

interface IntroFeature {
    id: number;
    label: string;
    sub_label: string | null;
    icon: string | null;
    color: string | null;
    sort_order: number;
    is_active: boolean;
}

interface PageProps {
    features: IntroFeature[];
}

export default function IntroFeaturesAdmin() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Homepage', href: adminUrl('/homepage') },
        { title: 'Intro Features', href: adminUrl('/homepage/intro-features') },
    ];

    const { features } = usePage().props as unknown as PageProps;
    const accent = 'var(--isp-primary)';
    const [editing, setEditing] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        label: '',
        sub_label: '',
        icon: 'Zap',
        color: '',
        sort_order: 0,
        is_active: true,
    } as { label: string; sub_label: string; icon: string; color: string; sort_order: number; is_active: boolean });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.homepage.intro-features.update', editing), {
                onSuccess: () => { setEditing(null); reset(); setShowForm(false); },
            });
        } else {
            post(route('admin.homepage.intro-features.store'), {
                onSuccess: () => { reset(); setShowForm(false); },
            });
        }
    };

    const startEdit = (f: IntroFeature) => {
        setEditing(f.id);
        setData({
            label: f.label,
            sub_label: f.sub_label ?? '',
            icon: f.icon ?? 'Zap',
            color: f.color ?? '',
            sort_order: f.sort_order,
            is_active: f.is_active,
        });
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this intro feature?')) {
            router.delete(route('admin.homepage.intro-features.destroy', id));
        }
    };

    const presetColors = ['', '#2563EB', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Intro Features" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Intro Network Features</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage the satellite nodes shown in the Company Introduction section. Max 6 features.
                        </p>
                    </div>
                    <Button
                        onClick={() => { setEditing(null); reset(); setShowForm(!showForm); }}
                        style={{ background: accent }}
                        disabled={features.length >= 6 && !editing}
                    >
                        <Plus className="mr-1 h-4 w-4" /> Add Feature
                    </Button>
                </div>

                {features.length >= 6 && !editing && (
                    <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-700">
                        Maximum 6 features reached. Delete one to add more.
                    </div>
                )}

                {showForm && (
                    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-6 space-y-4">
                        <h3 className="font-bold">{editing ? 'Edit' : 'Add'} Intro Feature</h3>
                        {Object.keys(errors).length > 0 && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                                {Object.entries(errors).map(([key, msg]) => (
                                    <p key={key}>{msg}</p>
                                ))}
                            </div>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Label *</Label>
                                <Input
                                    value={data.label as string}
                                    onChange={(e) => setData('label', e.target.value)}
                                    required
                                    placeholder="e.g. Fiber"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Sub Label</Label>
                                <Input
                                    value={data.sub_label as string}
                                    onChange={(e) => setData('sub_label', e.target.value)}
                                    placeholder="e.g. Optic"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Icon</Label>
                            <div className="flex flex-wrap gap-2">
                                {availableIcons.map((icon) => (
                                    <button
                                        key={icon.name}
                                        type="button"
                                        onClick={() => setData('icon', icon.name)}
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${
                                            data.icon === icon.name
                                                ? 'border-[var(--isp-primary)] bg-[var(--isp-primary)]/10 text-[var(--isp-primary)]'
                                                : 'border-gray-200 text-gray-400 hover:border-gray-300'
                                        }`}
                                        title={icon.label}
                                    >
                                        {icon.name === 'Zap' && <Zap className="h-4 w-4" />}
                                        {icon.name === 'Globe' && <Globe className="h-4 w-4" />}
                                        {icon.name === 'Shield' && <Shield className="h-4 w-4" />}
                                        {icon.name === 'Headphones' && <Headphones className="h-4 w-4" />}
                                        {icon.name === 'Clock' && <Clock className="h-4 w-4" />}
                                        {icon.name === 'Wifi' && <Wifi className="h-4 w-4" />}
                                        {icon.name === 'Server' && <Server className="h-4 w-4" />}
                                        {icon.name === 'Activity' && <Activity className="h-4 w-4" />}
                                        {icon.name === 'Cpu' && <Cpu className="h-4 w-4" />}
                                        {icon.name === 'Signal' && <Signal className="h-4 w-4" />}
                                        {icon.name === 'Lock' && <Lock className="h-4 w-4" />}
                                        {icon.name === 'Star' && <Star className="h-4 w-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label>Color</Label>
                                <div className="flex flex-wrap gap-1.5">
                                    {presetColors.map((c) => (
                                        <button
                                            key={c || 'default'}
                                            type="button"
                                            onClick={() => setData('color', c)}
                                            className={`h-7 w-7 rounded-full border-2 transition-all ${
                                                data.color === c ? 'scale-110 border-gray-800' : 'border-gray-200'
                                            }`}
                                            style={{ background: c || 'linear-gradient(135deg, #e5e7eb, #d1d5db)' }}
                                            title={c || 'Auto (theme color)'}
                                        />
                                    ))}
                                </div>
                                <p className="text-[10px] text-muted-foreground">Leave empty for auto theme color</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Sort Order</Label>
                                <Input
                                    type="number"
                                    value={data.sort_order as number}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-2 text-sm pb-2">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active as boolean}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded"
                                        style={{ accentColor: accent }}
                                    />
                                    Active
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing} style={{ background: accent }}>
                                {editing ? 'Update' : 'Create'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); reset(); }}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}

                {/* Features list */}
                <div className="space-y-3">
                    {features.length === 0 ? (
                        <p className="text-center py-10 text-muted-foreground">No intro features yet. Add some to display on the homepage.</p>
                    ) : (
                        features.map((f) => (
                            <div key={f.id} className="flex items-center gap-4 rounded-xl border bg-white p-4">
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        background: f.color ? `${f.color}15` : 'color-mix(in srgb, var(--isp-primary) 10%, transparent)',
                                        color: f.color || 'var(--isp-primary)',
                                    }}
                                >
                                    {f.icon === 'Zap' && <Zap className="h-4 w-4" />}
                                    {f.icon === 'Globe' && <Globe className="h-4 w-4" />}
                                    {f.icon === 'Shield' && <Shield className="h-4 w-4" />}
                                    {f.icon === 'Headphones' && <Headphones className="h-4 w-4" />}
                                    {f.icon === 'Clock' && <Clock className="h-4 w-4" />}
                                    {f.icon === 'Wifi' && <Wifi className="h-4 w-4" />}
                                    {f.icon === 'Server' && <Server className="h-4 w-4" />}
                                    {f.icon === 'Activity' && <Activity className="h-4 w-4" />}
                                    {f.icon === 'Cpu' && <Cpu className="h-4 w-4" />}
                                    {f.icon === 'Signal' && <Signal className="h-4 w-4" />}
                                    {f.icon === 'Lock' && <Lock className="h-4 w-4" />}
                                    {f.icon === 'Star' && <Star className="h-4 w-4" />}
                                    {(!f.icon || !availableIcons.find((i) => i.name === f.icon)) && <Zap className="h-4 w-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-sm">{f.label}</p>
                                        {f.sub_label && <span className="text-xs text-gray-400">/ {f.sub_label}</span>}
                                        {!f.is_active && (
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-semibold">Inactive</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400">Icon: {f.icon ?? 'Zap'} · Color: {f.color ?? 'auto'}</p>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => startEdit(f)}>
                                        <Edit3 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(f.id)}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
