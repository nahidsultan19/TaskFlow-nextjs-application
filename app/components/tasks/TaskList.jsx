"use client"

import { useAuth } from "@/app/hooks/useAuth";
import { useTaskList } from "@/app/hooks/useTaskList";
import EmptyState from "../ui/EmptyState";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import TaskModal from "../board/TaskModal";
import { useTasks } from "@/app/hooks/useTasks";
import { useTaskActions } from "@/app/hooks/useTaskActions";
import { TasksContext } from "@/app/context";


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
    const { filter, setFilter, deleteTask, search, setSearch, createTask } = useTaskList(user?.uid)
    // const { createTask } = useTasks(user?.uid)
    const { tasks, loading } = useContext(TasksContext)
    const [showModal, setShowModal] = useState(false)

    const handleCreateTask = async (data) => {
        await createTask({ ...data, status: 'todo' })
        setShowModal(false)
    }



    const handleDelete = async (task) => {
        const result = await Swal.fire({
            title: 'Delete Task?',
            text: `Are you sure you want to delete "${task.title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel',
            background: '#111827',
            color: '#fff',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#374151',
        })
        if (result.isConfirmed) {
            deleteTask(task._id) // ← deleteTask from useTaskList
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div className="space-y-6">
            {/* header  */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Tasks</h2>
                    <p className="text-gray-400 text-sm mt-1">{tasks.length} tasks found</p>
                </div>

            </div>
            {/* search bar  */}
            <div className="relative">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 5 rounded-lg bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                {/* // clear search button  */}
                {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>}
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
                <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg p-1">
                    {['all', 'high', 'medium', 'low'].map((priority) => (
                        <button key={priority} onClick={() => setFilter((prev) => ({ ...prev, priority }))} className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${filter.priority === priority ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                            {priority === 'all' ? 'All Priority' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table  */}
            {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-900 border border-gray-800 rounded-xl">
                    {search ? (
                        <EmptyState
                            type="search"
                            search={search}
                            onClearSearch={() => setSearch('')}
                        />

                    ) : (
                        <EmptyState type="tasks" onActionModal={() => setShowModal(true)} />
                    )}
                </div>
            ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-800">
                        <p className="col-span-4 text-xs font-medium text-gray-400">Title</p>
                        <p className="col-span-2 text-xs font-medium text-gray-400">Status</p>
                        <p className="col-span-2 text-xs font-medium text-gray-400">Priority</p>
                        <p className="col-span-2 text-xs font-medium text-gray-400">Due Date</p>
                        <p className="col-span-1 text-xs font-medium text-gray-400">Created</p>
                        <p className="col-span-1 text-xs font-medium text-gray-400"></p>
                    </div>

                    {/* Table rows  */}

                    <div className="divide-y divide-gray-800">
                        {tasks.map((task) => (
                            <div key={task._id} className="px-6 py-4 hover:bg-gray-800/50 transition group border-b border-gray-800 last:border-0">

                                {/* Mobile layout */}
                                <div className="md:hidden">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium">{task.title}</p>
                                            {task.description && (
                                                <p className="text-gray-500 text-xs mt-0.5 truncate">{task.description}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(task)}
                                            className="text-gray-500 hover:text-red-400 transition flex-shrink-0"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                <path d="M10 11v6M14 11v6" />
                                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusStyles[task.status]}`}>
                                            {statusLabels[task.status]}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>
                                            {task.priority}
                                        </span>
                                        {/* Due date mobile */}
                                        {task.dueDate && (
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${new Date(task.dueDate) < new Date() && task.status !== 'done'
                                                ? 'bg-red-500/10 text-red-400'
                                                : 'bg-gray-700 text-gray-400'
                                                }`}>
                                                📅 {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Desktop layout */}
                                <div className="hidden md:grid grid-cols-12 gap-4">
                                    {/* Title */}
                                    <div className="col-span-4">
                                        <p className="text-white text-sm font-medium">{task.title}</p>
                                        {task.description && (
                                            <p className="text-gray-500 text-xs mt-0.5 truncate">{task.description}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2 flex items-center">
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusStyles[task.status]}`}>
                                            {statusLabels[task.status]}
                                        </span>
                                    </div>

                                    {/* Priority */}
                                    <div className="col-span-2 flex items-center">
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>
                                            {task.priority}
                                        </span>
                                    </div>

                                    {/* Due Date */}
                                    <div className="col-span-2 flex items-center">
                                        {task.dueDate ? (
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${new Date(task.dueDate) < new Date() && task.status !== 'done'
                                                ? 'bg-red-500/10 text-red-400'
                                                : 'bg-gray-700 text-gray-400'
                                                }`}>
                                                {new Date(task.dueDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        ) : (
                                            <span className="text-gray-600 text-xs">No due date</span>
                                        )}
                                    </div>

                                    {/* Created */}
                                    <div className="col-span-1 flex items-center">
                                        <span className="text-gray-500 text-xs">
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Delete */}
                                    <div className="col-span-1 flex items-center justify-end">
                                        <button
                                            onClick={() => handleDelete(task)}
                                            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                <path d="M10 11v6M14 11v6" />
                                                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showModal && (
                <TaskModal onClose={() => setShowModal(false)} onSubmit={handleCreateTask} task={null} />
            )}
        </div>
    );
};

export default TaskList;