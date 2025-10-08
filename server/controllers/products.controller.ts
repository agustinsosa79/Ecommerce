    import product from "../models/product.model.ts"
    import { productSchema } from "../schemas/product.schema.js"
    import type { Request, Response  } from "express"


    interface AuthRequest extends Request {
        user?: {id: string}
    }




    export const getAllProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await product.find({ owner: req.user?.id });
    return res.status(200).json(products);
  } catch (error: any) {
    console.log("Error al obtener los productos", error);
    return res.status(500).json({ error: error.message });
  }
};

    export const getProduct = async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params

            const productFound = await product.findById(id)
            if (!productFound) {
                return res.status(404).json({error: 'producto no encontrado'})
            }
            if (productFound.owner.toString() != req.user?.id ) {
                return res.status(401).json({ message: 'No estas autorizado para relaizar esta acción' })
            }
            return res.json(productFound)
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }

    export const createProduct = async (req: AuthRequest, res: Response) => {
        try {
            const parsed = productSchema.parse(req.body)

            const newProduct = new product({...parsed, owner: req.user?.id})
            await newProduct.save();

            return res.status(201).json(newProduct)
        }
        catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }

    export const createManyProducts = async (req: AuthRequest, res: Response) => {
        try {
            const arrayProducts = req.body

            const productWithOwner = arrayProducts.map((p: any) => ({
                ...p,
                owner: req.user?.id
            }))

            const insertProducts = await product.insertMany(productWithOwner)

            res.status(201).json(insertProducts)
        } catch (error) {
            res.status(500).json({ message: 'Error al crear los productos' })
        }
    }

    export const editProduct = async (req: AuthRequest, res: Response) => {
        try{
            const { id } = req.params
            const parsed = productSchema.partial().parse(req.body)
            const productFound = await product.findById(id)


            if(!productFound) {
                return res.status(404).json({error: 'no se pudo editar el producto'})
            }
            if (productFound.owner.toString() != req.user?.id) {
                return res.status(401).json({ message: 'No estas autorizado para realizar esta acción' })
            }

            const productEdited = await product.findByIdAndUpdate(id, parsed, {new: true})
            return res.status(201).json(productEdited)
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }

    export const deleteProduct = async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params


            const productFound = await product.findById(id)

            if (!productFound) {
                return res.status(401).json({ message: 'Producto no encontrado' })
            }

            if(productFound.owner.toString() != req.user?.id) {
                res.status(401).json({ message : 'No estas autorizado para relizar esta acción' })
            }

            const deleted = await product.findByIdAndDelete(id)

            if (!deleted) {
                return res.status(404).json({error: 'El producto no existe'})
            }

            if(deleted.owner.toString() != req.user?.id) {
                return res.status(401).json({ message: 'No estas autorizado para realizar esta acción' })
            }
                
            return res.status(201).json({ message: 'Producto eliminado'})
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    }