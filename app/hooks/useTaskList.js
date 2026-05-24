import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StatesContext, TasksContext } from "../context";
import { useTaskActions } from "./useTaskActions";

export function useTaskList(userId) {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState({ status: 'all', priority: 'all', dueDate: 'all' })
    const { refreshStats } = useContext(StatesContext)
    const { tasks = [], loading } = useContext(TasksContext)
    const { createTask, updateTask, deleteTask } = useTaskActions(userId)


    // const fetchTasks = useCallback(async () => {
    //     if (!userId) return

    //     try {
    //         setLoading(true)
    //         const res = await fetch(`/api/tasks?userId=${userId}`)
    //         const data = await res.json()
    //         setTasks(Array.isArray(data.tasks) ? data.tasks : [])
    //     } catch (error) {
    //         console.error('Fialed to fetch tasks: ', error)
    //         setTasks([])
    //     } finally {
    //         setLoading(false)
    //     }
    // }, [userId])


    // useEffect(() => {
    //     fetchTasks()
    // }, [fetchTasks])

    // const createTask = async (taskData) => {
    //     try {
    //         const res = await fetch('/api/tasks', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ ...taskData, userId }),
    //         })
    //         const data = await res.json()
    //         if (data.task) {
    //             setTasks((prev) => [...prev, data.task])
    //             toast.success('Task created!')
    //             refreshStats()
    //         }
    //         return data.task
    //     } catch (error) {
    //         toast.error('Failed to create task')
    //         console.error('Failed to create task:', error)
    //     }
    // }

    // const deleteTask = async (id) => {
    //     try {
    //         setTasks((prev) => prev.filter((t) => t._id !== id))
    //         await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    //         toast.success("Task Deleted!")
    //         refreshStats()
    //     } catch (error) {
    //         console.error('Failed to delete task: ', error)
    //         fetchTasks()
    //     }
    // }

    // filter tasks 
    const filteredTasks = tasks?.filter((task) => {
        const statusMatch = filter.status === 'all' || task.status === filter.status
        const priorityMatch = filter.priority === 'all' || task.priority === filter.priority

        // search filter 
        const searchMatch = search === '' || task.title.toLowerCase().includes(search.toLocaleLowerCase()) || task.description?.toLocaleLowerCase().includes(search.toLocaleLowerCase())

        // due date filter
        let dueDateMatch = true
        if (filter.dueDate !== 'all') {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const weekEnd = new Date(today)
            weekEnd.setDate(weekEnd.getDate() + 7)

            if (filter.dueDate === 'overdue') {
                dueDateMatch = task.dueDate && new Date(task.dueDate) < today && task.status !== 'done'
            } else if (filter.dueDate === 'today') {
                const due = new Date(task.dueDate)
                due.setHours(0, 0, 0, 0)
                dueDateMatch = task.dueDate && due.getTime() === today.getTime()
            } else if (filter.dueDate === 'week') {
                dueDateMatch = task.dueDate && new Date(task.dueDate) >= today && new Date(task.dueDate) <= weekEnd
            } else if (filter.dueDate === 'none') {
                dueDateMatch = !task.dueDate
            }
        }


        return statusMatch && priorityMatch && searchMatch && dueDateMatch
    })


    return { tasks: filteredTasks, search, setSearch, loading, filter, setFilter, deleteTask, createTask, updateTask }
}