import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/logo-nordik.png'
import logoI from '../../assets/redes-logos/instagram.webp'
import logoF from '../../assets/redes-logos/facebook.webp'
import { useEffect,  useRef } from "react"
import { animateFooter } from "../../animations/animations"

const SectionFooter = () => {
  
  const footerRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  
  
  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    animateFooter(footer)
  }, [location.pathname])
  

  return (
    <footer ref={footerRef} className="w-full  bg-black text-white flex flex-col justify-center items-center">
        <div className=" md:h-60 flex flex-col md:flex-row justify-center items-center md:gap-160 md:p-3 md:border-b border-white">
          <div className="flex flex-row p-5 md:p-0 justify-center  items-center gap-10 md:gap-20 md:ml-60">
          <img src={logo} fetchPriority="high" alt="logo-nordik" className="md:h-20 md:w-40 w-20 h-full md:border-r md:pr-5 object-cover border-white" />
          <p className="font-serif text-xs md:text-sm">Ropa de invierno</p>
          </div>
          <div className="md:flex hidden text-xs md:text-sm flex-row justify-center items-center gap-10">
          <Link to="/inicio">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/contacto">Contacto</Link>
          </div>
        </div>


        <div className=" p-10 w-full md:h-40 flex gap-3 flex-col md:flex-row justify-between items-center md:gap-20 md:p-2 md:mt-5">
          <div className="w-full md:h-30 gap-3 flex flex-col md:ml-60 md:flex-row md:justify-center justify-start items-start md:items-center md:gap-10">
          <h3 className="md:text-md text-xs font-serif">
            © 2025 Nordik. All rights reserved.
          </h3>
          <a href="#" className="md:font-bold text-xs md:text-sm">Politicas de privacidad</a>
          <a href="#" className="md:font-bold text-xs md:text-sm">Terminos de uso</a>
          </div>
          <div className="w-full h-full flex flex-row justify-start md:justify-center md:items-center gap-1 md:gap-10">
            <a  href="#"><img src={logoI} alt="instagram-logo"  className="bg-white rounded-full md:w-10 w-8 md:0 m-3 object-contain cursor-pointer "/></a>
            <a href="#"><img src={logoF} alt="facebook-logo" className="bg-white rounded-full md:w-10 w-8 md:m-0 m-3 object-contain cursor-pointer "/></a>
          </div>
        </div>
    </footer>
  )
}


export default SectionFooter