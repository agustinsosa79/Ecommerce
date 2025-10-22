import SignupForm from "../../components/login/SignupForm"
import video_back from "../../assets/video-backpage-2.webm"

const SignUp = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-y-hidden" >
      <video
      src={video_back}
      autoPlay
      muted
      loop
      className="w-full absolute h-screen object-cover top-0 left-0 z-0"
      />
      <SignupForm />
    </div>
  )
}

export default SignUp