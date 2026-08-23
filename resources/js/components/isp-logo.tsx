import { type SVGAttributes } from 'react';

interface IspLogoProps extends SVGAttributes<SVGElement> {
    variant?: 'full' | 'icon';
}

export default function IspLogo({ variant = 'full', className, ...props }: IspLogoProps) {
    if (variant === 'icon') {
        return (
            <svg
                {...props}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <rect width="40" height="40" rx="8" fill="var(--isp-primary, #2563EB)" />
                <path
                    d="M20 10C14.477 10 10 14.477 10 20C10 25.523 14.477 30 20 30"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M20 14C16.686 14 14 16.686 14 20C14 23.314 16.686 26 20 26"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M20 18C18.895 18 18 18.895 18 20C18 21.105 18.895 22 20 22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <circle cx="20" cy="20" r="1.5" fill="white" />
            </svg>
        );
    }

    return (
        <div className="flex items-center gap-2" {...props as React.HTMLAttributes<HTMLDivElement>}>
            <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
            >
                <rect width="40" height="40" rx="8" fill="var(--isp-primary, #2563EB)" />
                <path
                    d="M20 10C14.477 10 10 14.477 10 20C10 25.523 14.477 30 20 30"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M20 14C16.686 14 14 16.686 14 20C14 23.314 16.686 26 20 26"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M20 18C18.895 18 18 18.895 18 20C18 21.105 18.895 22 20 22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <circle cx="20" cy="20" r="1.5" fill="white" />
            </svg>
            <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight text-white">
                    Vibra<span className="text-[var(--isp-primary)]">net</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                    Internet Provider
                </span>
            </div>
        </div>
    );
}
