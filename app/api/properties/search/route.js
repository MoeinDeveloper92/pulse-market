import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/property/serach?
export const GET = async (request) => {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const location = searchParams.get("location")
        const proeprtyType = searchParams.get("propertyType")

        const locationPattern = new RegExp(location, "i")

        //create a query that match the pattern
        //MATCH location pattern against database fields
        let query = {
            $or: [
                { name: locationPattern },
                { description: locationPattern },
                { 'location.street': locationPattern },
                { 'location.city': locationPattern },
                { 'location.state': locationPattern },
                { 'location.zipcode': locationPattern },
            ]
        }

        //Only check for proeprty if it is not "All"
        if (proeprtyType && proeprtyType !== "All") {
            const typePattern = new RegExp(proeprtyType, "i")
            query.type = typePattern
        }

        // console.log(query)
        const properties = await Property.find(query)
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })
    }
}