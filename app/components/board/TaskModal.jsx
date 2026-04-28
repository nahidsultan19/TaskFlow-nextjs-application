"use client"

import { useState } from "react";

const TaskModal = ({ onClose, onSubmit }) => {
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const formData = new FormData(e.target)
        await onSubmit({
            title: formData.get('title'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            status: 'todo'
        })

        setSubmitting(false)
        onClose()
    }


    return (
        <div className="fixed insert-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 boerder border-gray-800 rounded-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white font-semibold text-lg">New Task</h2>
                    <button onClick={() => onClose()} className="text-gray-400 hover:text-white transition">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1.5">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Task title"
                            required
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Task description (optional)"
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-400 block mb-1.5">
                            Priority
                        </label>
                        <select
                            name="priority"
                            defaultValue="medium"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

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
                            {submitting ? 'Creating...' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;