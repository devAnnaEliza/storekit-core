import { useContext } from 'react'
import { Link } from 'react-router'

import { CartContext } from '@/features/cart/context/cart-context'
import { storeConfig } from '@/config/store/store.config'

export default function CheckoutPage() {
  const { cartItems, subtotal } = useContext(CartContext)

  const itemsMessage = cartItems
    .map(
      (item) =>
        `- ${item.productName} | ${item.variantName} | Qtd: ${item.quantity} | R$ ${Number(item.price).toFixed(2)}`,
    )
    .join('\n')

  const whatsappMessage = `Olá! Quero finalizar este pedido na ${storeConfig.brand.name}:

${itemsMessage}

Total: R$ ${subtotal.toFixed(2)}`

  const whatsappUrl = `https://wa.me/${storeConfig.contact.whatsapp}?text=${encodeURIComponent(
    whatsappMessage,
  )}`

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Checkout
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Seu carrinho está vazio
        </h1>

        <p className="mt-3 max-w-md text-zinc-400">
          Adicione produtos ao carrinho antes de finalizar seu pedido.
        </p>

        <Link
          to="/"
          className="mt-8 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Ver produtos
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Checkout
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Finalizar pedido
        </h1>

        <p className="mt-3 text-zinc-400">
          Revise os itens antes de enviar seu pedido pelo WhatsApp.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={`${item.productId}-${item.variantId}`}
              className="rounded-2xl border border-white/10 bg-white/3 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium">{item.productName}</h2>

                  <p className="mt-1 text-sm text-zinc-400">
                    {item.variantName}
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    Quantidade: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  R$ {(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-white/10 bg-white/4 p-5">
          <h2 className="text-lg font-semibold">Resumo do pedido</h2>

          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-zinc-400">Subtotal</span>

            <span>R$ {subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>

              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black! transition hover:bg-zinc-200"
          >
            Enviar pelo WhatsApp
          </a>

          <Link
            to="/cart"
            className="mt-4 block text-center text-sm text-zinc-400 transition hover:text-white"
          >
            Voltar ao carrinho
          </Link>
        </aside>
      </div>
    </section>
  )
}