import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginSuccess, logout, signUpSuccess } from "../store/slices/authSlice"
import { useState } from "react"
import { loginSchema } from "../schemas/loginSchema"
import { animateOverlayTransitionLogin } from "../animations/aniamtions"
import { signUpSchema } from "../schemas/signUpSchema"
import { clearCart } from "../store/slices/cartSlice"




export const useAuth = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState<string | null>(null)
    const [ name, setName ] = useState("")
    const [ nameUser, setNameUser ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    //LOGIN
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
    dispatch(clearCart())
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

    //LOGOUT
    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearCart())
        navigate('/login')
    }

    //SIGNUP

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault()
      console.log("registro iniciado")
      const result = signUpSchema.safeParse({ name, nameUser, email, password })

      console.log(result)

      if(!result.success) {
        setError(result.error.issues[0].message)
        return
      }

      setLoading(true)
      setError(null)
      try {
      const res = await fetch("http://localhost:4000/users/register", {
        method: 'POST',
        headers:{
        "Content-Type" : "application/json"
        },
        body: JSON.stringify({ name, nameUser, email, password })
      })

      if(!res.ok) {
        setError("Correo o contraseña inválidos")
        setLoading(false)
        return
      }
        const data = await res.json()


        dispatch(signUpSuccess({ user: data.user }))
        navigate("/login")
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError("Error al registrar el usuario")
        setLoading(false)
      } finally {
        setLoading(false)
      }
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
    // Register
    , handleRegister,
    setName,
    setNameUser,
    name,
    nameUser
  }
}
