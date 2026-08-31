import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { useAdminUrl } from '@/hooks/use-admin-url';

const sectionLabels: Record<string, string> = {
    intro: 'Company Introduction',
    technology: 'Technology & Infrastructure',
    coverage: 'Coverage Section',
    cta: 'Final CTA',
    why_choose_us: 'Why Choose Us',
};

interface PageProps {
    section: string;
    data: Record<string, unknown>;
    is_active: boolean;
}

export default function EditSection() {
    const { section, data: sectionData, is_active: serverIsActive } = usePage().props as unknown as PageProps;
    const { adminUrl } = useAdminUrl();
    const accent = 'var(--isp-primary)';
    const d = sectionData ?? {};

    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [is_active, setIsActive] = useState(serverIsActive ?? true);
    const [formData, setFormData] = useState({
        eyebrow: (d.eyebrow as string) ?? '',
        title: (d.title as string) ?? '',
        description: (d.description as string) ?? '',
        subtitle: (d.subtitle as string) ?? '',
        cta_text: (d.cta_text as string) ?? '',
        cta_url: (d.cta_url as string) ?? '',
        highlights_json: JSON.stringify(d.highlights ?? []),
        trust_badge: (d.trust_badge as string) ?? '',
        primary_button_text: (d.primary_button_text as string) ?? '',
        primary_button_url: (d.primary_button_url as string) ?? '',
        secondary_button_text: (d.secondary_button_text as string) ?? '',
        secondary_button_url: (d.secondary_button_url as string) ?? '',
        capabilities_json: JSON.stringify(d.capabilities ?? []),
        network_stats_json: JSON.stringify(d.network_stats ?? { uptime: '99.99%', peers: '2,847' }),
        nodes_json: JSON.stringify(d.nodes ?? [
            { label: 'POP', sub: 'ACCESS' },
            { label: 'DATA CENTER', sub: 'CORE' },
            { label: 'IX PEERING', sub: 'TRANSIT' },
            { label: 'CDN EDGE', sub: 'CACHE' },
            { label: 'ACCESS NODE', sub: 'LAST MILE' },
            { label: 'CORE ROUTER', sub: 'BACKBONE' },
            { label: 'DNS CLUSTER', sub: 'RESOLVE' },
            { label: 'BGP PEER', sub: 'ROUTING' },
            { label: 'SECURITY', sub: 'FIREWALL' },
            { label: 'WIRELESS', sub: '5G/LTE' },
        ]),
        hud_panels_json: JSON.stringify(d.hud_panels ?? [
            { label: 'Network', position: 'top-left', stats: [{ value: '99.97%', label: 'uptime' }, { value: '12.4 Gbps', label: 'peak' }] },
            { label: 'Coverage', position: 'bottom-right', stats: [{ value: '64+', label: 'zones' }, { value: '8 divisions', label: 'active' }] },
        ]),
    });
    const setData = (key: string, value: string | boolean) =>
        setFormData((prev) => ({ ...prev, [key]: value }));

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Homepage', href: adminUrl('/homepage') },
        { title: sectionLabels[section] ?? section, href: adminUrl(`/homepage/${section}/edit`) },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const payload: Record<string, unknown> = {
            eyebrow: formData.eyebrow,
            title: formData.title,
            description: formData.description,
            subtitle: formData.subtitle || null,
            cta_text: formData.cta_text,
            cta_url: formData.cta_url,
            primary_button_text: formData.primary_button_text,
            primary_button_url: formData.primary_button_url,
            secondary_button_text: formData.secondary_button_text,
            secondary_button_url: formData.secondary_button_url,
        };

        try {
            payload.capabilities = JSON.parse(formData.capabilities_json);
        } catch {
            payload.capabilities = [];
        }

        try {
            payload.nodes = JSON.parse(formData.nodes_json);
        } catch {
            payload.nodes = [];
        }

        try {
            payload.highlights = JSON.parse(formData.highlights_json);
        } catch {
            payload.highlights = [];
        }

        try {
            try {
                payload.network_stats = JSON.parse(formData.network_stats_json);
            } catch {
                payload.network_stats = { uptime: '99.99%', peers: '2,847' };
            }

            payload.hud_panels = JSON.parse(formData.hud_panels_json);
        } catch {
            payload.hud_panels = [];
        }

        router.put(route('admin.homepage.update', section), {
            data: payload,
            is_active: is_active,
        }, {
            preserveScroll: true,
            onStart: () => setSaving(true),
            onFinish: () => setSaving(false),
            onSuccess: () => setErrors({}),
            onError: (errs) => setErrors(errs as Record<string, string>),
        });
    };

    const capabilities: { title: string; description: string }[] = (() => {
        try { return JSON.parse(formData.capabilities_json); } catch { return []; }
    })();

    const updateCapability = (index: number, key: string, value: string) => {
        const caps = [...capabilities];
        caps[index] = { ...caps[index], [key]: value };
        setData('capabilities_json', JSON.stringify(caps));
    };

    const addCapability = () => {
        const caps = [...capabilities, { title: '', description: '' }];
        setData('capabilities_json', JSON.stringify(caps));
    };

    const removeCapability = (index: number) => {
        const caps = [...capabilities];
        caps.splice(index, 1);
        setData('capabilities_json', JSON.stringify(caps));
    };

    // Network Nodes helpers
    const nodes: { label: string; sub: string }[] = (() => {
        try { return JSON.parse(formData.nodes_json); } catch { return []; }
    })();

    const updateNode = (index: number, key: string, value: string) => {
        const items = [...nodes];
        items[index] = { ...items[index], [key]: value };
        setData('nodes_json', JSON.stringify(items));
    };

    const addNode = () => {
        setData('nodes_json', JSON.stringify([...nodes, { label: '', sub: '' }]));
    };

    const removeNode = (index: number) => {
        const items = [...nodes];
        items.splice(index, 1);
        setData('nodes_json', JSON.stringify(items));
    };

    // Highlights helpers
    const highlights: string[] = (() => {
        try { return JSON.parse(formData.highlights_json); } catch { return []; }
    })();

    const updateHighlight = (index: number, value: string) => {
        const items = [...highlights];
        items[index] = value;
        setData('highlights_json', JSON.stringify(items));
    };

    const addHighlight = () => {
        setData('highlights_json', JSON.stringify([...highlights, '']));
    };

    const removeHighlight = (index: number) => {
        const items = [...highlights];
        items.splice(index, 1);
        setData('highlights_json', JSON.stringify(items));
    };

    // HUD Panels helpers
    const hudPanels: { label: string; position: string; stats: { value: string; label: string }[] }[] = (() => {
        try { return JSON.parse(formData.hud_panels_json); } catch { return []; }
    })();

    const updateHudPanel = (index: number, key: string, value: string) => {
        const panels = [...hudPanels];
        panels[index] = { ...panels[index], [key]: value };
        setData('hud_panels_json', JSON.stringify(panels));
    };

    const updateHudStat = (panelIndex: number, statIndex: number, key: string, value: string) => {
        const panels = [...hudPanels];
        const stats = [...panels[panelIndex].stats];
        stats[statIndex] = { ...stats[statIndex], [key]: value };
        panels[panelIndex] = { ...panels[panelIndex], stats };
        setData('hud_panels_json', JSON.stringify(panels));
    };

    const addHudStat = (panelIndex: number) => {
        const panels = [...hudPanels];
        const stats = [...panels[panelIndex].stats, { value: '', label: '' }];
        panels[panelIndex] = { ...panels[panelIndex], stats };
        setData('hud_panels_json', JSON.stringify(panels));
    };

    const removeHudStat = (panelIndex: number, statIndex: number) => {
        const panels = [...hudPanels];
        const stats = [...panels[panelIndex].stats];
        stats.splice(statIndex, 1);
        panels[panelIndex] = { ...panels[panelIndex], stats };
        setData('hud_panels_json', JSON.stringify(panels));
    };

    const allPositions = ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'];
    const positionLabels: Record<string, string> = {
        'top-left': 'Top Left',
        'top-center': 'Top Center',
        'top-right': 'Top Right',
        'middle-left': 'Middle Left',
        'middle-right': 'Middle Right',
        'bottom-left': 'Bottom Left',
        'bottom-center': 'Bottom Center',
        'bottom-right': 'Bottom Right',
    };

    const getAvailablePositions = (currentIndex: number) => {
        const usedPositions = hudPanels
            .map((p, i) => (i !== currentIndex ? p.position : null))
            .filter(Boolean);
        return allPositions.filter((pos) => !usedPositions.includes(pos));
    };

    const hudPresets = [
        {
            label: 'Network',
            stats: [
                { value: '99.97%', label: 'uptime' },
                { value: '12.4 Gbps', label: 'peak' },
            ],
        },
        {
            label: 'Coverage',
            stats: [
                { value: '64+', label: 'zones' },
                { value: '8 divisions', label: 'active' },
            ],
        },
        {
            label: 'Speed',
            stats: [
                { value: '1 Gbps', label: 'max speed' },
                { value: '<3 ms', label: 'latency' },
            ],
        },
        {
            label: 'Support',
            stats: [
                { value: '24/7', label: 'online' },
                { value: '<15 min', label: 'response' },
            ],
        },
        {
            label: 'Customers',
            stats: [
                { value: '50K+', label: 'active' },
                { value: '4.9 ★', label: 'rating' },
            ],
        },
        {
            label: 'Infrastructure',
            stats: [
                { value: '100+', label: 'PoPs' },
                { value: '5000 km', label: 'fiber' },
            ],
        },
        {
            label: 'Bandwidth',
            stats: [
                { value: '100 Tbps', label: 'capacity' },
                { value: '99.99%', label: 'redundancy' },
            ],
        },
        {
            label: 'Latency',
            stats: [
                { value: '<1 ms', label: 'local' },
                { value: '<5 ms', label: 'national' },
            ],
        },
        {
            label: 'Security',
            stats: [
                { value: 'DDoS', label: 'protected' },
                { value: '256-bit', label: 'encryption' },
            ],
        },
        {
            label: 'Plans',
            stats: [
                { value: '12+', label: 'packages' },
                { value: '৳499', label: 'starting' },
            ],
        },
        {
            label: 'Uptime SLA',
            stats: [
                { value: '99.95%', label: 'guaranteed' },
                { value: 'compensation', label: 'if failed' },
            ],
        },
    ];

    const addHudPanelFromPreset = (preset: typeof hudPresets[number]) => {
        const usedPositions = hudPanels.map((p) => p.position);
        const nextAvailable = allPositions.find((pos) => !usedPositions.includes(pos)) ?? 'top-left';
        setData('hud_panels_json', JSON.stringify([...hudPanels, { label: preset.label, position: nextAvailable, stats: [...preset.stats] }]));
    };

    const addHudPanelBlank = () => {
        const usedPositions = hudPanels.map((p) => p.position);
        const nextAvailable = allPositions.find((pos) => !usedPositions.includes(pos)) ?? 'top-left';
        setData('hud_panels_json', JSON.stringify([...hudPanels, { label: '', position: nextAvailable, stats: [{ value: '', label: '' }] }]));
    };

    const removeHudPanel = (index: number) => {
        const panels = [...hudPanels];
        panels.splice(index, 1);
        setData('hud_panels_json', JSON.stringify(panels));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${sectionLabels[section] ?? section}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Edit {sectionLabels[section] ?? section}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Configure the content for this homepage section.
                    </p>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                        <p className="font-medium">Please fix the following errors:</p>
                        <ul className="mt-1 list-disc pl-5">
                            {Object.entries(errors).map(([key, msg]) => (
                                <li key={key}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={is_active}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="h-4 w-4 rounded"
                        style={{ accentColor: accent }}
                    />
                        <Label htmlFor="is_active" className="text-sm font-medium">Section Active</Label>
                    </div>

                    <Separator />

                    {/* Intro Section */}
                    {section === 'intro' && (
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Eyebrow Text</Label>
                                    <Input value={formData.eyebrow} onChange={(e) => setData('eyebrow', e.target.value)} placeholder="About Us" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input value={formData.title} onChange={(e) => setData('title', e.target.value)} placeholder="Powering a More Connected Future" />
                                    <p className="text-[11px] text-muted-foreground">Main heading displayed prominently on the page.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Subtitle / Tagline</Label>
                                    <Input value={formData.subtitle} onChange={(e) => setData('subtitle', e.target.value)} placeholder="Your Trusted Internet Partner" />
                                    <p className="text-[11px] text-muted-foreground">Short tagline shown below the title for extra context.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={formData.description} onChange={(e) => setData('description', e.target.value)} placeholder="We are a leading internet service provider delivering ultra-fast, reliable connectivity to homes and businesses. Our cutting-edge fiber network ensures you stay connected to what matters most." />
                                    <p className="text-[11px] text-muted-foreground">Main paragraph describing your company. 2-3 sentences recommended.</p>
                                </div>

                                {/* Key Highlights */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Key Highlights</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addHighlight}><Plus className="mr-1 h-3 w-3" /> Add</Button>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground">Short bullet points shown as ✓ marks (e.g. Fiber Optic, 24/7 Support).</p>
                                    <div className="space-y-2">
                                        {highlights.map((h, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="text-green-600 text-sm font-bold">✓</span>
                                                <Input value={h} onChange={(e) => updateHighlight(i, e.target.value)} placeholder="e.g. Fiber Optic Infrastructure" className="flex-1" />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeHighlight(i)}><Trash2 className="h-3 w-3 text-red-400" /></Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>CTA Button Text</Label><Input value={formData.cta_text} onChange={(e) => setData('cta_text', e.target.value)} placeholder="Discover Our Story" /></div>
                                    <div className="space-y-2"><Label>CTA Button URL</Label><Input value={formData.cta_url} onChange={(e) => setData('cta_url', e.target.value)} placeholder="/about" /></div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Trust Badge</Label>
                                    <Input value={formData.trust_badge} onChange={(e) => setData('trust_badge', e.target.value)} placeholder="Trusted by 50,000+ customers across 8 divisions" />
                                    <p className="text-[11px] text-muted-foreground">Optional text shown below the CTA button as social proof.</p>
                                </div>
                            </div>

                            {/* HUD Panels (right side of intro) */}
                            <div className="space-y-4">
                                <div className="mb-1 flex items-center justify-between">
                                    <Label className="text-base font-bold">HUD Panels (Animation Stats)</Label>
                                    <div className="flex items-center gap-2">
                                        <select
                                            className="flex h-8 rounded-md border border-input bg-transparent px-2 text-xs"
                                            defaultValue=""
                                            onChange={(e) => {
                                                const idx = parseInt(e.target.value);
                                                if (!isNaN(idx)) addHudPanelFromPreset(hudPresets[idx]);
                                                e.target.value = '';
                                            }}
                                            disabled={hudPanels.length >= allPositions.length}
                                        >
                                            <option value="" disabled>+ Quick Add Preset</option>
                                            {hudPresets.map((p, i) => (
                                                <option key={i} value={i}>{p.label} — {p.stats.map((s) => s.value).join(', ')}</option>
                                            ))}
                                        </select>
                                        <Button type="button" variant="outline" size="sm" onClick={addHudPanelBlank} disabled={hudPanels.length >= allPositions.length}><Plus className="mr-1 h-3 w-3" /> Blank</Button>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">These stats appear in the animated visual on the right side of the intro section. Pick a preset or add a blank panel.</p>

                                <div className="space-y-4">
                                    {hudPanels.map((panel, pi) => (
                                        <div key={pi} className="rounded-lg border p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 flex-1">
                                                    <Input value={panel.label} onChange={(e) => updateHudPanel(pi, 'label', e.target.value)} placeholder="Panel label (e.g. Network)" className="max-w-[200px]" />
                                                    <select
                                                        className="flex h-9 w-full max-w-[180px] rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                                                        value={panel.position}
                                                        onChange={(e) => updateHudPanel(pi, 'position', e.target.value)}
                                                    >
                                                        {/* Current panel's own position always visible */}
                                                        <option value={panel.position}>{positionLabels[panel.position] ?? panel.position}</option>
                                                        {/* Only show unused positions */}
                                                        {getAvailablePositions(pi)
                                                            .filter((pos) => pos !== panel.position)
                                                            .map((pos) => (
                                                                <option key={pos} value={pos}>{positionLabels[pos]}</option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeHudPanel(pi)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-medium text-muted-foreground">Stats</span>
                                                    <Button type="button" variant="ghost" size="sm" onClick={() => addHudStat(pi)}><Plus className="mr-1 h-3 w-3" /> Add Stat</Button>
                                                </div>
                                                {panel.stats.map((stat, si) => (
                                                    <div key={si} className="flex items-center gap-2">
                                                        <Input value={stat.value} onChange={(e) => updateHudStat(pi, si, 'value', e.target.value)} placeholder="Value (e.g. 99.97%)" className="flex-1" />
                                                        <Input value={stat.label} onChange={(e) => updateHudStat(pi, si, 'label', e.target.value)} placeholder="Label (e.g. uptime)" className="flex-1" />
                                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeHudStat(pi, si)}><Trash2 className="h-3 w-3 text-red-400" /></Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Technology Section */}
                    {section === 'technology' && (
                        <div className="space-y-6">
                            <div className="grid gap-4 lg:grid-cols-2">
                                <div className="space-y-2"><Label>Eyebrow Text</Label><Input value={formData.eyebrow} onChange={(e) => setData('eyebrow', e.target.value)} placeholder="Our Technology" /></div>
                                <div className="space-y-2"><Label>Title</Label><Input value={formData.title} onChange={(e) => setData('title', e.target.value)} placeholder="Engineered for Reliable Connectivity" /></div>
                            </div>
                            <div className="space-y-2"><Label>Description</Label><textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={formData.description} onChange={(e) => setData('description', e.target.value)} /></div>
                            <Separator />

                            {/* Network Stats (Animation values) */}
                            <div>
                                <Label className="text-base font-bold">Animation Stats</Label>
                                <p className="mb-3 text-[11px] text-muted-foreground">Values shown in the network status panel on the animation.</p>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Uptime</Label>
                                        <Input value={(() => { try { return JSON.parse(formData.network_stats_json).uptime ?? ''; } catch { return ''; } })()} onChange={(e) => { const stats = (() => { try { return JSON.parse(formData.network_stats_json); } catch { return { uptime: '', peers: '' }; } })(); stats.uptime = e.target.value; setData('network_stats_json', JSON.stringify(stats)); }} placeholder="99.99%" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Peers</Label>
                                        <Input value={(() => { try { return JSON.parse(formData.network_stats_json).peers ?? ''; } catch { return ''; } })()} onChange={(e) => { const stats = (() => { try { return JSON.parse(formData.network_stats_json); } catch { return { uptime: '', peers: '' }; } })(); stats.peers = e.target.value; setData('network_stats_json', JSON.stringify(stats)); }} placeholder="2,847" />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <Label className="text-base font-bold">Capabilities</Label>
                                    <Button type="button" variant="outline" size="sm" onClick={addCapability}><Plus className="mr-1 h-3 w-3" /> Add</Button>
                                </div>
                                <div className="space-y-3">
                                    {capabilities.map((cap, i) => (
                                        <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                                            <div className="flex-1 space-y-2">
                                                <Input value={cap.title} onChange={(e) => updateCapability(i, 'title', e.target.value)} placeholder="Capability title" />
                                                <Input value={cap.description} onChange={(e) => updateCapability(i, 'description', e.target.value)} placeholder="Description (optional)" />
                                            </div>
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeCapability(i)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <Label className="text-base font-bold">Network Nodes</Label>
                                        <p className="text-[11px] text-muted-foreground">Labels shown on each node in the animation. 10 nodes max (positions are fixed).</p>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" onClick={addNode} disabled={nodes.length >= 10}><Plus className="mr-1 h-3 w-3" /> Add</Button>
                                </div>
                                <div className="space-y-2">
                                    {nodes.map((node, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="w-6 text-center text-xs text-muted-foreground">{i + 1}</span>
                                            <Input value={node.label} onChange={(e) => updateNode(i, 'label', e.target.value)} placeholder="Node label (e.g. POP)" className="flex-1" />
                                            <Input value={node.sub} onChange={(e) => updateNode(i, 'sub', e.target.value)} placeholder="Sub label (e.g. ACCESS)" className="flex-1" />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeNode(i)}><Trash2 className="h-3 w-3 text-red-400" /></Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Coverage Section */}
                    {section === 'coverage' && (
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="space-y-4">
                                <div className="space-y-2"><Label>Title</Label><Input value={formData.title} onChange={(e) => setData('title', e.target.value)} placeholder="Where We Keep You Connected" /></div>
                                <div className="space-y-2"><Label>Description</Label><textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={formData.description} onChange={(e) => setData('description', e.target.value)} /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>CTA Text</Label><Input value={formData.cta_text} onChange={(e) => setData('cta_text', e.target.value)} placeholder="Check Your Coverage" /></div>
                                    <div className="space-y-2"><Label>CTA URL</Label><Input value={formData.cta_url} onChange={(e) => setData('cta_url', e.target.value)} placeholder="/contact" /></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    {section === 'cta' && (
                        <div className="space-y-4">
                            <div className="grid gap-4 lg:grid-cols-2">
                                <div className="space-y-2"><Label>Eyebrow Text</Label><Input value={formData.eyebrow} onChange={(e) => setData('eyebrow', e.target.value)} placeholder="Get Started" /></div>
                                <div className="space-y-2"><Label>Title</Label><Input value={formData.title} onChange={(e) => setData('title', e.target.value)} placeholder="Your Next Connection Starts Here" /></div>
                            </div>
                            <div className="space-y-2"><Label>Description</Label><textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={formData.description} onChange={(e) => setData('description', e.target.value)} /></div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2"><Label>Primary Button Text</Label><Input value={formData.primary_button_text} onChange={(e) => setData('primary_button_text', e.target.value)} placeholder="Explore Packages" /></div>
                                <div className="space-y-2"><Label>Primary Button URL</Label><Input value={formData.primary_button_url} onChange={(e) => setData('primary_button_url', e.target.value)} placeholder="/plans" /></div>
                                <div className="space-y-2"><Label>Secondary Button Text</Label><Input value={formData.secondary_button_text} onChange={(e) => setData('secondary_button_text', e.target.value)} placeholder="Contact Us" /></div>
                                <div className="space-y-2"><Label>Secondary Button URL</Label><Input value={formData.secondary_button_url} onChange={(e) => setData('secondary_button_url', e.target.value)} placeholder="/contact" /></div>
                            </div>
                        </div>
                    )}

                    {/* Why Choose Us Section */}
                    {section === 'why_choose_us' && (
                        <div className="space-y-4">
                            <div className="grid gap-4 lg:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Eyebrow Text</Label>
                                    <Input value={formData.eyebrow} onChange={(e) => setData('eyebrow', e.target.value)} placeholder="Why Us" />
                                    <p className="text-[11px] text-muted-foreground">Small label shown above the heading (e.g. "Why Us").</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input value={formData.title} onChange={(e) => setData('title', e.target.value)} placeholder="More Than Just Internet" />
                                    <p className="text-[11px] text-muted-foreground">Main heading displayed on the section.</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={formData.description} onChange={(e) => setData('description', e.target.value)} placeholder="We deliver more than bandwidth — we deliver peace of mind with cutting-edge technology and dedicated support." />
                                <p className="text-[11px] text-muted-foreground">Subtext below the heading.</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={saving} style={{ background: accent }}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
