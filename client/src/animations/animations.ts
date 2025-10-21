import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)


export const animateNavbar = (navRef: HTMLDivElement | null) => {
    let lastScroll = 0
    const currentScroll = window.scrollY
    if(!navRef) return
     if (currentScroll > lastScroll && currentScroll > 50) {
        // Scroll hacia abajo → ocultar navbar
        gsap.to(navRef, { y: "-100%", duration: 0.3, ease: "power2.out" });
      } else {
        // Scroll hacia arriba → mostrar navbar
        gsap.to(navRef, { y: "0%", duration: 0.3, ease: "power2.out" });
      }

      lastScroll = currentScroll;
    gsap.fromTo(
        navRef,
        {y: -80, opacity: 0},
        {y:0, opacity: 1, duration: 0.8, ease: "power1.out"}
      )
}

export const createNavbarScrollHandler = (navRef: HTMLDivElement | null) => {
  if (!navRef) return () => {};
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 50) {
      gsap.to(navRef, { y: "-100%", duration: 0.7, ease: "power1.out" });
    } else {
      gsap.to(navRef, { y: "0%", duration: 0.7, ease: "power1.out" });
    }
    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
};

export const animateNavbarLinks = ( linksRef: NodeListOf<HTMLAnchorElement>| undefined) => {
      if(linksRef){
        gsap.fromTo(
          linksRef,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.inOut" }
        )
      }
}



export const animateFloatingPlusOne = (icon: HTMLAnchorElement | null) => {
  if (!icon) return
  const bounds = icon.getBoundingClientRect()
  const floatNum = document.createElement("div")
  floatNum.textContent = "+1"
  Object.assign(floatNum.style, {
    position: "absolute",
    left: `${window.scrollX + bounds.left + 0}px`,
    top: `${window.scrollY + bounds.top - 5}px`,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    pointerEvents: "none",
    zIndex: "999",
    textShadow: "0 0 6px rgba(0,0,0,0.4)",
  })
  document.body.appendChild(floatNum)

  gsap.fromTo(
    floatNum,
    { y: -10, opacity: 1, scale: 1 },
    {
      y: -50,
      opacity: 0,
      scale: 0.6,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => floatNum.remove(),
    }
  )
}





export const animateCartCounter = (counter: HTMLDivElement | null) => {
  if (!counter) return
  gsap.fromTo(
    counter,
    { scale: 0.7, opacity: 0.8 },
    { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
  )
}



export const animateOverlayTransition = () => {
  const tl = gsap.timeline()
  tl.set(".overlay-left", { x: 0, opacity: 1 })
  tl.set(".overlay-right", { x: 0, opacity: 1 })
  tl.to(".overlay-left", { x: "-100%", duration: 1.32, ease: "circ.inOut", opacity: 1 })
  tl.to(".overlay-right", { x: "100%", duration: 1.32, ease: "circ.inOut", opacity: 1 }, "<")
}



export const heroAnimation = (hero: HTMLDivElement | null) => {
  gsap.fromTo(hero, { scale: 0, opacity: 0, duration: 2,}, {scale:1, opacity: 1, duration: 1.3, ease: "back.inOut"})
}



export const animateOverlayTransitionLogin = (): Promise<void> => {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => resolve() // cuando termine la animación, resolvemos la Promise
    })

    tl.to(".overlay-left-login", { x: "-0%", duration: 1.32, ease: "circ.inOut", opacity: 1 })
    tl.to(".overlay-right-login", { x: "0%", duration: 1.32, ease: "circ.inOut", opacity: 1 }, "<")
  })
}

export const animateProductCards = (cardsRef: NodeListOf<HTMLDivElement> | undefined) => {
  if (!cardsRef || cardsRef.length === 0) return;

  const triggerElement = cardsRef[0]?.parentElement;
  if (!triggerElement) return;

  gsap.from(
    cardsRef,
    {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.inOut", 
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 110%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

export const animateCategoryImages = (imagesRef: NodeListOf<HTMLDivElement> | undefined) => {
  if (!imagesRef || imagesRef.length === 0) return;
  
  
  gsap.set(imagesRef, { opacity: 0, y: 100 });

  gsap.to(imagesRef, {
    opacity: 1,
    y: 0,
    duration: 2,
    stagger: 0.15,
    ease: "power3.inOut",
    scrollTrigger: {
  trigger: imagesRef[0]?.parentElement,
  start: "top 96%",
  once: true,
},
  });
};



export const animateFooter = (footerRef: HTMLDivElement | null) => {
  if (!footerRef) return;

  gsap.fromTo(
    footerRef,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef,
        start: "top 100%", 
        toggleActions: "play reverse", 
      },
    }
  );
};


export const animateBanner = (bannerRef: HTMLDivElement | HTMLVideoElement  | null) => {
  if(!bannerRef) return 
  gsap.fromTo(
    bannerRef,
    {opacity: 0, y: -100, x:0},
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease:  "power4.inOut"
    }
  )
}


export const animateTitles = (titlesRef: HTMLDivElement | null) => {

  if (!titlesRef) return

  gsap.fromTo(
    titlesRef,
    {opacity: 0, y: -100, x: 0},
    {
      opacity:1,
      y: 0,
      x: 0,
      duration: 1.2,
      ease: "sine.inOut",
    }
  )

}

export const animateProductSection = (productsRef: HTMLDivElement[] | null) => {
    if(!productsRef) return

    gsap.fromTo(
        productsRef,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        }
      )
}