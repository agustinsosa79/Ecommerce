import { Router } from "express";
import { getAllProducts, getProduct, createProduct, editProduct, deleteProduct } from "../controllers/products.controller.ts"
import { authMiddleware } from "../middlewares/authMiddleware.js";
const route = Router();


route.use(authMiddleware)

route.get('/', getAllProducts);
route.post('/', createProduct);
route.get('/:id', getProduct);
route.put('/:id', editProduct);
route.delete('/:id', deleteProduct)



export default route