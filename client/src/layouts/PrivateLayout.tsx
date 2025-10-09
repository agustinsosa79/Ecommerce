import { Outlet } from 'react-router-dom'
import Navbar from '../components/home/Navbar'

const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-black/99">
      <Navbar />
      <div>
        <Outlet /> 
      </div>
    </div>
  )
}

export default PrivateLayout