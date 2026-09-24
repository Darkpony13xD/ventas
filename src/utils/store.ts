import type { CartItem, Product } from '../types';
import { products } from '../data/products';
export const WHATSAPP_NUMBER = '525641261649';
export const money = (price: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price);
export const whatsapp = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const isMusic = (product: Product) => product.id === '5' || product.id === '6';
export const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function readCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem('darkpony-cart') || '[]');
    if (!Array.isArray(saved)) return [];
    const unique = new Map<string, CartItem>();
    for (const entry of saved) {
      if (!entry || typeof entry !== 'object') continue;
      const product = products.find(p => p.id === entry.id);
      if (product && Number.isSafeInteger(entry.quantity) && entry.quantity > 0) unique.set(product.id, { ...product, quantity: Math.min(99, entry.quantity) });
    }
    return [...unique.values()];
  } catch { return []; }
}
export function orderUrl(items: CartItem[]) {
  const lines = items.map(item => `${item.quantity} × ${item.name.trim()} · ${item.duration.trim()} — ${money(item.price * item.quantity)} MXN`);
  return whatsapp(`Hola, quiero realizar un pedido en DarkPony:\n\n${lines.join('\n')}\n\nTotal: ${money(items.reduce((sum, item) => sum + item.price * item.quantity, 0))} MXN\n\n¿Me confirmas disponibilidad y forma de pago?`);
}
export const brands: Record<string, { mark: string; color: string; background: string; label: string }> = {
  '1': { mark: 'N', color: '#ff4351', background: '#25171e', label: 'NETFLIX' },
  '2': { mark: 'Disney+', color: '#b9d4ff', background: '#172849', label: 'DISNEY+' },
  '3': { mark: 'max', color: '#ddc6ff', background: '#34214b', label: 'HBO MAX' },
  '4': { mark: 'prime', color: '#9bddff', background: '#143441', label: 'PRIME VIDEO' },
  '5': { mark: '≋', color: '#8ceba4', background: '#173b2a', label: 'SPOTIFY' },
  '6': { mark: '▶', color: '#ffb6b6', background: '#452626', label: 'YOUTUBE' },
  '7': { mark: 'C', color: '#ffb17e', background: '#462a1b', label: 'CRUNCHYROLL' },
  '8': { mark: 'P+', color: '#a6c7ff', background: '#1e3055', label: 'PARAMOUNT+' },
  '9': { mark: 'ViX', color: '#ffb777', background: '#442717', label: 'VIX' },
  '10': { mark: 'ViX', color: '#ffb777', background: '#442717', label: 'VIX' },
  '11': { mark: 'ViX', color: '#ffb777', background: '#442717', label: 'VIX' }
};
export const brandFor = (product: Product) => brands[product.id] || { mark: product.name.replace('IPTV ', '').slice(0, 2).toUpperCase(), color: '#d3c8ff', background: '#302749', label: product.name.toUpperCase() };
