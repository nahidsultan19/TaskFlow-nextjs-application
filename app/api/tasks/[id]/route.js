import connectDB from "@/lib/mongodb"
import { taskModel } from "@/models/Task"

export async function DELETE(req, { params }) {
    try {
        await connectDB()
        const { id } = await params
        console.log('Deleting task with id', id)
        const task = await taskModel.findByIdAndDelete(id)
        console.log('Delete task: ', task)
        if (!task) {
            return Response.json({ error: 'Task not found' }, { status: 404 })
        }
        return Response.json({ message: 'Task deleted' })
    } catch (error) {
        console.error("Delete error")
        return Response.json({ error: error.message }, { status: 500 })
    }
}