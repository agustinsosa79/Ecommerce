
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import PrivateRoute from './pages/users/PrivateRoute'
import Cart from './pages/users/Cart'
import Home from './pages/users/Home'
import Login from './pages/users/Login'
import Products from './pages/users/Products'

function App() {

  return (
    <BrowserRouter>
     <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/inicio' element={<Home />} />
        <Route path='/productos' element={<Products />} />
        
      <Route element={<PrivateRoute />}>
        <Route path='/carrito' element={<Cart />}/>
        <Route path='/perfil' element='' />
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
