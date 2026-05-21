import { useContext } from 'react'

import { CartContext } from '@/features/cart/context/cart-context'

export function useCart() {
  return useContext(CartContext)
}