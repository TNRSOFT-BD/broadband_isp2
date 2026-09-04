import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import PageImageField from '@/components/admin/page-image-field';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useAdminUrl } from '@/hooks/use-admin-url';


interface ThemeColors {
    primary: string;
    primary_dark: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
}

interface ThemeData {
    id: number;
    name: string;
    is_active: boolean;
    colors: ThemeColors;
}

interface FontData {
    id: number;
    name: string;
    family: string;
    url: string | null;
    is_active: boolean;
    font_style: string;
    weight: string;
}

interface PageProps {
    themes: ThemeData[];
    fonts: FontData[];
    activeTheme: ThemeData | null;
    activeFont: FontData | null;
    siteSettings?: { site_name: string | null; logo: string | null; favicon: string | null };
}

const defaultColors: ThemeColors = {
    primary: '#2563EB',
    primary_dark: '#1E40AF',
    secondary: '#0891B2',
    accent: '#06B6D4',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
};

const googleFonts = [
    { name: 'Inter', family: 'Inter', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
    { name: 'Poppins', family: 'Poppins', url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' },
    { name: 'Roboto', family: 'Roboto', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap' },
    { name: 'Open Sans', family: 'Open Sans', url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap' },
    { name: 'Lato', family: 'Lato', url: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&display=swap' },
    { name: 'Montserrat', family: 'Montserrat', url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' },
    { name: 'Source Sans Pro', family: 'Source Sans Pro', url: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;500;600;700&display=swap' },
    { name: 'Nunito', family: 'Nunito', url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap' },
    { name: 'Electrolize', family: 'Electrolize', url: 'https://fonts.googleapis.com/css2?family=Electrolize:wght@400&display=swap' },
];

/** Font style to CSS font-weight mapping */
const fontStyleMap: Record<string, string> = {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
};

export default function WebsiteConfig() {
    const { adminUrl } = useAdminUrl();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminUrl('/dashboard') },
        { title: 'Website Config', href: adminUrl('/website-config') },
    ];

    const { activeTheme, activeFont, siteSettings } = usePage().props as unknown as PageProps;

    const [previewColors, setPreviewColors] = useState<ThemeColors>(
        activeTheme?.colors ?? defaultColors
    );

    const themeForm = useForm({
        name: activeTheme?.name ?? 'Default Theme',
        colors: activeTheme?.colors ?? defaultColors,
    });

    const fontForm = useForm({
        name: activeFont?.name ?? 'Inter',
        family: activeFont?.family ?? 'Inter',
        url: activeFont?.url ?? googleFonts[0].url,
        weight: activeFont?.weight ?? '400,500,600,700',
        font_style: activeFont?.font_style ?? 'regular',
    });

    const resetForm = useForm({});

    const brandingForm = useForm({
        site_name: siteSettings?.site_name ?? '',
        logo: siteSettings?.logo ?? '',
        favicon: siteSettings?.favicon ?? '',
    });

    const handleBrandingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        brandingForm.put(route('admin.website-config.branding.update'));
    };

    const handleColorChange = (key: keyof ThemeColors, value: string) => {
        const newColors = { ...previewColors, [key]: value };
        setPreviewColors(newColors);
        themeForm.setData('colors', newColors);
    };

    const handleThemeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        themeForm.put(route('admin.website-config.theme.update'));
    };

    const handleFontSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fontForm.put(route('admin.website-config.font.update'));
    };

    const handleReset = () => {
        resetForm.post(route('admin.website-config.theme.reset'));
        setPreviewColors(defaultColors);
    };

    const handleFontSelect = (font: typeof googleFonts[0]) => {
        fontForm.setData({
            name: font.name,
            family: font.family,
            url: font.url,
            weight: '400,500,600,700',
            font_style: fontForm.data.font_style,
        });
    };

    const colorFields: { key: keyof ThemeColors; label: string; description: string }[] = [
        { key: 'primary', label: 'Primary Color', description: 'Buttons, links, and main accents' },
        { key: 'primary_dark', label: 'Primary Dark', description: 'Hover states for primary elements' },
        { key: 'secondary', label: 'Secondary Color', description: 'Call-to-action elements' },
        { key: 'accent', label: 'Accent Color', description: 'Highlights and icons' },
        { key: 'success', label: 'Success Color', description: 'Success messages and indicators' },
        { key: 'warning', label: 'Warning Color', description: 'Alerts and warnings' },
        { key: 'error', label: 'Error Color', description: 'Errors and danger actions' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Website Configuration" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Live Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>
                            Preview your color and font changes in real-time
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="rounded-lg border p-6"
                            style={{
                                backgroundColor: '#ffffff',
                                fontFamily: fontForm.data.family,
                                fontWeight: fontStyleMap[fontForm.data.font_style] ?? '400',
                            }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md text-white text-sm font-medium"
                                    style={{ backgroundColor: previewColors.primary }}
                                >
                                    Primary Button
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md text-white text-sm font-medium"
                                    style={{ backgroundColor: previewColors.secondary }}
                                >
                                    Secondary Button
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md text-white text-sm font-medium"
                                    style={{ backgroundColor: previewColors.accent }}
                                >
                                    Accent Button
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                    style={{ backgroundColor: previewColors.success }}
                                >
                                    Success
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                    style={{ backgroundColor: previewColors.warning }}
                                >
                                    Warning
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                    style={{ backgroundColor: previewColors.error }}
                                >
                                    Error
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Branding */}
                <Card>
                    <CardHeader>
                        <CardTitle>Branding</CardTitle>
                        <CardDescription>
                            Upload your website logo and favicon. Uploading a new image replaces the old one after saving.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleBrandingSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="site-name">Company Name</Label>
                                <Input
                                    id="site-name"
                                    value={brandingForm.data.site_name}
                                    onChange={(e) => brandingForm.setData('site_name', e.target.value)}
                                    placeholder="VibraNet"
                                />
                                <p className="text-xs text-muted-foreground">
                                    This name appears in the website header, footer, browser tab title, and other public areas.
                                </p>
                                {brandingForm.errors.site_name && (
                                    <p className="text-sm text-destructive">{brandingForm.errors.site_name}</p>
                                )}
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <PageImageField
                                    label="Website Logo"
                                    value={brandingForm.data.logo}
                                    onChange={(v) => brandingForm.setData('logo', v)}
                                    uploadUrl={adminUrl('/website-config/upload')}
                                />
                                <PageImageField
                                    label="Favicon"
                                    value={brandingForm.data.favicon}
                                    onChange={(v) => brandingForm.setData('favicon', v)}
                                    uploadUrl={adminUrl('/website-config/upload')}
                                />
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Logo appears in the public navbar &amp; footer (SVG or PNG, transparent background
                                recommended). Favicon shows in the browser tab (ICO, PNG or SVG, 32×32 or larger).
                                Max size 1&nbsp;MB each.
                            </p>

                            {brandingForm.errors.logo && (
                                <p className="text-sm text-destructive">{brandingForm.errors.logo}</p>
                            )}
                            {brandingForm.errors.favicon && (
                                <p className="text-sm text-destructive">{brandingForm.errors.favicon}</p>
                            )}

                            <Button type="submit" disabled={brandingForm.processing}>
                                {brandingForm.processing ? 'Saving...' : 'Save Branding'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Color Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Color Palette</CardTitle>
                            <CardDescription>
                                Customize your brand colors. All colors must be valid hex codes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleThemeSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="theme-name">Theme Name</Label>
                                    <Input
                                        id="theme-name"
                                        value={themeForm.data.name}
                                        onChange={(e) => themeForm.setData('name', e.target.value)}
                                        placeholder="My Custom Theme"
                                    />
                                    {themeForm.errors.name && (
                                        <p className="text-sm text-destructive">{themeForm.errors.name}</p>
                                    )}
                                </div>

                                <Separator />

                                <div className="grid gap-4">
                                    {colorFields.map((field) => (
                                        <div key={field.key} className="flex items-center gap-4">
                                            <div className="relative">
                                                <input
                                                    type="color"
                                                    value={previewColors[field.key]}
                                                    onChange={(e) => handleColorChange(field.key, e.target.value)}
                                                    className="h-10 w-10 cursor-pointer rounded-md border-0 p-0"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Label className="text-sm font-medium">{field.label}</Label>
                                                <p className="text-xs text-muted-foreground">{field.description}</p>
                                            </div>
                                            <Input
                                                value={previewColors[field.key]}
                                                onChange={(e) => handleColorChange(field.key, e.target.value)}
                                                className="w-28 font-mono text-sm"
                                                placeholder="#2563EB"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {themeForm.errors.colors && (
                                    <p className="text-sm text-destructive">{themeForm.errors.colors}</p>
                                )}

                                <Separator />

                                <div className="flex gap-3">
                                    <Button type="submit" disabled={themeForm.processing}>
                                        {themeForm.processing ? 'Saving...' : 'Save Colors'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleReset}
                                        disabled={resetForm.processing}
                                    >
                                        Reset to Default
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Font Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Typography</CardTitle>
                            <CardDescription>
                                Select a Google Font for your website
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFontSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    {googleFonts.map((font) => (
                                        <button
                                            key={font.family}
                                            type="button"
                                            onClick={() => handleFontSelect(font)}
                                            className={`rounded-lg border-2 p-3 text-left transition-colors ${
                                                fontForm.data.family === font.family
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                            }`}
                                        >
                                            <p
                                                className="text-sm font-medium"
                                                style={{ fontFamily: font.family }}
                                            >
                                                {font.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">Google Fonts</p>
                                        </button>
                                    ))}
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label htmlFor="font-name">Font Name</Label>
                                    <Input
                                        id="font-name"
                                        value={fontForm.data.name}
                                        onChange={(e) => fontForm.setData('name', e.target.value)}
                                        placeholder="Inter"
                                    />
                                    {fontForm.errors.name && (
                                        <p className="text-sm text-destructive">{fontForm.errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="font-family">Font Family</Label>
                                    <Input
                                        id="font-family"
                                        value={fontForm.data.family}
                                        onChange={(e) => fontForm.setData('family', e.target.value)}
                                        placeholder="Inter"
                                    />
                                    {fontForm.errors.family && (
                                        <p className="text-sm text-destructive">{fontForm.errors.family}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="font-url">Google Fonts URL</Label>
                                    <Input
                                        id="font-url"
                                        value={fontForm.data.url ?? ''}
                                        onChange={(e) => fontForm.setData('url', e.target.value)}
                                        placeholder="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                                    />
                                    {fontForm.errors.url && (
                                        <p className="text-sm text-destructive">{fontForm.errors.url}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="font-weight">Font Weights</Label>
                                    <Input
                                        id="font-weight"
                                        value={fontForm.data.weight}
                                        onChange={(e) => fontForm.setData('weight', e.target.value)}
                                        placeholder="400,500,600,700"
                                    />
                                    {fontForm.errors.weight && (
                                        <p className="text-sm text-destructive">{fontForm.errors.weight}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="font-style">Font Style</Label>
                                    <select
                                        id="font-style"
                                        value={fontForm.data.font_style}
                                        onChange={(e) => fontForm.setData('font_style', e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        <option value="thin">Thin (100)</option>
                                        <option value="extralight">Extra Light (200)</option>
                                        <option value="light">Light (300)</option>
                                        <option value="regular">Regular (400)</option>
                                        <option value="medium">Medium (500)</option>
                                        <option value="semibold">Semi Bold (600)</option>
                                        <option value="bold">Bold (700)</option>
                                        <option value="extrabold">Extra Bold (800)</option>
                                        <option value="black">Black (900)</option>
                                    </select>
                                    <p className="text-xs text-muted-foreground">Select font weight/style</p>
                                </div>

                                <Button type="submit" disabled={fontForm.processing}>
                                    {fontForm.processing ? 'Saving...' : 'Save Font'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
