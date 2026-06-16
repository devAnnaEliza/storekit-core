import { Link, Outlet } from 'react-router-dom'

import { storeConfig } from '../config/store/store.config'
import { useCart } from '@/features/cart/hooks/useCart'

function StoreLayout() {
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="relative flex items-center">
            <span className="absolute inset-0 rounded-full bg-white/30 blur-xl" />

            <img
              src={storeConfig.brand.logo}
              alt={storeConfig.brand.name}
              className="relative h-14 w-auto object-contain"
            />
          </Link>

          <Link
            to="/cart"
            className="font-ui rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:border-[#ea8506] hover:text-[#ea8506]"
          >
            Carrinho ({totalItems})
          </Link>
        </nav>
      </header>

      <main className="mx-auto min-h-[calc(100vh-81px)] max-w-6xl px-5 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default StoreLayout
