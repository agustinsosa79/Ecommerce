import { useAuth } from "../../hooks/useAuth";





const Login =  () => {
  const {handleLogin, setEmail, setPassword, email, password} = useAuth()

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="bg-black p-3 text-white" type="submit">Iniciar sesión</button>
        

    </form>
  )
}

export default Login