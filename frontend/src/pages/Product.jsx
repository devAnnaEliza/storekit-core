import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/products'

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError('Erro ao carregar produto')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return <h1>Carregando produto...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  if (!product) {
    return <h1>Produto não encontrado.</h1>
  }

  return (
    <div>
      <img
        src={product.imagem_url}
        alt={product.nome}
        width="250"
      />
      <h1>{product.nome}</h1>
      <p>{product.descricao}</p>
      <strong>R$ {Number(product.preco).toFixed(2)}</strong>
    </div>
  )
}

export default Product