import { useNavigate } from 'react-router-dom';
import foto1 from '../../assets/fotos-categorias/image-1.webp'
import foto2 from '../../assets/fotos-categorias/image-2.webp'
import foto3 from '../../assets/fotos-categorias/image-3.webp'
import foto4 from '../../assets/fotos-categorias/image-4.webp'
import { useEffect } from 'react';
import { animateCategoryImages } from '../../animations/aniamtions';

interface IImage { 
    src: string;
    alt: string;
    title: string;
}

const SectionCategories = ( ) => {
    const navigate = useNavigate()

    const images: IImage[] = [
        {src: `${foto1}`, alt: 'Urban Light', title: 'Urban Light'},
        {src: `${foto3}`, alt: 'Winter Mood', title: 'Winter Mood'},
        {src: `${foto4}`, alt: 'Winter Core', title: 'Winter Core'},
        {src: `${foto2}`, alt: 'Rain Ready', title: 'Rain Ready'},
    ]

    const handleNavigation = () => {
        // Navegar a la página de productos con el filtro aplicado
        navigate('/productos');
      }


      useEffect(() => {
        const categoriesRef = document.querySelectorAll('.category-item') as NodeListOf<HTMLDivElement>;
        animateCategoryImages(categoriesRef);
        setTimeout(() => ScrollTrigger.refresh(), 500);
      },[ ])
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
      </div>
    </div>
  ))}
</div>
    </div>
  )
}

export default SectionCategories