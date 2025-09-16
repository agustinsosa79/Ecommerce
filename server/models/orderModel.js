import mongoose from "mongoose";
import orderSchema from "../schemas/ordersSchema.js";



const orderModel = mongoose.model("orders", orderSchema)

export default orderModel