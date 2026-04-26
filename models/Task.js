import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        default: 'todo',
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    userId: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true })

export const taskModel = mongoose.models.Task || mongoose.model("Task", TaskSchema)