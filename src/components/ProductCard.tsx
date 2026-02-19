import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const categoryColors = {
    streaming: 'from-blue-500 to-cyan-500',
    iptv: 'from-orange-500 to-red-500',
    premium: 'from-yellow-400 to-orange-500'
  };

  const categoryBg = {
    streaming: 'bg-blue-500/10 border-blue-500/30',
    iptv: 'bg-orange-500/10 border-orange-500/30',
    premium: 'bg-yellow-400/10 border-yellow-400/30'
  };

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[product.category]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${categoryBg[product.category]} text-gray-300`}>
          {product.category}
        </span>
      </div>

      {/* Product Icon */}
      <div className="relative pt-8 pb-4 px-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[product.category]} blur-2xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
            <span className="relative text-7xl block transform group-hover:scale-110 transition-transform duration-300">
              {product.image}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-0 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {product.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md">
              {feature}
            </span>
          ))}
        </div>

        {/* Duration badge */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {product.duration}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div>
            <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
            <span className="text-gray-500 text-sm ml-1">USD</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="relative px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white font-semibold text-sm overflow-hidden group/btn hover:shadow-lg hover:shadow-yellow-400/25 transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Agregar
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
