
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PrivateRoute from './pages/users/PrivateRoute'
import Cart from './pages/users/Cart'
import Home from './pages/users/Home'
import Login from './pages/users/Login'
import Products from './pages/users/Products'
import PublicLayout from './layouts/PublicLayout'
import PrivateLayout from './layouts/PrivateLayout'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      {/* Layout público (sin navbar) */}
      <Route element={<PublicLayout />}>
        <Route path='/login' element={<Login />} />
      </Route>

         {/* Layout privado (con navbar) */}
     <Route element={<PrivateLayout />}>
        <Route path='/inicio' element={<Home />} />
        <Route path='/productos' element={<Products />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path='/carrito' element={<Cart />}/>
        <Route path='/perfil' element='' />
     </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
