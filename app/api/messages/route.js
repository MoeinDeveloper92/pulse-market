import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


export const dynamic = 'force-dynamic'

//GET /api/messages

export const GET = async (request) => {
    try {
        await connectDB()
        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify("User Id is required!"), { status: 401 })
        }

        const { userId } = sessionUser
        const readMessages = await Message.find({ recipient: userId, read: true })
            .sort({ createdAt: -1 })//sort read message is asc order
            .populate("sender", "username")
            .populate("property", "name")
        const unreadMessages = await Message.find({ recipient: userId, read: false })
            .sort({ createdAt: -1 })
            .populate("sender", "username")
            .populate("property", "name")
        const messages = [...unreadMessages, ...readMessages]
        return new Response(JSON.stringify(messages), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}




//POST /api/messages
export const POST = async (request) => {
    try {
        await connectDB()
        const data = await request.json()
        console.log("DATA IS =>>>>", data)
        const { name, email, phone, message, property, recepient } = data

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({ message: "Please make sure you logged In!" }), { status: 401 })
        }
        const { user } = sessionUser

        //Cannot send message to self
        if (user.id === recepient) {
            return new Response(JSON.stringify({ message: "Can not send a message to yourself!!!" }), { status: 400 })
        }
        const newMessage = new Message({
            sender: user.id,
            recipient: recepient,
            property,
            email,
            phone,
            name,
            body: message
        })
        await newMessage.save()
        return new Response(JSON.stringify({ message: "Message Sent" }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}

