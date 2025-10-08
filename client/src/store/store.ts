import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.ts'
import cartReducer from './slices/cartSlice.ts'
import productsReducer from "./slices/productSlice.ts"



export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch