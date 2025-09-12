import mongoose from "mongoose"
import productSchema from "../schemas/productsSchema.js"


const productModel = mongoose.model("products", productSchema)

export default productModel;