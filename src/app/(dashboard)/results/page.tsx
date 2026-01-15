"use client";

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import { toast } from 'sonner';
import { GPATrendChart, GradesDistributionChart, SemesterComparisonChart } from '@/components/common/Chart';
import { FadeIn, AnimatedNumber, ProgressRing } from '@/components/common/Animations';

interface Course {
    code: string;
    name: string;
    hours: number;
    grade: string;
    points: number;
    percentage: number;
}

interface SemesterResult {
    id: string;
    name: string;
    year: string;
    courses: Course[];
    semesterHours: number;
    semesterPoints: number;
    semesterGPA: number;
}

const semesterResults: SemesterResult[] = [
    {
        id: '1',
        name: 'الفصل الأول',
        year: '2024-2025',
        semesterHours: 15,
        semesterPoints: 57.75,
        semesterGPA: 3.85,
        courses: [
            { code: 'SE301', name: 'هندسة المتطلبات', hours: 3, grade: 'A', points: 12, percentage: 92 },
            { code: 'CS310', name: 'الذكاء الاصطناعي', hours: 3, grade: 'A-', points: 11.1, percentage: 88 },
            { code: 'SE304', name: 'إدارة المشاريع', hours: 3, grade: 'A', points: 12, percentage: 95 },
            { code: 'CS305', name: 'نظم التشغيل', hours: 3, grade: 'B+', points: 9.9, percentage: 83 },
            { code: 'STAT501', name: 'الإحصاء المتقدم', hours: 3, grade: 'A-', points: 11.1, percentage: 87 },
        ],
    },
    {
        id: '2',
        name: 'الفصل الثاني',
        year: '2023-2024',
        semesterHours: 18,
        semesterPoints: 68.4,
        semesterGPA: 3.80,
        courses: [
            { code: 'CS201', name: 'هياكل البيانات', hours: 3, grade: 'A', points: 12, percentage: 94 },
            { code: 'CS202', name: 'قواعد البيانات', hours: 3, grade: 'A-', points: 11.1, percentage: 89 },
            { code: 'CS203', name: 'شبكات الحاسب', hours: 3, grade: 'B+', points: 9.9, percentage: 84 },
            { code: 'MATH301', name: 'رياضيات متقدمة', hours: 3, grade: 'B', points: 9, percentage: 80 },
            { code: 'CS204', name: 'البرمجة المتقدمة', hours: 3, grade: 'A', points: 12, percentage: 93 },
            { code: 'IS201', name: 'نظم المعلومات', hours: 3, grade: 'A-', points: 11.1, percentage: 86 },
        ],
    },
    {
        id: '3',
        name: 'الفصل الأول',
        year: '2023-2024',
        semesterHours: 15,
        semesterPoints: 55.8,
        semesterGPA: 3.72,
        courses: [
            { code: 'CS101', name: 'مقدمة في البرمجة', hours: 3, grade: 'A', points: 12, percentage: 96 },
            { code: 'MATH201', name: 'التفاضل والتكامل', hours: 3, grade: 'B+', points: 9.9, percentage: 82 },
            { code: 'PHYS101', name: 'فيزياء عامة', hours: 3, grade: 'B+', points: 9.9, percentage: 81 },
            { code: 'ENG101', name: 'اللغة الإنجليزية', hours: 3, grade: 'A-', points: 11.1, percentage: 87 },
            { code: 'CS102', name: 'مبادئ الحاسب', hours: 3, grade: 'A-', points: 11.1, percentage: 88 },
        ],
    },
];

const gpaHistory = [
    { semester: 'ف1 23', gpa: 3.65 },
    { semester: 'ف2 23', gpa: 3.72 },
    { semester: 'ف1 24', gpa: 3.80 },
    { semester: 'ف2 24', gpa: 3.85 },
];

const semesterComparisonData = [
    { semester: 'ف1 23', hours: 15, points: 55 },
    { semester: 'ف2 23', hours: 18, points: 65 },
    { semester: 'ف1 24', hours: 18, points: 68 },
    { semester: 'ف2 24', hours: 15, points: 58 },
];

const gradeDistribution = [
    { grade: 'A', count: 8, color: '#22c55e' },
    { grade: 'A-', count: 6, color: '#84cc16' },
    { grade: 'B+', count: 4, color: '#eab308' },
    { grade: 'B', count: 2, color: '#f97316' },
];

const gradeColors: Record<string, string> = {
    'A+': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'A': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'A-': 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400',
    'B+': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'B': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'B-': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'C+': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    'C': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export default function ResultsPage() {
    const [selectedSemester, setSelectedSemester] = useState(semesterResults[0]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showChartModal, setShowChartModal] = useState(false);

    const cumulativeGPA = 3.85;
    const totalHours = 98;
    const totalPoints = 370.3;

    const handleExportPDF = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: 'جاري تصدير النتائج...',
            success: 'تم تصدير ملف PDF بنجاح',
            error: 'حدث خطأ أثناء التصدير'
        });
    };

    const handlePrintRecord = () => {
        toast.info("جاري إعداد الطباعة...", {
            description: "سيتم فتح نافذة الطباعة للسجل الأكاديمي خلال لحظات."
        });
    };

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
        setShowCourseModal(true);
    };

    const getGradePoint = (grade: string): number => {
        const points: Record<string, number> = {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0
        };
        return points[grade] || 0;
    };

    return (
        <>
            <PageHeader
                title="النتائج الأكاديمية"
                description="عرض درجات المقررات والمعدل التراكمي."
                breadcrumbs={[
                    { label: 'الرئيسية' },
                    { label: 'النتائج الأكاديمية' },
                ]}
                actions={
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrintRecord}
                            className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">print</span>
                            <span className="hidden sm:inline">طباعة</span>
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">download</span>
                            <span className="hidden sm:inline">تصدير PDF</span>
                        </button>
                    </div>
                }
            />

            {/* Summary Stats */}
            <FadeIn>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card className="p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">المعدل التراكمي</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        <AnimatedNumber value={cumulativeGPA} decimals={2} />
                                    </span>
                                    <span className="text-sm text-slate-400">/ 4.00</span>
                                </div>
                            </div>
                            <ProgressRing progress={(cumulativeGPA / 4) * 100} size={60} strokeWidth={6} color="#3b82f6">
                                <span className="text-xs font-bold text-blue-600">{Math.round((cumulativeGPA / 4) * 100)}%</span>
                            </ProgressRing>
                        </div>
                    </Card>

                    <Card className="p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="relative z-10">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">الساعات المكتسبة</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                    <AnimatedNumber value={totalHours} />
                                </span>
                                <span className="text-sm text-slate-400">/ 132 ساعة</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${(totalHours / 132) * 100}%` }}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="relative z-10">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">إجمالي النقاط</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                    <AnimatedNumber value={totalPoints} decimals={1} />
                                </span>
                                <span className="text-sm text-slate-400">نقطة</span>
                            </div>
                            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-medium">
                                <span className="material-symbols-outlined text-sm align-middle">trending_up</span>
                                +15.3 من الفصل السابق
                            </p>
                        </div>
                    </Card>

                    <Card className="p-5 relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowChartModal(true)}>
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                        <div className="relative z-10">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">تقديرات الفصل</p>
                            <div className="flex items-center gap-2 mt-2">
                                {gradeDistribution.slice(0, 3).map((g) => (
                                    <div key={g.grade} className="flex items-center gap-1">
                                        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${gradeColors[g.grade]}`}>{g.grade}</span>
                                        <span className="text-xs text-slate-500">{g.count}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-primary mt-3 font-medium flex items-center gap-1">
                                عرض التفاصيل
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </p>
                        </div>
                    </Card>
                </div>
            </FadeIn>

            {/* Charts Row */}
            <FadeIn delay={0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card className="p-0 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">insights</span>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">تطور المعدل التراكمي</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
                                <span className="text-xs font-bold text-green-600">+0.13</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <GPATrendChart data={gpaHistory} height={200} />
                        </div>
                    </Card>

                    <Card className="p-0 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">bar_chart</span>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">مقارنة الفصول</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <SemesterComparisonChart data={semesterComparisonData} height={200} />
                        </div>
                    </Card>
                </div>
            </FadeIn>

            {/* Semester Results */}
            <FadeIn delay={0.2}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Semester Selector */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-slate-900 dark:text-white px-1">اختر الفصل الدراسي</h3>
                        {semesterResults.map((semester) => (
                            <button
                                key={semester.id}
                                onClick={() => setSelectedSemester(semester)}
                                className={`w-full p-4 rounded-xl text-right transition-all ${selectedSemester.id === semester.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedSemester.id === semester.id
                                            ? 'bg-white/20'
                                            : 'bg-slate-100 dark:bg-slate-800'
                                        }`}>
                                        {semester.semesterGPA.toFixed(2)}
                                    </span>
                                    <span className={`material-symbols-outlined ${selectedSemester.id === semester.id ? '' : 'text-slate-400'
                                        }`}>
                                        {selectedSemester.id === semester.id ? 'check_circle' : 'radio_button_unchecked'}
                                    </span>
                                </div>
                                <h4 className={`font-bold mt-2 ${selectedSemester.id === semester.id ? '' : 'text-slate-900 dark:text-white'
                                    }`}>
                                    {semester.name}
                                </h4>
                                <p className={`text-xs mt-1 ${selectedSemester.id === semester.id ? 'text-blue-100' : 'text-slate-500'
                                    }`}>
                                    {semester.year} • {semester.courses.length} مقررات
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Results Table */}
                    <div className="lg:col-span-3">
                        <Card noPadding className="overflow-hidden">
                            {/* Semester Summary */}
                            <div className="px-6 py-4 bg-gradient-to-l from-primary/5 to-transparent border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                            {selectedSemester.name} {selectedSemester.year}
                                        </h3>
                                        <p className="text-sm text-slate-500">{selectedSemester.courses.length} مقررات مسجلة</p>
                                    </div>
                                    <div className="flex gap-6 text-center">
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">الساعات</p>
                                            <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedSemester.semesterHours}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">النقاط</p>
                                            <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedSemester.semesterPoints.toFixed(1)}</p>
                                        </div>
                                        <div className="pr-6 border-r border-slate-200 dark:border-slate-700">
                                            <p className="text-xs text-slate-500 mb-1">المعدل</p>
                                            <p className="text-xl font-bold text-primary">{selectedSemester.semesterGPA.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Courses Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-right">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs uppercase font-bold">
                                        <tr>
                                            <th className="px-6 py-4">رمز المقرر</th>
                                            <th className="px-6 py-4">اسم المقرر</th>
                                            <th className="px-6 py-4 text-center">الساعات</th>
                                            <th className="px-6 py-4 text-center">النسبة</th>
                                            <th className="px-6 py-4 text-center">التقدير</th>
                                            <th className="px-6 py-4 text-center">النقاط</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {selectedSemester.courses.map((course) => (
                                            <tr
                                                key={course.code}
                                                onClick={() => handleCourseClick(course)}
                                                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-primary font-bold">{course.code}</span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                                    {course.name}
                                                </td>
                                                <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{course.hours}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${course.percentage >= 90 ? 'bg-green-500' :
                                                                        course.percentage >= 80 ? 'bg-lime-500' :
                                                                            course.percentage >= 70 ? 'bg-amber-500' : 'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${course.percentage}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-mono text-slate-500">{course.percentage}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${gradeColors[course.grade]}`}>
                                                        {course.grade}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center font-bold text-slate-900 dark:text-white">{course.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-slate-50 dark:bg-slate-800/50 font-bold">
                                        <tr>
                                            <td className="px-6 py-4" colSpan={2}>الإجمالي</td>
                                            <td className="px-6 py-4 text-center">{selectedSemester.semesterHours}</td>
                                            <td className="px-6 py-4"></td>
                                            <td className="px-6 py-4 text-center text-primary text-lg">{selectedSemester.semesterGPA.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-center">{selectedSemester.semesterPoints.toFixed(1)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </FadeIn>

            {/* Course Detail Modal */}
            <Modal
                isOpen={showCourseModal}
                onClose={() => setShowCourseModal(false)}
                title="تفاصيل المقرر"
                size="md"
            >
                {selectedCourse && (
                    <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-slate-800 rounded-xl">
                            <span className="text-xs font-mono font-bold text-primary">{selectedCourse.code}</span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{selectedCourse.name}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <p className="text-xs text-slate-500 mb-1">التقدير</p>
                                <span className={`inline-block px-4 py-2 rounded-lg text-2xl font-bold ${gradeColors[selectedCourse.grade]}`}>
                                    {selectedCourse.grade}
                                </span>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <p className="text-xs text-slate-500 mb-1">النسبة المئوية</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCourse.percentage}%</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <p className="text-xs text-slate-500 mb-1">الساعات المعتمدة</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCourse.hours}</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <p className="text-xs text-slate-500 mb-1">النقاط</p>
                                <p className="text-2xl font-bold text-primary">{selectedCourse.points}</p>
                            </div>
                        </div>

                        {/* Grade Scale */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <p className="text-xs text-slate-500 mb-3">سلم التقديرات</p>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries({ 'A': 4, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0 }).map(([grade, point]) => (
                                    <div key={grade} className={`px-2 py-1 rounded text-xs ${selectedCourse.grade === grade
                                            ? 'bg-primary text-white font-bold'
                                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                        }`}>
                                        {grade} = {point}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowCourseModal(false)}
                            className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            إغلاق
                        </button>
                    </div>
                )}
            </Modal>

            {/* Grade Distribution Modal */}
            <Modal
                isOpen={showChartModal}
                onClose={() => setShowChartModal(false)}
                title="توزيع التقديرات"
                size="lg"
            >
                <div className="space-y-4">
                    <GradesDistributionChart data={gradeDistribution} height={250} />
                    <div className="grid grid-cols-4 gap-3">
                        {gradeDistribution.map((g) => (
                            <div key={g.grade} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <span className={`inline-block px-2 py-1 rounded text-sm font-bold ${gradeColors[g.grade]}`}>{g.grade}</span>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{g.count}</p>
                                <p className="text-xs text-slate-500">مقرر</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
}
