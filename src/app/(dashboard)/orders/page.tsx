"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import { toast } from 'sonner';
import { FadeIn, AnimatedList, AnimatedItem } from '@/components/common/Animations';

interface Order {
    id: string;
    type: string;
    title: string;
    requestDate: string;
    estimatedDate: string;
    status: 'pending' | 'processing' | 'approved' | 'ready' | 'completed' | 'rejected';
    statusSteps: {
        label: string;
        date?: string;
        completed: boolean;
    }[];
    details?: string;
    trackingNumber?: string;
    paymentStatus?: 'paid' | 'pending';
    price?: number;
}

const ordersData: Order[] = [
    {
        id: 'ORD-2025-001',
        type: 'document',
        title: 'شهادة قيد',
        requestDate: '2025-01-10',
        estimatedDate: '2025-01-17',
        status: 'ready',
        trackingNumber: 'DOC-45678',
        paymentStatus: 'paid',
        price: 50,
        statusSteps: [
            { label: 'تم تقديم الطلب', date: '10 يناير 2025', completed: true },
            { label: 'قيد المراجعة', date: '11 يناير 2025', completed: true },
            { label: 'تمت الموافقة', date: '12 يناير 2025', completed: true },
            { label: 'جاهز للاستلام', date: '14 يناير 2025', completed: true },
            { label: 'تم الاستلام', completed: false },
        ],
    },
    {
        id: 'ORD-2025-002',
        type: 'service',
        title: 'طلب تقسيط رسوم',
        requestDate: '2025-01-13',
        estimatedDate: '2025-01-20',
        status: 'processing',
        statusSteps: [
            { label: 'تم تقديم الطلب', date: '13 يناير 2025', completed: true },
            { label: 'قيد المراجعة', date: '14 يناير 2025', completed: true },
            { label: 'في انتظار الموافقة', completed: false },
            { label: 'تمت الموافقة', completed: false },
        ],
        details: 'طلب تقسيط رسوم الفصل الثاني على 6 أشهر',
    },
    {
        id: 'ORD-2025-003',
        type: 'document',
        title: 'بيان درجات',
        requestDate: '2025-01-14',
        estimatedDate: '2025-01-21',
        status: 'pending',
        trackingNumber: 'DOC-45679',
        paymentStatus: 'pending',
        price: 30,
        statusSteps: [
            { label: 'تم تقديم الطلب', date: '14 يناير 2025', completed: true },
            { label: 'في انتظار الدفع', completed: false },
            { label: 'قيد المعالجة', completed: false },
            { label: 'جاهز للاستلام', completed: false },
        ],
    },
    {
        id: 'ORD-2024-015',
        type: 'document',
        title: 'شهادة حسن سير وسلوك',
        requestDate: '2024-12-01',
        estimatedDate: '2024-12-10',
        status: 'completed',
        trackingNumber: 'DOC-45650',
        paymentStatus: 'paid',
        price: 25,
        statusSteps: [
            { label: 'تم تقديم الطلب', date: '1 ديسمبر 2024', completed: true },
            { label: 'قيد المراجعة', date: '2 ديسمبر 2024', completed: true },
            { label: 'تمت الموافقة', date: '5 ديسمبر 2024', completed: true },
            { label: 'جاهز للاستلام', date: '7 ديسمبر 2024', completed: true },
            { label: 'تم الاستلام', date: '10 ديسمبر 2024', completed: true },
        ],
    },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    pending: { label: 'قيد الانتظار', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30', icon: 'schedule' },
    processing: { label: 'قيد المعالجة', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', icon: 'sync' },
    approved: { label: 'تمت الموافقة', color: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30', icon: 'verified' },
    ready: { label: 'جاهز للاستلام', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', icon: 'inventory_2' },
    completed: { label: 'مكتمل', color: 'text-slate-700 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800', icon: 'check_circle' },
    rejected: { label: 'مرفوض', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', icon: 'cancel' },
};

export default function OrdersPage() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = ordersData.filter(order => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'active' && !['completed', 'rejected'].includes(order.status)) ||
            (filter === 'completed' && ['completed', 'rejected'].includes(order.status));

        const matchesSearch =
            order.title.includes(searchQuery) ||
            order.id.includes(searchQuery) ||
            (order.trackingNumber?.includes(searchQuery) ?? false);

        return matchesFilter && matchesSearch;
    });

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCancelOrder = (orderId: string) => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'جاري إلغاء الطلب...',
            success: 'تم إلغاء الطلب بنجاح',
            error: 'حدث خطأ أثناء الإلغاء',
        });
        setShowModal(false);
    };

    const handlePayNow = (orderId: string) => {
        toast.info('جاري توجيهك لصفحة الدفع...');
        setShowModal(false);
    };

    const getProgressPercentage = (order: Order) => {
        const completed = order.statusSteps.filter(s => s.completed).length;
        return (completed / order.statusSteps.length) * 100;
    };

    const activeOrders = ordersData.filter(o => !['completed', 'rejected'].includes(o.status)).length;
    const completedOrders = ordersData.filter(o => o.status === 'completed').length;

    return (
        <>
            <PageHeader
                title="متابعة الطلبات"
                description="تتبع حالة طلباتك ومستنداتك."
                breadcrumbs={[
                    { label: 'الرئيسية' },
                    { label: 'متابعة الطلبات' },
                ]}
            />

            {/* Stats */}
            <FadeIn>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">list_alt</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">إجمالي الطلبات</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{ordersData.length}</p>
                        </div>
                    </Card>
                    <Card className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">pending_actions</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">طلبات نشطة</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{activeOrders}</p>
                        </div>
                    </Card>
                    <Card className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-400">task_alt</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">طلبات مكتملة</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{completedOrders}</p>
                        </div>
                    </Card>
                </div>
            </FadeIn>

            {/* Search & Filter */}
            <FadeIn delay={0.1}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="بحث برقم الطلب أو العنوان..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        {(['all', 'active', 'completed'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === f
                                    ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                                    }`}
                            >
                                {f === 'all' && 'الكل'}
                                {f === 'active' && 'نشط'}
                                {f === 'completed' && 'مكتمل'}
                            </button>
                        ))}
                    </div>
                </div>
            </FadeIn>

            {/* Orders List */}
            <AnimatedList className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <Card className="p-12 text-center">
                        <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">inbox</span>
                        <p className="text-slate-500 font-medium">لا توجد طلبات مطابقة</p>
                    </Card>
                ) : (
                    filteredOrders.map((order) => (
                        <AnimatedItem key={order.id}>
                            <div
                                className="bg-white dark:bg-slate-900 rounded-xl shadow-card border border-slate-200 dark:border-slate-800 p-0 overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all"
                                onClick={() => handleOrderClick(order)}
                            >
                                <div className="p-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${statusConfig[order.status].bg} flex items-center justify-center flex-shrink-0`}>
                                                <span className={`material-symbols-outlined ${statusConfig[order.status].color}`}>
                                                    {statusConfig[order.status].icon}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{order.title}</h3>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                                                        {statusConfig[order.status].label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                                    <span className="font-mono">{order.id}</span>
                                                    <span>•</span>
                                                    <span>تاريخ الطلب: {order.requestDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {order.paymentStatus === 'pending' && (
                                                <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full font-bold">
                                                    في انتظار الدفع
                                                </span>
                                            )}
                                            <span className="material-symbols-outlined text-slate-400">chevron_left</span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                            <span>التقدم</span>
                                            <span>{Math.round(getProgressPercentage(order))}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${order.status === 'completed' ? 'bg-slate-400' :
                                                    order.status === 'rejected' ? 'bg-red-500' : 'bg-primary'
                                                    }`}
                                                style={{ width: `${getProgressPercentage(order)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedItem>
                    ))
                )}
            </AnimatedList>

            {/* Order Detail Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="تفاصيل الطلب"
                size="lg"
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{selectedOrder.title}</h3>
                                <p className="text-xs text-slate-500 font-mono mt-1">{selectedOrder.id}</p>
                            </div>
                            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color}`}>
                                {statusConfig[selectedOrder.status].label}
                            </span>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-0">
                            {selectedOrder.statusSteps.map((step, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                                            ? 'bg-green-500 text-white'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                            }`}>
                                            {step.completed ? (
                                                <span className="material-symbols-outlined text-sm">check</span>
                                            ) : (
                                                <span className="text-xs font-bold">{index + 1}</span>
                                            )}
                                        </div>
                                        {index < selectedOrder.statusSteps.length - 1 && (
                                            <div className={`w-0.5 h-8 ${step.completed ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'
                                                }`} />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-4">
                                        <p className={`font-medium ${step.completed
                                            ? 'text-slate-900 dark:text-white'
                                            : 'text-slate-400'
                                            }`}>
                                            {step.label}
                                        </p>
                                        {step.date && (
                                            <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 mb-1">تاريخ الطلب</p>
                                <p className="font-bold text-slate-900 dark:text-white">{selectedOrder.requestDate}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 mb-1">الموعد المتوقع</p>
                                <p className="font-bold text-slate-900 dark:text-white">{selectedOrder.estimatedDate}</p>
                            </div>
                            {selectedOrder.trackingNumber && (
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-1">رقم التتبع</p>
                                    <p className="font-bold text-primary font-mono">{selectedOrder.trackingNumber}</p>
                                </div>
                            )}
                            {selectedOrder.price && (
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-1">الرسوم</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{selectedOrder.price} ج.م</p>
                                </div>
                            )}
                        </div>

                        {selectedOrder.details && (
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <p className="text-xs text-slate-500 mb-1">تفاصيل إضافية</p>
                                <p className="text-sm text-slate-700 dark:text-slate-300">{selectedOrder.details}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            {selectedOrder.paymentStatus === 'pending' && (
                                <button
                                    onClick={() => handlePayNow(selectedOrder.id)}
                                    className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">credit_card</span>
                                    إتمام الدفع
                                </button>
                            )}
                            {selectedOrder.status === 'ready' && (
                                <button
                                    onClick={() => {
                                        toast.info('يمكنك الاستلام من مكتب شؤون الطلاب');
                                        setShowModal(false);
                                    }}
                                    className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    مكان الاستلام
                                </button>
                            )}
                            {!['completed', 'rejected', 'ready'].includes(selectedOrder.status) && (
                                <button
                                    onClick={() => handleCancelOrder(selectedOrder.id)}
                                    className="py-3 px-6 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    إلغاء الطلب
                                </button>
                            )}
                            <button
                                onClick={() => setShowModal(false)}
                                className="py-3 px-6 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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
