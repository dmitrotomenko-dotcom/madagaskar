export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
}

export type ProductCategory = 
  | 'newborn' 
  | 'boys' 
  | 'girls' 
  | 'toddlers' 
  | 'accessories' 
  | 'shoes';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '0-3m' | '3-6m' | '6-12m' | '1-2y' | '2-3y' | '3-4y' | '4-5y' | '5-6y';

export type ProductColor = 'білий' | 'чорний' | 'сірий' | 'синій' | 'рожевий' | 'жовтий' | 'зелений' | 'червоний' | 'фіолетовий' | 'помаранчевий';
