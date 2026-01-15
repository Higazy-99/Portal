"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useData } from "@/context/DataContext";

const navigation = [
    { name: "لوحة المعلومات", href: "/dashboard", icon: "dashboard" },
    { name: "الملف الشخصي", href: "/profile", icon: "person" },
    { name: "تسجيل المقررات", href: "/registration", icon: "how_to_reg" },
    { name: "الجدول الدراسي", href: "/schedule", icon: "calendar_month" },
    { name: "السجلات والامتحانات", href: "/exams", icon: "event_note" },
    { name: "النتائج السابقة", href: "/results", icon: "school" },
    { name: "الرسوم الدراسية", href: "/fees", icon: "payments" },
    { name: "الخدمات الطلابية", href: "/services", icon: "support_agent" },
    { name: "المستندات والشهادات", href: "/documents", icon: "description" },
    { name: "متابعة الطلبات", href: "/orders", icon: "package_2" },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { logout } = useData();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={clsx(
                    "w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-lg z-30 flex-shrink-0 transition-transform duration-300 transform lg:translate-x-0 fixed lg:relative h-full",
                    isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
                )}
                id="sidebar"
            >
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center text-center bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="relative mb-3 group cursor-pointer">
                        <div className="w-24 h-24 rounded-full p-1 bg-white dark:bg-slate-800 border-2 border-primary/20 dark:border-primary/50 shadow-sm">
                            <Image
                                alt="Student Photo"
                                className="h-full w-full rounded-full object-cover"
                                src="/cu-logo.png"
                                width={96}
                                height={96}
                            />
                        </div>
                        <div
                            className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"
                            title="Online"
                        ></div>
                    </div>
                    <h2 className="font-bold text-lg text-slate-900 dark:text-slate-50">
                        محمد عبد الوهاب
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        ID: 202503410
                    </p>
                    <span className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-center leading-tight">
                        ماجستير هندسة البرمجيات
                    </span>
                    <div className="mt-4 w-full grid grid-cols-2 gap-2">
                        <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700 text-center shadow-sm">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                المعدل التراكمي
                            </p>
                            <p className="text-primary dark:text-accent font-bold text-lg">
                                3.85
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700 text-center shadow-sm">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                الساعات المكتسبة
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 font-bold text-lg">
                                98
                            </p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto sidebar-scroll">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href as "/dashboard" | "/profile" | "/registration" | "/schedule" | "/exams" | "/results" | "/fees" | "/services" | "/documents" | "/orders"}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                                    isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-light"
                                )}
                            >
                                <span
                                    className={clsx(
                                        "material-symbols-outlined text-[22px]",
                                        !isActive && "group-hover:scale-110 transition-transform"
                                    )}
                                >
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[22px]">logout</span>
                        تسجيل الخروج
                    </button>
                </div>
            </aside>
        </>
    );
}
