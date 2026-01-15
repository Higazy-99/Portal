"use client";

import React, { useState } from 'react';
import { toast } from 'sonner';

interface Course {
    code: string;
    name: string;
    hours: number;
    type: string; // 'compulsory' or 'elective'
    time: string;
    location?: string;
    instructor?: string;
    status: 'available' | 'selected' | 'added';
}

const initialAvailableCourses: Course[] = [
    { code: 'STAT501', name: 'الإحصاء الرياضي المتقدم', hours: 3, type: 'compulsory', time: 'الأحد 09:00 ص', status: 'available' },
    { code: 'CS502', name: 'تحليل البيانات الكبيرة', hours: 3, type: 'compulsory', time: 'الاثنين 12:00 م', location: 'مبنى C - قاعة 105', instructor: 'د. أيمن زكي', status: 'available' }, // Initially available in this mock reset
    { code: 'IS510', name: 'أمن المعلومات والشبكات', hours: 3, type: 'elective', time: 'الثلاثاء 02:00 م', location: 'معامل الحاسب - معمل 2', instructor: 'أ.د. سارة فهمي', status: 'available' },
    { code: 'OR505', name: 'بحوث العمليات المتقدمة', hours: 3, type: 'elective', time: 'الأربعاء 10:00 ص', status: 'available' },
    { code: 'RES500', name: 'مناهج البحث العلمي', hours: 2, type: 'elective', time: 'الخميس 09:00 ص', status: 'available' }
];

export default function RegistrationPage() {
    // State to track registered courses. Initial state mimics some already selected courses if we wanted, 
    // but let's start fresh or with the ones in the design for consistency.
    // The design had CS502 and IS510 as "added". Let's reflect that in initial state.
    const [myCourses, setMyCourses] = useState<Course[]>([
        { code: 'CS502', name: 'تحليل البيانات الكبيرة', hours: 3, type: 'compulsory', time: 'الاثنين 12:00 م', location: 'مبنى C - قاعة 105', instructor: 'د. أيمن زكي', status: 'added' },
        { code: 'IS510', name: 'أمن المعلومات والشبكات', hours: 3, type: 'elective', time: 'الثلاثاء 02:00 م', location: 'معامل الحاسب - معمل 2', instructor: 'أ.د. سارة فهمي', status: 'added' }
    ]);

    const totalHours = myCourses.reduce((sum, course) => sum + course.hours, 0);

    const handleAddCourse = (course: Course) => {
        // Check if already added
        if (myCourses.find(c => c.code === course.code)) return;

        // Check max hours (hard limit 18 for demo)
        if (totalHours + course.hours > 18) {
            toast.error('لا يمكن إضافة المقرر', { description: 'تجاوزت الحد الأقصى للساعات المسموح به (18 ساعة).' });
            return;
        }

        const newCourse = { ...course, status: 'added' as const, location: 'قاعة دراسية', instructor: 'عضو هيئة تدريس' }; // Mock details if missing
        setMyCourses([...myCourses, newCourse]);
        toast.success('تم إضافة المقرر', { description: `تمت إضافة ${course.name} إلى قائمتك.` });
    };

    const handleRemoveCourse = (courseCode: string) => {
        const courseToRemove = myCourses.find(c => c.code === courseCode);
        if (courseToRemove) {
            setMyCourses(myCourses.filter(c => c.code !== courseCode));
            toast.info('تم حذف المقرر', { description: `تم حذف ${courseToRemove.name} من قائمتك.` });
        }
    };

    const handleConfirmRegistration = () => {
        if (totalHours < 9) {
            toast.warning('تنبيه', { description: 'عدد الساعات المختارة أقل من الحد الأدنى (9 ساعات).' });
            return;
        }
        toast.success('تم اعتماد التسجيل!', { description: 'تم إرسال طلب تسجيل المقررات بنجاح.' });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                        <span>الرئيسية</span>
                        <span className="material-symbols-outlined text-xs rtl:rotate-180">
                            chevron_right
                        </span>
                        <span className="text-primary font-medium">تسجيل المقررات</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        تسجيل المقررات الدراسية
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        اختر المواد التي ترغب بدراستها للفصل الدراسي القادم.
                    </p>
                </div>
                <div className="bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent">school</span>
                    <div>
                        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                            الفصل الدراسي
                        </p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            الأول 2025-2026
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <span className="material-symbols-outlined">timelapse</span>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            الحد الأدنى للساعات
                        </p>
                        <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                            9 ساعات
                        </h3>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <span className="material-symbols-outlined">history_edu</span>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            الحد الأقصى للساعات
                        </p>
                        <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                            18 ساعة
                        </h3>
                    </div>
                </div>
                <div className={`bg-white dark:bg-slate-900 p-4 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 flex items-center gap-4 border-r-4 ${totalHours >= 9 && totalHours <= 18 ? 'border-r-green-500' : 'border-r-amber-500'}`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${totalHours >= 9 && totalHours <= 18 ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'}`}>
                        <span className="material-symbols-outlined">{totalHours >= 9 && totalHours <= 18 ? 'check_circle' : 'warning'}</span>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            الساعات المختارة
                        </p>
                        <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                            {totalHours} ساعات
                        </h3>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <span className="material-symbols-outlined">library_add</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                                المقررات المتاحة للتسجيل
                            </h3>
                            <p className="text-xs text-slate-500">
                                يرجى اختيار المقررات المطلوبة من القائمة أدناه
                            </p>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4 rounded-tr-lg" scope="col">كود المقرر</th>
                                <th className="px-6 py-4" scope="col">اسم المقرر</th>
                                <th className="px-6 py-4 text-center" scope="col">الساعات</th>
                                <th className="px-6 py-4 text-center" scope="col">النوع</th>
                                <th className="px-6 py-4" scope="col">الموعد المقترح</th>
                                <th className="px-6 py-4 text-center rounded-tl-lg" scope="col">إجراء</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {initialAvailableCourses.map((course) => {
                                const isAdded = myCourses.some(c => c.code === course.code);
                                return (
                                    <tr key={course.code} className={`transition-colors group ${isAdded ? 'bg-green-50/30 dark:bg-green-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                                        <td className="px-6 py-4 font-mono font-semibold text-primary dark:text-blue-300">
                                            {course.code}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {course.name}
                                        </td>
                                        <td className="px-6 py-4 text-center">{course.hours}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${course.type === 'compulsory' ? 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' : 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'}`}>
                                                {course.type === 'compulsory' ? 'إجباري' : 'اختياري'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                                                <span>{course.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {isAdded ? (
                                                <button disabled className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-100 text-green-700 cursor-default border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 opacity-80">
                                                    <span className="material-symbols-outlined text-sm">check</span>
                                                    تمت الإضافة
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddCourse(course)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:bg-primary-light transition-colors shadow-sm shadow-primary/30"
                                                >
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                    إضافة
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {myCourses.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-amber-50/40 dark:bg-amber-900/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-500">
                                <span className="material-symbols-outlined">shopping_cart_checkout</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                                    المقررات المختارة مبدئياً
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    يجب تأكيد التسجيل لحفظ الاختيارات
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right text-slate-600 dark:text-slate-400">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4" scope="col">كود المقرر</th>
                                    <th className="px-6 py-4" scope="col">اسم المقرر</th>
                                    <th className="px-6 py-4 text-center" scope="col">الساعات</th>
                                    <th className="px-6 py-4" scope="col">القاعة</th>
                                    <th className="px-6 py-4 text-center" scope="col">إجراء</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {myCourses.map((course) => (
                                    <tr key={course.code} className="bg-white dark:bg-slate-900 hover:bg-amber-50/20 dark:hover:bg-amber-900/10 transition-colors border-r-4 border-r-transparent hover:border-r-amber-400 group">
                                        <td className="px-6 py-4 font-mono font-semibold text-primary dark:text-blue-300">
                                            {course.code}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900 dark:text-white">{course.name}</div>
                                            <div className="text-xs text-slate-400 mt-1">المحاضر: {course.instructor || 'يحدد لاحقاً'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold">{course.hours}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-slate-400 text-sm">room</span>
                                                <span>{course.location || 'يحدد لاحقاً'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleRemoveCourse(course.code)}
                                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                title="حذف المقرر"
                                            >
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200" colSpan={2}>
                                        الإجمالي
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-slate-900 dark:text-white text-lg">
                                        {totalHours}
                                    </td>
                                    <td colSpan={2}></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">save</span>
                    حفظ كمسودة
                </button>
                <button
                    onClick={handleConfirmRegistration}
                    className="bg-primary hover:bg-primary-light text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-900 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                    <span className="material-symbols-outlined">check_circle</span>
                    اعتماد التسجيل النهائي
                </button>
            </div>
        </>
    );
}
