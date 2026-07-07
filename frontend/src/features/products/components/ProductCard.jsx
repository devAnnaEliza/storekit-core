import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block w-full max-w-95">
      <article className="overflow-hidden rounded-4xl border border-white/12 bg-white/6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/30">
        <div className="relative flex h-100 items-center justify-center overflow-hidden rounded-4xl bg-white/4 p-6">
          <span className="font-ui absolute left-5 top-5 rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white">
            Produto
          </span>

          <div className="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 text-center">
            <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              Imagem do produto
            </span>
          </div>
        </div>

        <div className="p-5 text-center">
          <p className="font-ui mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white/45">
            Categoria
          </p>

          <h2 className="font-ui text-base font-semibold leading-snug text-white">
            {product.name}
          </h2>

          <strong className="font-ui mt-3 block text-xl font-semibold text-white">
            R$ {Number(product.price).toFixed(2)}
          </strong>

          <span className="font-ui mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-white/45 transition group-hover:text-white">
            Ver detalhes
          </span>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard