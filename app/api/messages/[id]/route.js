import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


export const dynamic = "force-dynamic"


//PUT /api/messages/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDB()
        const { id } = await params

        const sessionUsers = await getSessionUser()
        if (!sessionUsers || !sessionUsers.user) {
            return new Response(JSON.stringify("USER ID IS REQUIRED!"), { status: 401 })
        }
        const { userId } = sessionUsers

        const message = await Message.findById(id)
        if (!message) {
            return new Response("Message Not Found", { status: 404 })
        }


        //verify ownership
        if (message.recipient.toString() !== userId.toString()) {
            return new Response("Unauthorized!", { status: 401 })
        }

        //Update the message either to read or unread depneding on the curernt status
        message.read = !message.read
        await message.save()
        return new Response(JSON.stringify(message), { status: 200 })
    } catch (error) {
        console.log("ERROR")
        return new Response("Something went wrong", { status: 500 })
    }
}


//DELETE /api/messages/:id
export const DELETE = async (request, { params }) => {
    try {
        await connectDB()
        const { id } = await params

        const userSession = await getSessionUser()
        if (!userSession || !userSession.userId) {

            return new Response("you should be logged In", { status: 401 })
        }
        const message = await Message.findById(id)

        if (message.recipient.toString() !== userSession.userId.toString()) {
            return new Response("Unauthorized!", { status: 401 })
        }

        await message.deleteOne()
        return new Response("Message Deleted", { status: 200 })

    } catch (error) {

        console.log("ERROR")
        return new Response("Something went wrong", { status: 500 })
    }
}