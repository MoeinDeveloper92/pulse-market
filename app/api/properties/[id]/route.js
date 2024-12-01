import { getSessionUser } from "@/utils/getSessionUser"

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


//DELETE  api/properties/:id =>this route get a single property
export const DELETE = async (request, { params }) => {
    try {


        const { id } = await params
        const propertyId = id
        await connectDB()

        const sessionUser = await getSessionUser()
        //check for session
        if (!sessionUser || !sessionUser.userId) {
            //Unauthorized
            return new Response("User ID is required!", { status: 401 })
        }

        const { userId } = sessionUser

        const property = await Property.findById(propertyId)
        if (!property) {
            //do sth
            return new Response("Property Not Found!", { status: 404 })
        }

        //verufy ownership
        if (property.owner.toString() !== userId) {
            return new Response("Unauthorized Access", { status: 401 })
        }

        await property.deleteOne()

        return new Response("Property deleted!", { status: 200 })

    } catch (error) {
        return new Response("Something went wrong!!!", { status: 500 })
    }
}


//PUT /api/properties/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDB()
        //in any route that you need to use user session just need to bring this fucntion
        const sessionUser = await getSessionUser()
        if (!sessionUser || !sessionUser.userId) {
            return new Response("Unauthorized!, UserId Is required!", { status: 401 })
        }

        const { userId } = sessionUser
     
        const formData = await request.formData()

        const { id } = await params

        //Access all values from amenities and images
        const amenities = formData.getAll("amenities")

        //get proepty to update
        const existingProperty = await Property.findById(id)

        if (!existingProperty) {
            return new Response("Proeprty Does not Exist!", { status: 404 })
        }

        //verify ownership
        if (existingProperty.owner.toString() !== userId) {
            return new Response("UnAuhtorized Access!", { status: 401 })
        }

        //create propertyData Object for database
        const propertyData = {
            type: formData.get("type"),
            name: formData.get("name"),
            description: formData.get("description"),
            location: {
                street: formData.get("location.street"),
                city: formData.get("location.city"),
                state: formData.get("location.state"),
                zipcode: formData.get("location.zipcode"),
            },
            beds: formData.get("beds"),
            baths: formData.get("baths"),
            square_feet: formData.get("square_feet"),
            amenities,
            rates: {
                weekly: formData.get("rates.weekly"),
                monthly: formData.get("rates.monthly"),
                nightly: formData.get("rates.nightly")
            },
            seller_info: {
                name: formData.get("seller_info.name"),
                email: formData.get("seller_info.email"),
                phone: formData.get("seller_info.phone")
            },
            owner: userId,
        }


        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)

        return new Response(JSON.stringify(updatedProperty), { status: 200 })
    } catch (error) {
        return new Response("Field To uplaode", { status: 500 })
    }
}



