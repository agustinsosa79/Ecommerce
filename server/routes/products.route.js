import { Router } from "express";
import { getAllProducts, getProduct, createProduct, editProduct, deleteProduct } from "../controllers/products.controller.js"
const route = Router();


route.get('/', getAllProducts);
route.get('/:id', getProduct);
route.post('/', createProduct);
route.post('/:id', editProduct);
route.delete('/:id', deleteProduct)



export default route