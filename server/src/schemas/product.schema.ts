import { z } from "zod";



export const productSchema = z.object({
    name: z.string({
        message: 'name must be a string'
    })
    .min(3,{ message: ' must be at least 3 characters'})
    .max(30, { message: 'must be at most 30 characters '})
    ,
    price: z.number({
        message: 'price must be a number'
    })
    .positive({ message: 'price must be greater than 0'})
    ,
    description: z.string({
        message: 'description must be a string'
    })
.min(10, { message: 'your description must be at least 10 characters' }),

    stock: z.number({
        message: 'stock must be a number'
    })
    .nonnegative({ message: 'stock cannot be negative'})
})