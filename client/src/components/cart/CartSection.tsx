import { useEffect, useRef } from "react"
import { useCart } from "../../hooks/useCart"
import gsap from "gsap"
import { useNavigate } from "react-router-dom"

const CartSection = () => {
  const { cart, removeItemFromCart, updateItemFromCart, totalItem, removeCart } = useCart()
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const navigate = useNavigate()
  

  const formatTotal = () => {
    const price = cart?.products.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) || 0

    const formater = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    })

    return formater.format(price)
  }

  const formatPrice = (price: number) => {
    
    const formater = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    })

    return formater.format(price)
  }





  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      containerRef.current,
      { x: "100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )

    gsap.fromTo(
      itemsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.3,
      }
    )
  })

  // Cleanup
  return () => ctx.revert()
}, [])

  const handleRemove = (id: string, index: number) => {
    const el = itemsRef.current[index]
    if (el) {
      gsap.to(el, {
        opacity: 0,
        x: 50,
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => { removeItemFromCart(id); },
      })
    }
  }
  const handleRemoveComplete = () => {
    if (!cart) return;
    removeCart();
  }

  const handleNavigation = () => {
    navigate('/inicio')
  }

  return (
    <div className="fixed top-0 right-0 w-full h-screen bg-zinc-950 text-white shadow-2xl flex flex-col p-6 overflow-y-auto" ref={containerRef}>
      <h2 className="text-2xl font-semibold mb-6 border-b border-zinc-700 pb-3">
        Tu carrito <span className="text-zinc-400">({totalItem})</span>
      </h2>

      {cart?.products.length ? (
        <div className="flex flex-col gap-5">
          {cart.products.map((item, i) => (
            <div
              key={item._id}
              ref={(el) => {
                if (el) itemsRef.current[i] = el
              }}
              className="flex items-center gap-4 p-3 bg-zinc-900 rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
            >
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-20 h-20 object-cover rounded-xl"
              />

              <div className="flex flex-col flex-1">
                <p className="font-semibold">{item.productId.name}</p>
                <p className="text-sm text-zinc-400">{formatPrice(item.productId.price)}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="w-7 h-7 cursor-pointer bg-zinc-800 rounded-md flex justify-center items-center hover:bg-zinc-700"
                    onClick={() =>
                      updateItemFromCart(item.productId._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="w-7 h-7 cursor-pointer bg-zinc-800 rounded-md flex justify-center items-center hover:bg-zinc-700"
                    onClick={() =>
                      updateItemFromCart(item.productId._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="text-red-400 hover:text-red-500 text-sm font-semibold cursor-pointer"
                onClick={() => handleRemove(item.productId._id, i)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-zinc-400 text-lg">Tu carrito está vacío 🛒</p>
        </div>
      )}

      {(cart?.products && cart.products.length > 0) ? (
        <div className="mt-auto border-t border-zinc-800 pt-4 ">
          <div className="flex justify-start mt-3 mb-3 items-center w-full">
          <button className="p-3 cursor-pointer bg-red-600 rounded-xl hover:bg-zinc-950 hover:text-red-600 border-2 border-transparent hover:border-red-700 bolder transition-all duration-300" onClick={handleRemoveComplete}>Eliminar carrito</button>
          </div>
          <p className="text-lg font-medium mb-3">
            Total:{" "}
            <span className="text-zinc-300">
              {formatTotal()}
            </span>
          </p>
          <div className="flex flex-row gap-5">
          <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-zinc-200 transition-colors cursor-pointer">
            Finalizar compra
          </button>
          <button onClick={handleNavigation} className="w-full bg-zinc-800 py-3 rounded-xl font-semibold hover:bg-zinc-500 cursor-pointer">
            Volver al inicio
          </button>
          </div>
        </div>
      ):  <button onClick={handleNavigation} className="w-full bg-zinc-800 py-3 rounded-xl font-semibold hover:bg-zinc-500 cursor-pointer">
            Volver al inicio
      </button>}
      
      
      </div>
  )
}

export default CartSection
