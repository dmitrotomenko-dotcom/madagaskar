'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const items = storage.getCart();
      setCartItems(items);
      setIsLoading(false);
    };

    loadCart();
  }, []);

  const updateQuantity = (productId: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId, size, color);
      return;
    }

    storage.updateCartItemQuantity(productId, size, color, newQuantity);
    const updatedCart = storage.getCart();
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId: string, size: string, color: string) => {
    storage.removeFromCart(productId, size, color);
    const updatedCart = storage.getCart();
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Товар видалено з кошика');
  };

  const clearCart = () => {
    storage.clearCart();
    setCartItems([]);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Кошик очищено');
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="container max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-16">
        <div className="container max-w-4xl mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Ваш кошик порожній</h1>
          <p className="text-gray-600 mb-8">
            Додайте товари до кошика, щоб продовжити покупки
          </p>
          <Link href="/catalog">
            <Button size="lg">
              Перейти до каталогу
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Кошик ({totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товари' : 'товарів'})
          </h1>
          {cartItems.length > 0 && (
            <Button variant="outline" onClick={clearCart}>
              Очистити кошик
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="bg-white border rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || '/api/placeholder/80/80'}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.id}`}
                      className="font-semibold text-gray-900 hover:text-primary-500 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-sm text-gray-600 mt-1">
                      <span>Розмір: {item.size}</span>
                      <span className="mx-2">•</span>
                      <span>Колір: {item.color}</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mt-2">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id, item.size, item.color)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Підсумок замовлення
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товари ({totalItems}):</span>
                  <span className="font-medium">{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка:</span>
                  <span className="font-medium">Розраховується при оформленні</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Загалом:</span>
                    <span className="text-lg font-semibold">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full mb-4">
                  Оформити замовлення
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/catalog">
                <Button variant="outline" size="lg" className="w-full">
                  Продовжити покупки
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
