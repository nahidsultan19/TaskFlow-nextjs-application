import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        ownerId: {
            type: String,
            required: true
        },
        members: [
            {
                userId: { type: String },
                email: { type: String, required: true },
                name: { type: String, default: '' },
                role: {
                    type: String,
                    enum: ['owner', 'member'],
                    default: 'member',
                },
                status: {
                    type: String,
                    enum: ['active', 'pending'],
                    default: 'pending'
                },
            },
        ],
    },
    { timestamps: true }
)

export const workspaceModel = mongoose.models.Workspace || mongoose.model("Workspace", WorkspaceSchema)