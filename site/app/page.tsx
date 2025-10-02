'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Heart } from 'lucide-react';
import { Product } from '@/types';
import { storage } from '@/lib/storage';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = storage.getProducts();
    setFeaturedProducts(products.slice(0, 6));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-16">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Найкращий дитячий одяг для ваших малюків
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Якість, комфорт та стиль в кожній речі. Створюємо одяг, в якому ваші діти почуваються впевнено та щасливо.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalog">
              <Button size="lg">
                Переглянути каталог
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Дізнатися більше
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Якісні матеріали</h3>
              <p className="text-gray-600">
                Використовуємо тільки найкращі та безпечні матеріали для дитячої шкіри
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Швидка доставка</h3>
              <p className="text-gray-600">
                Доставляємо замовлення по всій Україні протягом 1-3 робочих днів
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">З любовʼю до дітей</h3>
              <p className="text-gray-600">
                Кожна річ створена з думкою про комфорт та щастя ваших малюків
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Популярні товари</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Найкращий вибір дитячого одягу, який полюбляють наші клієнти
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/catalog">
              <Button variant="outline" size="lg">
                Переглянути весь каталог
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Маєте питання? Звʼяжіться з нами!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Наша команда завжди готова допомогти з вибором одягу для ваших малюків
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="viber://chat?number=0956071603">
              <Button variant="secondary" size="lg">
                Написати в Viber
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Контактна інформація
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
