import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useTaskList(userId) {
    const [tasks, setTasks] = useState()
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState({ status: 'all', priority: 'all' })

    const fetchTasks = useCallback(async () => {
        if (!userId) return

        try {
            setLoading(true)
            const res = await fetch(`/api/tasks?userId=${userId}`)
            const data = await res.json()
            setTasks(Array.isArray(data.tasks) ? data.tasks : [])
        } catch (error) {
            console.error('Fialed to fetch tasks: ', error)
            setTasks([])
        } finally {
            setLoading(false)
        }
    }, [userId])


    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])


    const deleteTask = async (id) => {
        try {
            setTasks((prev) => prev.filter((t) => t._id !== id))
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
            toast.success("Task Deleted!")
        } catch (error) {
            console.error('Failed to delete task: ', error)
            fetchTasks()
        }
    }


    const filteredTasks = Array.isArray(tasks) ? tasks.filter((task) => {
        const statusMatch = filter.status === 'all' || task.status === filter.status
        const priorityMatch = filter.priority === 'all' || task.priority === filter.priority
        return statusMatch && priorityMatch
    }) : []


    return { tasks: filteredTasks, loading, filter, setFilter, deleteTask }
}