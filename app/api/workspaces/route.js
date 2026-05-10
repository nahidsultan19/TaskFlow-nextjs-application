
import connectDB from "@/lib/mongodb";
import { workspaceModel } from "@/models/Workspace";

export async function GET(req) {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return Response.json({ error: 'userId is required' }, { status: 400 })
        }

        // Find workspace where user is owner or member
        const workspace = await workspaceModel.findOne({
            $or: [
                { ownerId: userId },
                { 'members.userId': userId }
            ]
        })

        return Response.json({ workspace })
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()
        const { name, ownerId, ownerEmail, ownerName } = body

        if (!name || !ownerId) {
            return Response.json({ error: 'name and ownerId are required' }, { status: 400 })
        }

        // Check if user already has a workspace
        const existing = await workspaceModel.findOne({ ownerId })
        if (existing) {
            return Response.json({ workspace: existing })
        }

        const workspace = await workspaceModel.create({
            name,
            ownerId,
            members: [
                {
                    userId: ownerId,
                    email: ownerEmail,
                    name: ownerName,
                    role: 'owner',
                    status: 'active',
                }
            ]
        })

        return Response.json({ workspace }, { status: 201 })
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}