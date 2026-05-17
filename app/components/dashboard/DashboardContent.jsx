"use client"

import { useAuth } from "@/app/hooks/useAuth";
import { useStats } from "@/app/hooks/useStats";
import Link from "next/link";


const statsCard = [
    {
        label: 'Total Tasks',
        key: 'total',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
    },
    {
        label: 'To Do',
        key: 'todo',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
            </svg>
        ),
        color: 'text-gray-400',
        bg: 'bg-gray-500/10',
        border: 'border-gray-500/20',
    },
    {
        label: 'In Progress',
        key: 'inprogress',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
            </svg>
        ),
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
    },
    {
        label: 'Done',
        key: 'done',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
        ),
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
    },
    {
        label: 'Overdue',
        key: 'overdue',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M12 14v4M12 14l2 2" />
            </svg>
        ),
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20'
    }
]

const DashboardComponent = () => {
    const { user } = useAuth()
    const { stats, loading } = useStats(user?.uid)
    return (
        <div className="space-y-7">
            <div>
                <h2 className="text-xl font-semibold text-white">
                    Welcome back, {user?.displayName?.split(' ')[0] || 'there'} 👋
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    Here's what's happening with your tasks today.
                </p>
            </div>

            {/* stats cards  */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCard.map((stat) => (
                    <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                        <p className="text-gray-400 text-xs mb-2">{stat.label}</p>

                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <p className={`text-3xl ml-1 font-semibold ${stat.color}`}>
                            {loading ? (
                                <span className="w-8 h-6 bg-gray-700 rounded animate-pulse block" />
                            ) : (stats[stat.key] ?? 0)}
                        </p>
                    </div>

                ))}
            </div>

            {/* progress bar  */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">Overall Progress</h3>
                    <span className="text-gray-400 text-sm">
                        {stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}% complete
                    </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{
                            width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%`
                        }}
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-gray-500 text-xs">{stats.done} completed</span>
                    <span className="text-gray-500 text-xs">{stats.total} total</span>
                </div>
            </div>
            {/* quick action  */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className="text-white font-medium mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/board" className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover: bg-gray-700 transition">
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="5" height="18" /><rect x="10" y="3" width="5" height="18" />
                                <rect x="17" y="3" width="5" height="18" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Kanban Board</p>
                            <p className="text-gray-400 text-xs">Manage your tasks</p>
                        </div>
                    </Link>
                    <Link
                        href="/tasks"
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                    >
                        <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Tasks List</p>
                            <p className="text-gray-400 text-xs">View all tasks</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;