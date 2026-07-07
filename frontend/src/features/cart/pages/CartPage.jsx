import { Link } from 'react-router-dom'

import { useCart } from '@/features/cart/hooks/useCart'

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  return (
    <main className="py-8 sm:py-10">
      <section className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-slate-500">
          Pedido
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl">
          Carrinho
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Revise os itens selecionados antes de finalizar o pedido.
        </p>
      </section>

      {cartItems.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <p className="mb-6 text-slate-400">Seu carrinho está vazio.</p>

          <Link
            to="/"
            className="inline-flex rounded-full bg-white px-5 py-2 font-semibold text-black! transition hover:bg-zinc-200"
          >
            Ver produtos
          </Link>
        </div>
      ) : (
        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="grid gap-4 rounded-3xl border border-white/10 bg-white/3 p-4 shadow-2xl shadow-black/20 sm:grid-cols-[96px_1fr] lg:grid-cols-[96px_1fr_auto]"
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div>
                  <h2 className="text-lg font-semibold text-slate-50">
                    {item.productName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Variação: {item.variantName}
                  </p>

                  <p className="mt-2 font-medium text-slate-100">
                    R$ {Number(item.price).toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:col-span-2 lg:col-span-1 lg:justify-end">
                  <div className="flex items-center rounded-full border border-white/10 bg-white/3">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-4 py-2 text-slate-300 transition hover:text-white"
                    >
                      -
                    </button>

                    <span className="min-w-8 text-center text-slate-50">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="px-4 py-2 text-slate-300 transition hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-slate-500 underline transition hover:text-red-300"
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-3xl border border-white/10 bg-white/4 p-6 shadow-2xl shadow-black/20 lg:sticky lg:top-28">
            <h2 className="text-xl font-semibold text-slate-50">Resumo</h2>

            <div className="mt-6 space-y-3 border-b border-white/10 pb-6">
              <div className="flex justify-between text-slate-400">
                <span>Forma de pagamento</span>
                <span>A definir</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Entrega</span>
                <span>A combinar</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="font-ui text-sm font-semibold uppercase tracking-[0.2em] text-[#38bdf8]">
                Valores da peça
              </p>

              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Pix ou dinheiro</span>
                  <span>R$ 50,00</span>
                </div>

                <div className="flex justify-between">
                  <span>Cartão</span>
                  <span>R$ 55,00</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-6 flex w-full justify-center rounded-full bg-white px-5 py-3 font-semibold text-black! transition hover:bg-zinc-200"
            >
              Finalizar pedido
            </Link>

            <button
              type="button"
              onClick={clearCart}
              className="mt-4 w-full text-sm text-slate-500 underline transition hover:text-red-300"
            >
              Limpar carrinho
            </button>
          </aside>
        </section>
      )}
    </main>
  )
}

export default CartPage
