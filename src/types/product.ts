export interface Product {
  id: string;
  images: string[];
  name: string;
  price: number;
  brand: string;
  description: string;
  sizes: string[];
  type: 'Novo' | 'Bazar';
  category: string;
  amount: number;
  observations: string;
}
