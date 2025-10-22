import mongoose, {  Document, Model } from "mongoose";

interface IUser extends Document {
    name: string
    nameUser: string
    email: string
    password: string
} 



const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    nameUser: { type: String, required: true},                                                                 
    email:{ type: String, required: true},
    password: {type: String, required: true}
})                                      



const User: Model<IUser> = mongoose.model<IUser>('user', userSchema)

export default User