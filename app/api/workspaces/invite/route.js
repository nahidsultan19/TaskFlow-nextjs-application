import connectDB from "@/lib/mongodb";
import { workspaceModel } from "@/models/Workspace";


export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()
        const { workspaceId, email, ownerId } = body

        if (!workspaceId || !email) {
            return Response.json({ error: 'workspaceId and email are required' }, { status: 400 })
        }

        const workspace = await workspaceModel.findById(workspaceId)
        if (!workspace) {
            return Response.json({ error: 'Workspace not found' }, { status: 404 })
        }
        // Only owner can invite
        if (workspace.ownerId !== ownerId) {
            return Response.json({ error: 'Only owner can invite members' }, { status: 403 })
        }
        // if already a member
        const alreadyMember = workspace.members.some((m) => m.email === email)
        if (alreadyMember) {
            return Response.json({ error: 'User is already a member' }, { status: 400 })
        }
        //add member as pending
        workspace.members.push({ email, role: 'member', status: 'pending' })
        await workspace.save()
        return Response.json({ workspace })
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}