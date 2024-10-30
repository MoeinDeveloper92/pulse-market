import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already Exist!"],
        required: [true, "Email is Requried!"]
    },
    username: {
        type: String,
        required: [true, "User Name is required!"]
    },
    image: {
        type: String
    },
    bookmarks: [
        { type: Schema.Types.ObjectId, ref: "Property" }
    ]
}, {
    timestamps: true
})

const User = model("User", UserSchema)

export default User