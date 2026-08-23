import { cn } from '@/lib/utils';

interface ServiceLogoProps {
    name: string;
    logo?: string | null;
    className?: string;
}

export function ServiceLogo({ name, logo, className }: ServiceLogoProps) {
    return (
        <div
            className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md',
                className,
            )}
            title={name}
        >
            {logo ? (
                <img
                    src={logo}
                    alt={`${name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-1.5"
                />
            ) : (
                <span
                    aria-hidden="true"
                    className="text-sm font-bold text-white"
                    style={{
                        background: 'linear-gradient(135deg, var(--isp-primary), var(--isp-accent))',
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                    }}
                >
                    {name.charAt(0).toUpperCase()}
                </span>
            )}
        </div>
    );
}

export default ServiceLogo;
