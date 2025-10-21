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
}

const SectionCategories = ( ) => {
    const navigate = useNavigate()

    const images: IImage[] = [
        {src: `${foto1}`, alt: 'Urban Light', title: 'Urban Light', description: 'Inspirada en la energía de la ciudad, esta colección combina abrigo y estilo sin esfuerzo. Tonos neutros, texturas suaves y cortes modernos que se adaptan al ritmo urbano, sin perder calidez ni elegancia.'},
        {src: `${foto3}`, alt: 'Winter Mood', title: 'Winter Mood', description: 'Prendas que capturan la esencia del invierno: cómodas, versátiles y con un aire nostálgico. Perfectas para los días fríos donde el estilo también necesita un poco de abrigo emocional.'},
        {src: `${foto4}`, alt: 'Winter Core', title: 'Winter Core', description: 'Una colección que redefine la elegancia invernal. Con cortes clásicos y una paleta de colores atemporales, cada prenda es una declaración de estilo y sofisticación.'},
        {src: `${foto2}`, alt: 'Rain Ready', title: 'Rain Ready', description: 'Prepárate para la lluvia con estilo. Esta colección combina funcionalidad y moda, asegurando que cada gota de lluvia sea una oportunidad para brillar.'},
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
    <div className='w-full h-auto flex flex-col justify-center items-center  my-50 '>
        <h2 className='text-4xl text-white font-serif'>Categorias destacadas</h2>
    
    <div className='w-full grid grid-cols-2 justify-center items-center gap-20 p-35'>
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
        className="w-250 h-200 object-cover rounded transition-transform duration-500 group-hover:scale-105" 
      />

      {/* Gradiente + título */}
      <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-start bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h3 className="text-4xl font-serif text-white mb-6 ml-5 p-10 translate-y-5 group-hover:translate-y-0 transition-all duration-500">
          {image.title}
        </h3>
        <p className="text-md text-white mb-6 ml-5 p-10 translate-y-5 group-hover:translate-y-0 transition-all duration-500">
          {image.description}
        </p>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}

export default SectionCategories