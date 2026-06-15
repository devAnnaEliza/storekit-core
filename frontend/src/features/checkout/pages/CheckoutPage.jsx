import { useContext, useState } from 'react'
import { Link } from 'react-router'

import { CartContext } from '@/features/cart/context/cart-context'
import { storeConfig } from '@/config/store/store.config'
import { createOrder } from '@/features/checkout/services/orders.service'

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useContext(CartContext)

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

    return `Olá! Quero finalizar meu pedido na ${storeConfig.brand.name}.

  Pedido: ${order.order_number}

  ${itemsMessage}

  Forma de pagamento:
  - Dinheiro/Pix: R$ 50,00 por camisa
  - Cartão: R$ 55,00 por camisa`
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
          'Não foi possível finalizar o pedido. Verifique os itens e tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <p className="font-ui text-sm uppercase tracking-[0.3em] text-[#ea8506]">
          Checkout
        </p>

        <h1 className="font-ui mt-4 text-3xl font-semibold tracking-tight text-[#00174e]">
          Seu carrinho está vazio
        </h1>

        <p className="font-body mt-3 max-w-md text-[#6e6969]">
          Adicione produtos ao carrinho antes de finalizar seu pedido.
        </p>

        <Link
          to="/"
          className="font-ui mt-8 rounded-xl bg-[#00174e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ea8506]"
        >
          Ver produtos
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="font-ui text-sm uppercase tracking-[0.3em] text-[#ea8506]">
          Checkout
        </p>

        <h1 className="font-ui mt-3 text-3xl font-semibold tracking-tight text-[#00174e]">
          Finalizar pedido
        </h1>

        <p className="font-body mt-3 text-[#6e6969]">
          Revise os itens antes de enviar seu pedido pelo WhatsApp.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={`${item.productId}-${item.variantId}`}
              className="rounded-2xl border border-[#00174e]/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-ui font-medium text-[#00174e]">
                    {item.productName}
                  </h2>

                  <p className="font-body mt-1 text-sm text-[#6e6969]">
                    Tamanho: {item.variantName}
                  </p>

                  <p className="font-body mt-2 text-sm text-[#6e6969]">
                    Quantidade: {item.quantity}
                  </p>
                </div>

                <p className="font-ui font-medium text-[#00174e]">
                  R$ {(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-[#00174e]/10 bg-white p-5 shadow-sm">
          <h2 className="font-ui text-lg font-semibold text-[#00174e]">
            Resumo do pedido
          </h2>

          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="font-body text-[#6e6969]">Subtotal</span>

            <span className="font-ui text-[#00174e]">
              R$ {subtotal.toFixed(2)}
            </span>
          </div>

          <div className="mt-4 border-t border-[#00174e]/10 pt-4">
            <div className="flex items-center justify-between font-semibold">
              <span className="font-ui text-[#00174e]">Total</span>

              <span className="font-ui text-[#00174e]">
                R$ {subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="font-body mt-4 text-xs leading-5 text-[#6e6969]">
            Ao continuar, seu pedido será registrado e o estoque será atualizado
            automaticamente.
          </p>

          {errorMessage && (
            <p className="font-body mt-4 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSendOrder}
            className="font-ui mt-6 block w-full rounded-xl bg-[#00174e] px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-[#ea8506] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Registrando pedido...' : 'Enviar pelo WhatsApp'}
          </button>

          <Link
            to="/cart"
            className="font-ui mt-4 block text-center text-sm text-[#6e6969] transition hover:text-[#00174e]"
          >
            Voltar ao carrinho
          </Link>
        </aside>
      </div>
    </section>
  )
}