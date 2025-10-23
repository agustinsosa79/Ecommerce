import { Link,  } from "react-router-dom"
import { ShoppingCartIcon, UserIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import  logo  from '../../assets/logo-nordik.png'
import { useAuth } from "../../hooks/useAuth";
import { useTokenValid } from "../../hooks/useTokenValid";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { animateCartCounter, animateFloatingPlusOne, animateNavbar, animateNavbarLinks, createNavbarScrollHandler } from "../../animations/animations";
import Sidebar from "../Sidebar";
import { Menu, X } from "lucide-react";


const Navbar = () => {
    const navRef = useRef<HTMLDivElement | null>(null)
    const linksRef = useRef<HTMLDivElement | null>(null)
    const counterRef = useRef<HTMLDivElement | null>(null)
    const cartIconRef = useRef<HTMLAnchorElement | null>(null);
    const { handleLogout } = useAuth()
    const { valid: isTokenValid } = useTokenValid()
    const { totalItem, loading } = useCart()
    const [isSidebarOpen, setSidebarOpen] =  useState(false);
    
 // Guardamos el total anterior para compararlo
  const prevTotalRef = useRef(totalItem)

useEffect(() => {
  if(!loading) return
  if (prevTotalRef.current !== null && totalItem > prevTotalRef.current) {
    animateFloatingPlusOne(cartIconRef.current)
    animateCartCounter(counterRef.current)
  }

  // Siempre actualizamos el prevTotal
  prevTotalRef.current = totalItem
}, [totalItem, loading])

    useEffect(() => {
      animateNavbar(navRef.current)
      animateNavbarLinks(linksRef.current?.querySelectorAll("a"))
      createNavbarScrollHandler(navRef.current)
    },[]) 

  return (

    <div >

      <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    <nav ref={navRef} className="flex fixed z-20 w-full md:w-full bg-black/90 text-white items-center justify-between mask-b-from-90% shadow-2xl">
      {/* Botón hamburguesa */}
   

    {/* Sidebar */}
        
        <Link to="/inicio"><img fetchPriority="high" alt="logo-nordik" src={logo} className=" md:ml-10 h-25 w-25 object-cover rounded-2xl" /></Link>
        <div ref={linksRef} className="md:flex hidden  gap-15">
        <Link to="/inicio">Inicio</Link>
        <Link to="/productos">Productos</Link>
        </div>

        <div className="md:flex  items-center justify-center  md:gap-8 md:mr-30">
        {isTokenValid ? (<div className="md:flex flex-row hidden gap-5 items-center justify-center">
            <Link to="/perfil" title="Ir a tu perfil"><UserIcon className="h-7 w-7 hover:text-gray-300" /></Link>
            <button name="Cerrar-sesion" onClick={handleLogout}><ArrowLeftEndOnRectangleIcon title="Cerrar sesion" className="cursor-pointer hover:text-gray-300  h-7 w-7" /></button>
            </div>) :
        (<div className="hidden md:flex gap-3">
        <Link to="/login">Iniciar sesion</Link>
        <Link to="/Register">Registrarse</Link>
        </div>)}
        <div className="relative flex gap-3  md:gap-1 md:mr-10 md:pt-[1px] items-center justify-center">
          <div className="md:flex-none flex flex-row items-center justify-center gap-none">
        <Link ref={cartIconRef} to="/carrito" className="hover:text-gray-300 flex flex-row border-2 border-transparent w-7 h-auto md:h-auto md:w-7"><ShoppingCartIcon title="Tú carrito" /></Link>
        
        {!loading && totalItem > 0 && isTokenValid ? <div ref={counterRef} className="  flex items-center p-1 justify-center rounded-full  text-white border-transparent   font-semibold shadow-md">{totalItem}</div> : 0}
          </div>
        <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="  text-white md:hidden rounded-lg p-2 z-50"
        >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>
        </div>
    </nav>
</div>
  )
}

export default Navbar