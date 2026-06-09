import { useEffect, useState } from 'react'

import { homeConfig } from '../../../config/store/home.config'
import { getProducts } from '@/features/products/services/products.service'
import ProductCard from '@/features/products/components/ProductCard'

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
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#ea8506]">
          {homeConfig.hero.eyebrow}
        </p>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-[#00174e] sm:text-5xl">
          {homeConfig.hero.title}
        </h1>

        <p className="mt-4 max-w-2xl text-[#6e6969]">
          {homeConfig.hero.description}
        </p>
      </section>

      {loading && (
        <div className="rounded-3xl border border-[#00174e]/10 bg-white p-8 shadow-lg">
          <p className="text-[#6e6969]">Carregando produtos...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-red-500/20 bg-red-50 p-8 shadow-lg">
          <p className="font-medium text-red-700">{error}</p>
          <p className="mt-2 text-sm text-red-500">
            Verifique se a API está rodando e tente novamente.
          </p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-3xl border border-[#00174e]/10 bg-white p-8 shadow-lg">
          <p className="font-medium text-[#00174e]">
            Nenhum produto disponível.
          </p>
          <p className="mt-2 text-sm text-[#6e6969]">
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