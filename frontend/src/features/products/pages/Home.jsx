import { useEffect, useState } from 'react'

import { storeConfig } from '../../../config/store/store.config'
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
          {storeConfig.brand.name}
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Produtos selecionados com compra rápida e atendimento direto pelo
          WhatsApp.
        </p>
      </section>

      {loading && (
        <div className="rounded-3xl border border-white/10 bg-white/3 p-8 shadow-2xl shadow-black/20">
          <p className="text-slate-400">Carregando produtos...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 shadow-2xl shadow-black/20">
          <p className="font-medium text-red-200">{error}</p>
          <p className="mt-2 text-sm text-red-200/70">
            Verifique se a API está rodando e tente novamente.
          </p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/3 p-8 shadow-2xl shadow-black/20">
          <p className="font-medium text-slate-200">
            Nenhum produto disponível.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Os produtos cadastrados aparecerão aqui automaticamente.
          </p>
        </div>
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