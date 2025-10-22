import mongoose from "mongoose";

interface IdProduct {
    name: string
    price: number
    description: string
    image: string
    stock: number
    owner: mongoose.Schema.Types.ObjectId
}


const productSchema = new mongoose.Schema<IdProduct>({
    name: { type: String, required: true},
    price: {type: Number, required: true},
    description: { type: String, required: true},
    image: {type: String},
    stock: { type: Number, required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, { timestamps: true})


export default mongoose.model('products', productSchema)