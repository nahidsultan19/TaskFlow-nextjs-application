export const getDueDateInfo = (dueDate, status) => {
    if (!dueDate) return null

    const due = new Date(dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    due.setHours(0, 0, 0, 0)

    const isOverdue = due < today && status !== 'done'
    const isToday = due.getTime() === today.getTime()

    return {
        formatted: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isOverdue,
        isToday,
    }
}