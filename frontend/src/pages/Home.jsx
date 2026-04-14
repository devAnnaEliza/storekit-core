import { useEffect, useState } from 'react'
import { getProducts } from '../services/products'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        setError('Erro ao carregar produtos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return <h1>Carregando produtos...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div>
      <h1>StoreKit Core</h1>

      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home