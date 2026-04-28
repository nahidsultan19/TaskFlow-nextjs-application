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

    return { tasks, loading }
}

