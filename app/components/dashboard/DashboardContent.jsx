"use client"

import { useAuth } from "@/app/hooks/useAuth";


const stats = [
    { label: 'Total Tasks', value: '24', color: 'bg-indigo-500/10 text-indigo-400' },
    { label: 'In Progress', value: '8', color: 'bg-amber-500/10 text-amber-400' },
    { label: 'Completed', value: '12', color: 'bg-green-500/10 text-green-400' },
    { label: 'Overdue', value: '4', color: 'bg-red-500/10 text-red-400' },
]

const DashboardComponent = () => {
    const { user } = useAuth()
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-white">
                    Welcome back, {user?.displayName?.split(' ')[0] || 'there'} 👋
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    Here's what's happening with your tasks today.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                        <p className="text-gray-400 text-xs mb-2">{stat.label}</p>
                        <p className={`text-2xl font-semibold ${stat.color.split(' ')[1]}`}>
                            {stat.value}
                        </p>
                        <div className={`mt-2 inline-block px-2 py-0.5 rounded text-xs ${stat.color}`}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h3 className="text-white font-medium mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {['Design login page', 'Set up MongoDB', 'Create auth context'].map((task, i) => (
                        <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                            <p className="text-gray-300 text-sm">{task}</p>
                            <span className="ml-auto text-xs text-gray-500">Today</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;