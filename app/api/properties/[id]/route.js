

import connectDB from "@/config/database"
import Property from "@/models/Property"

//GET  api/properties/:id =>this route get a single property
export const GET = async (request, { params }) => {
    try {
        await connectDB()

        const { id } = await params

        const property = await Property.findById(id)
        if (!property) {
            //do sth
            return new Response("Property Not Found!", { status: 404 })
        }
        return new Response(JSON.stringify(property), { status: 200 })

    } catch (error) {
        return new Response("Something went wrong!!!", { status: 500 })
    }
}