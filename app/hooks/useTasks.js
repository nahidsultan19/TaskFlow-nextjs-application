import { useEffect, useState } from "react";


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
            return data.task
        } catch (error) {
            console.log('Failed to create task: ', error)
        }
    }

    return { tasks, loading, createTask }
}

