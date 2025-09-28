import product from "../models/product.model.js"
import { productSchema } from "../schemas/product.schema.js"




export const getAllProducts = async (req, res) => {
    try {
        const products = await product.find()
        return res.json(products)
    } catch (error) {
        console.log("Error al obtener los productos", err);
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const productFound = await product.findById(id)
        if (!productFound) {
            res.status(404).json({error: 'producto no encontrado'})
        }
        return res.json(productFound)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const createProduct = async (req, res) => {
    try {
        const parsed = productSchema.parse(req.body)

        const newProduct = new product(parsed)
        await newProduct.save();

        return res.status(201).json(newProduct)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }

}

export const editProduct = async (req, res) => {
    try{
        const { id } = req.params

        const parsed = productSchema.partial().parse(req.body)

        const productEdited = await product.findByIdAndUpdate(id, parsed, {new: true})
        if(!productEdited) {
            res.status(404).json({error: 'no se pudo editar el producto'})
        }
        return res.status(201).json(productEdited)
    } catch (err) {
        res.status(500).json({err: err.message})

    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await product.findByIdAndDelete(id)

        if (!deleted) {
            res.status(404).json({error: 'El producto no existe'})
        }
        return res.status(201).json({ message: 'Producto eliminado'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}