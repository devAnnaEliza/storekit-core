import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/products'
import { addToCart } from '../services/cart'

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')

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

  function handleAddToCart() {
    if (!selectedSize) return

    addToCart(product, selectedSize)
    alert('Produto adicionado ao carrinho!')
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
        <div>
          <h3>Selecione o tamanho</h3>
          {product.tamanhos?.length > 0 ? (
            <div>
              {product.tamanhos.map((item) => (
                  <button
                  key={item.id}
                  onClick={() => setSelectedSize(item.tamanho)}
                  disabled={item.quantidade === 0}
                  >
                  {item.tamanho}
                  </button>
              ))}
            </div>
          ) : (
              <p>Nenhum tamanho disponível.</p>
          )}

          {selectedSize && (
              <p>
              Tamanho selecionado: <strong>{selectedSize}</strong>
              </p>
          )}
        </div>

        <button disabled={!selectedSize} onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>

        {!selectedSize && (
          <p>Selecione um tamanho antes de adicionar ao carrinho.</p>
        )}
        
    </div>
  )
}

export default Product