import { Link, Outlet } from 'react-router-dom'

import { storeConfig } from '../config/store/store.config'
import { useCart } from '@/features/cart/hooks/useCart'

function StoreLayout() {
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-(--color-background) text-(--color-text)">
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-surface) backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
            <Link
              to="/"
              aria-label={`Ir para ${storeConfig.brand.name}`}
              className="flex items-center"
            >
              {storeConfig.brand.logo ? (
                <img
                  src={storeConfig.brand.logo}
                  alt={storeConfig.brand.name}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="font-heading text-xl font-semibold text-(--color-brand-primary)">
                  {storeConfig.brand.name}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label={`Carrinho com ${totalItems} item${totalItems === 1 ? '' : 's'}`}
              className="flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-5 py-2 text-sm font-medium text-(--color-brand-primary) transition-colors duration-200 hover:border-(--color-brand-accent) hover:text-(--color-brand-accent)"
            >
              <span>Carrinho</span>

              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-(--color-brand-primary) px-2 text-xs font-semibold text-white">
                {totalItems}
              </span>
            </Link>
          </nav>
      </header>

      <main className="mx-auto min-h-[calc(100vh-80px)] max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default StoreLayout