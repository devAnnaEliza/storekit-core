function ProductCard({ product }) {
  return (
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
  )
}

export default ProductCard