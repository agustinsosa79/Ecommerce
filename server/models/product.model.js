import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    name: { type: String, required: true},
    price: {type: Number, required: true},
    description: { type: String, required: true},
    image: {type: String},
    stock: { type: String, required: true}
}, { timestamps: true})


export default mongoose.model('products', productSchema)