"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
    targetDate: Date;
    label?: string;
    compact?: boolean;
}

export function useCountdown(targetDate: Date) {
    const [timeLeft, setTimeLeft] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false,
    });

    React.useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                isExpired: false,
            };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return timeLeft;
}

export function CountdownTimer({ targetDate, label, compact = false }: CountdownTimerProps) {
    const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

    if (isExpired) {
        return (
            <div className="text-red-500 font-bold text-sm">
                انتهى الوقت
            </div>
        );
    }

    if (compact) {
        return (
            <div className="flex items-center gap-1 text-sm font-mono">
                <span className="text-slate-900 dark:text-white font-bold">{days}</span>
                <span className="text-slate-400">:</span>
                <span className="text-slate-900 dark:text-white font-bold">{String(hours).padStart(2, '0')}</span>
                <span className="text-slate-400">:</span>
                <span className="text-slate-900 dark:text-white font-bold">{String(minutes).padStart(2, '0')}</span>
                <span className="text-slate-400">:</span>
                <span className="text-slate-900 dark:text-white font-bold">{String(seconds).padStart(2, '0')}</span>
            </div>
        );
    }

    const timeUnits = [
        { value: days, label: 'يوم' },
        { value: hours, label: 'ساعة' },
        { value: minutes, label: 'دقيقة' },
        { value: seconds, label: 'ثانية' },
    ];

    return (
        <div className="text-center">
            {label && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{label}</p>
            )}
            <div className="flex items-center justify-center gap-2">
                {timeUnits.map((unit, index) => (
                    <React.Fragment key={unit.label}>
                        <motion.div
                            key={unit.value}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                                    {String(unit.value).padStart(2, '0')}
                                </span>
                            </div>
                            <span className="text-[10px] text-slate-500 mt-1">{unit.label}</span>
                        </motion.div>
                        {index < timeUnits.length - 1 && (
                            <span className="text-slate-400 text-xl font-bold mb-4">:</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

// Mini Calendar Widget
interface CalendarWidgetProps {
    events?: {
        date: Date;
        title: string;
        type: 'exam' | 'class' | 'deadline' | 'event';
    }[];
}

export function MiniCalendar({ events = [] }: CalendarWidgetProps) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const arabicDays = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
    const arabicMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

    const getEventForDay = (day: number) => {
        return events.find(e => {
            const eventDate = new Date(e.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear;
        });
    };

    const eventTypeColors = {
        exam: 'bg-red-500',
        class: 'bg-blue-500',
        deadline: 'bg-amber-500',
        event: 'bg-purple-500',
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white">
                    {arabicMonths[currentMonth]} {currentYear}
                </h3>
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                        <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
                    </button>
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                        <span className="material-symbols-outlined text-sm text-slate-400">chevron_left</span>
                    </button>
                </div>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {arabicDays.map(day => (
                    <div key={day} className="text-center text-[10px] font-bold text-slate-400 py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before first day of month */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-8" />
                ))}

                {/* Days of month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === currentDay;
                    const event = getEventForDay(day);

                    return (
                        <div
                            key={day}
                            className={`h-8 flex flex-col items-center justify-center rounded-lg text-xs relative cursor-pointer transition-colors
                                ${isToday
                                    ? 'bg-primary text-white font-bold'
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            {day}
                            {event && (
                                <div className={`absolute bottom-0.5 w-1 h-1 rounded-full ${eventTypeColors[event.type]}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                {Object.entries(eventTypeColors).map(([type, color]) => (
                    <div key={type} className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${color}`} />
                        <span className="text-[10px] text-slate-500">
                            {type === 'exam' && 'امتحان'}
                            {type === 'class' && 'محاضرة'}
                            {type === 'deadline' && 'موعد نهائي'}
                            {type === 'event' && 'حدث'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Skeleton Loader
interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
    const baseClasses = 'animate-pulse bg-slate-200 dark:bg-slate-700';
    const variantClasses = {
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />;
}

// Empty State
interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({ icon = 'inbox', title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-slate-400">{icon}</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs">{description}</p>
            )}
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-light transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
