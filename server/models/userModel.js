import mongoose from "mongoose";
import userSchema from "../schemas/usersSchema.js";

const userModel = mongoose.model("users", userSchema)

export default userModel