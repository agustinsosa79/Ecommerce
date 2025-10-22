import { useNavigate } from 'react-router-dom';
import foto1 from '../../assets/fotos-categorias/image-1.webp'
import foto2 from '../../assets/fotos-categorias/image-2.webp'
import foto3 from '../../assets/fotos-categorias/image-3.webp'
import foto4 from '../../assets/fotos-categorias/image-4.webp'
import { useEffect } from 'react';
import { animateCategoryImages } from '../../animations/animations';
import { ScrollTrigger } from 'gsap/all';

interface IImage { 
    src: string;
    alt: string;
    title: string;
    description?: string;

    shortDescription?: string;
}

const SectionCategories = ( ) => {
    const navigate = useNavigate()

    const images: IImage[] = [
        {src: `${foto1}`, alt: 'Urban Light', title: 'Urban Light', description: 'Inspirada en la energía de la ciudad, esta colección combina abrigo y estilo sin esfuerzo. Tonos neutros, texturas suaves y cortes modernos que se adaptan al ritmo urbano, sin perder calidez ni elegancia.', shortDescription: 'Moda urbana con estilo y calidez.'},
        {src: `${foto3}`, alt: 'Winter Mood', title: 'Winter Mood', description: 'Prendas que capturan la esencia del invierno: cómodas, versátiles y con un aire nostálgico. Perfectas para los días fríos donde el estilo también necesita un poco de abrigo emocional.', shortDescription: 'Comodidad y estilo para el invierno.'},
        {src: `${foto4}`, alt: 'Winter Core', title: 'Winter Core', description: 'Una colección que redefine la elegancia invernal. Con cortes clásicos y una paleta de colores atemporales, cada prenda es una declaración de estilo y sofisticación.', shortDescription: 'Elegancia atemporal para el invierno.'},
        {src: `${foto2}`, alt: 'Rain Ready', title: 'Rain Ready', description: 'Prepárate para la lluvia con estilo. Esta colección combina funcionalidad y moda, asegurando que cada gota de lluvia sea una oportunidad para brillar.', shortDescription: 'Estilo y funcionalidad bajo la lluvia.'},
    ]

    const handleNavigation = () => {
        // Navegar a la página de productos con el filtro aplicado
        navigate('/productos');
      }


     useEffect(() => {
  const categoriesRef = document.querySelectorAll('.category-item') as NodeListOf<HTMLDivElement>;
  animateCategoryImages(categoriesRef);

  const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 600);

  return () => {
    clearTimeout(refreshTimer);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
  return (
    <div className='w-full h-auto flex flex-col justify-center items-center  p-5 my-8  md:my-50 '>
        <h2 className='md:text-4xl text-3xl text-center text-white font-serif'>Categorias Destacadas</h2>
    
    <div className='w-full grid grid-cols-2 justify-center items-center gap-3 m-10 md:gap-20 md:p-35'>
  {images.map((image) => (
    <div
    onClick={handleNavigation}
  key={image.src}
  className="category-item cursor-pointer relative group h-full border shadow-2xl shadow-black border-b-4 transition-all duration-500 hover:border-b-white overflow-hidden  translate-y-8 transition-none"
>
      {/* Imagen */}
      <img 
        src={image.src} 
        alt="categoria" 
        loading='lazy'
        className="md:w-250 w-full h-90 md:h-200 object-cover rounded transition-transform duration-500 group-hover:scale-105" 
      />
      {/* Gradiente + título */}
      <div className="absolute inset-0 left-0 top-50 md:top-0 md:mask-t-from-10% opacity-80  mask-t-from-90% bg-black md:bottom-0 md:left-0 w-full h-full flex flex-col md:flex-row md:items-end justify-start bg-gradient-to-t from-black/70 via-black/50 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h3 className="md:text-4xl font-serif text-white mb-6 md:ml-5 p-2 md:p-10 translate-y-5 group-hover:translate-y-0 transition-all duration-500">
          {image.title}
        </h3>
        <p className="md:text-md text-xs md:text-sm p-2 hidden md:block text-white mb-6 md:ml-5 md:p-10 translate-y-5 group-hover:translate-y-0 transition-all duration-500">
          {image.description}
        </p>
        <p className="md:text-md text-xs m-2 md:hidden block text-white  md:ml-5 md:p-10 translate-y-5 group-hover:translate-y-0 transition-all duration-500">
          {image.shortDescription}
        </p>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}

export default SectionCategories