"use client";

import React from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';

// GPA Trend Chart
interface GPADataPoint {
    semester: string;
    gpa: number;
}

interface GPATrendChartProps {
    data: GPADataPoint[];
    height?: number;
}

export function GPATrendChart({ data, height = 200 }: GPATrendChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                    dataKey="semester"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                    domain={[0, 4]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    ticks={[0, 1, 2, 3, 4]}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                    }}
                    formatter={(value: number) => [value.toFixed(2), 'المعدل']}
                />
                <Area
                    type="monotone"
                    dataKey="gpa"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#gpaGradient)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

// Grades Distribution Pie Chart
interface GradeDistribution {
    grade: string;
    count: number;
    color: string;
}

interface GradesChartProps {
    data: GradeDistribution[];
    height?: number;
}

export function GradesDistributionChart({ data, height = 200 }: GradesChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="grade"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                    }}
                    formatter={(value: number, name: string) => [value, name]}
                />
                <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px' }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

// Progress Bar Chart
interface ProgressData {
    label: string;
    value: number;
    total: number;
}

interface ProgressBarChartProps {
    data: ProgressData[];
    height?: number;
}

export function ProgressBarChart({ data, height = 200 }: ProgressBarChartProps) {
    const chartData = data.map(d => ({
        label: d.label,
        completed: d.value,
        remaining: d.total - d.value,
    }));

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis
                    type="category"
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    width={80}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                    }}
                />
                <Bar dataKey="completed" stackId="a" fill="#22c55e" radius={[0, 4, 4, 0]} />
                <Bar dataKey="remaining" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

// Semester Comparison Bar Chart
interface SemesterData {
    semester: string;
    hours: number;
    points: number;
}

interface SemesterComparisonChartProps {
    data: SemesterData[];
    height?: number;
}

export function SemesterComparisonChart({ data, height = 250 }: SemesterComparisonChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                    dataKey="semester"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                    }}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="hours" name="الساعات" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="points" name="النقاط" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
