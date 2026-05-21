import { useEffect, useState } from 'react'

import { CartContext } from '@/features/cart/context/cart-context'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('storekit-cart')

    return storedCart ? JSON.parse(storedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('storekit-cart', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product, variant) {
    const newItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      image: product.image,
      price: product.price,
      variantId: variant.id,
      variantName: variant.name,
      quantity: 1,
    }

    setCartItems((prev) => [...prev, newItem])
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}