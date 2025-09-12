import mongoose from "mongoose";
import orderSchema from "../schemas/ordersSchema.js";



const oderModel = mongoose.model("orders", orderSchema)