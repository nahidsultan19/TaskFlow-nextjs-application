"use client";

import { useAuth } from '@/app/hooks/useAuth';
import { useTasks } from '@/app/hooks/useTasks';
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';


const COLUMNS = ['todo', 'inprogress', 'done']

const KanbanBoard = () => {
    const { user } = useAuth()
    const { tasks = [], loading, createTask, deleteTask, updateTask } = useTasks(user?.uid)
    const [activeTask, setActiveTask] = useState(null)
    const [showModal, setShowModal] = useState(false)


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const getTasksByStatus = status => {
        const filtered = tasks.filter((t) => t.status === status)
        console.log(`${status}: `, filtered);
        return filtered;
    }

    const handleDragStart = event => {
        const task = tasks.find((t) => t._id === event.active.id)
        setActiveTask(task);
    }

    const handleDragEnd = event => {
        const { active, over } = event;
        setActiveTask(null)

        if (!over) return

        const activeTask = tasks.find((t) => t._id === active.id)
        if (!activeTask) return;

        // check if dropped on a column
        let newStatus = null
        if (COLUMNS.includes(over.id)) {
            newStatus = over.id
        } else {
            const overTask = tasks.find((t) => t._id === over.id)
            if (overTask) {
                newStatus = overTask.status
            }
        }
        console.log('Active task:', activeTask.title)
        console.log('New status:', newStatus)
        console.log('Old status:', activeTask.status)


        if (newStatus && newStatus !== activeTask.status) {
            updateTask(active.id, { status: newStatus })
        }
    }

    if (loading) return (
        <div className='h-full flex flex-col'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h2 className='text-white font-semibold text-xl'>Kanban Booard</h2>
                    <p className='text-gray-400 text-sm mt-0.5'>{tasks.length} totoal tasks</p>
                </div>
                <button onClick={() => setShowModal(true)} className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-0.5 rounded-lg text-sm font-medium transition'>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Task
                </button>
            </div>
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div>
                    {COLUMNS.map((col) => (
                        <KanbanColumn key={col} id={col} tasks={getTasksByStatus(col)} onDelete={deleteTask} />
                    ))}
                </div>

                {/* drag overly */}
                <DragOverlay>
                    {activeTask && (
                        <TaskCard task={activeTask} onDelete={() => { }} />
                    )}
                </DragOverlay>
            </DndContext>

            {/* modal  */}
            {showModal && (
                <TaskModal onClose={() => setShowModal(!showModal)} onSubmit={createTask} />
            )}
        </div>
    );
};

export default KanbanBoard;