import mongoose from "mongoose";
import { Document } from "mongoose";


interface ICartProduct {
    productId: mongoose.Schema.Types.ObjectId
    quantity: number
} 


interface Icart extends Document {
    userId: mongoose.Schema.Types.ObjectId
    products: ICartProduct[]
}


const cartSchema = new mongoose.Schema<Icart>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true},
        quantity: { type: Number, required: true,  min: 1 }
    }]
})




export default mongoose.model<Icart>('Cart', cartSchema )