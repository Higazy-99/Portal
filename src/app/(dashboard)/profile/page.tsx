"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveChanges = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success('تم حفظ التغييرات بنجاح', { description: 'تم تحديث بيانات ملفك الشخصي.' });
        }, 1000);
    };

    const handleUpdatePhoto = () => {
        toast.info('تحديث الصورة الشخصية', { description: 'سيتم فتح نافذة رفع الصورة قريباً.' });
    };

    const handleChangePassword = () => {
        toast.info('تغيير كلمة المرور', { description: 'تم إرسال رابط تغيير كلمة المرور إلى بريدك الإلكتروني.' });
    };

    return (
        <>
            <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 mb-20 shadow-lg">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white opacity-20 tracking-widest">
                        STUDENT PROFILE
                    </h1>
                </div>
            </div>
            <div className="px-4 sm:px-8 pb-8">
                <div className="relative -mt-24 mb-8 flex flex-col md:flex-row items-end md:items-end gap-6 text-center md:text-right">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-full border-4 border-white dark:border-slate-900 shadow-2xl overflow-hidden bg-white relative z-10">
                            <Image
                                src="/cu-logo.png"
                                alt="Profile"
                                width={160}
                                height={160}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            onClick={handleUpdatePhoto}
                            className="absolute bottom-2 right-2 z-20 w-10 h-10 bg-primary text-white rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
                            title="تحديث الصورة"
                        >
                            <span className="material-symbols-outlined text-sm">
                                photo_camera
                            </span>
                        </button>
                    </div>
                    <div className="flex-1 pb-2">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                            محمد عبد الوهاب
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            كلية الدراسات العليا للبحوث - ماجستير هندسة البرمجيات
                        </p>
                    </div>
                    <div className="flex gap-3 pb-2 w-full md:w-auto">
                        <button
                            onClick={handleChangePassword}
                            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">lock</span>
                            تغيير كلمة المرور
                        </button>
                        <button
                            onClick={handleSaveChanges}
                            disabled={isLoading}
                            className="flex-1 md:flex-none bg-primary hover:bg-primary-light text-white font-bold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-sm">save</span>
                                    حفظ التغييرات
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 border-r-4 border-primary pr-3">
                                البيانات الشخصية
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        الاسم بالكامل (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="محمد عبد الوهاب"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        الاسم بالكامل (English)
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Mohamed Abdel Wahab"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right-ltr"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        الرقم القومي
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="30105021234567"
                                        readOnly
                                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-mono font-medium focus:outline-none cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        الجنسية
                                    </label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                        <option>مصر</option>
                                        <option>السعودية</option>
                                        <option>الكويت</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        تاريخ الميلاد
                                    </label>
                                    <input
                                        type="date"
                                        defaultValue="2001-05-02"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        محل الميلاد
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="القاهرة"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 border-r-4 border-primary pr-3">
                                بيانات التواصل
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        رقم الهاتف المحمول
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue="01012345678"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right-ltr"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        البريد الإلكتروني الشخصي
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="mohamed.wahab@gmail.com"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right-ltr"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                        العنوان بالتفصيل
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="15 شارع الثورة، مصر الجديدة، القاهرة"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-card border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6 border-r-4 border-secondary pr-3">
                                البيانات الأكاديمية
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">school</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">الكلية</p>
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            كلية الدراسات العليا للبحوث
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">category</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">القسم</p>
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            هندسة البرمجيات
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">
                                            military_tech
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">المستوى</p>
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            ماجستير
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">badge</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">كود الطالب</p>
                                        <p className="font-bold font-mono text-slate-900 dark:text-white">
                                            202503410
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">البريد الجامعي</p>
                                        <p className="font-bold font-mono text-slate-900 dark:text-white text-sm truncate">
                                            mohamed.wahab@fci.cu.edu.eg
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
