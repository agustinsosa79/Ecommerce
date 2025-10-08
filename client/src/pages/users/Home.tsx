import Navbar from "../../components/home/Navbar"
import Hero from "../../components/home/Hero"
import { useEffect } from "react"
import { animateOverlayTransition } from "../../animations/aniamtions"
import SectionCards from "../../components/home/SectionCards"



const Home = () => {


  useEffect(() => {
    animateOverlayTransition()
  }, [])
  

 

  return (
    <main className="realtive overflow-hidden">
      <div className="overlay-left fixed top-0 left-0 w-1/2 h-full bg-black z-50" />
      <div className="overlay-right fixed top-0 right-0 w-1/2 h-full bg-black z-50" />
    <Navbar />
    <Hero title="Invierno cálido, estilo seguro." linkText="Explorar" linkTo="/productos" />
      <SectionCards />
</main>
  )
}

export default Home