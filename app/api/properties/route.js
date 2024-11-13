import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import cloudinary from "@/config/cloudinary"

//GET /api/properties
//here we create our handler
export const GET = async (request) => {
    try {
        await connectDB()
        const properties = await Property.find()
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong...", { status: 500 })
    }
}


export const POST = async (request) => {
    try {
        await connectDB()
        //in any route that you need to use user session just need to bring this fucntion
        const sessionUser = await getSessionUser()
        if (!sessionUser || !sessionUser.userId) {
            return new Response("Unauthorized!, UserId Is required!", { status: 401 })
        }

        const { userId } = sessionUser
        const formData = await request.formData()
        //Access all values from amenities and images
        const amenities = formData.getAll("amenities")
        const images = formData.getAll("images").filter((image) => image.name !== "")

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

        //Upload Images to cloudinary
        const imageUploadPromises = []
        for (const image of images) {
            //create an image buffer
            //we shoul trun it inot a format that can be processed
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray)

            //Convert the image data to base64
            const imageBase64 = imageData.toString("base64")

            //Now we can uplaod it to cloudinary
            //make request to uplaod to cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,
                {
                    folder: "propertypuls"
                }
            );
            imageUploadPromises.push(result.secure_url)
            //wait for all iamges to upload
            const uploadedImages = await Promise.all(imageUploadPromises)
            //Add uplaodd images to the propertyData Object
            propertyData.images = uploadedImages
        }

        const newProperty = await Property.create(propertyData)
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
        // return new Response(JSON.stringify({ message: "Uploaded Sucessfully!" }), { status: 200 })
    } catch (error) {
        return new Response("Field To uplaode", { status: 500 })
    }
}

//this is implemented like page route in the nextjs//// /api/properties => inside this we set up a file

//when  we upload a photo, by {files} we actulaly turn into a buffer and we can extract the
//actual data from this buffer
//we upload this buffer inthe cloudinary and then the cloudinary give us a url, then store this url
//in the mongodb