import { useEffect, useState } from "react"

interface PropsFilter {
  maxPrice: string
  setMaxPrice: (value: string) => void
  search: string
  setSearch: (value: string) => void
  setLoading: (value: boolean) => void
}

const ProductFilter = ({ maxPrice, setMaxPrice, setSearch, setLoading }: PropsFilter) => {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setSearch(inputValue)
      setLoading(false)
    }, 500) // menos delay para sensación más fluida
    return () => clearTimeout(timeout)
  }, [inputValue, setSearch, setLoading])

  return (
    <section className="w-460  mt-20 p-10 bg-zinc-900/30 backdrop-blur-xl border border-zinc-500/20  flex flex-col sm:flex-row justify-between items-center gap-6 shadow-lg rounded-xl">
      <div className="flex-1 w-full sm:w-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full sm:w-80 px-4 py-2 rounded-xl bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-inner transition"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="text-white text-sm font-medium">
          Precio:
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="ml-2 w-36 px-3 py-2 rounded-xl bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-white/30 shadow-inner transition"
          >
            <option value="$200">Hasta $200</option>
            <option value="$500">Hasta $500</option>
            <option value="$1000">Hasta $1000</option>
            <option value="$2000">Hasta $2000</option>
          </select>
        </label>
      </div>
    </section>
  )
}

export default ProductFilter
