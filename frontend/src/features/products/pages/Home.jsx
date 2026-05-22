import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ProductCard from '@/features/products/components/ProductCard'
import { getProducts } from '@/features/products/services/products.service'
import { storeConfig } from '@/config/store.config'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts()
      setProducts(data)
    }

    loadProducts()
  }, [])

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">
        {storeConfig.name}
      </h1>

      <Link
        to="/cart"
        className="mb-8 inline-block underline"
      >
        Ver carrinho
      </Link>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}

export default Home
