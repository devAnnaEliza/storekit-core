import { CartProvider } from '@/features/cart/context/CartContext'

export function Providers({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}