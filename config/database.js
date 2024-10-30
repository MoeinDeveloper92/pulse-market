import mongoose from "mongoose";

let connected = false

//when we work with the mongoose object , this is async which means it returns a Promise
const connectDB = async () => {
    //it ensures that field that should be stored, stored
    mongoose.set("strictQuery", true)

    //if the DB is already connected, do not connect again
    if (connected) {
        console.log("MONGODB is already Connected!!!")
        return
    }

    //Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.log("MONGODB is Connected!!")
    } catch (error) {
        console.log(error)

    }
}


export default connectDB