import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginSuccess, logout } from "../store/slices/authSlice"
import { useState } from "react"




export const useAuth = () => {
    const [ email, setEmail ] = useState("")
      const [ password, setPassword ] = useState("")
    const dispatch = useDispatch()
  const navigate = useNavigate()
  
    
    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        const res = await fetch("http://localhost:4000/users/login", {
        method: 'POST',
        headers:{
        "Content-Type" : "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    if(!res.ok){
        console.log("no se ha podido iniciar sesion")
        return
    }

    const data = await res.json()

    const { token, ...userWithoutToken } = data
    dispatch(loginSuccess({ user: userWithoutToken, token}))
    navigate("/inicio")
    } catch (error) {
        console.log("error en el login", error)
    }}


    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }



  return {
    handleLogin,
    handleLogout,
    setEmail, 
    setPassword,
    email,
    password
  }
}
