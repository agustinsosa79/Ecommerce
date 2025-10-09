import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginSuccess, logout } from "../store/slices/authSlice"
import { useState } from "react"
import { loginSchema } from "../schemas/loginSchema"
import { animateOverlayTransitionLogin } from "../animations/aniamtions"




export const useAuth = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState<string | null>(null)
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    
    
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setError(null)
      const result = loginSchema.safeParse({ email, password })
      if (!result.success) {
      setError(result.error.issues[0].message)
      setLoading(false)
      return
      }
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
    setLoading(false)
    setError(null)
    await animateOverlayTransitionLogin()
    navigate("/inicio")
    } catch (error) {
      console.log(error)
        setError("Error al iniciar sesión")
        setLoading(false)
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
    password,
    loading,
    error, 
    setError
  }
}
