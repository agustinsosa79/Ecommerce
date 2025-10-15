import banner from '../../assets/producto_page_imagen.webp'


const SectionProductHero = () => {
  return (
    <section className='w-full z-50 h-screen flex justify-center items-center font-serif font-bolder text-white shadow-b-2xl shadow-black'>
    <div className=' flex flex-col w-full justify-center items-center -mt-15  '>
    <img src={banner} className='flex absolute w-full object-cover z-0 h-3/4  '  alt="" />
    <div className=' z-1 flex flex-col justify-start items-center gap-5'>
    <h1 className='text-8xl z-1 mr-20'>TIENDA</h1>
    <p className='text-3xl mr-25'>Tú invierno, tú estilo.</p>
    </div>
    </div>
  </section>
  )
}

export default SectionProductHero