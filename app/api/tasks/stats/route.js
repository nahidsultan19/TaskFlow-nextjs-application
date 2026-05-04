import connectDB from "@/lib/mongodb";
import { taskModel } from "@/models/Task";

export async function GET(req) {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')
        if (!userId) {
            return Response.json({ error: 'userId is required' }, { status: 400 })
        }

        const [total, todo, inprogress, done] = await Promise.all([
            taskModel.countDocuments({ userId }),
            taskModel.countDocuments({ userId, status: 'todo' }),
            taskModel.countDocuments({ userId, status: 'inprogress' }),
            taskModel.countDocuments({ userId, status: 'done' }),
        ])

        return Response.json({ total, todo, inprogress, done })

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}