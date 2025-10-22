import { useEffect} from "react"
import type { AppDispatch, RootState } from "../store/store"
import { useDispatch, useSelector } from "react-redux"
import { setProducts, setProductsError, setProductsLoading } from "../store/slices/productSlice"
import { protectedFetch } from "../utils/protectedFetch"




export const useProducts = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { products, loading, error } = useSelector((state: RootState) => state.products)



    useEffect(() => {
        const fetchProducts = async () => {
      dispatch(setProductsLoading(true))
      try {
        const res = await protectedFetch("http://localhost:4000/products")
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        dispatch(setProducts(data))
        dispatch(setProductsError(null))
      } catch (err) {
        if (err instanceof Error) dispatch(setProductsError(err.message))
        else dispatch(setProductsError(String(err)))
      } finally {
        dispatch(setProductsLoading(false))
      }
    }

    fetchProducts()
  }, [dispatch])



  return {
    products, setProducts, loading, error
  }
}