"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

const priorityStyles = {
    high: "bg-red-500/10 text-red-400 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    low: "bg-green-500/10 text-green-400 border-green-500/20"
}

const TaskCard = ({ task, onDelete, onEdit }) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1
    }

    return (
        <div ref={setNodeRef} style={style} className='bg-gray-800 border border-gray-700 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-gray-600 transition group'>
            {/* priority */}
            <div className='flex items-center justify-between mb-2'>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>{task.priority}</span>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
                    {/* edit button  */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit(task)
                        }}
                        className="hover:text-blue-400 text-gray-500 transition"
                        title="Edit task"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>

                    {/* delete button  */}
                    <button onClick={(e) => {
                        e.stopPropagation()
                        onDelete(task._id)
                    }}
                        className='opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition'>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* drag handle  */}
            <div {...attributes} {...listeners} className='cursor-grap active:cursor-grabbing'>
                <p className='text-white text-sm font-medium'>{task.title}</p>
                {task.description && (
                    <p className='text-gray-400 text-xs mt-1 line-clamp-2'>{task.description}</p>
                )}

                {/* footer  */}
                <div className='flex items-center justify-between mt-3'>
                    <span className='text-gray-500 text-xs'>{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;