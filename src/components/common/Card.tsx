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
    onClick?: () => void;
}

export default function Card({
    children,
    className,
    noPadding = false,
    onClick,
}: CardProps) {
    return (
        <div
            className={cn(
                'bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-100 dark:border-slate-800',
                !noPadding && 'p-5',
                onClick && 'cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
