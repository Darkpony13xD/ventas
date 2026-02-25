import { CartItem, Product } from './types';
import { useMemo, useState } from 'react';

import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { products } from './data/products';

// CAMBIAR ESTE NÚMERO POR TU NÚMERO DE WHATSAPP (con código de país, sin + ni espacios)
const WHATSAPP_NUMBER = "5658491918";

export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'streaming' | 'iptv' | 'premium'>('all');

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const cartItemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    let message = `🦄 *Nuevo Pedido - DarkPony* 🦄\n\n`;
    message += `📋 *Detalle del pedido:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.image} *${item.name}*\n`;
      message += `   📅 Duración: ${item.duration}\n`;
      message += `   🔢 Cantidad: ${item.quantity}\n`;
      message += `   💰 Precio: $${(item.price * item.quantity).toFixed(2)} MXN\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *TOTAL: $${total.toFixed(2)} MXN*\n\n`;
    message += `¡Gracias por tu compra! 🎉`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Main Content */}
      <main className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm mb-6">
            <span className="animate-pulse">●</span> Servicios Activos 24/7
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Streaming & IPTV
            </span>
            <br />
            <span className="text-white">Premium</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Las mejores plataformas de streaming y TV en un solo lugar. 
            Calidad garantizada al mejor precio.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Entrega inmediata
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Soporte 24/7
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Garantía incluida
            </div>
          </div>
        </section>

        {/* IPTV Announcement */}
        {activeFilter === 'iptv' && (
          <section className="my-10">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me gustaría probar IPTV gratis.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gray-800/50 border border-yellow-400/30 rounded-2xl text-center transition-transform transform hover:scale-105 hover:border-yellow-400"
            >
              <p className="text-xl font-semibold text-yellow-400">
                <span role="img" aria-label="gift">🎁</span> ¿Quieres probar IPTV gratis?
              </p>
              <p className="text-lg text-gray-300 mt-2">
                <span role="img" aria-label="phone">📲</span> Escríbenos por WhatsApp
              </p>
            </a>
          </section>
        )}

        {/* Filters */}
        <section className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {(['all', 'streaming', 'iptv', 'premium'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-400/25'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                {filter === 'all' ? '🎬 Todos' : 
                 filter === 'streaming' ? '📺 Streaming' :
                 filter === 'iptv' ? '📡 IPTV' :
                 '⭐ Premium'}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section 
          id="products"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              whatsappNumber={WHATSAPP_NUMBER}
            />
          ))}
        </section>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Entrega Instantánea</h3>
            <p className="text-gray-400 text-sm">Recibe tus credenciales inmediatamente después de confirmar tu pago.</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Garantía Total</h3>
            <p className="text-gray-400 text-sm">Si tienes algún problema, te reponemos tu cuenta sin costo adicional.</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Soporte 24/7</h3>
            <p className="text-gray-400 text-sm">Estamos disponibles en WhatsApp para ayudarte en cualquier momento.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl">🦄</span>
          <span className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            DarkPony
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          © 2024 DarkPony. Todos los derechos reservados.
        </p>
      </footer>

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
        whatsappNumber={WHATSAPP_NUMBER}
      />
    </div>
  );
}
