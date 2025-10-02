'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { CheckCircle, Phone, User, Mail } from 'lucide-react';
import { CartItem, Order } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import toast from 'react-hot-toast';

interface CheckoutForm {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  useEffect(() => {
    const items = storage.getCart();
    if (items.length === 0) {
      router.push('/cart');
      return;
    }
    setCartItems(items);
  }, [router]);

  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);

    try {
      const newOrderNumber = generateOrderNumber();
      
      const order: Omit<Order, 'id' | 'createdAt'> = {
        items: cartItems,
        totalAmount,
        customerInfo: {
          name: data.customerName,
          phone: data.customerPhone,
          email: data.customerEmail,
        },
        status: 'pending'
      };

      // Save order
      storage.addOrder(order);
      
      // Clear cart
      storage.clearCart();
      window.dispatchEvent(new Event('cartUpdated'));
      
      setOrderNumber(newOrderNumber);
      setOrderComplete(true);
      
      toast.success('Замовлення успішно оформлено!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Помилка при оформленні замовлення');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="py-16">
        <div className="container max-w-2xl mx-auto text-center">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Замовлення успішно оформлено!
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-green-800 mb-2">
              Номер вашого замовлення: <span className="font-mono">{orderNumber}</span>
            </p>
            <p className="text-green-700">
              Загальна сума: {formatPrice(totalAmount)}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Для подальшого оформлення замовлення
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                <Phone className="h-8 w-8 text-primary-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-primary-800 mb-2">
                  Напишіть цей номер замовлення у Viber:
                </p>
                <p className="text-2xl font-bold text-primary-900 font-mono mb-4">
                  {orderNumber}
                </p>
                <p className="text-primary-700 mb-4">
                  на номер телефону:
                </p>
                <p className="text-xl font-bold text-primary-900 mb-6">
                  +380 95 607 16 03
                </p>
                <p className="text-sm text-primary-600">
                  Наш менеджер зв'яжеться з вами для уточнення способу оплати та доставки
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="viber://chat?number=0956071603">
                  <Button size="lg" className="inline-flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Відкрити Viber
                  </Button>
                </a>
                
                <a href="tel:+380956071603">
                  <Button variant="outline" size="lg" className="inline-flex items-center">
                    Подзвонити
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => router.push('/')}>
              Повернутися на головну
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="py-8">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Оформлення замовлення</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Контактна інформація</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="inline h-4 w-4 mr-1" />
                      Ім'я та прізвище *
                    </label>
                    <input
                      {...register('customerName', { 
                        required: 'Це поле обов\'язкове',
                        minLength: { value: 2, message: 'Мінімум 2 символи' }
                      })}
                      type="text"
                      className="input w-full"
                      placeholder="Введіть ваше ім'я"
                    />
                    {errors.customerName && (
                      <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Номер телефону *
                    </label>
                    <input
                      {...register('customerPhone', { 
                        required: 'Це поле обов\'язкове',
                        pattern: {
                          value: /^(\+38)?0\d{9}$/,
                          message: 'Введіть коректний номер телефону'
                        }
                      })}
                      type="tel"
                      className="input w-full"
                      placeholder="+380501234567"
                    />
                    {errors.customerPhone && (
                      <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email (необов'язково)
                    </label>
                    <input
                      {...register('customerEmail', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Введіть коректний email'
                        }
                      })}
                      type="email"
                      className="input w-full"
                      placeholder="example@email.com"
                    />
                    {errors.customerEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Оформлення...' : 'Оформити замовлення'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ваше замовлення</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="flex items-center space-x-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.product.images[0] || '/api/placeholder/64/64'}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.size} • {item.color} • Кількість: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Загальна сума:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    * Вартість доставки буде розрахована при підтвердженні замовлення
                  </p>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Важливо:</strong> Після оформлення замовлення ви отримаєте номер, 
                    який необхідно надіслати в Viber для підтвердження та уточнення деталей доставки.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
