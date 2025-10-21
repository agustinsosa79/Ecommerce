import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid"
import video_backpage from "../../assets/logo-nordik.png"
import { useEffect } from "react"

const SignupForm = () => {

    const { handleRegister, name, setName, nameUser, setNameUser, password, setPassword, email, setEmail, error, setError } = useAuth()


    useEffect(() => {
            if(!error) return
            
            const timer = setTimeout(() =>{
                setError(null)
            }, 5000)
    
            return () => clearTimeout(timer)
        }, [error, setError])
    

  return (
    <div className=" text-white flex flex-col gap-5 z-1 bg-white/10 backdrop-blur-2xl rounded-3xl p-10 w-full max-w-xl h-auto justify-center border border-white/30 shadow-lg shadow-black/30">
        <div className=" flex flex-col justify-center items-center m-5 ">
            <img src={video_backpage} className=" w-30 h-30" alt="" />
            <h2 className=" text-6xl font-serif text-white mt-5 mb-5 z-1">Registrarse</h2>
        </div>
    <form onSubmit={handleRegister} action="" className=" flex flex-col gap-10 w-full">
        <input required className="p-3 bg-black/40 rounded-4xl" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu Email" />
        <input required className="p-3 bg-black/40 rounded-4xl" type="password" name="password" id="password" value={password} onChange={((e) => setPassword(e.target.value))} placeholder="ingesa tú nueva contraseña" />
        <input className="p-3 bg-black/40 rounded-4xl" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ingresa tu nombre completo" />
        <input className="p-3 bg-black/40 rounded-4xl" type="text" name="name_user" id="name_user" value={nameUser} onChange={(e) => setNameUser(e.target.value)} placeholder="Ingresa un nuevo nombre de usuario" />
        <button className=" bg-black shadow-2xl shadow-black cursor-pointer w-full p-4 rounded-4xl border border-transparent hover:border-white/90 transition-all duration-100">Registrarse</button>
        {error && <p className=' text-red-500 z-1 text-center bg-black/30 rounded-3xl w-full border border-white/50 bolder p-2'>{error}</p>}
        <Link to="/login" className="flex flex-row text-white/70 gap-1 w-36 hover:text-white transition-color duration-400 text-sm"><ArrowLeftCircleIcon className="w-5 h-5"/> <span>Ir al incio de sesión</span></Link>
    </form>
    </div>
  )
}

export default SignupForm