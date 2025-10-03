import Routes from 'express'
import { getOrder, createOrder } from '../controllers/orders.controller.ts'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const route = Routes()

route.use(authMiddleware)

route.get('/', getOrder)
route.post('/', createOrder)


export default route