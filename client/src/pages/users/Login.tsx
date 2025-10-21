import LoginForm from "../../components/login/LoginForm";
import foto from "../../assets/video-backpage-2.webm"





const Login =  () => {

  

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-y-hidden" >
      <div className="overlay-left-login fixed top-0 left-0 w-1/2 h-full bg-black z-50 translate-x-[-1000px]" />
      <div className="overlay-right-login fixed top-0 right-0 w-1/2 h-full bg-black z-50 -translate-x-[-1000px]" />
      <video
      src={foto}
      autoPlay
      muted
      loop
      className="w-full absolute h-screen object-cover top-0 left-0 z-0"
      />
      <LoginForm />
    </div>
  )
}

export default Login