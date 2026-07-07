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
    <main className="home">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Loja virtual modular</p>

          <h1 className="home-hero__title">StoreKit Core</h1>

          <p className="home-hero__description">
            Uma base clara, moderna e reutilizável para criar lojas virtuais
            profissionais para diferentes segmentos.
          </p>

          <a href="#catalog" className="home-hero__button">
            Explorar catálogo
          </a>
        </div>

        <div className="home-hero__preview">
          {!loading && !error && products.length > 0 && (
            <ProductCard product={products[0]} />
          )}
        </div>
      </section>

      <section id="catalog" className="home-catalog">
        <header className="home-catalog__header">
          <h2>Catálogo demonstrativo</h2>
        </header>

        {loading && (
          <div className="home-feedback">
            <p>Carregando produtos...</p>
          </div>
        )}

        {!loading && error && (
          <div className="home-feedback home-feedback--error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="home-catalog__grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home