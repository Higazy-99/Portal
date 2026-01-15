"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';

const SignIn = () => {
    const { login } = useData();
    const [id, setId] = useState('202503410');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDemoHint, setShowDemoHint] = useState(false);

    // Validation states
    const [idTouched, setIdTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const isIdValid = id.length >= 9;
    const isPasswordValid = password.length >= 4;

    useEffect(() => {
        // Show demo hint after 3 seconds
        const timer = setTimeout(() => setShowDemoHint(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIdTouched(true);
        setPasswordTouched(true);

        if (!isIdValid || !isPasswordValid) {
            setError('يرجى التحقق من البيانات المدخلة.');
            return;
        }

        setIsLoading(true);

        // Simulate network delay for effect
        setTimeout(() => {
            const success = login(id, password);
            if (!success) {
                setError('بيانات الدخول غير صحيحة. يرجى التأكد من الرقم الجامعي وكلمة المرور.');
                setIsLoading(false);
            }
            // If success, the App component will handle the redirection based on context state
        }, 800);
    };

    const handleDemoLogin = () => {
        setId('202503410');
        setPassword('demo123');
        // Auto submit after a brief delay
        setTimeout(() => {
            setIsLoading(true);
            setTimeout(() => {
                login('202503410', 'demo123');
            }, 800);
        }, 300);
    };

    const getPasswordStrength = () => {
        if (password.length === 0) return { strength: 0, label: '', color: '' };
        if (password.length < 4) return { strength: 1, label: 'ضعيفة', color: 'bg-red-500' };
        if (password.length < 8) return { strength: 2, label: 'متوسطة', color: 'bg-amber-500' };
        return { strength: 3, label: 'قوية', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row rtl:flex-row-reverse border border-slate-100 dark:border-slate-700 min-h-[600px]"
            >

                {/* Left Side: Image (Desktop only) */}
                <div className="hidden md:block w-1/2 relative bg-primary">
                    <Image
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
                        alt="University Campus"
                        className="object-cover mix-blend-overlay opacity-40"
                        fill
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-full p-12 text-white text-right">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-3xl font-extrabold mb-2"
                        >
                            النظام الأكاديمي الموحد
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-blue-100 text-lg"
                        >
                            بوابتك لمستقبل تعليمي متميز في جامعة القاهرة.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-8 flex gap-4"
                        >
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-3xl mb-2">school</span>
                                <p className="text-xs font-bold">خدمات طلابية</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-3xl mb-2">schedule</span>
                                <p className="text-xs font-bold">جداول دراسية</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-3xl mb-2">forum</span>
                                <p className="text-xs font-bold">تواصل فعال</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <Image
                            src="/cu-logo.png"
                            alt="Cairo University Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">جامعة القاهرة</h1>
                            <p className="text-xs text-slate-500 font-medium">كلية الدراسات العليا للبحوث الاحصائية</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">تسجيل الدخول</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">مرحباً بعودتك! يرجى إدخال بياناتك للمتابعة.</p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label htmlFor="student-id" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">الرقم الجامعي</label>
                            <div className="relative">
                                <input
                                    id="student-id"
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    onBlur={() => setIdTouched(true)}
                                    className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-mono text-left dir-ltr ${idTouched && !isIdValid
                                            ? 'border-red-300 dark:border-red-600'
                                            : 'border-slate-200 dark:border-slate-600'
                                        }`}
                                    placeholder="2025xxxxx"
                                    required
                                />
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">badge</span>
                                {idTouched && isIdValid && (
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">check_circle</span>
                                )}
                            </div>
                            {idTouched && !isIdValid && (
                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">error</span>
                                    الرقم الجامعي يجب أن يكون 9 أرقام على الأقل
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300">كلمة المرور</label>
                                <a href="#" className="text-xs font-bold text-primary hover:underline">نسيت كلمة المرور؟</a>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => setPasswordTouched(true)}
                                    className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 pl-20 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none dir-ltr text-left ${passwordTouched && !isPasswordValid
                                            ? 'border-red-300 dark:border-red-600'
                                            : 'border-slate-200 dark:border-slate-600'
                                        }`}
                                    placeholder="••••••••"
                                    required
                                />
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {password.length > 0 && (
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                                style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                                            />
                                        </div>
                                        <span className={`text-xs font-bold ${passwordStrength.strength === 1 ? 'text-red-500' :
                                                passwordStrength.strength === 2 ? 'text-amber-500' : 'text-green-500'
                                            }`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${rememberMe
                                        ? 'bg-primary border-primary'
                                        : 'border-slate-300 dark:border-slate-600'
                                    }`}
                            >
                                {rememberMe && (
                                    <span className="material-symbols-outlined text-white text-sm">check</span>
                                )}
                            </button>
                            <label
                                onClick={() => setRememberMe(!rememberMe)}
                                className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                            >
                                تذكرني على هذا الجهاز
                            </label>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2 overflow-hidden"
                                >
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span>دخول</span>
                                    <span className="material-symbols-outlined rtl:rotate-180">login</span>
                                </>
                            )}
                        </button>
                    </motion.form>

                    {/* Demo Login Hint */}
                    <AnimatePresence>
                        {showDemoHint && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800"
                            >
                                <div className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-blue-500 text-lg mt-0.5">info</span>
                                    <div className="flex-1">
                                        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-2">
                                            للتجربة، يمكنك استخدام الحساب التجريبي:
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleDemoLogin}
                                            className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                                        >
                                            دخول تجريبي ←
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setShowDemoHint(false)}
                                        className="text-blue-400 hover:text-blue-600 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
                        <p className="text-xs text-slate-400">
                            تواجه مشكلة في الدخول؟ <a href="#" className="text-primary font-bold hover:underline">تواصل مع الدعم الفني</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;
