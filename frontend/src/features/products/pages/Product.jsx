import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useCart } from '@/features/cart/hooks/useCart'
import { getProductById } from '@/features/products/services/products.service'

const SIZE_ORDER = ['P', 'M', 'G', 'GG', 'XG', 'XGG']

function sortVariants(variants = []) {
  return [...variants].sort(
    (a, b) => SIZE_ORDER.indexOf(a.name) - SIZE_ORDER.indexOf(b.name),
  )
}

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
      try {
        const data = await getProductById(id)
        const sortedVariants = sortVariants(data.variants)
        const firstAvailableVariant = sortedVariants.find(
          (variant) => (variant.stock_quantity ?? 0) > 0,
        )

        setProduct(data)
        setSelectedVariant(firstAvailableVariant || null)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-6 py-10">
        <p className="font-body text-white/70">Carregando produto...</p>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-6 py-10">
        <h1 className="font-ui text-2xl font-semibold text-white">
          Produto não encontrado.
        </h1>
      </main>
    )
  }

  const variants = sortVariants(product.variants)
  const defaultVariant = variants[0]

  const hasSelectableVariants =
    variants.length > 1 || variants[0]?.name !== 'Único'

  const selectedStock = selectedVariant?.stock_quantity ?? 0
  const isSelectedVariantAvailable = selectedStock > 0

  function handleAddToCart() {
    const variantToAdd = hasSelectableVariants ? selectedVariant : defaultVariant

    if (!variantToAdd) return

    const result = addToCart(product, variantToAdd)

    setFeedbackType(result.success ? 'success' : 'error')
    setFeedbackMessage(result.message)

    setTimeout(() => {
      setFeedbackMessage('')
    }, 3000)
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8 sm:py-10 lg:py-14">
      <Link
        to="/"
        className="font-ui mb-8 inline-flex text-sm font-medium text-white/60 transition hover:text-white"
      >
        ← Voltar para a loja
      </Link>

      <section className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
          <div className="flex aspect-square items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/4 p-8 text-center">
            <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              Imagem do produto
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="font-ui mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
            Produto
          </p>

          <h1 className="font-brand text-4xl font-semibold leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          <p className="font-body mt-5 max-w-xl text-base leading-8 text-white/70">
            Produto demonstrativo do StoreKit Core. Esta área pode ser adaptada
            para descrever qualquer item, coleção ou serviço vendido pela loja.
          </p>

          <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:w-fit">
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Preço
            </p>

            <strong className="font-ui mt-2 block text-3xl font-semibold text-white">
              R$ {Number(product.price).toFixed(2)}
            </strong>
          </div>

          {hasSelectableVariants && (
            <section className="mt-8">
              <h3 className="font-ui mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                Escolha uma opção
              </h3>

              <div className="flex flex-wrap gap-3">
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
                      className={`font-ui min-w-14 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                        isSelected
                          ? 'border-white bg-white text-slate-950'
                          : 'border-white/15 bg-white/4 text-white hover:border-white hover:text-white'
                      } disabled:cursor-not-allowed disabled:border-white/5 disabled:bg-white/2 disabled:text-white/25`}
                    >
                      {variant.name}
                    </button>
                  )
                })}
              </div>

              {selectedVariant && (
                <p className="font-body mt-4 text-sm text-white/50">
                  {selectedStock} unidades disponíveis.
                </p>
              )}
            </section>
          )}

          <button
            type="button"
            disabled={
              !selectedVariant ||
              (selectedVariant && !isSelectedVariantAvailable)
            }
            onClick={handleAddToCart}
            className="font-ui mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:w-fit"
          >
            Adicionar ao carrinho
          </button>

          {feedbackMessage && (
            <p
              className={`font-body mt-5 rounded-2xl border px-4 py-3 text-sm ${
                feedbackType === 'success'
                  ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
                  : 'border-red-400/20 bg-red-400/10 text-red-200'
              }`}
            >
              {feedbackMessage}
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Product