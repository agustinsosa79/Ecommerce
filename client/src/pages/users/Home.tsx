import Navbar from "../../components/home/Navbar"
import video from '../../assets/video-backpage.mp4'
import { useProducts, type IProducts } from "../../hooks/useProducts"
import { Link } from "react-router-dom"



const Home = () => {

  const { products } = useProducts()

  return (
    <>
    <Navbar />

    <div className="relative h-screen flex items-center justify-center mask-b-from-70%">
    <video className="absolute top-0 left-0 w-full h-full object-cover -z-10" src={video} autoPlay muted loop></video>
    <div className=" flex flex-col justify-start items-center gap-5">
    <h1 className=" font-bold  text-white  text-7xl p-10 font-serif ">Invierno cálido, estilo seguro.</h1>
    <Link to="/products" className="text-white text-2xl border-b-2   border-transparent  font-serif hover:border-white transition-all duration-200 ">Explorar</Link>
    </div>
    </div>

     <div className="grid grid-cols-4 gap-20 m-10">
        {products.map((p: IProducts) => (
          <div key={p._id} className=" flex flex-col text-start p-0 m-0 hover:scale-105 transition-transform shadow shadow-black  rounded">
            <div className=" relative group border-b border-black">
            <img src={p.image} alt={p.name} className=" h-90 w-full object-contain rounded-3xl" />
            <button className=" bg-white/30 backdrop-blur-md shadow-md text-black shadow-black  absolute inset-0 m-auto w-90 cursor-pointer font-bold  h-15 top-70 opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:transition-all hover:duration-800 hover:text-white transition-opacity duartion-300 rounded-4xl">Añadir al carrito</button>
            </div>
            <div className="mt-1 p-10 rounded-b-3xl cursor-pointer">
            <h3 className="font-bold ">{p.name}</h3>
            <p>${p.price}</p>
            </div>
          </div>
        ))}
      </div>
</>
  )
}

export default Home