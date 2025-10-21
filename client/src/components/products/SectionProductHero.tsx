import { useEffect, useRef } from 'react'
import banner from '../../assets/producto_page_imagen.webp'
import { animateBanner, animateTitles } from '../../animations/animations'
import { ArrowDownIcon } from '@heroicons/react/16/solid'


const SectionProductHero = () => {
const bannerRef = useRef<HTMLDivElement | null>(null)

const titlesRef = useRef<HTMLDivElement | null>(null)



useEffect(() => {
  if(bannerRef.current){
    animateBanner(bannerRef.current)
  }
  if (titlesRef.current) {
    animateTitles(titlesRef.current)
  }
}, [])
  return (
    <section
  ref={bannerRef}
  className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white font-serif shadow-lg"
>
  <img
    src={banner}
    alt="Banner de invierno"
    className="absolute inset-0 h-full w-full object-cover opacity-80"
  />

  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>

  <div
    ref={titlesRef}
    className="relative z-10 flex flex-col items-center text-center"
  >
    <h1 className="text-6xl md:text-8xl font-bold tracking-wide drop-shadow-lg">
      TIENDA
    </h1>
    <p className="mt-4 text-2xl md:text-3xl italic opacity-90">
      Tu invierno, tu estilo.
    </p>
    <ArrowDownIcon className='w-10 h-full relative top-80 animate-bounce' />
  </div>
</section>

  )
}

export default SectionProductHero