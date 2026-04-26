import connectDB from '@/lib/mongodb'

export async function GET() {
    try {
        await connectDB()
        return Response.json({ status: 'MongoDB connected successfully!' })
    } catch (error) {
        return Response.json({
            status: 'Connection failed',
            error: error.message,
            code: error.code,
            uri: process.env.MONGODB_URI ? 'URI exists' : 'URI is missing'
        }, { status: 500 })
    }
}


