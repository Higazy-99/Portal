"use client";

import React from 'react';
import { toast } from 'sonner';

interface DocumentService {
    id: string;
    title: string;
    description: string;
    price: string;
    icon: string;
    colorBg: string; // e.g., bg-blue-100
    colorText: string; // e.g., text-blue-600
}

const documentServices: DocumentService[] = [
    {
        id: '1',
        title: 'شهادة قيد',
        description: 'إثبات قيد الطالب بالكلية للجهات الرسمية.',
        price: '50 ج.م',
        icon: 'verified',
        colorBg: 'bg-blue-100 dark:bg-blue-900/30',
        colorText: 'text-blue-600 dark:text-blue-400'
    },
    {
        id: '2',
        title: 'بيان درجات',
        description: 'كشف تفصيلي بالمواد والتقديرات الحاصل عليها.',
        price: '100 ج.م',
        icon: 'receipt_long',
        colorBg: 'bg-amber-100 dark:bg-amber-900/30',
        colorText: 'text-amber-600 dark:text-amber-400'
    },
    {
        id: '3',
        title: 'إفادة تخرج',
        description: 'شهادة مؤقتة تفيد بإتمام متطلبات التخرج.',
        price: '75 ج.م',
        icon: 'school',
        colorBg: 'bg-purple-100 dark:bg-purple-900/30',
        colorText: 'text-purple-600 dark:text-purple-400'
    },
    {
        id: '4',
        title: 'حسن سير وسلوك',
        description: 'شهادة تفيد بعدم توقيع أي عقوبات تأديبية.',
        price: '30 ج.م',
        icon: 'diversity_3',
        colorBg: 'bg-green-100 dark:bg-green-900/30',
        colorText: 'text-green-600 dark:text-green-400'
    }
];

export default function DocumentsPage() {

    const handleOrderDocument = (doc: DocumentService) => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: `جارٍ طلب ${doc.title}...`,
            success: `تم طلب ${doc.title} بنجاح!`,
            error: 'حدث خطأ أثناء الطلب',
        });
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
                        <span className="text-primary font-medium">المستندات والشهادات</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        المستندات والشهادات الرسمية
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        طلب استخراج المستندات الرسمية وكشوف الدرجات ومتابعة حالة الطلبات.
                    </p>
                </div>
                <div className="bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent">history_edu</span>
                    <div>
                        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                            عدد الطلبات هذا الفصل
                        </p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            2 طلبات
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-primary-light">
                        add_circle
                    </span>
                    طلب مستند جديد
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {documentServices.map((doc) => (
                        <div
                            key={doc.id}
                            className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${doc.colorBg} ${doc.colorText}`}>
                                <span className="material-symbols-outlined text-2xl">{doc.icon}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                {doc.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                {doc.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    {doc.price}
                                </span>
                                <button
                                    onClick={() => handleOrderDocument(doc)}
                                    className="bg-white dark:bg-slate-700 text-primary dark:text-white border border-slate-200 dark:border-slate-600 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                >
                                    طلب
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                            <span className="material-symbols-outlined">history</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                                سجل الطلبات السابقة
                            </h3>
                            <p className="text-xs text-slate-500">
                                تابع حالة طلباتك الحالية والسابقة
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative hidden sm:block">
                            <input
                                className="w-48 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pr-9 pl-3 py-1.5 text-xs focus:ring-1 focus:ring-primary"
                                placeholder="بحث في الطلبات..."
                                type="text"
                            />
                            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                search
                            </span>
                        </div>
                        <button className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4 rounded-tr-lg" scope="col">
                                    رقم الطلب
                                </th>
                                <th className="px-6 py-4" scope="col">
                                    نوع المستند
                                </th>
                                <th className="px-6 py-4" scope="col">
                                    تاريخ الطلب
                                </th>
                                <th className="px-6 py-4" scope="col">
                                    التكلفة
                                </th>
                                <th className="px-6 py-4 text-center" scope="col">
                                    الحالة
                                </th>
                                <th className="px-6 py-4 text-center rounded-tl-lg" scope="col">
                                    إجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4 font-mono font-medium text-slate-500">
                                    #REQ-2025-089
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-amber-500">
                                            receipt_long
                                        </span>
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            بيان درجات (عربي)
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs">
                                    <div className="text-slate-900 dark:text-white font-medium">
                                        10 مايو 2025
                                    </div>
                                    <div className="text-slate-400">منذ يومين</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                                    100 ج.م
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-100 dark:border-amber-800">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                        قيد المعالجة
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="text-slate-400 hover:text-primary transition-colors"
                                        title="التفاصيل"
                                    >
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4 font-mono font-medium text-slate-500">
                                    #REQ-2025-042
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-500">
                                            verified
                                        </span>
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            شهادة قيد
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs">
                                    <div className="text-slate-900 dark:text-white font-medium">
                                        25 أبريل 2025
                                    </div>
                                    <div className="text-slate-400">منذ أسبوعين</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                                    50 ج.م
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-100 dark:border-green-800">
                                        <span className="material-symbols-outlined text-[14px]">
                                            check
                                        </span>
                                        جاهز للاستلام
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            className="text-slate-400 hover:text-primary transition-colors"
                                            title="التفاصيل"
                                        >
                                            <span className="material-symbols-outlined">
                                                visibility
                                            </span>
                                        </button>
                                        <button
                                            className="text-primary hover:text-primary-dark transition-colors"
                                            title="تحميل نسخة رقمية"
                                        >
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-4 font-mono font-medium text-slate-500">
                                    #REQ-2024-992
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-purple-500">
                                            school
                                        </span>
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            إفادة نجاح مؤقتة
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs">
                                    <div className="text-slate-900 dark:text-white font-medium">
                                        10 يناير 2025
                                    </div>
                                    <div className="text-slate-400">الفصل السابق</div>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                                    75 ج.م
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                                        تم الاستلام
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="text-slate-400 hover:text-primary transition-colors"
                                        title="التفاصيل"
                                    >
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                    <p className="text-xs text-slate-500">عرض 3 من أصل 12 طلب</p>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-primary hover:border-primary transition-colors disabled:opacity-50">
                            <span className="material-symbols-outlined text-sm rtl:rotate-180">
                                chevron_right
                            </span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-primary dark:border-primary bg-primary text-white text-xs font-bold shadow-sm">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary transition-colors text-xs font-medium">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary transition-colors text-xs font-medium">
                            3
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-primary hover:border-primary transition-colors">
                            <span className="material-symbols-outlined text-sm rtl:rotate-180">
                                chevron_left
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
