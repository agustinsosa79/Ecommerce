import { useMemo, useState } from "react"
import SectionProductHero from "../../components/products/SectionProductHero"
import SectionProducts from "../../components/products/SectionProducts"
import { useProducts } from "../../hooks/useProducts"
import ProductFilter from "../../components/products/ProductFilter"


const Products = () => {
  const { products } = useProducts()
  const [ search, setSearch ] = useState<string>("")
  const [ maxPrice, setMaxPrice ] = useState<string>("")
  const [ loading, setLoading ] = useState<boolean>(true)


  const filteredProducts= useMemo(() => {
    
    return products.filter((p) => {
      const matchesName = p.name.toLocaleLowerCase().includes(search.toLowerCase())
      const matchesPrice = maxPrice ? p.price <= Number(maxPrice) : true
      return matchesName && matchesPrice
    })
  }, [maxPrice, products, search])
  
  return (
    <>
    <SectionProductHero />
    <section className="flex w-full flex-col justify-center items-center bg-black/10">
    <ProductFilter search={search} setSearch={setSearch} maxPrice={maxPrice} setMaxPrice={setMaxPrice} setLoading={setLoading}  />
    <SectionProducts products={filteredProducts} loading={loading} />
    </section>
    </>
  )
}

export default Products