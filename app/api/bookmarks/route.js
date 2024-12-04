import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
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

        let message;

        if (isBookmarked) {
            //If already bookmarked remove it
            user.bookmarks.pull(propertyId)
            message = "Bookmarked removed successfully!"
            isBookmarked = false
        } else {
            //If Not Bookmarked, then added
            user.bookmarks.push(propertyId)
            message = "Bookmark added succesfully!"
            isBookmarked = true
        }

        await user.save()
        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong!!!", { status: 500 })
    }
}


//This route is response to fetch all booksmarsk of the logged in user.
//GET /api/bookmarks
export const GET = async (request) => {
    try {
        await connectDB()
        //get the session and userId

        const sessionUser = await getSessionUser()
        if (!sessionUser || !sessionUser.userId) {
            return new Response("User Id Is required", { status: 401 })
        }
        const { userId } = sessionUser
        const user = await User.findOne({ _id: userId })

        //Get user bookmarks
        const bookmarks = await Property.find({ _id: { $in: user.bookmarks } })

        return new Response(JSON.stringify(bookmarks), { status: 200 })
    } catch (error) {
        console.log("Something went wrong")
        return new Response("Something went wrong", { status: 500 })
    }
}