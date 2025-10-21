import { useAuth } from '../../hooks/useAuth'
import foto from "../../assets/logo-nordik.png" 
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const LoginForm = () => {

    const { email, setEmail, password, setPassword, handleLogin, error, setError } = useAuth()

    useEffect(() => {
        if(!error) return
        
        const timer = setTimeout(() =>{
            setError(null)
        }, 5000)

        return () => clearTimeout(timer)
    }, [error, setError])

  return (
    <div className=' z-1 text-center bg-white/10 backdrop-blur-2xl rounded-3xl p-10 w-full max-w-xl h-auto flex flex-col justify-center items-center gap-5 border border-white/30 shadow-lg shadow-black/30'>

    <div className=' flex flex-col justify-center items-center '>
        <img src={foto} alt="" className='z-1 h-30 text-black w-30'/>
        <h2 className=' text-6xl font-serif text-white  mt-5 mb-5 z-1'>
        Iniciar Sesión
        </h2>
    </div>
    <form   onSubmit={handleLogin} className="flex flex-col gap-10 p-3  items-start justify-center  text-white  w-200 max-w-lg z-1">
        <input placeholder='Ingresa tu email' className=' bg-black/50  rounded-3xl p-3 mt-2 w-full' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder='Ingresa tu contraseña' type="password" value={password} className=' bg-black/50 rounded-3xl p-3 mt-2 w-full' onChange={(e) => setPassword(e.target.value)} />
        <button className='p-4 rounded-3xl shadow-2xl shadow-black text-white bg-black w-full mt-2 cursor-pointer hover:bg-black/98 border border-transparent hover:border-white/90 transition-all duration-100' >Iniciar Sesión</button>
        {error && <p className=' text-red-500 z-1 text-center bg-black/30 rounded-3xl w-full border border-white/50 bolder p-2'>{error}</p>}
        <Link
  to="/registrarse"
  className="text-sm text-white/70 m-2 hover:text-white border-b border-transparent hover:border-white transition-colors duration-300"
>
  Registrarse
</Link>
    </form>
    </div>
  )
}

export default LoginForm