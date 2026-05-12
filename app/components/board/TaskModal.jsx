'use client'

import { useState, useEffect } from 'react'

const TaskModal = ({ onClose, onSubmit, task = null }) => {
    const [submitting, setSubmitting] = useState(false)
    const [title, setTitle] = useState(task?.title || '')
    const [description, setDescription] = useState(task?.description || '')
    const [priority, setPriority] = useState(task?.priority || 'medium')
    const [status, setStatus] = useState(task?.status || 'todo')
    const [dueDate, setDueDate] = useState(
        task?.dueDate
            ? new Date(task.dueDate).toISOString().split('T')[0]
            : ''
    )

    const isEditing = !!task

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        await onSubmit({
            title,
            description,
            priority,
            status,
            dueDate: dueDate || null,
        })

        setSubmitting(false)
        onClose()
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white font-semibold text-lg">
                        {isEditing ? 'Edit Task' : 'New Task'}
                    </h2>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            onClose()
                        }}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1.5">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task title"
                            required
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1.5">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task description (optional)"
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />
                    </div>

                    {/* Priority and Due Date */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-400 block mb-1.5">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-400 block mb-1.5">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Status — only when editing */}
                    {isEditing && (
                        <div>
                            <label className="text-xs font-medium text-gray-400 block mb-1.5">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="todo">To Do</option>
                                <option value="inprogress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                onClose()
                            }}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition disabled:opacity-50"
                        >
                            {submitting
                                ? isEditing ? 'Saving...' : 'Creating...'
                                : isEditing ? 'Save Changes' : 'Create Task'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal;