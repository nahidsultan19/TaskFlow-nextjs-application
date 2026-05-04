import { useEffect, useState } from "react";

export function useStats(userId) {
    const [stats, setStats] = useState({ totoal: 0, todo: 0, inprogress: 0, done: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        fetchStats()
    }, [userId])

    const fetchStats = async () => {
        try {
            const res = await fetch(`/api/tasks/stats?userId=${userId}`)
            const data = await res.json()
            setStats(data)
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        } finally {
            setLoading(false)
        }
    }

    return { stats, loading }
}