import { useEffect, useRef } from "react";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import type { IProducts } from "../../interfaces/IProducts";
import ProductCard from "../ProductCard";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { animateProductCards } from "../../animations/animations";

const SectionCards = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);


  const sliderRef = useRef<Slider>(null);

// Tipar innerSlider parcialmente
interface InnerSliderType {
  onWindowResized?: () => void;
}

// ...

useEffect(() => {
  if (!sliderRef.current) return;

  const timer = setTimeout(() => {
    // Forzar recalculo interno del slider
    const slider = sliderRef.current as unknown as { innerSlider?: InnerSliderType };
    slider.innerSlider?.onWindowResized?.();
  }, 100);

  return () => clearTimeout(timer);
}, [products]);

useEffect(() => {
  const handleResize = () => {
    const slider = sliderRef.current as unknown as { innerSlider?: InnerSliderType };
    slider.innerSlider?.onWindowResized?.();
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  
  // Animaciones
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new MutationObserver(() => {
      const cards = sectionRef.current?.querySelectorAll(
        ".product-slide"
      ) as NodeListOf<HTMLDivElement>;
      if (cards && cards.length > 0) {
        animateProductCards(cards);
        observer.disconnect();
      }
    });
    observer.observe(sectionRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [products]);

  const settings: Settings = {
    dots: true,
    lazyLoad: "ondemand",
    infinite: products.length > 1,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: false,
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="mt-10 w-full">
      <h2 className="font-serif font-semibold text-3xl md:text-2xl mt-12 m-5 md:ml-16 p-0 text-white">
        Agregados Recientemente
      </h2>
      <div className="w-full md:m-10 md:w-[95%]" ref={sectionRef}>
        <Slider {...settings}>
          {products.map((p: IProducts) => (
            <div
              key={p._id}
              className="product-slide block w-full h-full px-2 py-4 md:px-5 md:py-10"
            >
              <ProductCard>
                <ProductCard.Image src={p.image} alt={p.name}>
                  <ProductCard.Button onClick={() => addToCart(p._id, 1)}>
                    Añadir Al Carrito
                  </ProductCard.Button>
                </ProductCard.Image>
                <ProductCard.Info name={p.name} price={p.price} />
              </ProductCard>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SectionCards;
