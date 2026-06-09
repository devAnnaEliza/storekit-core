import { Link, Outlet } from 'react-router-dom'

import { storeConfig } from '../config/store/store.config'
import { useCart } from '@/features/cart/hooks/useCart'

function StoreLayout() {
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen text-[#000000]">
      <header className="sticky top-0 z-50 border-b border-[#00174e]/10 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            {storeConfig.brand.logo && (
              <img
                src={storeConfig.brand.logo}
                alt={storeConfig.brand.name}
                className="h-16 w-auto object-contain"
              />
            )}

            <div>
              <span className="block text-lg font-bold tracking-tight text-[#00174e] sm:text-xl">
                {storeConfig.brand.name}
              </span>
              <span className="hidden text-xs text-[#6e6969] sm:block">
                {storeConfig.brand.tagline}
              </span>
            </div>
          </Link>

          <Link
            to="/cart"
            className="rounded-full border border-[#00174e]/15 bg-[#00174e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#ea8506]"
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