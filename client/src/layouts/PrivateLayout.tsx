import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/home/Navbar'
import SectionFooter from '../components/home/SectionFooter'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/all'

const PrivateLayout = () => {

  const location = useLocation()

   useEffect(() => {
    // 🚀 Cada vez que cambia la ruta, limpiamos y refrescamos ScrollTrigger
    ScrollTrigger.refresh();
  }, [location.pathname]);
  return (
    <div className="min-h-screen flex flex-col max-w-full bg-black/99">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <div className=' mt-1'>
      <SectionFooter />
      </div>
    </div>
  )
}

export default PrivateLayout