import connectDB from '@/lib/mongodb'
import { taskModel } from '@/models/Task'

export async function GET(req) {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')
        if (!userId) {
            return Response.json({ error: 'userId is required' }, { status: 400 })
        }
        const tasks = await taskModel.find({ userId }).sort({ createdAt: -1 })
        return Response.json({ tasks })
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()
        const { title, description, status, priority, userId, dueDate } = body
        if (!title || !userId) {
            return Response.json({ error: 'title and userId are required' }, { status: 400 })
        }
        const task = await taskModel.create({
            title,
            description,
            status,
            priority,
            userId,
            dueDate: dueDate ? new Date(dueDate) : null,
        })
        return Response.json({ task }, { status: 201 })
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}