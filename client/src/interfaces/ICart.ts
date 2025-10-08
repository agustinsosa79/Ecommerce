import type { IProducts } from "./IProducts"


export interface ICartProductPopulated {
    productId: IProducts
    quantity: number
}

export interface ICartPopulated {
    _id: string
    userId: string
    products: ICartProductPopulated[]
}


export interface ICartResponse {
    message: string
    cart: ICartPopulated
}