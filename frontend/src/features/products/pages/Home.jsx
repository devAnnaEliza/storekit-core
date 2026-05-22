import { useEffect, useState } from 'react'

import { storeConfig } from '@/config/store.config'
import ProductCard from '@/features/products/components/ProductCard'
import { getProducts } from '@/features/products/services/products.service'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError('Não foi possível carregar os produtos.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <main className="px-6 py-10">
      <section className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Catálogo
        </p>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          {storeConfig.name}
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Produtos selecionados com compra rápida e atendimento direto pelo
          WhatsApp.
        </p>
      </section>

      {loading && (
        <p className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
          Carregando produtos...
        </p>
      )}

      {!loading && error && (
        <p className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
          Nenhum produto cadastrado no momento.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  )
}

export default Home