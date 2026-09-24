import type { CSSProperties } from 'react';
import type { Product } from '../types';
import { brandFor, isMusic, money, whatsapp } from '../utils/store';
import { Icon } from './Icon';
export function ProductCard({ product, quantity, onAdd }: { product: Product; quantity: number; onAdd: (product: Product) => void }) {
  const brand = brandFor(product);
  return <article className="product-card" style={{ '--brand': brand.color, '--brand-bg': brand.background } as CSSProperties}>
    <div className="product-art"><span className="product-category">{product.category === 'iptv' ? 'TV EN VIVO' : isMusic(product) ? 'MÚSICA & VIDEO' : 'STREAMING'}</span><span className={`service-mark service-${product.id}`}>{brand.mark}</span><span className="art-orbit" /><span className="art-caption">{brand.label}</span></div>
    <div className="product-body"><div className="product-heading"><h3>{product.name.trim()}</h3>{quantity > 0 && <span className="selected-badge"><Icon name="check" size={12} />{quantity}</span>}</div><p className="product-description">{product.description || 'Tu próxima noche de películas empieza aquí. Consulta el catálogo disponible.'}</p>
      <div className="product-features">{[...new Set(product.features.map(f => f.trim()))].slice(0, 2).map(feature => <span key={feature}><Icon name="check" size={12} />{feature}</span>)}</div>
      <div className="product-buy"><div><span className="price">{money(product.price)}</span><span className="currency"> MXN</span><small>por {product.duration.trim()}</small></div><button className="add-button" onClick={() => onAdd(product)} aria-label={`Agregar ${product.name.trim()}, ${product.duration.trim()}`}><Icon name="plus" size={18} /><span>Agregar</span></button></div>
      {product.category === 'iptv' && <a className="demo-link" href={whatsapp(`Hola, me gustaría solicitar una demo de ${product.name}.`)} target="_blank" rel="noreferrer">Solicitar demo gratis <Icon name="arrow" size={14} /></a>}
    </div>
  </article>;
}
