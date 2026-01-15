import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
    breadcrumbs: {
        label: string;
        href?: string;
    }[];
    actions?: React.ReactNode;
}

export default function PageHeader({
    title,
    description,
    breadcrumbs,
    actions,
}: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
            <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <span className="material-symbols-outlined text-xs rtl:rotate-180">
                                    chevron_right
                                </span>
                            )}
                            <span
                                className={
                                    index === breadcrumbs.length - 1
                                        ? 'text-primary font-medium'
                                        : ''
                                }
                            >
                                {crumb.label}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{description}</p>
            </div>
            {actions && <div className="flex gap-3">{actions}</div>}
        </div>
    );
}
