import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <main className="h-screen w-full flex items-center bg-black justify-center">
      <Outlet /> {/* acá se renderizan las rutas públicas, ej: login */}
    </main>
  )
}

export default PublicLayout