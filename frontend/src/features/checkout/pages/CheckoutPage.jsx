import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { storeConfig } from '@/config/store/store.config'
import { CartContext } from '@/features/cart/context/cart-context'
import { createOrder } from '@/features/checkout/services/orders.service'

const CARD_PRICE = 55

export default function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function buildWhatsappMessage(order) {
    const itemsMessage = order.items
      .map(
        (item) =>
          `- ${item.product_name}
    Tamanho: ${item.variant_name}
    Quantidade: ${item.quantity}`,
      )
      .join('\n\n')

    return `Olá! Quero finalizar minha reserva na ${storeConfig.brand.name}.

Pedido: ${order.order_number}

${itemsMessage}

Forma de pagamento:
- Dinheiro/Pix: R$ 50,00
- Cartão: R$ 55,00`
  }

  async function handleSendOrder() {
    try {
      setIsSubmitting(true)
      setErrorMessage('')

      const order = await createOrder(cartItems)
      const whatsappMessage = buildWhatsappMessage(order)

      const whatsappUrl = `https://wa.me/${storeConfig.contact.whatsapp}?text=${encodeURIComponent(
        whatsappMessage,
      )}`

      clearCart()
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    } catch (error) {
      const detail = error?.response?.data?.detail

      setErrorMessage(
        detail ||
          'Não foi possível finalizar a reserva. Verifique os itens e tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-2xl flex-col items-center justify-center px-6 py-10 text-center">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.35em] text-[#ea8506]">
          Checkout
        </p>

        <h1 className="font-brand mt-4 text-4xl font-normal tracking-wide text-white sm:text-5xl">
          Carrinho vazio
        </h1>

        <p className="font-body mt-4 max-w-md text-sm leading-7 text-white/65">
          Adicione a camisa ao carrinho antes de finalizar sua reserva.
        </p>

        <Link
          to="/"
          className="font-ui mt-8 rounded-full bg-[#ea8506] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d97800]"
        >
          Voltar para a loja
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8 sm:py-6 lg:py-7">
      <Link
        to="/cart"
        className="font-ui mb-8 inline-flex text-sm font-medium text-white/60 transition hover:text-[#ea8506]"
      >
        ← Voltar ao carrinho
      </Link>

      <section className="mb-6">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.35em] text-[#ea8506]">
          Checkout
        </p>

        <h1 className="font-brand mt-3 text-4xl font-normal tracking-wide text-white sm:text-5xl lg:text-6xl">
          Finalizar reserva
        </h1>

        <p className="font-body mt-4 max-w-2xl text-base leading-8 text-white/65">
          Confira os detalhes antes de enviar sua reserva para atendimento via
          WhatsApp.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={`${item.productId}-${item.variantId}`}
              className="rounded-[1.75rem] border border-white/10 bg-white/4 p-5 backdrop-blur-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-ui text-xs font-semibold uppercase tracking-[0.25em] text-[#ea8506]">
                    Produto
                  </p>

                  <h2 className="font-ui mt-2 text-lg font-semibold text-white">
                    {item.productName}
                  </h2>

                  <div className="font-body mt-3 space-y-1 text-sm text-white/60">
                    <p>Tamanho: {item.variantName}</p>
                    <p>Quantidade: {item.quantity}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-left sm:text-right">
                  <p className="font-body text-xs text-white/45">
                    Valor unitário
                  </p>

                  <p className="font-ui mt-1 text-base font-semibold text-white">
                    R$ {Number(item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:sticky lg:top-28">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.25em] text-[#ea8506]">
            Cia Roccart
          </p>

          <h2 className="font-ui mt-3 text-xl font-semibold text-white">
            Detalhes da reserva
          </h2>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/4 p-4">
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Valores conforme pagamento
            </p>

            <div className="font-body mt-4 space-y-3 text-sm text-white/70">
              <div className="flex justify-between gap-4">
                <span>Pix ou dinheiro</span>
                <span className="font-ui font-semibold text-white">
                  R$ {Number(cartItems[0]?.price || 50).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Cartão</span>
                <span className="font-ui font-semibold text-white">
                  R$ {CARD_PRICE.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <p className="font-body mt-5 text-xs leading-6 text-white/50">
            Ao continuar, sua reserva será registrada, o estoque será atualizado
            e o atendimento seguirá pelo WhatsApp.
          </p>

          {errorMessage && (
            <p className="font-body mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSendOrder}
            className="font-ui mt-6 flex w-full justify-center rounded-full bg-[#ea8506] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d97800] hover:shadow-[0_18px_40px_rgba(234,133,6,0.22)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isSubmitting ? 'Registrando reserva...' : 'Enviar pelo WhatsApp'}
          </button>
        </aside>
      </section>
    </main>
  )
}