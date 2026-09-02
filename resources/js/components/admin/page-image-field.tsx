import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePage } from '@inertiajs/react';
import { Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

const MAX_SIZE_BYTES = 1024 * 1024; // 1 MB

export default function PageImageField({
    label,
    value,
    onChange,
    uploadUrl,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    uploadUrl: string;
}) {
    const { props } = usePage();
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value);
    const [error, setError] = useState<string | null>(null);

    // Inertia keeps csrf_token fresh in page props after every request.
    // Falling back to the meta tag is a last resort.
    const getCsrfToken = (): string =>
        (props as Record<string, unknown>).csrf_token as string ||
        (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content ||
        '';

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        setError(null);

        if (file.size > MAX_SIZE_BYTES) {
            setError('Image must not be larger than 1 MB.');
            return;
        }

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: formData,
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.url) {
                onChange(result.url);
                setPreview(result.url);
            } else {
                setPreview(value);
                // 419 = CSRF token mismatch — guide the user to refresh
                if (response.status === 419) {
                    setError('Session expired. Please refresh the page and try again.');
                } else {
                    setError(
                        result?.errors?.image?.[0] ?? result?.message ?? 'Upload failed. Please try again.',
                    );
                }
            }
        } catch {
            setPreview(value);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-1.5">
            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</Label>
            <div className="space-y-2">
                <label
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-2.5 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50"
                    style={{
                        borderColor: 'color-mix(in srgb, var(--isp-primary) 30%, transparent)',
                        background: 'color-mix(in srgb, var(--isp-primary) 4%, transparent)',
                        color: 'var(--isp-primary)',
                    }}
                >
                    <ImageIcon className="h-4 w-4 shrink-0" />
                    <span className="truncate font-medium">
                        {uploading ? 'Uploading...' : 'Click to upload image'}
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="sr-only"
                        aria-label={`Upload ${label}`}
                    />
                </label>
                {error ? (
                    <p className="text-xs font-medium text-destructive">{error}</p>
                ) : (
                    <p className="text-xs text-muted-foreground">JPG, PNG, or WebP (max 1 MB) — or paste a URL below</p>
                )}
                <Input
                    value={value}
                    onChange={(e) => {
                        setError(null);
                        setPreview(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder="https://..."
                    className="rounded-lg border-gray-200 focus:border-[var(--isp-primary)] focus:ring-[var(--isp-primary)]"
                />
                {preview && !error && (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <img src={preview} alt="" className="h-40 w-full object-cover" />
                    </div>
                )}
            </div>
        </div>
    );
}
