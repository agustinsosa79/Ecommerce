import { type MouseEventHandler, type ReactNode } from "react"

interface ProductCardProps {
    children: ReactNode
}
const ProductCard = ({ children } : ProductCardProps) => {
  return (
    <div className=" flex flex-col text-start hover:scale-105 h-120  transition-transform shadow-lg shadow-black bg-white  rounded">
            {children}
            </div>
  )
}

ProductCard.Image = ({src, alt, children}: {src: string, alt: string, children?: ReactNode}) => (
    <div className="relative group border-b border-black">
    <img src={src} alt={alt} className="h-80 w-full object-contain rounded-3xl" />
    {children}
  </div>
    )


ProductCard.Button = ({children, onClick} : {children: ReactNode, onClick: MouseEventHandler<HTMLButtonElement>}) => (
    <button onClick={onClick} className="bg-black/80 backdrop-blur-md shadow-md shadow-black absolute inset-0 m-auto text-sm font-sans w-90 cursor-pointer font-bold h-15 top-60 opacity-0 group-hover:opacity-100 text-white hover:text-black hover:bg-white/80 hover:transition-all hover:duration-800 transition-opacity duration-75 rounded">
    {children}
  </button>
    )


ProductCard.Info = ({name, price}: {name: string, price: number}) => {

  const formatedPrice = price.toLocaleString("es-AR", {currency: "ARS", style: "currency", })
  return(
    <div className=" p-10 h-full  cursor-pointer text-black hover:bg-black/10">
    <h3 className="font-bold text-black">{name}</h3>
    <p>{formatedPrice}</p>
  </div>
  )
    }



export default ProductCard