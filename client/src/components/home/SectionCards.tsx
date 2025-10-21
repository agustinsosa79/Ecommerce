import { useEffect, useRef } from "react"
import { useCart } from "../../hooks/useCart"
import { useProducts } from "../../hooks/useProducts"
import type { IProducts } from "../../interfaces/IProducts"
import ProductCard from "../ProductCard"
import  Slider  from 'react-slick'
import { animateProductCards } from "../../animations/animations"


const SectionCards = () => {
    const { products } = useProducts()
    const { addToCart } = useCart()
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
  if (!sectionRef.current) return;

  const observer = new MutationObserver(() => {
    const cards = sectionRef.current?.querySelectorAll('.product-slide') as NodeListOf<HTMLDivElement>;
    if (cards && cards.length > 0) {
      animateProductCards(cards);
      console.log(
      cards,
        'Animación de tarjetas de productos activada'
      );
      observer.disconnect(); 
    }
  });

  observer.observe(sectionRef.current, { childList: true, subtree: true });

  return () => observer.disconnect();
}, [products]);
     const settings = {
    dots: true,
    lazyload: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };



  return (
    <div className=" flex flex-col justify-center-safe items-start mt-30 w-full ">
    <h2 className=" font-serif font-semibold text-2xl mt-12 ml-16 p-0 text-white">Agregados Recientemente </h2>
    <div className=" gap-10 m-10 w-[95%] h-full" ref={sectionRef}>
    <Slider {...settings}>
        {products.map((p: IProducts) => (
          <div key={p._id} className="product-slide px-5 py-10">
          <ProductCard key={p._id}>
            <ProductCard.Image src={p.image} alt={p.name}>
            <ProductCard.Button onClick={() => addToCart(p._id, 1)}>Añadir Al Carrito</ProductCard.Button>
            </ProductCard.Image>
            <ProductCard.Info name={p.name} price={p.price}  />
          </ProductCard>
          </div>
        ))}
        </Slider>
      </div>
    </div>
  )
}

export default SectionCards