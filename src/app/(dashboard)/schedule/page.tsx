"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import { toast } from 'sonner';
import { FadeIn } from '@/components/common/Animations';

interface ScheduleItem {
    id: string;
    name: string;
    code: string;
    day: number; // 0 = Sunday
    startHour: number;
    duration: number; // in hours
    location: string;
    instructor: string;
    type: 'lecture' | 'lab' | 'tutorial';
}

const scheduleData: ScheduleItem[] = [
    { id: '1', name: 'هندسة المتطلبات المتقدمة', code: 'SE301', day: 0, startHour: 9, duration: 1.5, location: 'مبنى C - قاعة 101', instructor: 'د. أحمد محمود', type: 'lecture' },
    { id: '2', name: 'إدارة مشاريع البرمجيات', code: 'SE304', day: 0, startHour: 12, duration: 1.5, location: 'مبنى C - قاعة 205', instructor: 'أ.د. منى الشريف', type: 'lecture' },
    { id: '3', name: 'الذكاء الاصطناعي', code: 'CS310', day: 1, startHour: 10, duration: 2, location: 'مبنى A - قاعة 302', instructor: 'د. محمد عبدالله', type: 'lecture' },
    { id: '4', name: 'معمل الذكاء الاصطناعي', code: 'CS310L', day: 1, startHour: 14, duration: 2, location: 'معمل الحاسب 3', instructor: 'م. سارة أحمد', type: 'lab' },
    { id: '5', name: 'نظم التشغيل المتقدمة', code: 'CS305', day: 2, startHour: 9, duration: 1.5, location: 'مبنى B - قاعة 110', instructor: 'د. هشام علي', type: 'lecture' },
    { id: '6', name: 'هندسة المتطلبات - تمرين', code: 'SE301T', day: 3, startHour: 11, duration: 1, location: 'قاعة التدريب 2', instructor: 'م. عمر حسن', type: 'tutorial' },
    { id: '7', name: 'إدارة المشاريع - عملي', code: 'SE304L', day: 4, startHour: 9, duration: 2, location: 'معمل البرمجة', instructor: 'م. نورا سليم', type: 'lab' },
];

const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const typeColors = {
    lecture: { bg: 'bg-blue-100 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300', label: 'محاضرة' },
    lab: { bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300', label: 'معمل' },
    tutorial: { bg: 'bg-amber-100 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300', label: 'تمرين' },
};

export default function SchedulePage() {
    const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedClass, setSelectedClass] = useState<ScheduleItem | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handlePrint = () => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'جاري تحضير الجدول للطباعة...',
            success: 'تم تحضير الجدول للطباعة',
            error: 'حدث خطأ',
        });
    };

    const handleExport = () => {
        toast.success('تم تصدير الجدول', { description: 'تم حفظ الجدول بصيغة PDF' });
    };

    const handleClassClick = (item: ScheduleItem) => {
        setSelectedClass(item);
        setShowModal(true);
    };

    const getItemsForTimeSlot = (day: number, hour: number) => {
        return scheduleData.filter(item =>
            item.day === day &&
            item.startHour <= hour &&
            item.startHour + item.duration > hour
        );
    };

    const formatHour = (hour: number) => {
        if (hour < 12) return `${hour}:00 ص`;
        if (hour === 12) return `12:00 م`;
        return `${hour - 12}:00 م`;
    };

    const todaySchedule = scheduleData.filter(item => item.day === selectedDay);

    return (
        <>
            <PageHeader
                title="الجدول الدراسي"
                description="عرض جدول المحاضرات والمعامل الأسبوعي."
                breadcrumbs={[
                    { label: 'الرئيسية' },
                    { label: 'الجدول الدراسي' },
                ]}
                actions={
                    <div className="flex gap-2">
                        <button
                            onClick={handleExport}
                            className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">download</span>
                            <span className="hidden sm:inline">تصدير PDF</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">print</span>
                            <span className="hidden sm:inline">طباعة</span>
                        </button>
                    </div>
                }
            />

            {/* View Toggle & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <button
                        onClick={() => setViewMode('week')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'week'
                                ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                            }`}
                    >
                        <span className="material-symbols-outlined text-sm ml-1">view_week</span>
                        أسبوعي
                    </button>
                    <button
                        onClick={() => setViewMode('day')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'day'
                                ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                            }`}
                    >
                        <span className="material-symbols-outlined text-sm ml-1">view_day</span>
                        يومي
                    </button>
                </div>

                <div className="flex flex-wrap gap-4">
                    {Object.entries(typeColors).map(([type, colors]) => (
                        <div key={type} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded ${colors.bg} ${colors.border} border`} />
                            <span className="text-xs text-slate-600 dark:text-slate-400">{colors.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Day Selector for Day View */}
            {viewMode === 'day' && (
                <FadeIn>
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {arabicDays.map((day, index) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(index)}
                                className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedDay === index
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary'
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </FadeIn>
            )}

            {/* Weekly View */}
            {viewMode === 'week' && (
                <FadeIn>
                    <Card noPadding className="overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 text-right border-b border-slate-100 dark:border-slate-800 w-20">
                                            الوقت
                                        </th>
                                        {arabicDays.map(day => (
                                            <th
                                                key={day}
                                                className="px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 text-center border-b border-slate-100 dark:border-slate-800"
                                            >
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeSlots.map(hour => (
                                        <tr key={hour} className="border-b border-slate-50 dark:border-slate-800/50">
                                            <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400 border-l border-slate-100 dark:border-slate-800 whitespace-nowrap">
                                                {formatHour(hour)}
                                            </td>
                                            {arabicDays.map((_, dayIndex) => {
                                                const items = getItemsForTimeSlot(dayIndex, hour);
                                                const item = items[0];
                                                const isStart = item && item.startHour === hour;

                                                if (item && !isStart) {
                                                    return null; // Skip cells covered by multi-hour items
                                                }

                                                return (
                                                    <td
                                                        key={dayIndex}
                                                        className="px-2 py-1 border-l border-slate-50 dark:border-slate-800/50 h-14"
                                                        rowSpan={item ? Math.ceil(item.duration) : 1}
                                                    >
                                                        {item && isStart && (
                                                            <button
                                                                onClick={() => handleClassClick(item)}
                                                                className={`w-full h-full p-2 rounded-lg border ${typeColors[item.type].bg} ${typeColors[item.type].border} ${typeColors[item.type].text} text-right hover:shadow-md transition-shadow cursor-pointer`}
                                                            >
                                                                <p className="font-bold text-xs truncate">{item.name}</p>
                                                                <p className="text-[10px] opacity-75 mt-0.5">{item.code}</p>
                                                                <p className="text-[10px] opacity-75 truncate">{item.location}</p>
                                                            </button>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </FadeIn>
            )}

            {/* Day View */}
            {viewMode === 'day' && (
                <FadeIn>
                    <Card className="p-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">today</span>
                            {arabicDays[selectedDay]}
                        </h3>

                        {todaySchedule.length === 0 ? (
                            <div className="text-center py-12">
                                <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">event_available</span>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">لا توجد محاضرات في هذا اليوم</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {todaySchedule
                                    .sort((a, b) => a.startHour - b.startHour)
                                    .map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleClassClick(item)}
                                            className={`p-4 rounded-xl border ${typeColors[item.type].bg} ${typeColors[item.type].border} cursor-pointer hover:shadow-lg transition-all`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${typeColors[item.type].text} bg-white/50 dark:bg-slate-900/30`}>
                                                            {typeColors[item.type].label}
                                                        </span>
                                                        <span className="text-xs font-mono text-slate-500">{item.code}</span>
                                                    </div>
                                                    <h4 className={`font-bold text-lg ${typeColors[item.type].text}`}>{item.name}</h4>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                                                        <div className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                                            <span>{formatHour(item.startHour)} - {formatHour(item.startHour + item.duration)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">location_on</span>
                                                            <span>{item.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">person</span>
                                                            <span>{item.instructor}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-400">chevron_left</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </Card>
                </FadeIn>
            )}

            {/* Summary Cards */}
            <FadeIn delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <Card className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">menu_book</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">إجمالي المحاضرات</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{scheduleData.filter(s => s.type === 'lecture').length}</p>
                        </div>
                    </Card>
                    <Card className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">science</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">المعامل العملية</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{scheduleData.filter(s => s.type === 'lab').length}</p>
                        </div>
                    </Card>
                    <Card className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">edit_note</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">حصص التمارين</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{scheduleData.filter(s => s.type === 'tutorial').length}</p>
                        </div>
                    </Card>
                </div>
            </FadeIn>

            {/* Class Detail Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="تفاصيل الحصة"
                size="md"
            >
                {selectedClass && (
                    <div className="space-y-4">
                        <div className={`p-4 rounded-xl ${typeColors[selectedClass.type].bg} ${typeColors[selectedClass.type].border} border`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${typeColors[selectedClass.type].text} bg-white/50`}>
                                    {typeColors[selectedClass.type].label}
                                </span>
                                <span className="font-mono text-sm text-slate-500">{selectedClass.code}</span>
                            </div>
                            <h3 className={`text-xl font-bold ${typeColors[selectedClass.type].text}`}>{selectedClass.name}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    <span className="text-xs">اليوم</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white">{arabicDays[selectedClass.day]}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span className="text-xs">الوقت</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white">
                                    {formatHour(selectedClass.startHour)} - {formatHour(selectedClass.startHour + selectedClass.duration)}
                                </p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    <span className="text-xs">المكان</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white">{selectedClass.location}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">person</span>
                                    <span className="text-xs">المحاضر</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white">{selectedClass.instructor}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => {
                                    toast.success('تم إضافة تذكير');
                                    setShowModal(false);
                                }}
                                className="flex-1 py-2.5 px-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">notifications_active</span>
                                إضافة تذكير
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="py-2.5 px-6 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
