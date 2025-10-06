import { useEffect, useState } from "react"
import type { RootState } from "../store/store"
import { useSelector } from "react-redux"


export interface IProducts {
    _id: string
    name: string
    price: number 
    description: string
    image: string
    stock: string
}

export const useProducts = () => {
    const [ products, setProducts ] = useState<IProducts[]>([])
    const [ loading, setLoading ] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const token = useSelector((state: RootState) => state.auth.token )


    useEffect(() => {
        if(!token) return
        try {
            
            const fetchProducts = async () => {
                setLoading(true)
                const res = await fetch("http://localhost:4000/products", {
                    method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    
    if(!res.ok) {
        throw new Error(`HTTP error!  status:${res.status}`)
    }
    const data = await res.json()
    setProducts(data)
}
fetchProducts()
} catch (error) {
    if(error instanceof Error) {
        setError(error.message)
    } else {
        setError(String(error))
    }
} finally {
    setLoading(false)
}
  }, [token])



  return {
    products, setProducts, loading, error
  }
}