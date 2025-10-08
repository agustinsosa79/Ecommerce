import { useCart } from "../../hooks/useCart"
import { useProducts } from "../../hooks/useProducts"
import type { IProducts } from "../../interfaces/IProducts"
import ProductCard from "./ProductCard"

const SectionCards = () => {
    const { products } = useProducts()
    const { addToCart } = useCart()



  return (
    <div className="flex flex-col justify-center-safe items-start mt-20">
    <h2 className=" font-sans font-semibold text-2xl m-12 p-0">Agregados Recientemente </h2>
    <div className="grid grid-cols-4 gap-10 m-10">
        {products.map((p: IProducts) => (
            <ProductCard key={p._id}>
            <ProductCard.Image src={p.image} alt={p.name}>
            <ProductCard.Button onClick={() => addToCart(p._id, 1)}>Añadir Al Carrito</ProductCard.Button>
            </ProductCard.Image>
            <ProductCard.Info name={p.name} price={p.price} />
          </ProductCard>
        ))}
      </div>
    </div>
  )
}

export default SectionCards