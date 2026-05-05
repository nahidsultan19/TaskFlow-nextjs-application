"use client"

import { useAuth } from "@/app/hooks/useAuth";
import { useTaskList } from "@/app/hooks/useTaskList";


const statusStyles = {
    todo: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    inprogress: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    done: 'bg-green-500/10 text-green-400 border-green-500/20',
}

const statusLabels = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done',
}

const priorityStyles = {
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    low: 'bg-green-500/10 text-green-400 border-green-500/20',
}


const TaskList = () => {
    const { user } = useAuth()
    const { tasks = [], loading, filter, setFilter, deleteTask } = useTaskList(user?.uid)

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animation-spin"></div>
        </div>
    )

    return (
        <div className="space-y-6">
            {/* header  */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text white">
                        Tasks
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">{tasks.length} tasks found</p>
                </div>
            </div>
            {/* filters  */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* status filter  */}
                <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg p-1">
                    {['all', 'todo', 'inprogress', 'done'].map((status) => (
                        <button key={status} onClick={() => setFilter((prev) => ({ ...prev, status }))} className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${filter.status === status ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>{status === 'all' ? 'All Status' : statusLabels[status]}</button>
                    ))}
                </div>

                {/* priority filter  */}
                <div className="flex-items-center gap-2 bg-gray-900 border-gray-800 rounded-lg p-1">
                    {['all', 'high', 'medium', 'low'].map((priority) => (
                        <button key={priority} onClick={() => setFilter((prev) => ({ ...prev, priority }))} className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${filter.priority === 'priority' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                            {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table  */}

            {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 bg-gray-900 border border-gray-800 rounded-xl">
                    <p className="text-gray-400 text-sm">No Tasks found</p>
                    <p className="text-gray-600 text-sm mt-1">Try chnaging your filters</p>
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-800">
                        <p className="col-span-5 text-xs font-medium text-gray-400">Title</p>
                        <p className="col-span-2 text-xs font-medium text-gray-400">Status</p>
                        <p className="col-span-2 text-xs font-medium text-gray-400">Priority</p>
                        <p className="col-span-2 text-xs font-medium text-gray-400">Created</p>
                        <p className="col-span-1 text-xs font-medium text-gray-400"></p>
                    </div>

                    {/* Table rows  */}

                    <div className="divide-y divide-gray-800">
                        {tasks.map((task) => (
                            <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-800/50 transition group">
                                {/* title and description  */}
                                <div className="col-span-5">
                                    <p className="text-white text-sm font-medium">{task.title}</p>
                                    {task.description && (
                                        <p className="text-gray-500 text-sm mt-0 5 truncate">{task.description}</p>
                                    )}
                                </div>

                                {/* status  */}
                                <div className="col-span-2 flex items-center">
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusStyles[task.status]}`}>
                                        {statusLabels[task.status]}
                                    </span>
                                </div>
                                {/* priority  */}
                                <div className="col-span-2 flex items-center">
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>
                                        {task.priority}
                                    </span>
                                </div>

                                {/* created date  */}

                                <div className="col-span-2 flex items-center">
                                    <span className="text-gray-500 text-xs">
                                        {new Date(task.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* delete button  */}
                                <div className="col-span-2 flex items-center justify-end">
                                    <button onClick={() => deleteTask(task._id)} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;