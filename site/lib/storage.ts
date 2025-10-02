import { Product, Order, CartItem, AdminUser } from '@/types';

// Default admin user
const DEFAULT_ADMIN: AdminUser = {
  id: '1',
  username: 'admin',
  password: 'admin123'
};

// Sample products
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Милий комбінезон для новонароджених',
    description: 'Мʼякий та зручний комбінезон з натурального бавовни для найменших',
    price: 450,
    images: ['/api/placeholder/400/400'],
    category: 'newborn',
    sizes: ['0-3m', '3-6m', '6-12m'],
    colors: ['білий', 'рожевий', 'синій'],
    inStock: true,
    stockQuantity: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Світшот для хлопчиків',
    description: 'Стильний світшот з капюшоном для активних хлопчиків',
    price: 650,
    images: ['/api/placeholder/400/400'],
    category: 'boys',
    sizes: ['2-3y', '3-4y', '4-5y', '5-6y'],
    colors: ['синій', 'сірий', 'зелений'],
    inStock: true,
    stockQuantity: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Плаття для дівчинки',
    description: 'Красиве святкове плаття з мереживом',
    price: 850,
    images: ['/api/placeholder/400/400'],
    category: 'girls',
    sizes: ['2-3y', '3-4y', '4-5y', '5-6y'],
    colors: ['рожевий', 'білий', 'фіолетовий'],
    inStock: true,
    stockQuantity: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

class LocalStorage {
  private static instance: LocalStorage;
  
  static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  private getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Products
  getProducts(): Product[] {
    return this.getItem('products', SAMPLE_PRODUCTS);
  }

  saveProducts(products: Product[]): void {
    this.setItem('products', products);
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveProducts(products);
    return products[index];
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) return false;
    
    this.saveProducts(filteredProducts);
    return true;
  }

  // Orders
  getOrders(): Order[] {
    return this.getItem('orders', []);
  }

  saveOrders(orders: Order[]): void {
    this.setItem('orders', orders);
  }

  addOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    this.saveOrders(orders);
    return newOrder;
  }

  updateOrderStatus(id: string, status: Order['status']): boolean {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === id);
    
    if (index === -1) return false;
    
    orders[index].status = status;
    this.saveOrders(orders);
    return true;
  }

  // Cart
  getCart(): CartItem[] {
    return this.getItem('cart', []);
  }

  saveCart(cart: CartItem[]): void {
    this.setItem('cart', cart);
  }

  addToCart(item: CartItem): void {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      cartItem => 
        cartItem.product.id === item.product.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.saveCart(cart);
  }

  removeFromCart(productId: string, size: string, color: string): void {
    const cart = this.getCart();
    const filteredCart = cart.filter(
      item => !(item.product.id === productId && item.size === size && item.color === color)
    );
    this.saveCart(filteredCart);
  }

  updateCartItemQuantity(productId: string, size: string, color: string, quantity: number): void {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(
      item => item.product.id === productId && item.size === size && item.color === color
    );

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
      this.saveCart(cart);
    }
  }

  clearCart(): void {
    this.saveCart([]);
  }

  // Admin
  getAdmin(): AdminUser {
    return this.getItem('admin', DEFAULT_ADMIN);
  }

  saveAdmin(admin: AdminUser): void {
    this.setItem('admin', admin);
  }

  // Admin session
  isAdminLoggedIn(): boolean {
    return this.getItem('adminLoggedIn', false);
  }

  setAdminLoggedIn(loggedIn: boolean): void {
    this.setItem('adminLoggedIn', loggedIn);
  }
}

export const storage = LocalStorage.getInstance();
