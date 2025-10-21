import Hero from "../../components/home/Hero"
import { useEffect } from "react"
import { animateOverlayTransition } from "../../animations/animations"
import SectionCards from "../../components/home/SectionCards"
import SectionCategories from "../../components/home/SectionCategories"
import { ScrollTrigger } from "gsap/all"



 const Home = () => {

    useEffect(() => {
    // Siempre que se monta Home:
    // 1️⃣ Mover scroll arriba
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // 2️⃣ Ejecutar animación de overlay
    animateOverlayTransition();

    // 3️⃣ Refrescar ScrollTrigger después de pintar todo
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);
 

  return (
    <main className="realtive overflow-hidden ">
      <div className="overlay-left fixed top-0 left-0 w-1/2 h-full bg-black z-50" />
      <div className="overlay-right fixed top-0 right-0 w-1/2 h-full bg-black z-50" />
    <Hero title="Invierno cálido, estilo seguro." linkText="Explorar" linkTo="/productos" />
      <SectionCards />
      <SectionCategories />
</main>
  )
}

export default Home