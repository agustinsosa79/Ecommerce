import { type MouseEventHandler, type ReactNode } from "react"

interface ProductCardProps {
    children: ReactNode
}
const ProductCard = ({ children } : ProductCardProps) => {
  return (
    <div className=" flex flex-col text-start md:hover:scale-105 h-110 md:h-120  transition-transform shadow-lg shadow-black bg-white  rounded">
            {children}
            </div>
  )
}

ProductCard.Image = ({src, alt, children}: {src: string, alt: string, children?: ReactNode}) => (
    <div className="relative group border-b border-black">
    <img src={src} alt={alt} className="md:h-80 h-65 w-full object-contain rounded-3xl" />
    {children}
  </div>
    )


ProductCard.Button = ({children, onClick, className} : {children: ReactNode, onClick: MouseEventHandler<HTMLButtonElement>, className?: string}) => (
    <button onClick={onClick} className={`transition-all opacity-100 duration-200 backdrop-blur-md shadow-md shadow-black absolute inset-0 md:m-auto md:text-sm font-sans w-65 md:p-0  m-2  md:w-60 cursor-pointer font-bold top-48 left-2 calc md:left-0 h-13 md:h-15 md:top-60  group-hover:opacity-100 text-white  bg-black/80 hover:bg-zinc-800 hover:border-zinc-200 border-2 border-transparent hover:duration-200 md:opacity-0 flex justify-center items-center rounded-xl text-xs ${className}`}>
    {children}
  </button>
    )


ProductCard.Info = ({name, price}: {name: string, price: number}) => {

  const formatedPrice = price.toLocaleString("es-AR", {currency: "ARS", style: "currency", })
  return(
    <div className=" md:p-10 p-5 text-sm md:text-sm h-full text-black hover:bg-black/10">
    <h3 className="font-bold text-black">{name}</h3>
    <p>{formatedPrice}</p>
  </div>
  )
    }


  ProductCard.Button2 = ({children, onClick} : {children: ReactNode, onClick: MouseEventHandler<HTMLButtonElement>}) => (
    <button onClick={onClick} className="max-w-full md:w-100 p-4 bg-black/80 hover:bg-zinc-800 hover:duration-200 text-white hover:border-zinc-200 backdrop-blur-4xl  border-2 border-transparent font-bold py-2 md:py-4 px-4 rounded-xl  absolute md:bottom-4 md:left-2 left-2 bottom-2 shadow-md shadow-black transition-all opacity-100 duration-200 backdrop-blur-md cursor-pointer md:text-sm text-xs">
    {children}
  </button>
    )



export default ProductCard