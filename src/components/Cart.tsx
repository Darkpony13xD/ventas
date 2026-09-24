import { useEffect, useRef } from 'react';
import type { CartItem } from '../types';
import { brandFor, money, orderUrl } from '../utils/store';
import { Icon } from './Icon';
export function Cart({ isOpen, onClose, items, onQuantity, onRemove }: { isOpen: boolean; onClose: () => void; items: CartItem[]; onQuantity: (id: string, quantity: number) => void; onRemove: (id: string) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const panel = dialog.current;
    if (!panel || !isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    panel.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { panel.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, [isOpen]);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <dialog ref={dialog} className="cart-dialog" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="cart-title"><div className="cart-panel">
    <div className="cart-top"><div><span className="eyebrow">TU PRÓXIMO PLAN</span><h2 id="cart-title">Mi selección<span>.</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Cerrar carrito"><Icon name="close" /></button></div>
    <div className="cart-content">{items.length === 0 ? <div className="empty-cart"><span className="empty-icon"><Icon name="bag" size={38} /></span><h3>Aquí empieza lo bueno.</h3><p>Elige tus favoritos del catálogo y arma tu próximo plan.</p><button className="button primary" onClick={onClose}>Explorar servicios <Icon name="arrow" /></button></div> : items.map(item => { const brand = brandFor(item); return <article className="cart-item" key={item.id}><div className="cart-item-logo" style={{ background: brand.background, color: brand.color }}>{brand.mark}</div><div className="cart-item-info"><h3>{item.name.trim()}</h3><p>{item.duration.trim()} · {money(item.price)} MXN</p><div className="quantity"><button onClick={() => onQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`Reducir ${item.name.trim()}`}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button onClick={() => onQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= 99} aria-label={`Aumentar ${item.name.trim()}`}><Icon name="plus" size={14} /></button></div></div><div className="cart-item-end"><button className="icon-button" onClick={() => onRemove(item.id)} aria-label={`Quitar ${item.name.trim()}`}><Icon name="close" size={16} /></button><strong>{money(item.price * item.quantity)}</strong></div></article>; })}</div>
    {items.length > 0 && <div className="cart-bottom"><div className="cart-total"><span>Total de tu selección</span><strong>{money(total)} <small>MXN</small></strong></div><a className="button primary checkout" href={orderUrl(items)} target="_blank" rel="noreferrer"><Icon name="chat" /> Continuar por WhatsApp <Icon name="arrow" /></a><p>Confirma disponibilidad y pago con nosotros por WhatsApp. Aún no se ha realizado ningún cobro.</p></div>}
  </div></dialog>;
}
