'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import { Product } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice, CATEGORIES } from '@/lib/utils';
import AdminProtection from '@/components/AdminProtection';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const allProducts = storage.getProducts();
    setProducts(allProducts);
    setIsLoading(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей товар?')) {
      const success = storage.deleteProduct(productId);
      if (success) {
        loadProducts();
        toast.success('Товар видалено');
      } else {
        toast.error('Помилка видалення товару');
      }
    }
  };

  const toggleStock = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const updated = storage.updateProduct(productId, { inStock: !product.inStock });
      if (updated) {
        loadProducts();
        toast.success(`Товар ${product.inStock ? 'знято з продажу' : 'повернуто в продаж'}`);
      }
    }
  };

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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Управління товарами</h1>
                <p className="text-gray-600">Всього товарів: {products.length}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/admin/products/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Додати товар
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline">
                    Назад до панелі
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container max-w-6xl mx-auto px-4 py-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[0] || '/api/placeholder/300/300'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Немає в наявності
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Категорія:</span>
                        <span className="font-medium">{CATEGORIES[product.category as keyof typeof CATEGORIES]}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ціна:</span>
                        <span className="font-semibold text-lg">{formatPrice(product.price)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Кількість:</span>
                        <span className="font-medium">{product.stockQuantity}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="text-xs text-gray-600">Розміри:</span>
                      {product.sizes.map((size) => (
                        <span key={size} className="px-2 py-1 text-xs bg-gray-100 rounded">
                          {size}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="text-xs text-gray-600">Кольори:</span>
                      {product.colors.map((color) => (
                        <span key={color} className="px-2 py-1 text-xs bg-gray-100 rounded">
                          {color}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Link href={`/product/${product.id}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full">
                            <Eye className="h-3 w-3 mr-1" />
                            Переглянути
                          </Button>
                        </Link>
                        <Link href={`/admin/products/edit/${product.id}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full">
                            <Edit className="h-3 w-3 mr-1" />
                            Редагувати
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={product.inStock ? "secondary" : "primary"}
                          onClick={() => toggleStock(product.id)}
                          className="flex-1"
                        >
                          {product.inStock ? 'Зняти з продажу' : 'Повернути в продаж'}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Товарів поки немає
                </h3>
                <p className="text-gray-600 mb-6">
                  Додайте перший товар до вашого магазину
                </p>
                <Link href="/admin/products/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Додати товар
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
