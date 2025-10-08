import { Link,  } from "react-router-dom"
import { ShoppingCartIcon, UserIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import  logo  from '../../assets/logo-nordik.png'
import { useAuth } from "../../hooks/useAuth";
import { useTokenValid } from "../../hooks/useTokenValid";
import { useEffect, useRef } from "react";
import { useCart } from "../../hooks/useCart";
import { animateCartCounter, animateFloatingPlusOne, animateNavbar, animateNavbarLinks, createNavbarScrollHandler } from "../../animations/aniamtions";


const Navbar = () => {
    const navRef = useRef<HTMLDivElement | null>(null)
    const linksRef = useRef<HTMLDivElement | null>(null)
    const counterRef = useRef<HTMLDivElement | null>(null)
    const cartIconRef = useRef<HTMLAnchorElement | null>(null);
    const { handleLogout } = useAuth()
    const { valid: isTokenValid } = useTokenValid()
    const { totalItem } = useCart()
    
const prevTotal = useRef<number | null>(null)

  useEffect(() => {
    if (prevTotal.current === null) {
    prevTotal.current = totalItem
    return 
  }

    if(totalItem > (prevTotal.current ?? 0)){
      animateFloatingPlusOne(cartIconRef.current)
      animateCartCounter(counterRef.current)
    }
}, [totalItem]);


    useEffect(() => {
      animateNavbar(navRef.current)
      animateNavbarLinks(linksRef.current?.querySelectorAll("a"))
      createNavbarScrollHandler(navRef.current)
    },[]) 

  return (
    <nav ref={navRef} className="flex fixed z-20 w-full bg-black/90 text-white items-center justify-between mask-b-from-90% shadow-2xl">
        
        <Link to="/inicio"><img src={logo} className=" ml-10 h-25 w-25 object-cover rounded-2xl" /></Link>
        <div ref={linksRef} className="flex  gap-15">
        <Link to="/inicio">Inicio</Link>
        <Link to="/productos">Productos</Link>
        </div>

        <div className="flex   items-center justify-center gap-8 mr-30">
        {isTokenValid ? (<>
            <Link to="/perfil" title="Ir a tu perfil"><UserIcon className="h-7 w-7 hover:text-gray-300" /></Link>
            <button onClick={handleLogout}><ArrowLeftEndOnRectangleIcon title="Cerrar sesion" className="cursor-pointer hover:text-gray-300  h-7 w-7" /></button> 
            </>) : 
        (<>
        <Link to="/login">Iniciar sesion</Link>
        <Link to="/Register">Registrarse</Link>
        </>)}
        <div className="relative flex items-center">
        <Link ref={cartIconRef} to="/carrito" className="hover:text-gray-300 border-2 border-transparent h-7 w-7 "><ShoppingCartIcon title="Tú carrito" /></Link>
        
        {totalItem > 0 && isTokenValid ? <div ref={counterRef} className="  flex items-center p-1 justify-center rounded-full  text-white border-transparent   font-semibold shadow-md">{totalItem}</div> : 0}
        </div>
        </div>
    </nav>
  )
}

export default Navbar