import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProducts } from "../../interfaces/IProducts";



interface IProductsState {
    products: IProducts[]
    loading: boolean
    error: string | null
}


const initialState: IProductsState = {
    products: [],
    loading: false,
    error: null
}


const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProducts[]>) => {
            state.products = action.payload
        },
        setProductsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setProductsError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        }
    }
})

export const { setProductsError, setProducts, setProductsLoading } = productSlice.actions
export default productSlice.reducer