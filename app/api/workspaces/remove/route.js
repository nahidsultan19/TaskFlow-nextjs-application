import connectDB from "@/lib/mongodb";
import { workspaceModel } from "@/models/Workspace";

export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()
        const { workspaceId, memberId, ownerId } = body

        if (!workspaceId || !memberId) {
            return Response.json({ error: 'workspaceId and memberId are required' }, { status: 400 })
        }
        const workspace = await workspaceModel.findById(workspaceId)
        if (!workspace) {
            return Response.json({ error: 'workspace not found' }, { status: 404 })
        }
        // only owner can remove members
        if (workspace.ownerId !== ownerId) {
            return Response.json({ error: 'Only owner can remove members' }, { status: 403 })
        }
        //remove
        workspace.members = workspace.members.filter((m) => m._id.toString() !== memberId)
        await workspace.save()

        return Response.json({ workspace })
    } catch (error) {
        return Response.json({ error: error.message }, { status: 404 })
    }
}