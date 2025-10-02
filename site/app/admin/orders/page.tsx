'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Eye, Package, Phone, Mail, Calendar, User } from 'lucide-react';
import { Order } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice, formatDate } from '@/lib/utils';
import AdminProtection from '@/components/AdminProtection';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = storage.getOrders();
    // Сортуємо замовлення за датою (новіші спочатку)
    const sortedOrders = allOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setOrders(sortedOrders);
    setIsLoading(false);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const success = storage.updateOrderStatus(orderId, newStatus);
    if (success) {
      loadOrders();
      // Оновити вибране замовлення, якщо воно змінилось
      if (selectedOrder && selectedOrder.id === orderId) {
        const updatedOrder = orders.find(o => o.id === orderId);
        if (updatedOrder) {
          setSelectedOrder({ ...updatedOrder, status: newStatus });
        }
      }
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Очікує підтвердження';
      case 'confirmed': return 'Підтверджено';
      case 'processing': return 'В обробці';
      case 'shipped': return 'Відправлено';
      case 'delivered': return 'Доставлено';
      case 'cancelled': return 'Скасовано';
      default: return status;
    }
  };

  const totalRevenue = orders
    .filter(order => ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status))
    .reduce((sum, order) => sum + order.totalAmount, 0);

  if (isLoading) {
    return (
      <AdminProtection>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
        </div>
      </AdminProtection>
    );
  }

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Назад до панелі
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Управління замовленнями</h1>
                  <p className="text-gray-600">
                    Всього замовлень: {orders.length} | 
                    Загальний дохід: {formatPrice(totalRevenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container max-w-6xl mx-auto px-4 py-8">
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Orders List */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Список замовлень</h2>
                
                {orders.map((order) => (
                  <Card 
                    key={order.id} 
                    className={`cursor-pointer transition-all ${
                      selectedOrder?.id === order.id ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Замовлення #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{order.customerInfo.name}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {formatPrice(order.totalAmount)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} товарів
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Details */}
              <div className="lg:col-span-1">
                {selectedOrder ? (
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Package className="h-5 w-5 mr-2" />
                        Деталі замовлення
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Order Info */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Інформація про замовлення</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Номер:</span>
                            <span className="font-medium">#{selectedOrder.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Дата:</span>
                            <span className="font-medium">{formatDate(selectedOrder.createdAt)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Статус:</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                              {getStatusText(selectedOrder.status)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Сума:</span>
                            <span className="font-semibold text-lg">{formatPrice(selectedOrder.totalAmount)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Інформація про клієнта</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{selectedOrder.customerInfo.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <a 
                              href={`tel:${selectedOrder.customerInfo.phone}`}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              {selectedOrder.customerInfo.phone}
                            </a>
                          </div>
                          {selectedOrder.customerInfo.email && (
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <a 
                                href={`mailto:${selectedOrder.customerInfo.email}`}
                                className="text-primary-600 hover:text-primary-700"
                              >
                                {selectedOrder.customerInfo.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Товари в замовленні</h4>
                        <div className="space-y-3">
                          {selectedOrder.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                              <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                  src={item.product.images[0] || '/api/placeholder/48/48'}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {item.size} • {item.color} • {item.quantity} шт.
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {formatPrice(item.product.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Management */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Управління статусом</h4>
                        <div className="space-y-2">
                          {(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as Order['status'][]).map((status) => (
                            <button
                              key={status}
                              onClick={() => updateOrderStatus(selectedOrder.id, status)}
                              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                selectedOrder.status === status
                                  ? 'bg-primary-100 text-primary-800 font-medium'
                                  : 'hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              {getStatusText(status)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="space-y-2">
                        <a 
                          href={`viber://chat?number=${selectedOrder.customerInfo.phone.replace('+', '')}`}
                          className="w-full"
                        >
                          <Button variant="outline" className="w-full">
                            Написати в Viber
                          </Button>
                        </a>
                        <a 
                          href={`tel:${selectedOrder.customerInfo.phone}`}
                          className="w-full"
                        >
                          <Button variant="outline" className="w-full">
                            Подзвонити
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Виберіть замовлення для перегляду деталей
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Замовлень поки немає
                </h3>
                <p className="text-gray-600 mb-6">
                  Коли клієнти почнуть робити замовлення, вони з'являться тут
                </p>
                <Link href="/admin">
                  <Button variant="outline">
                    Повернутися до панелі
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </AdminProtection>
  );
}
