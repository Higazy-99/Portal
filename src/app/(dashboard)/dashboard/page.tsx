"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import Card from '@/components/common/Card';
import { toast } from 'sonner';
import { GPATrendChart } from '@/components/common/Chart';
import { CountdownTimer, MiniCalendar } from '@/components/common/Widgets';
import { AnimatedList, AnimatedItem, FadeIn, AnimatedNumber, ProgressRing } from '@/components/common/Animations';
import Modal from '@/components/common/Modal';

// Mock data
const gpaData = [
    { semester: 'ف1 23', gpa: 3.65 },
    { semester: 'ف2 23', gpa: 3.72 },
    { semester: 'ف1 24', gpa: 3.80 },
    { semester: 'ف2 24', gpa: 3.85 },
];

const upcomingEvents = [
    { date: new Date(2026, 0, 18), title: 'امتحان نظم التشغيل', type: 'exam' as const },
    { date: new Date(2026, 0, 20), title: 'تسليم مشروع البرمجة', type: 'deadline' as const },
    { date: new Date(2026, 0, 22), title: 'محاضرة إضافية', type: 'class' as const },
];

// Calculate next exam date (3 days from now for demo)
const nextExamDate = new Date();
nextExamDate.setDate(nextExamDate.getDate() + 3);
nextExamDate.setHours(9, 0, 0, 0);

export default function DashboardPage() {
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState<{
        name: string;
        code: string;
        time: string;
        location: string;
        instructor: string;
    } | null>(null);

    const handleAdvisorAction = (action: string) => {
        toast.success(`تم ${action} بنجاح`, {
            description: `سيتم التواصل معك من قبل المرشد الأكاديمي قريباً.`
        });
    };

    const handleNotificationClick = (title: string) => {
        toast('تفاصيل التنبيه', {
            description: title,
            action: {
                label: 'إغلاق',
                onClick: () => console.log('Notification closed'),
            },
        });
    };

    const handleClassClick = (classInfo: typeof selectedClass) => {
        setSelectedClass(classInfo);
        setShowScheduleModal(true);
    };

    const handleMarkNotificationRead = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        toast.success('تم تحديد الإشعار كمقروء');
    };

    const progressPercentage = (98 / 132) * 100;

    return (
        <>
            <PageHeader
                title="لوحة المعلومات"
                description="نظرة عامة على أدائك الأكاديمي وجدولك اليومي."
                breadcrumbs={[{ label: 'الرئيسية' }, { label: 'لوحة المعلومات' }]}
                actions={
                    <div className="bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3">
                        <span className="material-symbols-outlined text-accent">school</span>
                        <div>
                            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                                الفصل الدراسي
                            </p>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                الثاني 2024-2025
                            </p>
                        </div>
                    </div>
                }
            />

            {/* Stats Grid with Animation */}
            <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <AnimatedItem>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800 p-5 relative overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">المعدل التراكمي</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        <AnimatedNumber value={3.85} decimals={2} />
                                    </span>
                                    <span className="text-sm text-slate-400">/ 4.00</span>
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
                                    <span className="text-xs font-bold text-green-600">ممتاز</span>
                                    <span className="text-xs text-slate-400">• مرتبة الشرف</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                <span className="material-symbols-outlined">school</span>
                            </div>
                        </div>
                    </div>
                </AnimatedItem>

                <AnimatedItem>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800 p-5 relative overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">الساعات المكتسبة</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        <AnimatedNumber value={98} />
                                    </span>
                                    <span className="text-sm text-slate-400">/ 132</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>
                            </div>
                            <ProgressRing progress={progressPercentage} size={56} strokeWidth={6} color="#22c55e">
                                <span className="text-xs font-bold text-green-600">{Math.round(progressPercentage)}%</span>
                            </ProgressRing>
                        </div>
                    </div>
                </AnimatedItem>

                <AnimatedItem>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800 p-5 relative overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">المواد المسجلة</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        <AnimatedNumber value={4} />
                                    </span>
                                    <span className="text-sm text-slate-400">مواد</span>
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="material-symbols-outlined text-purple-500 text-sm">schedule</span>
                                    <span className="text-xs font-bold text-purple-600">11</span>
                                    <span className="text-xs text-slate-400">ساعة معتمدة</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                                <span className="material-symbols-outlined">library_books</span>
                            </div>
                        </div>
                    </div>
                </AnimatedItem>

                <AnimatedItem>
                    <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-card p-5 relative overflow-hidden group hover:shadow-lg transition-shadow text-white">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-12 -translate-y-12" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-amber-100">الامتحان القادم</p>
                                <span className="material-symbols-outlined text-white/80">timer</span>
                            </div>
                            <h3 className="font-bold text-lg mb-3">نظم التشغيل</h3>
                            <CountdownTimer targetDate={nextExamDate} compact />
                            <p className="text-[10px] text-amber-100 mt-2">الأحد 09:00 ص • مبنى C</p>
                        </div>
                    </div>
                </AnimatedItem>
            </AnimatedList>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* GPA Trend Chart */}
                    <FadeIn delay={0.2}>
                        <Card className="p-0 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary dark:text-primary-light">
                                        insights
                                    </span>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                                        تطور المعدل التراكمي
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">آخر 4 فصول</span>
                                    <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
                                    <span className="text-xs font-bold text-green-600">+0.20</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <GPATrendChart data={gpaData} height={180} />
                            </div>
                        </Card>
                    </FadeIn>

                    {/* Today's Schedule */}
                    <FadeIn delay={0.3}>
                        <Card noPadding className="overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary dark:text-primary-light">
                                        calendar_today
                                    </span>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                                        جدول اليوم
                                    </h3>
                                </div>
                                <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-600 dark:text-slate-400">
                                    الأحد، 15 يناير
                                </span>
                            </div>
                            <div className="p-4 space-y-3">
                                {/* Active Class */}
                                <div
                                    onClick={() => handleClassClick({
                                        name: 'هندسة المتطلبات المتقدمة',
                                        code: 'SE301',
                                        time: '09:00 - 10:30',
                                        location: 'مبنى C - قاعة 101',
                                        instructor: 'د. أحمد محمود'
                                    })}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 relative overflow-hidden cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                    <div className="flex flex-col items-center justify-center min-w-[4rem] text-center">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">من</span>
                                        <span className="font-bold text-slate-900 dark:text-white">09:00</span>
                                        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 my-1"></div>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">إلى</span>
                                        <span className="font-bold text-slate-900 dark:text-white">10:30</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">
                                                هندسة المتطلبات المتقدمة
                                            </h4>
                                            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                                                SE301
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-lg">location_on</span>
                                                <span>مبنى C - قاعة 101</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-lg">person</span>
                                                <span>د. أحمد محمود</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center self-center">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                        </span>
                                    </div>
                                </div>

                                {/* Upcoming Class */}
                                <div
                                    onClick={() => handleClassClick({
                                        name: 'إدارة مشاريع البرمجيات',
                                        code: 'SE304',
                                        time: '12:00 - 01:30',
                                        location: 'مبنى C - قاعة 205',
                                        instructor: 'أ.د. منى الشريف'
                                    })}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group cursor-pointer"
                                >
                                    <div className="flex flex-col items-center justify-center min-w-[4rem] text-center opacity-70 group-hover:opacity-100">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">من</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200">12:00</span>
                                        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 my-1"></div>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">إلى</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200">01:30</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-700 dark:text-slate-300 text-lg group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                                                إدارة مشاريع البرمجيات
                                            </h4>
                                            <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                                                SE304
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-lg">location_on</span>
                                                <span>مبنى C - قاعة 205</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-lg">person</span>
                                                <span>أ.د. منى الشريف</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                                <Link
                                    className="text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1"
                                    href="/schedule"
                                >
                                    عرض الجدول الأسبوعي الكامل
                                    <span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_forward</span>
                                </Link>
                            </div>
                        </Card>
                    </FadeIn>

                    {/* Quick Services */}
                    <FadeIn delay={0.4}>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 px-1 mb-4">
                                خدمات سريعة
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <Link href="/results" className="group w-full text-right">
                                    <Card className="flex flex-col items-center justify-center p-4 h-full border-slate-200 dark:border-slate-800 group-hover:border-primary group-hover:shadow-lg transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all">
                                            <span className="material-symbols-outlined">description</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
                                            السجل الأكاديمي
                                        </span>
                                    </Card>
                                </Link>
                                <Link href="/fees" className="group w-full text-right">
                                    <Card className="flex flex-col items-center justify-center p-4 h-full border-slate-200 dark:border-slate-800 group-hover:border-primary group-hover:shadow-lg transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 transition-all">
                                            <span className="material-symbols-outlined">payments</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
                                            دفع الرسوم
                                        </span>
                                    </Card>
                                </Link>
                                <Link href="/exams" className="group w-full text-right">
                                    <Card className="flex flex-col items-center justify-center p-4 h-full border-slate-200 dark:border-slate-800 group-hover:border-primary group-hover:shadow-lg transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white group-hover:scale-110 transition-all">
                                            <span className="material-symbols-outlined">print</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
                                            جدول الامتحانات
                                        </span>
                                    </Card>
                                </Link>
                                <Link href="/services" className="group w-full text-right">
                                    <Card className="flex flex-col items-center justify-center p-4 h-full border-slate-200 dark:border-slate-800 group-hover:border-primary group-hover:shadow-lg transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white group-hover:scale-110 transition-all">
                                            <span className="material-symbols-outlined">support_agent</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
                                            طلب مساعدة
                                        </span>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                <div className="space-y-6">
                    {/* Mini Calendar */}
                    <FadeIn delay={0.2} direction="left">
                        <MiniCalendar events={upcomingEvents} />
                    </FadeIn>

                    {/* Notifications */}
                    <FadeIn delay={0.3} direction="left">
                        <Card noPadding className="overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">notifications_active</span>
                                    تنبيهات هامة
                                </h3>
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                                <div
                                    onClick={() => handleNotificationClick('تذكير: سداد الرسوم الدراسية')}
                                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                                                تذكير: سداد الرسوم الدراسية
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                                يرجى العلم أن آخر موعد لسداد القسط الثاني هو الخميس القادم.
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-[10px] text-slate-400">منذ ساعتين</span>
                                                <button
                                                    onClick={(e) => handleMarkNotificationRead(e, '1')}
                                                    className="text-[10px] text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    تحديد كمقروء
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleNotificationClick('تم رصد درجة الواجب الأول')}
                                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                                                تم رصد درجة الواجب الأول
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                لمقرر الذكاء الاصطناعي (CS310).
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-[10px] text-slate-400">أمس</span>
                                                <button
                                                    onClick={(e) => handleMarkNotificationRead(e, '2')}
                                                    className="text-[10px] text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    تحديد كمقروء
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleNotificationClick('ورشة عمل: الأمن السيبراني')}
                                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex gap-3">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-slate-300 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                                                ورشة عمل: الأمن السيبراني
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                ندعوكم للحضور يوم الأربعاء.
                                            </p>
                                            <span className="text-[10px] text-slate-400 mt-2 block">منذ 3 أيام</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                                <button className="w-full text-center text-xs font-bold text-primary hover:underline">
                                    عرض كل الإشعارات
                                </button>
                            </div>
                        </Card>
                    </FadeIn>

                    {/* Academic Advisor */}
                    <FadeIn delay={0.4} direction="left">
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg p-5 text-white relative overflow-hidden">
                            <div className="absolute right-0 top-0 opacity-10">
                                <span className="material-symbols-outlined text-9xl -mr-4 -mt-4">support_agent</span>
                            </div>
                            <h3 className="font-bold text-lg relative z-10">المرشد الأكاديمي</h3>
                            <div className="flex items-center gap-3 mt-4 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold backdrop-blur-sm">
                                    د
                                </div>
                                <div>
                                    <p className="font-bold">د. خالد العمراني</p>
                                    <p className="text-xs text-blue-100">ساعات مكتبية: أحد - خميس (10-12)</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4 relative z-10">
                                <button
                                    onClick={() => handleAdvisorAction('حجز موعد')}
                                    className="flex-1 bg-white text-primary text-xs font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                                >
                                    حجز موعد
                                </button>
                                <button
                                    onClick={() => handleAdvisorAction('إرسال الرسالة')}
                                    className="flex-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold py-2.5 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">mail</span>
                                    مراسلة
                                </button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Schedule Detail Modal */}
            <Modal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                title="تفاصيل المحاضرة"
                size="md"
            >
                {selectedClass && (
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-2xl">class</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{selectedClass.name}</h4>
                                <span className="text-sm font-mono text-primary">{selectedClass.code}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400">schedule</span>
                                <div>
                                    <p className="text-[10px] text-slate-500">الوقت</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedClass.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400">location_on</span>
                                <div>
                                    <p className="text-[10px] text-slate-500">المكان</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedClass.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                                <span className="material-symbols-outlined text-slate-400">person</span>
                                <div>
                                    <p className="text-[10px] text-slate-500">المحاضر</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedClass.instructor}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    toast.success('تم إضافة الحدث إلى التقويم');
                                    setShowScheduleModal(false);
                                }}
                                className="flex-1 py-2.5 px-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                                إضافة للتقويم
                            </button>
                            <button
                                onClick={() => setShowScheduleModal(false)}
                                className="py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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
