import { Router } from "express";
import { getAllProducts, getProduct, createProduct, editProduct, deleteProduct, createManyProducts } from "../controllers/products.controller.ts"
import { authMiddleware } from "../middlewares/authMiddleware.ts";
const route = Router();


route.get('/', getAllProducts);
route.get('/:id', getProduct);
route.use(authMiddleware)
route.post('/', createProduct);
route.post('/blunk', createManyProducts)
route.put('/:id', editProduct);
route.delete('/:id', deleteProduct)



export default route