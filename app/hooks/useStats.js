import { useCallback, useContext, useEffect, useState } from "react";
import { StatesContext } from "../context";

export function useStats(userId) {
    const [stats, setStats] = useState({ total: 0, todo: 0, inprogress: 0, done: 0, overdue: 0 })
    const [loading, setLoading] = useState(true)
    const { refreshKey } = useContext(StatesContext)

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
    }, [userId, refreshKey])

    useEffect(() => {
        if (!userId) return
        fetchStats()
    }, [fetchStats])



    return { stats, loading }
}