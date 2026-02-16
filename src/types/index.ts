export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'streaming' | 'iptv' | 'premium';
  duration: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
