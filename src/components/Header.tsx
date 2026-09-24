import { Icon } from './Icon';
import { whatsapp } from '../utils/store';
export function Header({ count, onCartClick }: { count: number; onCartClick: () => void }) {
  return <header className="header"><div className="shell header-inner">
    <a className="wordmark" href="#" aria-label="DarkPony, inicio"><span className="brand-symbol"><Icon name="spark" size={23} /></span>darkpony<span className="wordmark-dot">®</span></a>
    <nav className="desktop-nav" aria-label="Navegación principal"><a href="#catalogo">Explorar</a><a href="#como-funciona">Cómo funciona</a><a href="#preguntas">Preguntas frecuentes</a></nav>
    <div className="header-actions"><a className="support-link" href={whatsapp('Hola, necesito ayuda con un servicio de DarkPony.')} target="_blank" rel="noreferrer"><Icon name="chat" /> Hablemos</a><button className="cart-trigger" onClick={onCartClick} aria-label={`Abrir carrito, ${count} artículos`}><Icon name="bag" /><span className="cart-label">Mi selección</span><span className="cart-count">{count}</span></button></div>
  </div></header>;
}
