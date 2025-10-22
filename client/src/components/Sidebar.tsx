import { Home, LogIn, LogOut,  Shirt, ShoppingCart, User, UserPlus, } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useTokenValid } from "../hooks/useTokenValid"
import { Link } from "react-router-dom"


interface SideBarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar = ({ open, onClose }: SideBarProps) => {
  const { handleLogout } = useAuth() // Asegúrate de tener este hook o función definida
  const { valid: isTokenValid } = useTokenValid() // Asegúrate de tener este hook o función definida

  return (
    <div className="md:hidden  transiton-all duration-300">

      {/* Overlay oscuro */}
      {open && (
        <div
           className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[50] "
          onClick={onClose}
        />
      )}

          <aside
          className={`fixed top-0 left-0  w-64 bg-gradient-to-b from-[#0f0f10] via-[#141519] to-[#1b1d23] 
            text-gray-100 z-[10000] h-screen transform transition-transform duration-300 border-r border-white/10 shadow-2xl
            ${open ? "translate-x-0" : "-translate-x-full"}`}
>
  <div className="flex flex-col  h-full">
    {/* Header */}
    <div className="px-6 pt-8 pb-4 border-b border-white/10">
      <h1 className="text-xl font-semibold tracking-wide text-white/90">Menú</h1>
    </div>

    {/* Links */}
    <nav className="px-6 py-15 mb-62 flex flex-col gap-15 text-base font-medium">
      <Link
        to="/inicio"
        onClick={onClose}
        className="flex items-center gap-3 hover:text-white/90 hover:translate-x-1 transition-transform duration-200"
        >
        <Home size={20} className="text-white/70" /> Inicio
      </Link>

      <Link
        to="/productos"
        onClick={onClose}
        className="flex items-center gap-3 hover:text-white/90 hover:translate-x-1 transition-transform duration-200"
        >
        <Shirt size={20} className="text-white/70" /> Productos
      </Link>

      <Link
        to="/carrito"
        onClick={onClose}
        className="flex items-center gap-3 hover:text-white/90 hover:translate-x-1 transition-transform duration-200"
        >
        <ShoppingCart size={20} className="text-white/70" /> Carrito
      </Link>

      {isTokenValid ? (
          <>
          <Link
            to="/perfil"
            onClick={onClose}
            className="flex items-center gap-3 hover:text-white/90 hover:translate-x-1 transition-transform duration-200"
            >
            <User size={20} className="text-white/70" /> Perfil
          </Link>

          <button
            onClick={() => {
                handleLogout()
                onClose()
            }}
            className="flex items-center gap-3 text-left hover:text-white/90 hover:translate-x-1 transition-transform duration-200"
            >
            <LogOut size={20} className="text-white/70" /> Cerrar sesión
          </button>
        </>
      ) : (
          <>
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center gap-3 hover:text-white/90 hover:translate-x-1 transition-transform duration-200"
          >
            <LogIn size={20} className="text-white/70" /> Iniciar sesión
          </Link>

          <Link
            to="/register"
            onClick={onClose}
            className="flex items-center gap-3 hover:text-white/90 hover:translate-x-1 transition-transform duration-200"
            >
            <UserPlus size={20} className="text-white/70" /> Registrarse
          </Link>
        </>
      )}
    </nav>

    {/* Footer */}
    <div className="px-6 py-4 border-t border-white/10 text-sm text-white/50">
      © 2025 Nordik
    </div>
  </div>
</aside>
 
    </div>
  )
}

export default Sidebar
