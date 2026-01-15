import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

export default function Card({
    children,
    className,
    noPadding = false,
}: CardProps) {
    return (
        <div
            className={cn(
                'bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-100 dark:border-slate-800',
                !noPadding && 'p-5',
                className
            )}
        >
            {children}
        </div>
    );
}
