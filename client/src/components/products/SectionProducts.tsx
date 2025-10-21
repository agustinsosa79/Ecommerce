import { useEffect, useRef } from "react"
import { useCart } from "../../hooks/useCart"
import ProductCard from "../ProductCard"
import { animateProductSection } from "../../animations/animations"

interface ISectionProducts {
  products: {
    _id: string
    name: string
    image: string
    price: number
  }[]
  loading: boolean
}

const SectionProducts = ({ products, loading }: ISectionProducts) => {
  const { addToCart } = useCart()
  const productSectionRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if(!loading ){
      animateProductSection(productSectionRef.current)
    }
  }, [loading])

  if (loading) {
  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
      <p className="text-white text-xl font-light">Cargando productos...</p>
    </div>
  )
}

  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-white text-2xl">No se encontraron productos</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-8">
      {products.map((product, i) => (
        <div
          key={product._id}
          ref={(el) => {
            if (el) productSectionRef.current[i] = el
          }}>
        <ProductCard key={product._id} >
          <ProductCard.Image src={product.image} alt={product.name}>
            <ProductCard.Button onClick={() => addToCart(product._id, 1)}>
              
              Añadir al carrito
            </ProductCard.Button>
          </ProductCard.Image>
          <ProductCard.Info name={product.name} price={product.price} />
        </ProductCard>
          </div>
      ))}
    </div>
  )
}

export default SectionProducts
