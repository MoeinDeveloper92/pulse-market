import connectDB from "@/config/database";
import User from "@/models/User";

import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic"

export const POST = async (request) => {
    try {
        await connectDB()
        //gettign proeprtyId and userId
        const { propertyId } = await request.json()
        const sessionUser = await getSessionUser()
        if (!sessionUser || !sessionUser.userId) {
            return new Response("User Id Is required", { status: 401 })
        }
        const { userId } = sessionUser;

        //Find User In the database
        const user = await User.findOne({ _id: userId })

        //hceck if proeprty is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)


        return new Response(JSON.stringify({ isBookmarked }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong!!!", { status: 500 })
    }
}