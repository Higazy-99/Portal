"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import { toast } from 'sonner';
import { FadeIn, AnimatedNumber, ProgressRing, AnimatedList, AnimatedItem } from '@/components/common/Animations';

interface FeeItem {
    id: string;
    description: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
}

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    method: string;
    reference: string;
}

const feeItems: FeeItem[] = [
    { id: '1', description: 'الرسوم الدراسية - الفصل الأول', amount: 15000, dueDate: '2024-09-15', status: 'paid' },
    { id: '2', description: 'رسوم الأنشطة الطلابية', amount: 500, dueDate: '2024-09-15', status: 'paid' },
    { id: '3', description: 'رسوم المكتبة والتكنولوجيا', amount: 300, dueDate: '2024-09-15', status: 'paid' },
    { id: '4', description: 'الرسوم الدراسية - الفصل الثاني', amount: 15000, dueDate: '2025-02-01', status: 'pending' },
    { id: '5', description: 'رسوم التأمين الصحي', amount: 200, dueDate: '2025-02-01', status: 'pending' },
];

const transactions: Transaction[] = [
    { id: '1', date: '2024-09-10', description: 'سداد رسوم الفصل الأول', amount: 15800, method: 'بطاقة ائتمان', reference: 'TXN-2024-001' },
    { id: '2', date: '2024-03-15', description: 'سداد رسوم الفصل الثاني 2023', amount: 15000, method: 'تحويل بنكي', reference: 'TXN-2024-002' },
    { id: '3', date: '2023-09-12', description: 'سداد رسوم الفصل الأول 2023', amount: 14500, method: 'نقداً', reference: 'TXN-2023-001' },
];

const paymentMethods = [
    { id: 'card', name: 'بطاقة ائتمانية', icon: 'credit_card', description: 'فيزا، ماستركارد، ميزة' },
    { id: 'bank', name: 'تحويل بنكي', icon: 'account_balance', description: 'البنك الأهلي، مصر، CIB' },
    { id: 'wallet', name: 'محفظة إلكترونية', icon: 'wallet', description: 'فودافون كاش، أورنج، اتصالات' },
    { id: 'installment', name: 'تقسيط', icon: 'event_repeat', description: 'قسط شهري لمدة 6 أشهر' },
];

export default function FeesPage() {
    const [isPaid, setIsPaid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const totalDue = 31000;
    const amountPaid = 15800;
    const remainingBalance = totalDue - amountPaid;
    const paidPercentage = (amountPaid / totalDue) * 100;

    const handlePayment = () => {
        setShowPaymentModal(true);
    };

    const handleConfirmPayment = () => {
        if (!selectedMethod) {
            toast.error('يرجى اختيار طريقة الدفع');
            return;
        }

        setIsLoading(true);
        setShowConfirmation(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsPaid(true);
            setIsLoading(false);
            setShowPaymentModal(false);
            setShowConfirmation(false);
            toast.success('تمت عملية الدفع بنجاح!', {
                description: 'تم سداد الرسوم الدراسية للفصل الحالي.',
                duration: 5000,
            });
        }, 2500);
    };

    const handleDownloadInvoice = () => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'جاري تحميل الفاتورة...',
            success: 'تم تحميل الفاتورة بنجاح',
            error: 'حدث خطأ أثناء التحميل',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded-full">تم السداد</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold rounded-full">قيد الانتظار</span>;
            case 'overdue':
                return <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold rounded-full">متأخر</span>;
            default:
                return null;
        }
    };

    return (
        <>
            <PageHeader
                title="الرسوم الدراسية"
                description="عرض ودفع الرسوم الدراسية والمصروفات المستحقة."
                breadcrumbs={[
                    { label: 'الرئيسية' },
                    { label: 'الرسوم الدراسية' },
                ]}
                actions={
                    <button
                        onClick={() => setShowHistoryModal(true)}
                        className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">history</span>
                        <span className="hidden sm:inline">سجل المعاملات</span>
                    </button>
                }
            />

            {/* Payment Summary Banner */}
            <FadeIn>
                <div className={`rounded-2xl p-6 mb-6 relative overflow-hidden ${isPaid
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500'
                    }`}>
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-10 translate-y-10" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-white">
                        <div className="text-center lg:text-right">
                            {isPaid ? (
                                <>
                                    <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                                        <span className="material-symbols-outlined">check_circle</span>
                                        <span className="text-green-100">تم السداد بالكامل</span>
                                    </div>
                                    <h3 className="text-3xl font-bold">لا توجد مستحقات</h3>
                                    <p className="text-green-100 mt-1">شكراً لك! تم تسوية جميع الرسوم المستحقة.</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                                        <span className="material-symbols-outlined animate-pulse">warning</span>
                                        <span className="text-amber-100">يوجد مستحقات</span>
                                    </div>
                                    <h3 className="text-3xl font-bold">
                                        <AnimatedNumber value={remainingBalance} /> جنيه
                                    </h3>
                                    <p className="text-amber-100 mt-1">الموعد النهائي للسداد: 1 فبراير 2025</p>
                                </>
                            )}
                        </div>

                        {!isPaid && (
                            <button
                                onClick={handlePayment}
                                className="bg-white text-amber-600 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-amber-50 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">credit_card</span>
                                ادفع الآن
                            </button>
                        )}
                    </div>
                </div>
            </FadeIn>

            {/* Stats Cards */}
            <FadeIn delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card className="p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">إجمالي المستحق</p>
                                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                    <AnimatedNumber value={totalDue} /> <span className="text-sm text-slate-400">ج.م</span>
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">account_balance_wallet</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">المبلغ المدفوع</p>
                                <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                                    <AnimatedNumber value={amountPaid} /> <span className="text-sm text-slate-400">ج.م</span>
                                </p>
                            </div>
                            <ProgressRing progress={paidPercentage} size={48} strokeWidth={5} color="#22c55e" bgColor="#dcfce7">
                                <span className="text-[10px] font-bold text-green-600">{Math.round(paidPercentage)}%</span>
                            </ProgressRing>
                        </div>
                    </Card>

                    <Card className="p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">المتبقي</p>
                                <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                                    <AnimatedNumber value={isPaid ? 0 : remainingBalance} /> <span className="text-sm text-slate-400">ج.م</span>
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">pending_actions</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </FadeIn>

            {/* Fee Items Table */}
            <FadeIn delay={0.2}>
                <Card noPadding className="overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">receipt_long</span>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">تفاصيل الرسوم</h3>
                        </div>
                        <button
                            onClick={handleDownloadInvoice}
                            className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                        >
                            <span className="material-symbols-outlined text-sm">download</span>
                            تحميل الفاتورة
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-4">البند</th>
                                    <th className="px-6 py-4">تاريخ الاستحقاق</th>
                                    <th className="px-6 py-4 text-center">الحالة</th>
                                    <th className="px-6 py-4 text-left">المبلغ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {feeItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.description}</td>
                                        <td className="px-6 py-4 text-slate-500">{item.dueDate}</td>
                                        <td className="px-6 py-4 text-center">{getStatusBadge(item.status)}</td>
                                        <td className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white">{item.amount.toLocaleString()} ج.م</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-50 dark:bg-slate-800/50 font-bold">
                                <tr>
                                    <td className="px-6 py-4" colSpan={3}>الإجمالي</td>
                                    <td className="px-6 py-4 text-left text-lg text-primary">{totalDue.toLocaleString()} ج.م</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Card>
            </FadeIn>

            {/* Info Cards */}
            <FadeIn delay={0.3}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <span className="material-symbols-outlined">info</span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">معلومات هامة</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">check_circle</span>
                                يتم قبول الدفع بالبطاقات البنكية والمحافظ الإلكترونية.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">check_circle</span>
                                يمكن التقسيط على 6 أشهر بدون فوائد.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">check_circle</span>
                                سيتم إرسال إيصال الدفع على بريدك الإلكتروني.
                            </li>
                        </ul>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">تحتاج مساعدة؟</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            للاستفسار عن الرسوم أو طلب تقسيط أو إعفاء، يرجى التواصل مع الشؤون المالية.
                        </p>
                        <div className="flex gap-2">
                            <a href="tel:+20225787654" className="flex-1 py-2 text-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-sm">call</span>
                                اتصل بنا
                            </a>
                            <button
                                onClick={() => toast.info('سيتم فتح المحادثة')}
                                className="flex-1 py-2 text-center bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-light transition-colors flex items-center justify-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">chat</span>
                                محادثة
                            </button>
                        </div>
                    </Card>
                </div>
            </FadeIn>

            {/* Payment Modal */}
            <Modal
                isOpen={showPaymentModal}
                onClose={() => !isLoading && setShowPaymentModal(false)}
                title="اختر طريقة الدفع"
                size="lg"
            >
                {!showConfirmation ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">المبلغ المستحق</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{remainingBalance.toLocaleString()} ج.م</span>
                        </div>

                        <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {paymentMethods.map((method) => (
                                <AnimatedItem key={method.id}>
                                    <button
                                        onClick={() => setSelectedMethod(method.id)}
                                        className={`w-full p-4 rounded-xl border-2 text-right transition-all ${selectedMethod === method.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedMethod === method.id
                                                    ? 'bg-primary text-white'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                                }`}>
                                                <span className="material-symbols-outlined">{method.icon}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-900 dark:text-white">{method.name}</p>
                                                <p className="text-xs text-slate-500">{method.description}</p>
                                            </div>
                                            <span className={`material-symbols-outlined ${selectedMethod === method.id ? 'text-primary' : 'text-slate-300'
                                                }`}>
                                                {selectedMethod === method.id ? 'check_circle' : 'radio_button_unchecked'}
                                            </span>
                                        </div>
                                    </button>
                                </AnimatedItem>
                            ))}
                        </AnimatedList>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleConfirmPayment}
                                disabled={!selectedMethod}
                                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">lock</span>
                                متابعة الدفع الآمن
                            </button>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="py-3 px-6 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">جاري معالجة الدفع...</h3>
                        <p className="text-slate-500">يرجى الانتظار وعدم إغلاق هذه النافذة</p>
                    </div>
                )}
            </Modal>

            {/* Transaction History Modal */}
            <Modal
                isOpen={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                title="سجل المعاملات"
                size="lg"
            >
                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">{tx.description}</p>
                                    <p className="text-xs text-slate-500 mt-1">{tx.date} • {tx.method}</p>
                                </div>
                                <span className="text-lg font-bold text-green-600">-{tx.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                                <span className="text-xs font-mono text-slate-400">{tx.reference}</span>
                                <button
                                    onClick={() => {
                                        toast.success('تم نسخ رقم المرجع');
                                    }}
                                    className="text-xs text-primary font-bold hover:underline"
                                >
                                    نسخ المرجع
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
}
