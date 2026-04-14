import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/produto/${product.id}`}>
      <div>
        <img
          src={product.imagem_url}
          alt={product.nome}
          width="200"
        />
        <h2>{product.nome}</h2>
        <p>{product.descricao}</p>
        <strong>R$ {Number(product.preco).toFixed(2)}</strong>
      </div>
    </Link>
  )
}

export default ProductCard