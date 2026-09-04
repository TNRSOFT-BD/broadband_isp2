import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { SharedData } from '@/types';
import { cn } from '@/lib/utils';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface PlanFeatureInput {
    [key: string]: string;
    title: string;
    description: string;
}

export interface PlanServiceInput {
    [key: string]: string | number | boolean;
    service_id: number;
    custom_label: string;
    custom_note: string;
    duration: string;
    is_included: boolean;
    is_featured: boolean;
}

export interface PlanFormData {
    [key: string]: string | boolean | PlanFeatureInput[] | PlanServiceInput[];
    name: string;
    slug: string;
    plan_category_id: string;
    tagline: string;
    description: string;
    speed: string;
    speed_unit: string;
    download_speed: string;
    upload_speed: string;
    monthly_price: string;
    quarterly_price: string;
    yearly_price: string;
    setup_fee: string;
    vat_information: string;
    contract_duration: string;
    fair_usage_policy: string;
    terms_conditions: string;
    badge_text: string;
    is_featured: boolean;
    is_recommended: boolean;
    is_active: boolean;
    sort_order: string;
    cta_text: string;
    cta_url: string;
    features: PlanFeatureInput[];
    services: PlanServiceInput[];
}

interface ServiceOption {
    id: number;
    name: string;
    slug: string;
    logo?: string | null;
}

interface CategoryOption {
    id: number;
    name: string;
    slug: string;
}

interface PlanFormProps {
    initialData: PlanFormData;
    categories: CategoryOption[];
    services: ServiceOption[];
    submitRoute: string;
    method?: 'post' | 'put';
}

const TABS = ['Basic Info', 'Speed & Pricing', 'Features', 'Included Services', 'Status, CTA & Terms'] as const;

export function PlanForm({ initialData, categories, services, submitRoute, method = 'post' }: PlanFormProps) {
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Basic Info');
    const [serviceSearch, setServiceSearch] = useState('');

    const { errors } = usePage<SharedData>().props;

    const form = useForm<PlanFormData>(initialData);

    const filteredServices = useMemo(() => {
        if (!serviceSearch.trim()) return services;
        return services.filter((s) => s.name.toLowerCase().includes(serviceSearch.toLowerCase()));
    }, [services, serviceSearch]);

    const selectedServiceIds = new Set(form.data.services.map((s) => s.service_id));

    const toggleService = (serviceId: number) => {
        if (selectedServiceIds.has(serviceId)) {
            form.setData('services', form.data.services.filter((s) => s.service_id !== serviceId));
        } else {
            form.setData('services', [...form.data.services, { service_id: serviceId, custom_label: '', custom_note: '', duration: '', is_included: true, is_featured: false }]);
        }
    };

    const updateService = (index: number, patch: Partial<PlanServiceInput>) => {
        form.setData(
            'services',
            form.data.services.map((s, i) => (i === index ? ({ ...s, ...patch } as PlanServiceInput) : s)),
        );
    };

    const addFeature = () => {
        form.setData('features', [...form.data.features, { title: '', description: '' }]);
    };

    const removeFeature = (index: number) => {
        form.setData('features', form.data.features.filter((_, i) => i !== index));
    };

    const moveFeature = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= form.data.features.length) return;
        const next = [...form.data.features];
        [next[index], next[target]] = [next[target], next[index]];
        form.setData('features', next);
    };

    const updateFeature = (index: number, patch: Partial<PlanFeatureInput>) => {
        form.setData(
            'features',
            form.data.features.map((f, i) => (i === index ? ({ ...f, ...patch } as PlanFeatureInput) : f)),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (method === 'put') {
            form.put(submitRoute);
        } else {
            form.post(submitRoute);
        }
    };

    const errorFor = (field: string) => (errors as Record<string, string>)[field];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-white p-2">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        aria-current={activeTab === tab}
                        className={cn(
                            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                            activeTab === tab ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Basic Info */}
            {activeTab === 'Basic Info' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Plan identity and category assignment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Plan Name *</Label>
                                <Input id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="Ultra Fiber" />
                                {errorFor('name') && <p className="text-sm text-destructive">{errorFor('name')}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
                                <Input id="slug" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} placeholder="ultra-fiber" />
                                {errorFor('slug') && <p className="text-sm text-destructive">{errorFor('slug')}</p>}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <select
                                    id="category"
                                    value={form.data.plan_category_id}
                                    onChange={(e) => form.setData('plan_category_id', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="">Select category...</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={String(c.id)}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                {errorFor('plan_category_id') && <p className="text-sm text-destructive">{errorFor('plan_category_id')}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tagline">Tagline</Label>
                                <Input id="tagline" value={form.data.tagline} onChange={(e) => form.setData('tagline', e.target.value)} placeholder="Best for Streaming & Gaming" />
                                {errorFor('tagline') && <p className="text-sm text-destructive">{errorFor('tagline')}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                                rows={4}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="Describe what makes this plan special..."
                            />
                            {errorFor('description') && <p className="text-sm text-destructive">{errorFor('description')}</p>}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Speed & Pricing */}
            {activeTab === 'Speed & Pricing' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Speed &amp; Pricing</CardTitle>
                        <CardDescription>The headline speed shown on the card plus detailed pricing options.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Separator />
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Speed</h4>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="speed">Main Speed *</Label>
                                <Input id="speed" type="number" min="1" step="any" value={form.data.speed} onChange={(e) => form.setData('speed', e.target.value)} placeholder="100" />
                                {errorFor('speed') && <p className="text-sm text-destructive">{errorFor('speed')}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="speed_unit">Unit *</Label>
                                <select
                                    id="speed_unit"
                                    value={form.data.speed_unit}
                                    onChange={(e) => form.setData('speed_unit', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="Mbps">Mbps</option>
                                    <option value="Gbps">Gbps</option>
                                    <option value="Kbps">Kbps</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="download_speed">Download Speed</Label>
                                <Input id="download_speed" type="number" min="0" step="any" value={form.data.download_speed} onChange={(e) => form.setData('download_speed', e.target.value)} placeholder="100" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="upload_speed">Upload Speed</Label>
                                <Input id="upload_speed" type="number" min="0" step="any" value={form.data.upload_speed} onChange={(e) => form.setData('upload_speed', e.target.value)} placeholder="50" />
                            </div>
                        </div>

                        <Separator />
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pricing</h4>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="monthly_price">Monthly Price *</Label>
                                <Input id="monthly_price" type="number" min="0" step="0.01" value={form.data.monthly_price} onChange={(e) => form.setData('monthly_price', e.target.value)} placeholder="1500" />
                                {errorFor('monthly_price') && <p className="text-sm text-destructive">{errorFor('monthly_price')}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quarterly_price">Quarterly Price</Label>
                                <Input id="quarterly_price" type="number" min="0" step="0.01" value={form.data.quarterly_price} onChange={(e) => form.setData('quarterly_price', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="yearly_price">Yearly Price</Label>
                                <Input id="yearly_price" type="number" min="0" step="0.01" value={form.data.yearly_price} onChange={(e) => form.setData('yearly_price', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="setup_fee">Setup Fee</Label>
                                <Input id="setup_fee" type="number" min="0" step="0.01" value={form.data.setup_fee} onChange={(e) => form.setData('setup_fee', e.target.value)} placeholder="0" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vat_information">VAT Information</Label>
                            <Input id="vat_information" value={form.data.vat_information} onChange={(e) => form.setData('vat_information', e.target.value)} placeholder="All prices include VAT" />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Features */}
            {activeTab === 'Features' && (
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Plan Features</CardTitle>
                            <CardDescription>Add, remove, or reorder key selling points shown on the card.</CardDescription>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                            <Plus /> Add Feature
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {form.data.features.length === 0 && (
                            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">No features yet. Click "Add Feature" to create one.</p>
                        )}
                        {form.data.features.map((feature, index) => (
                            <div key={`feature-${index}`} className="flex items-start gap-3 rounded-lg border bg-background p-3">
                                <div className="flex flex-col gap-1 pt-1">
                                    <button type="button" onClick={() => moveFeature(index, -1)} disabled={index === 0} className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-30" aria-label="Move feature up">
                                        <ArrowUp className="h-3.5 w-3.5" />
                                    </button>
                                    <button type="button" onClick={() => moveFeature(index, 1)} disabled={index === form.data.features.length - 1} className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-30" aria-label="Move feature down">
                                        <ArrowDown className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <div className="grid flex-1 gap-2 md:grid-cols-2">
                                    <Input value={feature.title} onChange={(e) => updateFeature(index, { title: e.target.value })} placeholder="Unlimited bandwidth *" aria-label={`Feature ${index + 1} title`} />
                                    <Input value={feature.description} onChange={(e) => updateFeature(index, { description: e.target.value })} placeholder="Short description (optional)" aria-label={`Feature ${index + 1} description`} />
                                </div>
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)} aria-label={`Remove feature ${index + 1}`}>
                                    <Trash2 className="text-destructive" />
                                </Button>
                            </div>
                        ))}
                        {(errors as Record<string, string>)['features.0.title'] && <p className="text-sm text-destructive">Each feature needs a title.</p>}
                    </CardContent>
                </Card>
            )}

            {/* Included Services */}
            {activeTab === 'Included Services' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Included OTT &amp; Digital Services</CardTitle>
                        <CardDescription>Select the services bundled with this plan. Expand each selection to add custom labels or notes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input value={serviceSearch} onChange={(e) => setServiceSearch(e.target.value)} placeholder="Search services..." aria-label="Search services" />

                        {services.length === 0 && (
                            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                                No active services available. Create services first under Admin → Services.
                            </p>
                        )}

                        <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                            {filteredServices.map((service) => {
                                const selectedIndex = form.data.services.findIndex((s) => s.service_id === service.id);
                                const isSelected = selectedIndex !== -1;

                                return (
                                    <div key={service.id} className={cn('rounded-lg border transition-colors', isSelected ? 'border-primary/40 bg-primary/[0.04]' : 'bg-background')}>
                                        <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5">
                                            <Checkbox checked={isSelected} onCheckedChange={() => toggleService(service.id)} aria-label={`Include ${service.name}`} />
                                            {service.logo ? (
                                                <img src={service.logo} alt="" className="h-8 w-8 rounded object-contain" loading="lazy" />
                                            ) : (
                                                <span className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">{service.name.charAt(0)}</span>
                                            )}
                                            <span className="text-sm font-medium">{service.name}</span>
                                        </label>

                                        {isSelected && (
                                            <div className="grid gap-2 border-t px-3 pb-3 pt-3 md:grid-cols-3">
                                                <Input value={form.data.services[selectedIndex].custom_label} onChange={(e) => updateService(selectedIndex, { custom_label: e.target.value })} placeholder="Custom label" aria-label={`${service.name} custom label`} />
                                                <Input value={form.data.services[selectedIndex].duration} onChange={(e) => updateService(selectedIndex, { duration: e.target.value })} placeholder="Duration e.g. 12 months free" aria-label={`${service.name} duration`} />
                                                <Input value={form.data.services[selectedIndex].custom_note} onChange={(e) => updateService(selectedIndex, { custom_note: e.target.value })} placeholder="Note (internal)" aria-label={`${service.name} note`} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {services.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                                <Badge variant="secondary">{selectedServiceIds.size}</Badge> selected of {services.length} services
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Status, CTA & Terms */}
            {activeTab === 'Status, CTA & Terms' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Status, CTA &amp; Terms</CardTitle>
                        <CardDescription>Visibility flags, call-to-action overrides, and legal copy.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {([
                                ['is_active', 'Active'],
                                ['is_featured', 'Featured'],
                                ['is_recommended', 'Recommended'],
                            ] as const).map(([key, label]) => (
                                <label key={key} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                                    <span className="text-sm font-medium">{label}</span>
                                    <input
                                        type="checkbox"
                                        checked={form.data[key]}
                                        onChange={(e) => form.setData(key, e.target.checked)}
                                        className="h-4 w-4 accent-[var(--isp-primary)]"
                                        aria-label={label}
                                    />
                                </label>
                            ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="badge_text">Badge Text</Label>
                                <Input id="badge_text" value={form.data.badge_text} onChange={(e) => form.setData('badge_text', e.target.value)} placeholder="Most Popular" maxLength={50} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input id="sort_order" type="number" min="0" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contract_duration">Contract Duration</Label>
                                <Input id="contract_duration" value={form.data.contract_duration} onChange={(e) => form.setData('contract_duration', e.target.value)} placeholder="No lock-in / 12 months" />
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="cta_text">CTA Button Text</Label>
                                <Input id="cta_text" value={form.data.cta_text} onChange={(e) => form.setData('cta_text', e.target.value)} placeholder="Get This Plan (default)" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cta_url">CTA Button URL</Label>
                                <Input id="cta_url" value={form.data.cta_url} onChange={(e) => form.setData('cta_url', e.target.value)} placeholder="/plans/{slug} (default)" />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label htmlFor="fair_usage_policy">Fair Usage Policy</Label>
                            <textarea id="fair_usage_policy" value={form.data.fair_usage_policy} onChange={(e) => form.setData('fair_usage_policy', e.target.value)} rows={2} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="terms_conditions">Terms &amp; Conditions</Label>
                            <textarea id="terms_conditions" value={form.data.terms_conditions} onChange={(e) => form.setData('terms_conditions', e.target.value)} rows={4} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Sticky footer actions */}
            <div className="flex items-center justify-end gap-3 border-t bg-white/80 py-4 backdrop-blur">
                <Button type="submit" disabled={form.processing} size="lg" className="min-w-[180px]">
                    <Save />
                    {form.processing ? 'Saving...' : method === 'post' ? 'Create Plan' : 'Update Plan'}
                </Button>
            </div>
        </form>
    );
}

export default PlanForm;
