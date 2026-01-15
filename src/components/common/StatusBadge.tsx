import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatusBadgeProps {
    label: string;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
    showDot?: boolean;
    className?: string;
    icon?: string;
}

const variants = {
    success:
        'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-100 dark:border-green-800',
    warning:
        'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-100 dark:border-amber-800',
    error:
        'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-100 dark:border-red-800',
    info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-100 dark:border-blue-800',
    neutral:
        'bg-slate-50 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 border-slate-100 dark:border-slate-700',
};

const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-slate-500',
};

export default function StatusBadge({
    label,
    variant = 'neutral',
    showDot = false,
    className,
    icon,
}: StatusBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border gap-1',
                variants[variant],
                className
            )}
        >
            {showDot && (
                <span
                    className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])}
                ></span>
            )}
            {icon && (
                <span className="material-symbols-outlined text-sm rtl:rotate-180">
                    {icon}
                </span>
            )}
            {label}
        </span>
    );
}
