import connectDB from '@/lib/mongodb'
import { workspaceModel } from '@/models/Workspace'

export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()
        const { email, userId, name } = body

        if (!email || !userId) {
            return Response.json({ error: 'email and userId are required' }, { status: 400 })
        }

        const workspace = await workspaceModel.findOne({
            members: {
                $elemMatch: {
                    email: { $regex: new RegExp(`^${email}$`, 'i') },
                    status: 'pending'
                }
            }
        })

        if (!workspace) {
            return Response.json({ message: 'No pending invites found' })
        }

        const memberIndex = workspace.members.findIndex(
            (m) => m.email.toLowerCase() === email.toLowerCase() && m.status === 'pending'
        )

        if (memberIndex !== -1) {
            workspace.members[memberIndex].status = 'active'
            workspace.members[memberIndex].userId = userId
            workspace.members[memberIndex].name = name || email.split('@')[0]
            workspace.markModified('members')
            await workspace.save()
        }

        return Response.json({ message: 'Membership activated' })
    } catch (error) {
        console.error('Activate error:', error)
        return Response.json({ error: error.message }, { status: 500 })
    }
}