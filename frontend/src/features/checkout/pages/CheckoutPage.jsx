import { useCart } from '@/features/cart/hooks/useCart'
import { storeConfig } from '@/config/store.config'

function CheckoutPage() {
  const { cartItems, subtotal } = useCart()

  function handleCheckout() {
    const phone = storeConfig.contact.whatsapp

    const itemsMessage = cartItems
      .map(
        (item) =>
          `- ${item.productName} | ${item.variantName} | Qtd: ${item.quantity} | R$ ${Number(item.price).toFixed(2)}`,
      )
      .join('%0A')

    const message = `Olá! Quero finalizar este pedido na ${storeConfig.name}:%0A%0A${itemsMessage}%0A%0ATotal: R$ ${subtotal.toFixed(2)}`

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">Finalizar pedido</h1>

      {cartItems.length === 0 ? (
        <p className="text-zinc-400">Seu carrinho está vazio.</p>
      ) : (
        <>
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article key={item.id} className="border-b border-zinc-700 pb-4">
                <h2 className="text-xl font-semibold">{item.productName}</h2>
                <p>Variação: {item.variantName}</p>
                <p>Quantidade: {item.quantity}</p>
                <p>R$ {Number(item.price).toFixed(2)}</p>
              </article>
            ))}
          </section>

          <p className="mt-6 text-xl font-semibold">
            Total: R$ {subtotal.toFixed(2)}
          </p>

          <button
            type="button"
            onClick={handleCheckout}
            className="mt-6 rounded bg-white px-4 py-2 text-black"
          >
            Finalizar pelo WhatsApp
          </button>
        </>
      )}
    </main>
  )
}

export default CheckoutPage