import { useEffect, useRef, useMemo } from "react";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import type { IProducts } from "../../interfaces/IProducts";
import ProductCard from "../ProductCard";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { animateProductCards } from "../../animations/animations";

const SectionCards = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);

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


  const initialSlides = window.innerWidth <= 480 ? 1 :
                      window.innerWidth <= 600 ? 2 :
                      window.innerWidth <= 768 ? 2 : 
                      window.innerWidth <= 1025 ? 2 : 4;

  // Memorizar settings para evitar que cambien en cada render
  const settings: Settings = useMemo(() => ({
    dots: true,
    lazyLoad: "ondemand",
    infinite: true,
    speed: 500,
    slidesToShow: initialSlides,
    slidesToScroll: 1,
    arrows: initialSlides > 3 ? true : false,
    cssEase: "linear",
    centerMode: false,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1025, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }), [initialSlides]);

  // Forzar recalculo del slider al montar o cambiar productos
  useEffect(() => {
    if (!sliderRef.current || products.length === 0) return;

    const handleResize = () => {
      const slider = sliderRef.current as unknown as {
        innerSlider?: { onWindowResized?: () => void };
      };
      slider.innerSlider?.onWindowResized?.();
    };

    handleResize(); // recalculo inmediato
    const timer = setTimeout(handleResize, 100); // asegurar que React Slick monte todo

    return () => clearTimeout(timer);
  }, [products]);

  // Escuchar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (!sliderRef.current) return;
      const slider = sliderRef.current as unknown as {
        innerSlider?: { onWindowResized?: () => void };
      };
      slider.innerSlider?.onWindowResized?.();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debug
  useEffect(() => {
    console.log("Settings que se pasan al Slider:", settings);
    console.log("Viewport width:", window.innerWidth);
    console.log("Productos:", products.length);
  }, [settings, products]);

  return (
    <div className="mt-10 w-full">
      <h2 className="font-serif font-semibold text-3xl md:text-2xl mt-12 m-5 md:ml-16 p-0 text-white">
        Agregados Recientemente
      </h2>
      <div className="w-full lg:m-10 md:m-4 p-10  lg:p-0 md:p-0 md:w-[95%]" ref={sectionRef}>
        <Slider ref={sliderRef} {...settings}>
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
