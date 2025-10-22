import mongoose, { Document } from "mongoose"



interface IOrderProduct {
    name: string
    price: number
    quantity: number
}

interface IOrder extends Document {
    userid: mongoose.Schema.Types.ObjectId
    products: IOrderProduct[]
    total: number
    status: "pending" | "paid" | "shipped"
}

const orderSchema = new mongoose.Schema<IOrder>({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'urser', required: true },
    products: [{
        name: { type: String, required: true},
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, required: true,  default: 'pending' }
}, { timestamps: true})


export default mongoose.model<IOrder>("order", orderSchema )