import { useCallback, useEffect, useState } from "react";

export function useStats(userId) {
    const [stats, setStats] = useState({ total: 0, todo: 0, inprogress: 0, done: 0, overdue: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        fetchStats()
    }, [userId])

    const fetchStats = useCallback(async () => {
        if (!userId) return
        try {
            const res = await fetch(`/api/tasks/stats?userId=${userId}`)
            const data = await res.json()
            setStats(data)
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        } finally {
            setLoading(false)
        }
    }, [userId])

    return { stats, loading }
}