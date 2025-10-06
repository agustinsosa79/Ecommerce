import  type { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { Link,  } from "react-router-dom"
import { ShoppingCartIcon, UserIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import  logo  from '../../assets/logo-nordik.png'
import { useAuth } from "../../hooks/useAuth";


const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user )
    console.log(user)
    const token = useSelector((state: RootState) => state.auth.token)

    const { handleLogout } = useAuth()
    


    


  return (
    <nav className="flex fixed z-20 w-full bg-black/90 text-white items-center justify-between mask-b-from-90% shadow-2xl">
        
        <Link to="/inicio"><img src={logo} className=" ml-10 h-25 w-25 object-cover rounded-2xl" /></Link>
        <div className="flex  gap-15">
        <Link to="/inicio">Inicio</Link>
        <Link to="/productos">Productos</Link>
        </div>

        <div className="flex   items-center justify-center gap-8 mr-30">
        {token ? (<>
            <Link to="/perfil" title="Ir a tu perfil"><UserIcon className="h-7 w-7 hover:text-gray-300" /></Link>
            <button onClick={handleLogout}><ArrowLeftEndOnRectangleIcon title="Cerrar sesion" className="cursor-pointer hover:text-gray-300  h-7 w-7" /></button> 
            </>) : 
        (<>
        <Link to="/login">Login</Link>
        <Link to="/Register">Registrarse</Link>
        </>)}
        <Link to="/carrito" className="hover:text-gray-300 h-7 w-7 "><ShoppingCartIcon title="Tú carrito" /></Link>
        </div>
    </nav>
  )
}

export default Navbar