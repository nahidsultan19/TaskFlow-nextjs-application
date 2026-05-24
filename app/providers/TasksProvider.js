'use client'

import { useCallback, useEffect, useState } from 'react';
import { TasksContext } from '../context';

const TasksProvider = ({ children, userId }) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

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

    return (
        <TasksContext.Provider value={{ tasks, setTasks, loading, fetchTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;