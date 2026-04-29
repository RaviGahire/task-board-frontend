import React, { useState, useEffect } from 'react';
import { Footer } from '../../components/layout/Footer';
import { useDashboard } from '../../context/DashboardContext';
import { IconClock, IconAlertCircle } from '@tabler/icons-react';

export const Dashboard = () => {
    const { stats, loading } = useDashboard();
    console.log(stats)


    const StatCard = ({ title, value, labelColor }) => (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                {title}
            </p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {loading ? '...' : value}
                </h3>
                <span className={`text-xs font-bold ${labelColor}`}>Units</span>
            </div>
        </div>
    );

    //Up comming tasks
    const UpcomingTask = ({ title, description, priority, status, dueDate, loading }) => {
        const priorityStyles = {
            High: "text-red-600 bg-red-50 dark:bg-red-900/20",
            Medium: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
            Low: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
        };

        if (loading) {
            return (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
            );
        }

        return (
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                {/* Header with Title and Priority */}
                <div className="flex justify-between items-start mb-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {title || "Task Overview"}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase ${priorityStyles[priority] || priorityStyles.Medium}`}>
                        {priority}
                    </span>
                </div>

                {/* Main Body */}
                <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-1">
                        {description}
                    </h3>

                    <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                        {/* Due Date */}
                        <div className="flex items-center gap-1.5">
                            <IconClock size={14} />
                            <span className="text-xs font-medium">
                                {new Date(dueDate).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <span className="text-xs font-medium">{status}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const completionRate = stats?.data?.totalProjects > 0
        ? Math.round((stats?.data?.tasksByStatus?.Done /stats?.data?.tasksByStatus?.Todo) * 100)
        : 0;

    return (
        <>
            <div className="max-w-7xl mx-auto space-y-10 min-h-screen">
                <div className="border-l-4 border-blue-600 pl-6 py-4">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Real-time project metrics and statistics.
                    </p>
                </div>

                {/* Numerical Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
                    <StatCard
                        title="Total Projects"
                        value={stats?.data?.totalProjects}
                        labelColor="text-blue-600"
                    />
                    <StatCard
                        title="In Progress tasks"
                        value={stats?.data?.tasksByStatus?.InProgress}
                        labelColor="text-purple-600"
                    />
                    <StatCard
                        title="Pending tasks"
                        value={stats?.data?.tasksByStatus?.Review}
                        labelColor="text-amber-600"
                    />
                    <StatCard
                        title="Completed tasks"
                        value={stats?.data?.tasksByStatus?.Done}
                        labelColor="text-emerald-600"
                    />

                    <StatCard
                        title="overdueCount"
                        value={stats?.data?.overdueCount}
                        labelColor="text-emerald-600"
                    />
                </div>
                <div>
                    <div className="border-l-4 border-blue-600 pl-6 py-4">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                            Up Coming Task
                        </h2>

                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 cursor-pointer">
                    {stats?.data?.upcomingTasks?.map((task) => (
                        <UpcomingTask
                            key={task._id}
                            title={task.title}
                            description={task.description}
                            priority={task.priority}
                            status={task.status}
                            dueDate={task.dueDate}
                            loading={loading}
                        />
                    ))}
                </div>
                {/* Summary Section */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Completion</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Overall performance across all active modules.</p>
                        </div>
                        <div className="text-right">
                            <span className="text-5xl font-black text-blue-600 dark:text-blue-400">
                                {completionRate}%
                            </span>
                        </div>
                    </div>

                    {/* Simple Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                        <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-in-out"
                            style={{ width: `${completionRate}%` }}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};