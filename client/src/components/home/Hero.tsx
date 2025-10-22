import { Link } from 'react-router-dom'
import video from '../../assets/video-backpage.webm'
import { useEffect, useRef } from 'react'
import { animateBanner, heroAnimation } from '../../animations/animations'

const Hero = ({title, linkText, linkTo} : {title: string, linkText: string, linkTo: string}) => {
    const heroRef = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        heroAnimation(heroRef.current)
        animateBanner(imageRef.current)
      
    }, [])


  return (
    <div className="relative h-150 md:h-screen flex items-center justify-center mask-b-from-70%">
    <video
  className="absolute top-0 left-0 w-full h-full object-cover -z-10"
  autoPlay
  muted
  loop
  playsInline
  preload='metadata'
>
  <source src={video} type="video/webm" />
</video>
    <div ref={heroRef} className=" flex flex-col justify-start items-center gap-5">
    <h1 className=" font-bold  text-white text-5xl  md:text-7xl p-10 font-serif  ">{title}</h1>
    <Link to={linkTo} className="text-white md:text-2xl border-b-2   border-transparent  font-serif hover:border-white animate-pulse transition-all duration-200 ">{linkText}</Link>
    </div>
    </div>
  )
}

export default Hero