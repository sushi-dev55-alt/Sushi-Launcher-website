import type { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
    title: string;
    icon: ReactNode;
    gradientFrom?: string;
    gradientTo?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export function GradientButton({
    title,
    icon,
    gradientFrom = '#ff4d9d',
    gradientTo = '#ff8dc7',
    href,
    onClick,
    className,
}: GradientButtonProps) {
    const style = {
        '--gradient-from': gradientFrom,
        '--gradient-to': gradientTo,
    } as CSSProperties;

    const content = (
        <>
            {/* Gradient background on hover */}
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
            {/* Blur glow */}
            <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>

            {/* Icon */}
            <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
                <span className="text-2xl text-pink-400">{icon}</span>
            </span>

            {/* Title */}
            <span className="absolute text-white uppercase tracking-wide text-sm font-bold transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
                {title}
            </span>
        </>
    );

    const baseClasses = cn(
        "relative w-[60px] h-[60px] bg-[#12121a] border border-pink-500/20 shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[180px] hover:shadow-none group cursor-pointer",
        className
    );

    if (href) {
        return (
            <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={style}
                className={baseClasses}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            style={style}
            className={baseClasses}
        >
            {content}
        </button>
    );
}

interface GradientMenuProps {
    items: GradientButtonProps[];
    className?: string;
}

export function GradientMenu({ items, className }: GradientMenuProps) {
    return (
        <ul className={cn("flex gap-6", className)}>
            {items.map((item, idx) => (
                <li key={idx}>
                    <GradientButton {...item} />
                </li>
            ))}
        </ul>
    );
}
