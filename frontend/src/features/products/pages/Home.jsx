import { useEffect, useState } from 'react'

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
    <main className="px-6 py-12">
      <section className="mx-auto mb-12 max-w-3xl text-center">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.35em] text-[#ea8506]">
          CIA ROCCART
        </p>

        <h1 className="font-ui mt-4 text-3xl font-semibold leading-tight text-[#00174e] sm:text-5xl">
          Reproduzindo o caráter de Cristo através da arte.
        </h1>

        <p className="font-body mx-auto mt-5 max-w-xl text-base leading-7 text-[#6e6969]">
          Vestuário desenvolvido para o projeto Casa do Julgamento.
        </p>
      </section>

      {loading && (
        <div className="rounded-3xl border border-[#00174e]/10 bg-white p-8 shadow-lg">
          <p className="font-body text-[#6e6969]">Carregando produtos...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-red-500/20 bg-red-50 p-8 shadow-lg">
          <p className="font-ui font-medium text-red-700">{error}</p>
          <p className="font-body mt-2 text-sm text-red-500">
            Verifique se a API está rodando e tente novamente.
          </p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-3xl border border-[#00174e]/10 bg-white p-8 shadow-lg">
          <p className="font-ui font-medium text-[#00174e]">
            Nenhum produto disponível.
          </p>
          <p className="font-body mt-2 text-sm text-[#6e6969]">
            Os produtos cadastrados aparecerão aqui automaticamente.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <section className="mx-auto max-w-5xl">
          <div className="grid gap-6 justify-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default Home