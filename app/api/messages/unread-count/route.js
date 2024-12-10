import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import Message from "@/models/Message";
import { stringify } from "postcss";


//GET /api/messages/unread-count
export const GET = async (request) => {
    try {
        await connectDB()
        const sessionUser = await getSessionUser()
        if (!sessionUser || !sessionUser.userId) {
            return new Response("User Id is required", { status: 401 })
        }

        const unreadMessagesCount = await Message.countDocuments({ recipient: sessionUser.userId, read: false })

        return new Response(JSON.stringify({ count: unreadMessagesCount }), { status: 200 })

    } catch (error) {
        console.log("Something went wrong", error)
        return new Response("Something went wrong", { status: 500 })
    }
}