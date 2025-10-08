import Routes from 'express'
import { getCart, addCart, updateCartItem, deleteCartItem } from '../controllers/cart.controller.ts'
import { authMiddleware } from '../middlewares/authMiddleware.ts'
const route = Routes()

route.use(authMiddleware)

route.get('/', getCart)
route.post('/', addCart)
route.put('/:productId', updateCartItem)
route.delete('/:productId', deleteCartItem)

export default route