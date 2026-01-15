import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatCardProps {
    title: string;
    value: React.ReactNode;
    icon: string;
    color?: 'primary' | 'green' | 'purple' | 'amber' | 'blue' | 'red';
    trend?: {
        value: string;
        label: string;
        positive?: boolean;
        icon?: string;
    };
    subValue?: React.ReactNode;
    className?: string;
}

const colorStyles = {
    primary: {
        iconBg: 'bg-blue-50 dark:bg-blue-900/30',
        iconText: 'text-primary dark:text-blue-300',
        bigIcon: 'text-primary',
        trendBg: 'bg-blue-50 dark:bg-blue-900/20',
        trendText: 'text-blue-600 dark:text-blue-400',
    },
    blue: {
        iconBg: 'bg-blue-50 dark:bg-blue-900/30',
        iconText: 'text-blue-600 dark:text-blue-400',
        bigIcon: 'text-blue-600',
        trendBg: 'bg-blue-50 dark:bg-blue-900/20',
        trendText: 'text-blue-600 dark:text-blue-400',
    },
    green: {
        iconBg: 'bg-green-50 dark:bg-green-900/30',
        iconText: 'text-green-600 dark:text-green-400',
        bigIcon: 'text-green-600',
        trendBg: 'bg-green-50 dark:bg-green-900/20',
        trendText: 'text-green-600 dark:text-green-400',
    },
    purple: {
        iconBg: 'bg-purple-50 dark:bg-purple-900/30',
        iconText: 'text-purple-600 dark:text-purple-400',
        bigIcon: 'text-purple-600',
        trendBg: 'bg-purple-50 dark:bg-purple-900/20',
        trendText: 'text-purple-600 dark:text-purple-400',
    },
    amber: {
        iconBg: 'bg-amber-50 dark:bg-amber-900/30',
        iconText: 'text-amber-600 dark:text-amber-400',
        bigIcon: 'text-amber-600',
        trendBg: 'bg-amber-50 dark:bg-amber-900/20',
        trendText: 'text-amber-700 dark:text-amber-400',
    },
    red: {
        iconBg: 'bg-red-50 dark:bg-red-900/30',
        iconText: 'text-red-600 dark:text-red-400',
        bigIcon: 'text-red-600',
        trendBg: 'bg-red-50 dark:bg-red-900/20',
        trendText: 'text-red-600 dark:text-red-400',
    },
};

export default function StatCard({
    title,
    value,
    icon,
    color = 'primary',
    trend,
    subValue,
    className,
}: StatCardProps) {
    const styles = colorStyles[color];

    return (
        <div
            className={cn(
                'bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group',
                className
            )}
        >
            <div className="absolute top-0 left-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span
                    className={cn('material-symbols-outlined text-8xl', styles.bigIcon)}
                >
                    {icon}
                </span>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                            {value}
                        </h3>
                        {subValue && (
                            <span className="text-sm font-normal text-slate-400">
                                {subValue}
                            </span>
                        )}
                    </div>
                </div>
                <div className={cn('p-2 rounded-lg', styles.iconBg, styles.iconText)}>
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
            </div>
            {trend && (
                <div className="flex items-center text-xs">
                    <span
                        className={cn(
                            'flex items-center font-medium px-1.5 py-0.5 rounded',
                            styles.trendText,
                            styles.trendBg
                        )}
                    >
                        {trend.icon && (
                            <span className="material-symbols-outlined text-sm mr-1">
                                {trend.icon}
                            </span>
                        )}
                        {trend.value}
                    </span>
                    <span className="text-slate-400 mr-2">{trend.label}</span>
                </div>
            )}
        </div>
    );
}
