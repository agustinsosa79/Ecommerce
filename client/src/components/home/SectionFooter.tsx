import { Link } from "react-router-dom"
import logo from '../../assets/logo-nordik.png'
import logoI from '../../assets/redes-logos/instagram.webp'
import logoF from '../../assets/redes-logos/facebook.webp'

const SectionFooter = () => {
  return (
    <footer className="w-full bg-black text-white flex flex-col justify-center items-center">
        <div className=" h-60 flex flex-row justify-center items-center gap-160 p-3 border-b border-white">
          <div className="flex flex-row justify-center items-center gap-5">
          <img src={logo} alt="logo-nordik" className="h-20 w-40 border-r pr-5 object-cover border-white" />
          <p className="font-serif">Ropa de invierno</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-10">
          <Link to="/inicio">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
          </div>
        </div>


        <div className=" h-20 w-full flex flex-row justify-between items-center gap-70 p-2 mt-5">
          <div className="w-full h-full flex ml-60 flex-row justify-center items-center gap-10">
          <h3 className="text-md font-serif">
            © 2025 Nordik. All rights reserved.
          </h3>
          <a href="#" className="font-bold text-sm">Politicas de privacidad</a>
          <a href="#" className="font-bold text-sm ">Terminos de uso</a>
          </div>
          <div className="w-full h-full flex flex-row  justify-center items-center gap-10">
            <a href=""><img src={logoI} alt=""  className="bg-white rounded-full w-10 object-contain cursor-pointer "/></a>
            <a href=""><img src={logoF} alt="" className="bg-white rounded-full w-10 object-contain cursor-pointer "/></a>
          </div>
        </div>
    </footer>
  )
}

export default SectionFooter