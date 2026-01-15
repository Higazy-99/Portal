"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import { toast } from 'sonner';
import { FadeIn, AnimatedList, AnimatedItem } from '@/components/common/Animations';

interface ServiceCategory {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    services: Service[];
}

interface Service {
    id: string;
    name: string;
    description: string;
    processingTime: string;
    requiresApproval: boolean;
}

const serviceCategories: ServiceCategory[] = [
    {
        id: 'academic',
        title: 'الخدمات الأكاديمية',
        description: 'طلبات التسجيل والتأجيل والانسحاب',
        icon: 'school',
        color: 'blue',
        services: [
            { id: 'a1', name: 'تأجيل الفصل الدراسي', description: 'طلب تأجيل الدراسة للفصل القادم', processingTime: '3-5 أيام', requiresApproval: true },
            { id: 'a2', name: 'الانسحاب من مقرر', description: 'طلب انسحاب من مقرر مسجل', processingTime: '1-2 يوم', requiresApproval: true },
            { id: 'a3', name: 'تحويل قسم', description: 'طلب التحويل لقسم آخر داخل الكلية', processingTime: '5-7 أيام', requiresApproval: true },
            { id: 'a4', name: 'معادلة مقررات', description: 'طلب معادلة مقررات من جامعة أخرى', processingTime: '7-10 أيام', requiresApproval: true },
        ],
    },
    {
        id: 'financial',
        title: 'الخدمات المالية',
        description: 'الرسوم والمدفوعات والإعفاءات',
        icon: 'payments',
        color: 'green',
        services: [
            { id: 'f1', name: 'طلب تقسيط الرسوم', description: 'طلب تقسيط الرسوم الدراسية', processingTime: '2-3 أيام', requiresApproval: true },
            { id: 'f2', name: 'طلب إعفاء جزئي', description: 'طلب إعفاء جزئي من الرسوم', processingTime: '5-7 أيام', requiresApproval: true },
            { id: 'f3', name: 'استرداد رسوم', description: 'طلب استرداد رسوم مدفوعة', processingTime: '7-14 يوم', requiresApproval: true },
            { id: 'f4', name: 'إصدار إيصال', description: 'طلب إصدار إيصال سداد رسمي', processingTime: 'فوري', requiresApproval: false },
        ],
    },
    {
        id: 'technical',
        title: 'الدعم الفني',
        description: 'مشاكل النظام والحسابات',
        icon: 'support',
        color: 'purple',
        services: [
            { id: 't1', name: 'إعادة تعيين كلمة المرور', description: 'استعادة الوصول للحساب الجامعي', processingTime: 'فوري', requiresApproval: false },
            { id: 't2', name: 'مشكلة في التسجيل', description: 'الإبلاغ عن مشكلة في تسجيل المقررات', processingTime: '1-2 يوم', requiresApproval: false },
            { id: 't3', name: 'تحديث البيانات', description: 'طلب تحديث البيانات الشخصية', processingTime: '1-2 يوم', requiresApproval: false },
            { id: 't4', name: 'مشكلة في الدرجات', description: 'الإبلاغ عن خطأ في الدرجات المسجلة', processingTime: '3-5 أيام', requiresApproval: true },
        ],
    },
    {
        id: 'student',
        title: 'خدمات طلابية',
        description: 'الأنشطة والسكن والمواصلات',
        icon: 'groups',
        color: 'amber',
        services: [
            { id: 's1', name: 'طلب سكن جامعي', description: 'التقديم للسكن الجامعي', processingTime: '7-14 يوم', requiresApproval: true },
            { id: 's2', name: 'اشتراك المواصلات', description: 'الاشتراك في خدمة الباصات الجامعية', processingTime: '2-3 أيام', requiresApproval: false },
            { id: 's3', name: 'الانضمام لنادي', description: 'طلب الانضمام لأحد الأندية الطلابية', processingTime: '1-2 يوم', requiresApproval: false },
            { id: 's4', name: 'حجز معمل', description: 'حجز معمل للعمل على المشاريع', processingTime: 'فوري', requiresApproval: false },
        ],
    },
];

const colorClasses: Record<string, { bg: string; text: string; light: string }> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', light: 'bg-blue-50 dark:bg-blue-900/20' },
    green: { bg: 'bg-green-500', text: 'text-green-600 dark:text-green-400', light: 'bg-green-50 dark:bg-green-900/20' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400', light: 'bg-purple-50 dark:bg-purple-900/20' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', light: 'bg-amber-50 dark:bg-amber-900/20' },
};

const faqs = [
    { q: 'كيف أتابع حالة طلبي؟', a: 'يمكنك متابعة حالة جميع طلباتك من صفحة "طلباتي" في القائمة الجانبية.' },
    { q: 'ما هو وقت الاستجابة للطلبات؟', a: 'يختلف وقت الاستجابة حسب نوع الطلب، ويتراوح بين فوري إلى 14 يوم عمل.' },
    { q: 'هل يمكنني إلغاء طلب مقدم؟', a: 'نعم، يمكنك إلغاء الطلب قبل البدء في معالجته من صفحة تفاصيل الطلب.' },
];

export default function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestNote, setRequestNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleCategoryClick = (category: ServiceCategory) => {
        setSelectedCategory(category);
    };

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
        setShowRequestModal(true);
    };

    const handleSubmitRequest = () => {
        if (!selectedService) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowRequestModal(false);
            setRequestNote('');
            toast.success('تم إرسال الطلب بنجاح', {
                description: `سيتم معالجة طلب "${selectedService.name}" خلال ${selectedService.processingTime}`,
            });
        }, 1500);
    };

    const handleContactSupport = () => {
        toast.info('التواصل مع الدعم', { description: 'سيتم فتح نافذة المحادثة مع فريق الدعم الفني.' });
    };

    return (
        <>
            <PageHeader
                title="خدمات الطلاب"
                description="تقديم الطلبات والحصول على الدعم والمساعدة."
                breadcrumbs={[
                    { label: 'الرئيسية' },
                    { label: 'الخدمات' },
                ]}
                actions={
                    <button
                        onClick={handleContactSupport}
                        className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">chat</span>
                        <span className="hidden sm:inline">تواصل معنا</span>
                    </button>
                }
            />

            {/* Service Categories */}
            <AnimatedList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {serviceCategories.map((category) => (
                    <AnimatedItem key={category.id}>
                        <button
                            onClick={() => handleCategoryClick(category)}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-right ${selectedCategory?.id === category.id
                                    ? `border-${category.color}-500 shadow-lg ${colorClasses[category.color].light}`
                                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-xl ${colorClasses[category.color].light} ${colorClasses[category.color].text} flex items-center justify-center mb-4`}>
                                <span className="material-symbols-outlined text-2xl">{category.icon}</span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{category.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-slate-400">{category.services.length} خدمات</span>
                                <span className={`material-symbols-outlined ${colorClasses[category.color].text}`}>arrow_forward</span>
                            </div>
                        </button>
                    </AnimatedItem>
                ))}
            </AnimatedList>

            {/* Selected Category Services */}
            {selectedCategory && (
                <FadeIn>
                    <Card className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${colorClasses[selectedCategory.color].light} ${colorClasses[selectedCategory.color].text} flex items-center justify-center`}>
                                    <span className="material-symbols-outlined">{selectedCategory.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{selectedCategory.title}</h3>
                                    <p className="text-sm text-slate-500">{selectedCategory.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-400">close</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedCategory.services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => handleServiceClick(service)}
                                    className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:shadow-md transition-all text-right group"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                            {service.name}
                                        </h4>
                                        {service.requiresApproval && (
                                            <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded font-bold">
                                                يتطلب موافقة
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{service.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            {service.processingTime}
                                        </span>
                                        <span className="text-primary text-sm font-bold group-hover:underline">تقديم طلب ←</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>
                </FadeIn>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <FadeIn delay={0.1}>
                    <Card className="lg:col-span-2">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">history</span>
                            طلباتي الأخيرة
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">شهادة قيد</p>
                                        <p className="text-xs text-slate-500">تم الاستلام • منذ 3 أيام</p>
                                    </div>
                                </div>
                                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full font-bold">مكتمل</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined">pending</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">طلب تقسيط رسوم</p>
                                        <p className="text-xs text-slate-500">قيد المراجعة • منذ يوم</p>
                                    </div>
                                </div>
                                <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full font-bold">قيد المعالجة</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined">send</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">بيان درجات</p>
                                        <p className="text-xs text-slate-500">تم الإرسال • اليوم</p>
                                    </div>
                                </div>
                                <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full font-bold">جديد</span>
                            </div>
                        </div>
                    </Card>
                </FadeIn>

                {/* FAQ */}
                <FadeIn delay={0.2}>
                    <Card>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">help</span>
                            الأسئلة الشائعة
                        </h3>
                        <div className="space-y-2">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                        className="w-full p-3 text-right flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <span className="font-medium text-sm text-slate-900 dark:text-white">{faq.q}</span>
                                        <span className={`material-symbols-outlined text-slate-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </button>
                                    {expandedFaq === index && (
                                        <div className="px-3 pb-3 text-sm text-slate-600 dark:text-slate-400">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </FadeIn>
            </div>

            {/* Request Modal */}
            <Modal
                isOpen={showRequestModal}
                onClose={() => setShowRequestModal(false)}
                title="تقديم طلب جديد"
                size="md"
            >
                {selectedService && (
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">{selectedService.name}</h4>
                            <p className="text-sm text-slate-500">{selectedService.description}</p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    {selectedService.processingTime}
                                </span>
                                {selectedService.requiresApproval && (
                                    <span className="flex items-center gap-1 text-amber-600">
                                        <span className="material-symbols-outlined text-sm">verified_user</span>
                                        يتطلب موافقة
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                ملاحظات إضافية (اختياري)
                            </label>
                            <textarea
                                value={requestNote}
                                onChange={(e) => setRequestNote(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                rows={3}
                                placeholder="أضف أي تفاصيل أو ملاحظات إضافية..."
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleSubmitRequest}
                                disabled={isSubmitting}
                                className="flex-1 py-3 px-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-sm">send</span>
                                        إرسال الطلب
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setShowRequestModal(false)}
                                className="py-3 px-6 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
