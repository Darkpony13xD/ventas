interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-4xl"></span>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-40 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                DarkPony
              </h1>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase">Streaming & IPTV</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#streaming" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
              Streaming
            </a>
            <a href="#iptv" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
              IPTV
            </a>
            <a href="#premium" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium">
              Premium
            </a>
          </nav>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-400/30 hover:border-yellow-300/50 transition-all group"
          >
            <svg className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-white text-xs font-bold flex items-center justify-center animate-bounce">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
