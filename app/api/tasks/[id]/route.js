import connectDB from "@/lib/mongodb"
import { taskModel } from "@/models/Task"


export async function PATCH(req, { params }) {
    try {
        await connectDB();
        const { id } = await params
        const body = await req.json()
        const task = await taskModel.findByIdAndUpdate(id, { $set: body }, { new: true })
        if (!task) {
            return Response.json({ error: 'Task not found' }, { status: 404 })
        }
        return Response.json({ task })
    } catch (error) {
        console.error('Update error')
        return Response.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB()
        const { id } = await params
        const task = await taskModel.findByIdAndDelete(id)
        if (!task) {
            return Response.json({ error: 'Task not found' }, { status: 404 })
        }
        return Response.json({ message: 'Task deleted' })
    } catch (error) {
        console.error("Delete error")
        return Response.json({ error: error.message }, { status: 500 })
    }
}