import { Outlet } from 'react-router-dom'
import Navbar from '../components/home/Navbar'
import SectionFooter from '../components/home/SectionFooter'

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-black/99">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <div>
      <SectionFooter />
      </div>
    </div>
  )
}

export default PrivateLayout