import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useCart } from '@/features/cart/hooks/useCart'
import { getProductById } from '@/features/products/services/products.service'

const CARD_PRICE = 55

function Product() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackType, setFeedbackType] = useState('success')

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductById(id)

      setProduct(data)
      setLoading(false)
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <main className="py-8 sm:py-10">
        <p className="font-body text-[#6e6969]">Carregando produto...</p>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="py-8 sm:py-10">
        <h1 className="font-ui text-3xl font-semibold text-[#00174e]">
          Produto não encontrado.
        </h1>
      </main>
    )
  }

  const sizeOrder = ['P', 'M', 'G', 'GG', 'XG', 'XGG']

  const variants = [...(product.variants || [])].sort(
    (a, b) => sizeOrder.indexOf(a.name) - sizeOrder.indexOf(b.name),
  )
  const defaultVariant = variants[0]

  const hasSelectableVariants =
    variants.length > 1 || variants[0]?.name !== 'Único'

  const selectedStock = selectedVariant?.stock_quantity ?? 0
  const isSelectedVariantAvailable = selectedStock > 0

  function handleAddToCart() {
    const variantToAdd = hasSelectableVariants
      ? selectedVariant
      : defaultVariant

    if (!variantToAdd) return

    const result = addToCart(product, variantToAdd)

    setFeedbackType(result.success ? 'success' : 'error')
    setFeedbackMessage(result.message)

    setTimeout(() => {
      setFeedbackMessage('')
    }, 3000)
  }

  return (
    <main className="py-8 sm:py-10">
      <Link
        to="/"
        className="font-ui mb-8 inline-flex text-sm font-medium text-[#6e6969] underline transition hover:text-[#00174e]"
      >
        Voltar para produtos
      </Link>

      <section className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-3xl border border-[#00174e]/10 bg-white shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-ui mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#ea8506]">
            Produto oficial
          </p>

          <h1 className="font-ui text-3xl font-semibold tracking-tight text-[#00174e] sm:text-5xl">
            {product.name}
          </h1>

          <p className="font-body mt-5 max-w-xl text-base leading-7 text-[#6e6969]">
            {product.description}
          </p>

          <div className="mt-6 rounded-2xl border border-[#00174e]/10 bg-white p-5">
            <strong className="font-ui block text-3xl font-semibold text-[#00174e]">
              R$ {Number(product.price).toFixed(2)}
            </strong>

            <p className="font-body mt-2 text-sm leading-6 text-[#6e6969]">
              Pix ou dinheiro: R$ {Number(product.price).toFixed(2)}
              <br />
              Cartão: R$ {CARD_PRICE.toFixed(2)}
            </p>
          </div>

          {hasSelectableVariants && (
            <section className="mt-8">
              <h3 className="font-ui mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#00174e]">
                Selecione o tamanho
              </h3>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id
                  const isUnavailable = (variant.stock_quantity ?? 0) <= 0

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      disabled={isUnavailable}
                      onClick={() => {
                        setSelectedVariant(variant)
                        setFeedbackMessage('')
                      }}
                      className={`font-ui rounded-full border px-5 py-2 text-sm font-medium transition ${
                        isSelected
                          ? 'border-[#00174e] bg-[#00174e] text-white'
                          : 'border-[#00174e]/15 bg-white text-[#00174e] hover:border-[#ea8506] hover:text-[#ea8506]'
                      } disabled:cursor-not-allowed disabled:border-[#6e6969]/20 disabled:bg-[#f4f4f4] disabled:text-[#6e6969]/50`}
                    >
                      {variant.name}
                    </button>
                  )
                })}
              </div>

              {selectedVariant && (
                <p className="font-body mt-4 text-sm text-[#6e6969]">
                  Tamanho {selectedVariant.name}: {selectedStock} unidades
                  disponíveis.
                </p>
              )}
            </section>
          )}

          <button
            type="button"
            disabled={
              (hasSelectableVariants && !selectedVariant) ||
              (selectedVariant && !isSelectedVariantAvailable)
            }
            onClick={handleAddToCart}
            className="font-ui mt-8 inline-flex items-center justify-center rounded-full bg-[#00174e] px-6 py-3 font-semibold text-white transition duration-200 hover:bg-[#ea8506] disabled:cursor-not-allowed disabled:opacity-40 sm:w-fit"
          >
            Adicionar ao carrinho
          </button>

          {feedbackMessage && (
            <p
              className={`font-body mt-4 rounded-2xl border px-4 py-3 text-sm ${
                feedbackType === 'success'
                  ? 'border-emerald-500/20 bg-emerald-50 text-emerald-700'
                  : 'border-red-500/20 bg-red-50 text-red-700'
              }`}
            >
              {feedbackMessage}
            </p>
          )}

          {hasSelectableVariants && !selectedVariant && (
            <p className="font-body mt-4 text-sm text-[#6e6969]">
              Selecione um tamanho antes de adicionar ao carrinho.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Product