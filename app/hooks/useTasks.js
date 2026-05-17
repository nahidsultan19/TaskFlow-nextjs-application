import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export function useTasks(userId) {
    const [tasks, setTasks] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        fetchTasks()
    }, [userId])

    const fetchTasks = async () => {
        try {
            const res = await fetch(`/api/tasks?userId=${userId}`)
            const data = await res.json()
            setTasks(data.tasks || [])
        } catch (error) {
            setLoading(false)
        }
    }

    const createTask = async (taskData) => {
        try {
            const res = await fetch("/api/tasks", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...taskData, userId }),
            })
            const data = await res.json()
            setTasks((prev) => [data.task, ...prev])
            toast.success("Task Created!")
            return data.task
        } catch (error) {
            toast.error("Failed to create task")
            console.error('Failed to create task: ', error)
        }
    }


    const updateTask = async (id, updates) => {
        try {
            //optimistic update
            setTasks((prev) => prev.map((t) => t._id === id ? { ...t, ...updates } : t))
            await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            })
            toast.success("Task Updated!")
        } catch (error) {
            toast.error("Failed to update task")
            console.error('Failed to update task:', error)
            fetchTasks()
        }
    }

    const deleteTask = async (id) => {
        try {
            setTasks((prev) => prev.filter((t) => t._id !== id))
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
            toast.success("Task Deleted!")
        } catch (error) {
            toast.error('Failed to delete task')
            console.error('Failed to delete task:', error);
            fetchTasks()
        }
    }



    return { tasks, loading, createTask, deleteTask, updateTask }
}

