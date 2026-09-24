import { useEffect, useMemo, useState } from 'react';
import type { Product } from './types';
import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Icon } from './components/Icon';
import { products } from './data/products';
import { isMusic, normalize, readCart, whatsapp } from './utils/store';

const filters = [{ id: 'all', label: 'Todo el universo', icon: 'spark' }, { id: 'streaming', label: 'Películas & series', icon: 'play' }, { id: 'music', label: 'Música & video', icon: 'music' }, { id: 'iptv', label: 'TV en vivo', icon: 'tv' }] as const;
type Filter = typeof filters[number]['id'];
export function App() {
  const [cart, setCart] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [notice, setNotice] = useState('');
  useEffect(() => { try { localStorage.setItem('darkpony-cart', JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity })))); } catch { /* Storage may be unavailable in private browsing. */ } }, [cart]);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(''), 2800); return () => clearTimeout(timer); }, [notice]);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const filtered = useMemo(() => {
    const result = products.filter(product => {
      const category = filter === 'all' || (filter === 'music' ? isMusic(product) : filter === 'streaming' ? product.category === 'streaming' && !isMusic(product) : product.category === 'iptv');
      return category && normalize(`${product.name} ${product.description} ${product.duration} ${product.features.join(' ')}`).includes(normalize(search.trim()));
    });
    return sort === 'low' ? result.sort((a, b) => a.price - b.price) : sort === 'high' ? result.sort((a, b) => b.price - a.price) : result;
  }, [filter, search, sort]);
  const add = (product: Product) => {
    setCart(items => { const existing = items.find(item => item.id === product.id); return existing ? items.map(item => item.id === product.id ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item) : [...items, { ...product, quantity: 1 }]; });
    setNotice(`${product.name.trim()} en tu selección`);
  };
  const selectCategory = (category: Filter) => { setFilter(category); setSearch(''); };
  return <>
    <a className="skip-link" href="#catalogo">Ir al catálogo</a>
    <div className="announcement"><span>DALE PLAY A ALGO NUEVO</span><span>Streaming, música y TV. A tu manera. <Icon name="arrow" size={14} /></span></div>
    <Header count={count} onCartClick={() => setCartOpen(true)} />
    <main>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="tiny-star">✳</span> TU UNIVERSO DE ENTRETENIMIENTO</div><h1 id="hero-title">Dale play.<br />Sal de la<br /><span>rutina<svg viewBox="0 0 390 24" aria-hidden="true"><path d="M5 14Q180-8 382 12M15 22Q220 4 365 18" /></svg>.</span></h1><p>Una buena serie. Tu playlist favorita. Ese partido.<br className="desktop-break" /> Todos tus planes empiezan aquí.</p><div className="hero-actions"><a href="#catalogo" className="button primary">Encuentra tu próximo plan <Icon name="arrow" /></a><a className="text-link" href="#como-funciona">Así de fácil <span>↗</span></a></div><div className="hero-footnote"><span className="mini-orbits"><i /><i /><i /></span><span>Elige. Escríbenos. Disfruta.<br /><strong>Todo en un solo lugar.</strong></span></div></div>
        <div className="hero-stage" aria-label="Streaming, música y televisión en un mismo universo"><div className="stage-grid" /><div className="stage-orbit orbit-one" /><div className="stage-orbit orbit-two" /><span className="stage-star star-one">✳</span><span className="stage-star star-two">✦</span><span className="stage-caption">MENOS SCROLL. MÁS PLAY.</span><div className="floating-tag"><span className="status-dot" /> Tu próximo plan está aquí</div>
          <div className="showcase-card showcase-back"><div className="showcase-top">MUSIC MODE <Icon name="music" size={18} /></div><div className="record"><div className="record-center"><Icon name="music" size={28} /></div></div><div className="record-caption"><span>Tu vida.<br /><strong>Tu soundtrack.</strong></span><span className="equalizer"><i /><i /><i /><i /></span></div></div>
          <div className="showcase-card showcase-front"><div className="showcase-top"><span><i className="live-dot" /> AHORA EN TU PANTALLA</span><Icon name="spark" size={20} /></div><div className="cinema-art"><div className="planet" /><div className="planet-ring" /><div className="cinema-horizon" /><span className="cinema-number">01 / ∞</span><span className="cinema-title">OTRA<br /><i>DIMENSIÓN.</i></span><div className="play-disc"><Icon name="play" size={24} /></div></div><div className="showcase-bottom"><span>Las historias no terminan.<br /><strong>Solo cambia el plan.</strong></span><span className="quality-badge">4K<br /><small>ULTRA HD</small></span></div></div>
          <div className="tv-ticket"><span className="ticket-icon"><Icon name="tv" size={23} /></span><span>El mundo, en vivo.<small>DESCUBRE NUESTROS PLANES IPTV</small></span><Icon name="arrow" size={18} /></div>
        </div>
      </section>
      <section className="brand-strip" aria-label="Plataformas en el catálogo"><div className="shell brand-strip-inner"><span className="strip-label">TUS FAVORITOS.<br />UN SOLO LUGAR.</span><span className="brand-netflix">NETFLIX</span><span className="brand-disney">Disney+</span><span className="brand-max">max</span><span className="brand-spotify">◉ Spotify</span><span className="brand-prime">prime video</span><span className="brand-youtube">▶ YouTube</span></div></section>
      <section className="catalog shell" id="catalogo" aria-labelledby="catalog-title"><div className="section-heading"><div><span className="eyebrow">ELIGE TU MOOD</span><h2 id="catalog-title">¿Qué se te antoja <em>hoy?</em></h2></div><p>Planes pequeños.<br />Grandes momentos.</p></div>
        <div className="catalog-toolbar"><div className="filters" aria-label="Categorías">{filters.map(item => <button key={item.id} className={filter === item.id ? 'filter active' : 'filter'} onClick={() => selectCategory(item.id)} aria-pressed={filter === item.id}><Icon name={item.icon} size={17} />{item.label}</button>)}</div><label className="search"><Icon name="search" size={18} /><input aria-label="Buscar servicios" placeholder="Encuentra tu favorito..." value={search} onChange={event => setSearch(event.target.value)} />{search && <button onClick={() => setSearch('')} aria-label="Limpiar búsqueda"><Icon name="close" size={15} /></button>}</label></div>
        <div className="catalog-meta"><span aria-live="polite">{filtered.length} planes para desconectar</span><label>Ordenar por <select aria-label="Ordenar productos" value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Destacados</option><option value="low">Menor precio</option><option value="high">Mayor precio</option></select></label></div>
        <div className="products-grid">{filtered.map(product => <ProductCard key={product.id} product={product} quantity={cart.find(item => item.id === product.id)?.quantity || 0} onAdd={add} />)}</div>
        {filtered.length === 0 && <div className="no-results"><Icon name="search" size={35} /><h3>Ese plan aún no aparece.</h3><p>Prueba otro nombre o explora el catálogo completo.</p><button className="button primary" onClick={() => selectCategory('all')}>Ver todos los servicios <Icon name="arrow" /></button></div>}
      </section>
      <section className="iptv-banner shell"><div className="iptv-copy"><span className="eyebrow">PARA LOS QUE QUIEREN VERLO TODO</span><h2>Tu sofá.<br /><em>Primera fila.</em></h2><p>Descubre los planes de TV en vivo y encuentra el que va contigo. Pide una demo antes de elegir.</p><a className="button cream" href={whatsapp('Hola, quiero solicitar una demo de IPTV y conocer los planes disponibles.')} target="_blank" rel="noreferrer">Quiero probar IPTV <Icon name="arrow" /></a></div><div className="broadcast-art" aria-hidden="true"><div className="broadcast-ring ring-a" /><div className="broadcast-ring ring-b" /><div className="broadcast-ring ring-c" /><div className="broadcast-screen"><span className="broadcast-live"><i /> EN VIVO</span><Icon name="tv" size={72} /><span>El mejor asiento<br /><strong>está en casa.</strong></span></div><span className="broadcast-label">PONTE CÓMODO. NOSOTROS PONEMOS EL PLAN.</span></div></section>
      <section className="how shell" id="como-funciona"><div className="section-heading"><div><span className="eyebrow">CERO COMPLICACIONES</span><h2>Del clic al <em>play.</em></h2></div><p>Tres pasos. Así de simple.</p></div><div className="steps">{[{ number: '01', title: 'Encuentra tu favorito', text: 'Explora los servicios, compara los planes y agrega los que te gusten a tu selección.', icon: 'search' }, { number: '02', title: 'Hablemos por WhatsApp', text: 'Envía tu selección. Te confirmamos disponibilidad, detalles del servicio y forma de pago.', icon: 'chat' }, { number: '03', title: 'Ponte cómodo', text: 'Después de confirmar tu pago, te compartimos el acceso y te ayudamos a empezar.', icon: 'play' }].map(step => <article className="step" key={step.number}><div className="step-top"><span>{step.number}</span><Icon name={step.icon as 'search' | 'chat' | 'play'} size={24} /></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>
      <section className="faq shell" id="preguntas"><div><span className="eyebrow">POR SI TE LO PREGUNTABAS</span><h2>Todo claro.<br /><em>Todo listo.</em></h2><a className="text-link" href={whatsapp('Hola, tengo una duda sobre los servicios.')} target="_blank" rel="noreferrer">Tengo otra pregunta <Icon name="arrow" size={17} /></a></div><div className="faq-list">{[
        ['¿Cómo recibo mi servicio?', 'Al enviar tu selección por WhatsApp, confirmamos contigo la disponibilidad y el pago. Después te enviamos los datos de acceso y las instrucciones de uso por ese mismo medio.'],
        ['¿Los precios están en pesos mexicanos?', 'Sí. Todos los precios del catálogo se muestran en MXN. Cada tarjeta indica el tiempo de duración del plan; revisa ese dato antes de realizar tu pedido.'],
        ['¿Puedo probar IPTV antes de comprar?', 'Sí, puedes solicitar una demo por WhatsApp. Te indicaremos la disponibilidad y las instrucciones para probarla en tu dispositivo.'],
        ['¿Qué pasa si necesito ayuda?', 'Escríbenos por WhatsApp con el servicio que compraste y el detalle del problema. Te ayudaremos a revisar tu acceso.']
      ].map(([question, answer]) => <details key={question}><summary>{question}<Icon name="plus" size={18} /></summary><p>{answer}</p></details>)}</div></section>
      <section className="closing shell"><span className="closing-star">✳</span><h2>Un buen plan<br />cambia <em>todo.</em></h2><a href="#catalogo" className="button primary">Encuentra el tuyo <Icon name="arrow" /></a><span className="closing-note">NOS VEMOS DEL OTRO LADO DEL PLAY.</span></section>
    </main>
    <footer className="footer"><div className="shell footer-main"><a className="wordmark" href="#"><span className="brand-symbol"><Icon name="spark" size={23} /></span>darkpony<span className="wordmark-dot">®</span></a><p>Tu tiempo libre merece un buen plan.</p><a href={whatsapp('Hola, quiero conocer los servicios de DarkPony.')} target="_blank" rel="noreferrer">Hablemos <Icon name="arrow" size={18} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} DarkPony</span><span>Precios en MXN · Atención por WhatsApp</span><span>Las marcas pertenecen a sus respectivos propietarios.</span></div></footer>
    <div className={`toast ${notice ? 'visible' : ''}`} role="status"><span className="toast-check"><Icon name="check" size={16} /></span><span>{notice}</span><button tabIndex={notice ? 0 : -1} onClick={() => { setCartOpen(true); setNotice(''); }}>Ver selección <Icon name="arrow" size={15} /></button></div>
    <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} items={cart} onRemove={id => setCart(items => items.filter(item => item.id !== id))} onQuantity={(id, quantity) => { if (Number.isSafeInteger(quantity) && quantity >= 1 && quantity <= 99) setCart(items => items.map(item => item.id === id ? { ...item, quantity } : item)); }} />
  </>;
}
