import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/5">
        <div className="aspect-square overflow-hidden bg-slate-900">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50">
              {product.name}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <strong className="text-lg text-slate-50">
              R$ {Number(product.price).toFixed(2)}
            </strong>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 transition group-hover:border-white/20 group-hover:text-white">
              Ver produto
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard