"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const systemPrompt = `أنت مساعد ذكي لنظام الجامعة الأكاديمي. اسمك "مساعد الطالب".
مهمتك مساعدة الطلاب في:
- الاستفسار عن التسجيل والمقررات
- توضيح الرسوم الدراسية وطرق الدفع
- شرح إجراءات استخراج الوثائق
- الرد على أسئلة عن الجداول والامتحانات
- توجيه الطلاب للأقسام المناسبة

أجب بشكل مختصر وودود باللغة العربية. إذا كان السؤال خارج نطاق الخدمات الجامعية، اعتذر بلطف وأخبر الطالب أنك متخصص في المساعدة الأكاديمية فقط.`;

const quickReplies = [
    'كيف أسجل المقررات؟',
    'ما هي طرق الدفع المتاحة؟',
    'كيف أستخرج شهادة قيد؟',
    'متى موعد الامتحانات؟',
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'مرحباً! 👋 أنا مساعد الطالب الذكي. كيف يمكنني مساعدتك اليوم؟',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Get API key from environment or use demo mode
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

            if (!apiKey) {
                // Demo mode - simulate response
                await new Promise(resolve => setTimeout(resolve, 1000));
                const demoResponses: Record<string, string> = {
                    'كيف أسجل المقررات؟': 'يمكنك تسجيل المقررات من خلال صفحة "التسجيل" في القائمة الجانبية. اختر المقررات المتاحة وأضفها لجدولك، ثم اضغط "تأكيد التسجيل". تأكد من الالتزام بالحد الأدنى والأقصى للساعات (9-18 ساعة).',
                    'ما هي طرق الدفع المتاحة؟': 'نوفر عدة طرق للدفع:\n• البطاقات البنكية (فيزا/ماستركارد/ميزة)\n• التحويل البنكي\n• المحافظ الإلكترونية (فودافون كاش/أورنج/اتصالات)\n• التقسيط على 6 أشهر بدون فوائد',
                    'كيف أستخرج شهادة قيد؟': 'اذهب لصفحة "الوثائق" واختر "شهادة قيد". قم بتعبئة البيانات المطلوبة وادفع الرسوم (50 جنيه). ستكون الشهادة جاهزة للاستلام خلال 3-5 أيام عمل من مكتب شؤون الطلاب.',
                    'متى موعد الامتحانات؟': 'يمكنك الاطلاع على جدول الامتحانات التفصيلي من صفحة "الامتحانات" في القائمة الجانبية. ستجد تاريخ ووقت ومكان كل امتحان مع عداد تنازلي للوقت المتبقي.',
                };

                const matchedResponse = Object.entries(demoResponses).find(([key]) =>
                    content.includes(key.replace('؟', ''))
                );

                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: matchedResponse?.[1] || 'شكراً لسؤالك! للحصول على إجابة دقيقة، يرجى إضافة مفتاح API للذكاء الاصطناعي. يمكنك ذلك من خلال إعداد المتغير NEXT_PUBLIC_GEMINI_API_KEY في ملف .env.local',
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, assistantMessage]);
            } else {
                // Real API call to Gemini
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [
                                {
                                    role: 'user',
                                    parts: [{ text: systemPrompt }],
                                },
                                {
                                    role: 'model',
                                    parts: [{ text: 'مفهوم! أنا مساعد الطالب الجامعي وسأساعد الطلاب في استفساراتهم الأكاديمية.' }],
                                },
                                ...messages.slice(1).map(m => ({
                                    role: m.role === 'user' ? 'user' : 'model',
                                    parts: [{ text: m.content }],
                                })),
                                {
                                    role: 'user',
                                    parts: [{ text: content }],
                                },
                            ],
                            generationConfig: {
                                temperature: 0.7,
                                maxOutputTokens: 500,
                            },
                        }),
                    }
                );

                const data = await response.json();
                const assistantContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.';

                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: assistantContent,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, assistantMessage]);
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى لاحقاً.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleQuickReply = (reply: string) => {
        sendMessage(reply);
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${isOpen
                    ? 'bg-slate-700 hover:bg-slate-800'
                    : 'bg-primary hover:bg-primary-light'
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="material-symbols-outlined text-white text-2xl">
                    {isOpen ? 'close' : 'smart_toy'}
                </span>
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 left-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
                        style={{ height: '500px', maxHeight: 'calc(100vh - 150px)' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-blue-600 p-4 text-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold">مساعد الطالب</h3>
                                <p className="text-xs text-blue-100">متاح على مدار الساعة</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl ${message.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-sm'
                                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                        <p className={`text-[10px] mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                                            }`}>
                                            {message.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-end">
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <p className="text-[10px] text-slate-400 mb-2">اسأل عن:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickReplies.map((reply) => (
                                        <button
                                            key={reply}
                                            onClick={() => handleQuickReply(reply)}
                                            className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="اكتب رسالتك..."
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="material-symbols-outlined text-lg rtl:rotate-180">send</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
