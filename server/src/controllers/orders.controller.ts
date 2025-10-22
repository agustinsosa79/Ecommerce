import Cart from '../models/cart.model.ts'
import type { Request, Response} from 'express'
import Orders from '../models/orders.model.ts'

interface AuthRequest extends Request {
    user?: { id: string}
}


type Controller = ( req: AuthRequest, res: Response ) =>  Promise< Response | void>


export const createOrder: Controller = async (req, res) => {
    try {
        
        const userId = req.user?.id
        
        const cart = await Cart.findOne({ userId }).populate('products.productId')
        
        if(!cart || cart.products.length === 0) {
            return res.status(401).json({ message: 'Carrito vacio' })
        }
        
        let total = 0
        const orderProducts = cart.products.map(item => {
            const product = item.productId as any
            
            total += product.price * item.quantity
            
            return {
                name: product.name,
                price: product.price,
                quantity: item.quantity
            }
        }) 
        
        
        const order = await Orders.create({
            userid: userId,
            products: orderProducts,
            total: total,
            status: 'pending'
        })
        
        
        cart.products = []
        
        await cart.save()
        
        res.json(order)
    } catch (error: any) {
        return res.status(500).json({ message: 'error al crear la orden', error })
    }
}

export const getOrder: Controller = async (req, res) => {
    try {
        const userId = req.user?.id
        const order  = await Orders.find({ userid: userId })
        res.json(order)
    } catch (error) {
        return res.status(401).json({ message: 'Error al obtener las odernes', error })
    }
}