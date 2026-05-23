import { Link, Outlet } from 'react-router-dom'

import { storeConfig } from '../config/store/store.config'
import { useCart } from '@/features/cart/hooks/useCart'

function StoreLayout() {
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen text-slate-50">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="group">
            <span className="block text-lg font-bold tracking-tight sm:text-xl">
              {storeConfig.brand.name}
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              Storefront demo
            </span>
          </Link>

          <Link
            to="/cart"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
          >
            Carrinho ({totalItems})
          </Link>
        </nav>
      </header>

      <main className="mx-auto min-h-[calc(100vh-73px)] max-w-6xl px-5 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default StoreLayout