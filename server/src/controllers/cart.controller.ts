import type { Request, Response } from "express"
import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"

interface AuthRequest extends Request {
    user?: { id: string }
}

type Controller = (req: AuthRequest, res: Response) => Promise<Response | void>


export const getCart: Controller = async (req, res) => {
    try {
        const userId = req.user?.id
        const cart = await Cart.findOne({ userId }).populate('products.productId')
        
        if(!cart || cart.products.length === 0){
            return res.status(404).json({ message: 'No hay productos en tu carrito' })
        }

        return res.json({
            message: 'Carrito obtenido con exito ',
            cart: cart
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el carrito', error })
    }
}


export const addCart: Controller = async (req, res) => {
    try {
        const userId = req.user?.id
        const { productId, quantity } = req.body

        const product = await Product.findById(productId)
        if(!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }
        let cart = await Cart.findOne({ userId })
        if (!cart) { 
            cart = new Cart({ userId: userId, products: []})
        }
        
        const existing = cart.products.find(p => p.productId.toString() === productId)

        existing ? existing.quantity += quantity : cart.products.push({ productId, quantity})

        await cart.save()
        
        const populatedCart = await cart.populate('products.productId')
        
        return res.json({ 
            message: `Se agregó ${quantity} ${quantity > 1 ? 'productos': 'producto'} al carrito`,
            cart: populatedCart
        })
        } catch (error) {
        return res.status(500).json({ message: 'Error al añadir el producto', error })
    }
}   

export const updateCartItem: Controller = async (req, res) => {
    try {
        
        const userId = req.user?.id
        const { productId } = req.params
        const { quantity } = req.body
        
        
        if (quantity < 1)  return res.status(400).json({ message: 'La cantidad minima es 1' })

        const cart = await Cart.findOne({ userId })
        if(!cart) return res.status(404).json({ message: 'Carrito no encontrado' })

        const product = cart.products.find(p => p.productId.toString() === productId)
        if(!product) return res.status(404).json({ message: 'Producto no encontrado' })

        product.quantity = quantity
        await cart.save()
        
        const populatedCart = await cart.populate('products.productId')
        return res.json({
            message: 'Cantidad actualizada!',
            cart: populatedCart
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el carrito', error })
    }
    }
    
    export const deleteCartItem: Controller = async (req, res) => {
        try {        
            const userId = req.user?.id
            const { productId } = req.params
            
            const cart = await Cart.findOne({ userId })
            if(!cart) return res.status(404).json({ message: 'Carrito no encontrado' })
                
                cart.products = cart.products.filter(p => p.productId.toString() !== productId)
                
                await cart.save()
                
        const populatedCart =await cart.populate('products.productId')
        
        return res.json({
            message: `Producto ${productId} liminado del carrito`,
            cart: populatedCart
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el carrito', error })
    }
    }



export const deleteCart: Controller = async (req, res) => {
    try {
        const userId = req.user?.id
        await Cart.findOneAndDelete({ userId })
        return res.json({ message: 'Carrito eliminado con éxito' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el carrito', error })
    }
}