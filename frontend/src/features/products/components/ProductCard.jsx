import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <article className="overflow-hidden rounded-3xl border border-[#00174e]/10 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#ea8506]/40">
        <div className="aspect-square overflow-hidden bg-[#f5f5f5]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#00174e]">
              {product.name}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6e6969]">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <strong className="text-lg text-[#00174e]">
              R$ {Number(product.price).toFixed(2)}
            </strong>

            <span className="rounded-full border border-[#00174e]/10 px-3 py-1 text-xs font-medium text-[#00174e] transition group-hover:border-[#ea8506] group-hover:text-[#ea8506]">
              Ver produto
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard