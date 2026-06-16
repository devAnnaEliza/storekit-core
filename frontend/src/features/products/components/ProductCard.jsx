import { Link } from 'react-router-dom'

import camisaCostas from '@/assets/roccart/camisa-costas.jpg'
import camisaFrente from '@/assets/roccart/camisa-frente.jpg'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block w-full max-w-95">
      <article className="overflow-hidden rounded-4xl border border-white/12 bg-white/6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#ea8506]/50">
        <div className="relative h-100 overflow-hidden rounded-4xl bg-white/4 p-3">
          <img
            src={camisaFrente}
            alt={`${product.name} - frente`}
            className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-3xl object-cover transition duration-500 group-hover:opacity-0"
          />

          <img
            src={camisaCostas}
            alt={`${product.name} - costas`}
            className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-3xl object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />

          <span className="font-ui absolute left-5 top-5 rounded-full bg-[#00174e] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white">
            Lançamento
          </span>
        </div>

        <div className="p-5 text-center">
          <p className="font-ui mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[#ea8506]">
            Peça teatral
          </p>

          <h2 className="font-ui text-base font-semibold leading-snug text-white">
            {product.name}
          </h2>

          <strong className="font-ui mt-3 block text-xl font-semibold text-white">
            R$ {Number(product.price).toFixed(2)}
          </strong>

          <span className="font-ui mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-[#6e6969] transition group-hover:text-[#ea8506]">
            Ver detalhes
          </span>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard