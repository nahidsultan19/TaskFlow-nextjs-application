import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StatesContext, TasksContext } from "../context";
import { useTaskActions } from "./useTaskActions";


export function useTasks(userId) {
    // const [tasks, setTasks] = useState()
    // const [loading, setLoading] = useState(true)
    // const { refreshStats } = useContext(StatesContext)
    const { tasks, loading } = useContext(TasksContext)
    const { createTask, updateTask, deleteTask } = useTaskActions(userId)

    // useEffect(() => {
    //     if (!userId) return
    //     fetchTasks()
    // }, [userId])

    // const fetchTasks = async () => {
    //     try {
    //         const res = await fetch(`/api/tasks?userId=${userId}`)
    //         const data = await res.json()
    //         setTasks(data.tasks || [])
    //     } catch (error) {
    //         setLoading(false)
    //     }
    // }

    // const createTask = async (taskData) => {
    //     try {
    //         const res = await fetch("/api/tasks", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ ...taskData, userId }),
    //         })
    //         const data = await res.json()
    //         setTasks((prev) => [...prev, data.task])
    //         toast.success("Task Created!")
    //         refreshStats()
    //         return data.task
    //     } catch (error) {
    //         toast.error("Failed to create task")
    //         console.error('Failed to create task: ', error)
    //     }
    // }


    // const updateTask = async (id, updates) => {
    //     try {
    //         //optimistic update
    //         setTasks((prev) => prev.map((t) => t._id === id ? { ...t, ...updates } : t))
    //         await fetch(`/api/tasks/${id}`, {
    //             method: 'PATCH',
    //             header: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(updates)
    //         })
    //         toast.success("Task Updated!")
    //         refreshStats()
    //     } catch (error) {
    //         toast.error("Failed to update task")
    //         console.error('Failed to update task:', error)
    //         fetchTasks()
    //     }
    // }

    // const deleteTask = async (id) => {
    //     try {
    //         setTasks((prev) => prev.filter((t) => t._id !== id))
    //         await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    //         toast.success("Task Deleted!")
    //         refreshStats()
    //     } catch (error) {
    //         toast.error('Failed to delete task')
    //         console.error('Failed to delete task:', error);
    //         fetchTasks()
    //     }
    // }



    return { tasks, loading, createTask, deleteTask, updateTask }
}

