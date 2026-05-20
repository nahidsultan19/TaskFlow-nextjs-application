'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getDueDateInfo } from '@/utils/dueDate'
import Swal from 'sweetalert2'

const priorityStyles = {
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    low: 'bg-green-500/10 text-green-400 border-green-500/20',
}

const TaskCard = ({ task, onDelete, onEdit }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task._id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }

    const dueDateInfo = getDueDateInfo(task.dueDate, task.status)

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition group"
        >
            {/* Priority and buttons */}
            <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>
                    {task.priority}
                </span>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit(task)
                        }}
                        className="text-gray-500 hover:text-indigo-400 transition"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>
                    <button
                        onClick={async (e) => {
                            e.stopPropagation()
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
                                onDelete(task._id)  // onDelete is deleteTask from useTasks
                            }
                        }}
                        className="text-gray-500 hover:text-red-400 transition"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Drag handle */}
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing"
            >
                <p className="text-white text-sm font-medium">{task.title}</p>
                {task.description && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{task.description}</p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-3">
                    <span className="text-gray-500 text-xs">
                        {new Date(task.createdAt).toLocaleDateString()}
                    </span>

                    {/* Due date */}
                    {dueDateInfo && (
                        <span className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded-full ${dueDateInfo.isOverdue
                            ? 'bg-red-500/10 text-red-400'
                            : dueDateInfo.isToday
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-gray-700 text-gray-400'
                            }`}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {dueDateInfo.isOverdue
                                ? `Overdue · ${dueDateInfo.formatted}`
                                : dueDateInfo.isToday
                                    ? 'Due today'
                                    : dueDateInfo.formatted
                            }
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskCard;