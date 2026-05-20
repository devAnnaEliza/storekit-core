import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { addToCart } from '@/features/cart/services/cart'
import { getProductById } from '@/features/products/services/products.service'

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [feedbackMessage, setFeedbackMessage] = useState('')

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductById(id)
      setProduct(data)
      setLoading(false)
    }

    loadProduct()
  }, [id])

  if (loading) return <h1>Carregando produto...</h1>

  if (!product) return <h1>Produto não encontrado.</h1>

  const variants = product.variants || []

  function handleAddToCart() {
    if (!selectedVariant) return

    addToCart(product, selectedVariant)
    setFeedbackMessage('Produto adicionado ao carrinho com sucesso!')
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <img src={product.image} alt={product.name} width="250" />

      <h1 className="mt-4 text-4xl font-bold">{product.name}</h1>

      <p className="mt-2 text-zinc-300">{product.description}</p>

      <strong className="mt-4 block text-xl">
        R$ {Number(product.price).toFixed(2)}
      </strong>

      <section className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">Selecione o tamanho</h3>

        <div className="flex gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setSelectedVariant(variant)}
              className="rounded border border-zinc-600 px-4 py-2"
            >
              {variant.name}
            </button>
          ))}
        </div>

        {selectedVariant && (
          <p className="mt-3">
            Tamanho selecionado: <strong>{selectedVariant.name}</strong>
          </p>
        )}
      </section>

      <button
        type="button"
        disabled={!selectedVariant}
        onClick={handleAddToCart}
        className="mt-6 rounded bg-white px-4 py-2 text-black disabled:opacity-40"
      >
        Adicionar ao carrinho
      </button>

      {feedbackMessage && <p className="mt-4">{feedbackMessage}</p>}

      {!selectedVariant && (
        <p className="mt-4 text-zinc-400">
          Selecione um tamanho antes de adicionar ao carrinho.
        </p>
      )}
    </main>
  )
}

export default Product
