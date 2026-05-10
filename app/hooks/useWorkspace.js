import { useCallback, useEffect, useState } from "react";

export function useWorkspace(userId, userEmail, userName) {
    const [workspace, setWorkspace] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchWorkspace = useCallback(async () => {
        if (!userId) return

        try {
            setLoading(true)
            const res = await fetch(`/api/workspaces?userId=${userId}`)
            const data = await res.json()

            if (data.workspace) {
                setWorkspace(data.workspace)
            } else {
                await createWorkspace()
            }
        } catch (error) {
            console.error('Failed to fetch workspace: ', error)
        } finally {
            setLoading(false)
        }
    }, [userId])

    // create workspace
    const createWorkspace = async () => {
        try {
            const res = await fetch('/api/workspaces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${userName || 'My'}'s Workspace`,
                    ownerId: userId,
                    ownerEmail: userEmail,
                    ownerName: userName,
                }),
            })
            const data = await res.json()
            setWorkspace(data.workspace)
        } catch (error) {
            console.error('Failed to create workspace:', error)
        }
    }

    // invite member 
    const inviteMember = async (email) => {
        try {
            const res = await fetch('/api/workspaces/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    workspaceId: workspace._id,
                    email,
                    ownerId: userId,
                }),

            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setWorkspace(data.workspace)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const removeMember = async (memberId) => {
        try {
            const res = await fetch('/api/workspaces/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    workspaceId: workspace._id,
                    memberId,
                    ownerId: userId
                })
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setWorkspace(data.workspace)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    useEffect(() => {
        fetchWorkspace()
    }, [fetchWorkspace])

    return { workspace, loading, inviteMember, removeMember }
}