import { useEffect, useState } from 'react'

import ProductCard from '@/features/products/components/ProductCard'
import { getProducts } from '@/features/products/services/products.service'

import './Home.css'

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
    <main>
      <section className="home-hero">
        <div className="home-showcase">
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Loja oficial</p>

            <h1 className="home-hero__brand">CIA ROCCART</h1>

            <p className="home-hero__subtitle">
              Reproduzindo o caráter de Cristo através da arte.
            </p>

            <p className="home-hero__description">
              Vestuário desenvolvido para o projeto Casa do Julgamento.
            </p>
          </div>

          <div className="home-showcase__product">
            {loading && (
              <div className="home-feedback">
                <p>Carregando produto...</p>
              </div>
            )}

            {!loading && error && (
              <div className="home-feedback home-feedback--error">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <ProductCard product={products[0]} />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
