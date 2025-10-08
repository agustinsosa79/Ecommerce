import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ICartPopulated } from "../../interfaces/ICart"




interface IcartState {
    cart: ICartPopulated | null
    loading: boolean
    error: string | null
}



const initialState: IcartState = {
    cart: null,
    loading: false,
    error: null
}



const cartSilce = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setCart: (state, action: PayloadAction<ICartPopulated | null> ) => {
            state.cart = action.payload
        },
        setCartLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setCartError: (state, action: PayloadAction< string | null>) => {
            state.error = action.payload
        },
        clearCart: (state) => {
            state.cart = null
            state.loading = false
            state.error = null
        }
    }
})



export const { setCart, setCartError, setCartLoading, clearCart } = cartSilce.actions

export default cartSilce.reducer