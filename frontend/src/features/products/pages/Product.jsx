import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import camisaCostas from '@/assets/roccart/camisa-costas.jpg'
import camisaFrente from '@/assets/roccart/camisa-frente.jpg'
import { useCart } from '@/features/cart/hooks/useCart'
import { getProductById } from '@/features/products/services/products.service'

const CARD_PRICE = 55
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
  const [selectedImage, setSelectedImage] = useState(camisaFrente)
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

  const productImages = [
    {
      src: camisaFrente,
      alt: `${product.name} - frente`,
      label: 'Frente',
    },
    {
      src: camisaCostas,
      alt: `${product.name} - costas`,
      label: 'Costas',
    },
  ]

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
        className="font-ui mb-8 inline-flex text-sm font-medium text-white/60 transition hover:text-[#ea8506]"
      >
        ← Voltar para a loja
      </Link>

      <section className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
          <div className="relative overflow-hidden rounded-3xl bg-white/4">
            <img
              src={selectedImage}
              alt={product.name}
              className="aspect-square h-full w-full object-cover"
            />
          </div>

          <div className="mt-3 mx-auto grid max-w-xs grid-cols-3 gap-3">
            {productImages.map((image) => {
              const isSelected = selectedImage === image.src

              return (
                <button
                  key={image.label}
                  type="button"
                  onClick={() => setSelectedImage(image.src)}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isSelected
                      ? 'border-[#ea8506]'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-11 w-full object-cover sm:h-15"
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="font-ui mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#ea8506]">
            Produto oficial
          </p>

          <h1 className="font-brand text-4xl font-normal leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          <p className="font-body mt-5 max-w-xl text-base leading-8 text-white/70">
            Camisa oficial da peça Sequestro. Uma peça criada para representar 
            a identidade artística da Cia. Roccart com sobriedade, propósito e
            presença.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                Pix ou dinheiro
              </p>

              <strong className="font-ui mt-2 block text-3xl font-semibold text-[#ea8506]">
                R$ {Number(product.price).toFixed(2)}
              </strong>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                Cartão
              </p>

              <strong className="font-ui mt-2 block text-3xl font-semibold text-white">
                R$ {CARD_PRICE.toFixed(2)}
              </strong>
            </div>
          </div>

          {hasSelectableVariants && (
            <section className="mt-8">
              <h3 className="font-ui mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                Escolha o tamanho
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
                          ? 'border-[#ea8506] bg-[#ea8506] text-white'
                          : 'border-white/15 bg-white/4 text-white hover:border-[#ea8506] hover:text-[#ea8506]'
                      } disabled:cursor-not-allowed disabled:border-white/5 disabled:bg-white/2 disabled:text-white/25`}
                    >
                      {variant.name}
                    </button>
                  )
                })}
              </div>

              {selectedVariant && (
                <p className="font-body mt-4 text-sm text-white/50">
                  {selectedStock} unidades disponíveis no tamanho{' '}
                  {selectedVariant.name}.
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
            className="font-ui mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#ea8506] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#d97800] hover:shadow-[0_18px_40px_rgba(234,133,6,0.22)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-fit"
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