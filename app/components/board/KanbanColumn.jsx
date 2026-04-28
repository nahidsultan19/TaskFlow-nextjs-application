"use client";

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';
import TaskCard from './TaskCard';

const columnStyles = {
    todo: {
        label: 'To Do',
        accent: 'bg-gray-500',
        count: 'bg-gray-700 text-gray-300',
    },
    inprogress: {
        label: 'In Progress',
        accent: 'bg-amber-500',
        count: 'bg-amber-500/10 text-amber-400',
    },
    done: {
        label: 'Done',
        accent: 'bg-green-500',
        count: 'bg-green-500/10 text-green-400',
    },
}

const KanbanColumn = ({ id, tasks = [], OnDelete }) => {
    const { setNodeRef, isOver } = useDroppable({ id })
    const style = columnStyles[id]

    return (
        <div ref={setNodeRef} className={`flex flex-col bg-gray-900 rounded-2xl border transition-all ${isOver ? 'border-indigo-500' : 'border-gray-800'}`}>
            {/* column header  */}
            <div className='flex items-center gap-3 p-4 border-b border-gray-800'>
                <div className={`w-2 h-2 rounded-full ${style.accent}`} />
                <h3 className='text-white font-medium text-sm'>{style.label}</h3>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${style.count}`}>
                    {tasks.length}
                </span>
            </div>
            {/* tasks  */}
            <div className='flex-1 p-3 space-y-3 min-h-32'>
                <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard key={task._id} task={task} onDelete={onDelete} />
                    ))}
                </SortableContext>
                {tasks.length === 0 && (
                    <div className='flex items-center justify-center h-24 text-gray-600 text-sm'>No Task</div>
                )}
            </div>
        </div>
    );
};

export default KanbanColumn;