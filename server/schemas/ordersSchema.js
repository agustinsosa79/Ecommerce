import { Schema } from "mongoose";


const orderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "users", required: true},
    productsId: [{type: Schema.Types.ObjectId, ref: "products", required: true}],
    price: { type: Number, require: true },
    date: { type: Date, default: Date.now }
})


export default orderSchema;