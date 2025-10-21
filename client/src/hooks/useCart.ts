import { useDispatch, useSelector } from "react-redux"
import type {  AppDispatch, RootState } from "../store/store"
import type {  ICartResponse } from "../interfaces/ICart"
import { setCart,  setCartError,  setCartLoading } from "../store/slices/cartSlice"
import { useCallback, useEffect } from "react"
import { protectedFetch } from "../utils/protectedFetch"



export const useCart = () => {
    const dispatch = useDispatch<AppDispatch>()
    const token = useSelector((state: RootState) => state.auth.token)
    const { cart, loading, error } = useSelector((state: RootState) => state.cart )


    const getHeaders = useCallback((): HeadersInit => {
            const headers: HeadersInit = {
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            return headers;
        }, [token])

    const getCart = useCallback(async () => {
        if(!token) return
        setCartLoading(true)
        try {
            const res = await protectedFetch('http://localhost:4000/cart',{ headers: getHeaders() })
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data.message)
            }
            const data: ICartResponse = await res.json()

            dispatch(setCart(data.cart))
            dispatch(setCartError(null))
        } catch (error) {
            if (error instanceof Error) {
                setCartError(error.message)
            } else {
                setCartError(String(error))
            }
        } finally {
            dispatch(setCartLoading(false))
        }
    }, [token, dispatch, getHeaders])

    const addToCart = async(productId:string, quantity:number) => {
        dispatch(setCartLoading(true))
        try {
            console.log("TOKEN",token)
            console.log("HEADERS:",getHeaders())
            const res = await protectedFetch('http://localhost:4000/cart', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ productId, quantity })
            })
            if(!res.ok) {
                return setCartError('Error al añadir el producto al carrito')
            }
            const data = await res.json()
            dispatch(setCart(data.cart))
            dispatch(setCartError(null))
        } catch (error) {
            if(error instanceof Error) {
                dispatch(setCartError(error.message))
            } else {
            dispatch(setCartError(String(error)))
        }
    } finally {
        dispatch(setCartLoading(false))
    }}


    const removeItemFromCart = async ( productId:string ) =>{
        dispatch(setCartLoading(true))
        try {

            const res = await protectedFetch(`http://localhost:4000/cart/${productId}`, {
                method: 'DELETE',
                headers: getHeaders()
            })
            if(!res.ok){
                throw new Error('Error al remover el producto')
            }
            const data: ICartResponse = await res.json()

            dispatch(setCart(data.cart))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setCartError(error.message))
            } else {
                dispatch(setCartError(String(error)))
            }
    }}

    const removeCart = async () => {
        dispatch(setCartLoading(true))
        try {
            const res = await protectedFetch("http://localhost:4000/cart", {
                method: 'DELETE',
                headers: getHeaders()
            })
            if(!res.ok){
                throw new Error('Error al eliminar el carrito')
            }
            dispatch(setCart(null))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setCartError(error.message))
            } else {
                dispatch(setCartError(String(error)))
            }
        } finally {
            dispatch(setCartLoading(false))
        }
    }


    const updateItemFromCart = async (productId: string, quantity: number) => {
        setCartLoading(true)
        try {
            const res = await fetch(`http://localhost:4000/cart/${productId}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ quantity })
            })
            if(!res.ok){ 
                throw new Error('Error al actualizar el producto')
            }
            const data: ICartResponse = await res.json()
            dispatch(setCart(data.cart))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setCartError(error.message))
            } else {
                dispatch(setCartError(String(error)))
            }
        }
    }

    const totalItem = cart?.products.reduce((acc, item) => acc + item.quantity, 0) ?? 0


      useEffect(() => {
    if (token) getCart();
  }, [token, getCart]);







    return{
        getCart,
        addToCart,
        removeItemFromCart,
        updateItemFromCart,
        removeCart,
        loading,
        error, 
        cart,
        totalItem
    }
    
}