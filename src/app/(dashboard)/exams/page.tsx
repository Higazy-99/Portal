"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import { toast } from 'sonner';
import { FadeIn, AnimatedList, AnimatedItem } from '@/components/common/Animations';
import { CountdownTimer } from '@/components/common/Widgets';

interface Exam {
    id: string;
    course: string;
    code: string;
    date: Date;
    time: string;
    location: string;
    seat: number;
    duration: string;
    type: 'final' | 'midterm';
}

const examsData: Exam[] = [
    { id: '1', course: 'هندسة المتطلبات المتقدمة', code: 'SE301', date: new Date(2026, 0, 18, 9, 0), time: '09:00 ص', location: 'مبنى C - قاعة 101', seat: 45, duration: 'ساعتان', type: 'final' },
    { id: '2', course: 'الذكاء الاصطناعي', code: 'CS310', date: new Date(2026, 0, 21, 9, 0), time: '09:00 ص', location: 'مبنى الامتحانات الرئيسي', seat: 102, duration: 'ساعتان', type: 'final' },
    { id: '3', course: 'إدارة مشاريع البرمجيات', code: 'SE304', date: new Date(2026, 0, 25, 11, 0), time: '11:00 ص', location: 'مبنى C - قاعة 205', seat: 23, duration: 'ساعتان', type: 'final' },
    { id: '4', course: 'نظم التشغيل المتقدمة', code: 'CS305', date: new Date(2026, 0, 28, 9, 0), time: '09:00 ص', location: 'مبنى B - قاعة 110', seat: 67, duration: 'ساعتان ونصف', type: 'final' },
];

const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const arabicMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export default function ExamsPage() {
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'cards'>('cards');

    const handlePrint = () => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'جاري تحضير الملف للطباعة...',
            success: 'تم تحميل ملف PDF لجدول الامتحانات',
            error: 'حدث خطأ أثناء التحميل',
        });
    };

    const handleReportConflict = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: 'جاري رفع الطلب...',
            success: 'تم رفع طلب التعارض بنجاح',
            error: 'حدث خطأ أثناء المحاولة'
        });
    };

    const handleExamClick = (exam: Exam) => {
        setSelectedExam(exam);
        setShowModal(true);
    };

    const handleAddToCalendar = () => {
        toast.success('تم إضافة موعد الامتحان إلى التقويم');
        setShowModal(false);
    };

    const formatDate = (date: Date) => {
        return `${arabicDays[date.getDay()]}، ${date.getDate()} ${arabicMonths[date.getMonth()]} ${date.getFullYear()}`;
    };

    const getNextExam = () => {
        const now = new Date();
        return examsData.find(exam => exam.date > now) || examsData[0];
    };

    const nextExam = getNextExam();

    return (
        <>
            <PageHeader
                title="جدول الامتحانات النهائية"
                description="جدول مواعيد وقاعات الامتحانات للفصل الدراسي الحالي."
                breadcrumbs={[
                    { label: 'الرئيسية' },
                    { label: 'جدول الامتحانات' },
                ]}
                actions={
                    <button
                        onClick={handlePrint}
                        className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">print</span>
                        <span className="hidden sm:inline">طباعة الجدول</span>
                    </button>
                }
            />

            {/* Next Exam Countdown Banner */}
            <FadeIn>
                <div className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-10 translate-y-10" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-right">
                            <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                                <span className="material-symbols-outlined animate-pulse">alarm</span>
                                <span className="text-red-100 text-sm font-medium">الامتحان القادم</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{nextExam.course}</h3>
                            <p className="text-red-100 text-sm">
                                {formatDate(nextExam.date)} • {nextExam.time} • {nextExam.location}
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <CountdownTimer targetDate={nextExam.date} label="الوقت المتبقي" />
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* Important Notice */}
            <FadeIn delay={0.1}>
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4 flex items-start gap-3 mb-6">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400 mt-0.5">warning</span>
                    <div>
                        <h3 className="font-bold text-red-800 dark:text-red-300 text-sm">تعليمات هامة للاختبارات</h3>
                        <ul className="mt-1 space-y-1 text-xs text-red-700 dark:text-red-400 list-disc list-inside">
                            <li>يجب إحضار البطاقة الجامعية للدخول إلى قاعة الامتحان.</li>
                            <li>يمنع منعاً باتاً إدخال الهواتف المحمولة أو الساعات الذكية.</li>
                            <li>الحضور قبل موعد الاختبار بـ 15 دقيقة على الأقل.</li>
                        </ul>
                    </div>
                </div>
            </FadeIn>

            {/* View Toggle */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">جميع الامتحانات ({examsData.length})</h3>
                <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'cards' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
                    >
                        <span className="material-symbols-outlined text-sm">grid_view</span>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
                    >
                        <span className="material-symbols-outlined text-sm">view_list</span>
                    </button>
                </div>
            </div>

            {/* Cards View */}
            {viewMode === 'cards' && (
                <AnimatedList className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {examsData.map((exam, index) => (
                        <AnimatedItem key={exam.id}>
                            <div
                                onClick={() => handleExamClick(exam)}
                                className="bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 p-5 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="text-xs font-mono text-primary font-bold">{exam.code}</span>
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                            {exam.course}
                                        </h4>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${exam.type === 'final'
                                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            }`}>
                                            {exam.type === 'final' ? 'نهائي' : 'نصفي'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <span className="material-symbols-outlined text-lg text-slate-400">calendar_today</span>
                                        <span>{formatDate(exam.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <span className="material-symbols-outlined text-lg text-slate-400">schedule</span>
                                        <span>{exam.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <span className="material-symbols-outlined text-lg text-slate-400">location_on</span>
                                        <span className="truncate">{exam.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <span className="material-symbols-outlined text-lg text-slate-400">event_seat</span>
                                        <span>مقعد رقم <strong className="text-primary">{exam.seat}</strong></span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <CountdownTimer targetDate={exam.date} compact />
                                </div>
                            </div>
                        </AnimatedItem>
                    ))}
                </AnimatedList>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <FadeIn>
                    <Card noPadding className="overflow-hidden mb-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-right text-slate-600 dark:text-slate-400">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4" scope="col">اليوم والتاريخ</th>
                                        <th className="px-6 py-4" scope="col">المقرر</th>
                                        <th className="px-6 py-4" scope="col">الوقت</th>
                                        <th className="px-6 py-4" scope="col">القاعة</th>
                                        <th className="px-6 py-4" scope="col">رقم المقعد</th>
                                        <th className="px-6 py-4 text-center" scope="col">المدة</th>
                                        <th className="px-6 py-4 text-center" scope="col">الوقت المتبقي</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {examsData.map((exam) => (
                                        <tr
                                            key={exam.id}
                                            onClick={() => handleExamClick(exam)}
                                            className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900 dark:text-white">{arabicDays[exam.date.getDay()]}</div>
                                                <div className="text-xs text-slate-500">{exam.date.getDate()}/{exam.date.getMonth() + 1}/{exam.date.getFullYear()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{exam.course}</div>
                                                <div className="text-xs text-primary dark:text-blue-400 font-mono mt-0.5">{exam.code}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                                                    <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                                                    {exam.time}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-slate-400 text-sm">room</span>
                                                    {exam.location}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono font-bold text-lg text-primary dark:text-blue-400">
                                                {exam.seat}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                                    {exam.duration}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <CountdownTimer targetDate={exam.date} compact />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </FadeIn>
            )}

            {/* Info Cards */}
            <FadeIn delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                                <span className="material-symbols-outlined">rule</span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">ضوابط الغياب</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            يعتبر الطالب غائباً عن الامتحان النهائي إذا لم يحضر في الزمان والمكان المحددين.
                            وفي حال وجود عذر قهري، يجب تقديم المستندات خلال 3 أيام من تاريخ الامتحان إلى إدارة الكلية للنظر في إمكانية عقد امتحان بديل.
                        </p>
                        <a className="text-primary text-sm font-bold hover:underline flex items-center gap-1" href="#">
                            لقراءة اللائحة الكاملة للاختبارات
                            <span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_forward</span>
                        </a>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <span className="material-symbols-outlined">report_problem</span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">الإبلاغ عن تعارض</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            في حال وجود تعارض في مواعيد الاختبارات (اختبارين في نفس الوقت أو ثلاث اختبارات في نفس اليوم)،
                            يرجى رفع طلب &quot;تعارض اختبارات&quot; فوراً ليتم معالجته من قبل لجنة الجداول والاختبارات.
                        </p>
                        <button
                            onClick={handleReportConflict}
                            className="text-white bg-amber-600 hover:bg-amber-700 font-bold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm"
                        >
                            رفع طلب تعارض
                        </button>
                    </Card>
                </div>
            </FadeIn>

            {/* Exam Detail Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="تفاصيل الامتحان"
                size="md"
            >
                {selectedExam && (
                    <div className="space-y-4">
                        {/* Exam Header */}
                        <div className="p-4 bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-slate-800 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-mono font-bold text-primary bg-white dark:bg-slate-900 px-2 py-0.5 rounded">
                                    {selectedExam.code}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${selectedExam.type === 'final'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-amber-100 text-amber-700'
                                    }`}>
                                    {selectedExam.type === 'final' ? 'امتحان نهائي' : 'امتحان نصفي'}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedExam.course}</h3>
                        </div>

                        {/* Countdown */}
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                            <CountdownTimer targetDate={selectedExam.date} label="الوقت المتبقي للامتحان" />
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    <span className="text-xs">التاريخ</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{formatDate(selectedExam.date)}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span className="text-xs">الوقت</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedExam.time}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    <span className="text-xs">القاعة</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedExam.location}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">event_seat</span>
                                    <span className="text-xs">رقم المقعد</span>
                                </div>
                                <p className="font-bold text-primary dark:text-blue-400 text-2xl">{selectedExam.seat}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl col-span-2">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <span className="material-symbols-outlined text-sm">timer</span>
                                    <span className="text-xs">مدة الامتحان</span>
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedExam.duration}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleAddToCalendar}
                                className="flex-1 py-2.5 px-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                                إضافة للتقويم
                            </button>
                            <button
                                onClick={() => {
                                    toast.success('تم تفعيل التذكير');
                                    setShowModal(false);
                                }}
                                className="py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">notifications</span>
                                تذكير
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
