'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { storage } from '@/lib/storage';
import { CATEGORIES, SIZES, COLORS } from '@/lib/utils';
import AdminProtection from '@/components/AdminProtection';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import toast from 'react-hot-toast';

interface ProductForm {
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  sizes: string[];
  colors: string[];
  images: string[];
}

export default function NewProductPage() {
  const router = useRouter();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductForm>();

  const toggleSize = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSizes);
    setValue('sizes', newSizes);
  };

  const toggleColor = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    
    setSelectedColors(newColors);
    setValue('colors', newColors);
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      const newImages = [...imageUrls, newImageUrl.trim()];
      setImageUrls(newImages);
      setValue('images', newImages);
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImages);
    setValue('images', newImages);
  };

  const onSubmit = async (data: ProductForm) => {
    if (selectedSizes.length === 0) {
      toast.error('Оберіть хоча б один розмір');
      return;
    }

    if (selectedColors.length === 0) {
      toast.error('Оберіть хоча б один колір');
      return;
    }

    if (imageUrls.length === 0) {
      toast.error('Додайте хоча б одне зображення');
      return;
    }

    setIsSubmitting(true);

    try {
      const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        category: data.category,
        stockQuantity: Number(data.stockQuantity),
        sizes: selectedSizes,
        colors: selectedColors,
        images: imageUrls,
        inStock: true,
      };

      storage.addProduct(productData);
      toast.success('Товар успішно додано!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Помилка додавання товару');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/products">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Додати новий товар</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="container max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Інформація про товар</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Назва товару *
                    </label>
                    <input
                      {...register('name', { 
                        required: 'Назва товару обов\'язкова',
                        minLength: { value: 3, message: 'Мінімум 3 символи' }
                      })}
                      type="text"
                      className="input w-full"
                      placeholder="Назва товару"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Категорія *
                    </label>
                    <select
                      {...register('category', { required: 'Оберіть категорію' })}
                      className="input w-full"
                    >
                      <option value="">Оберіть категорію</option>
                      {Object.entries(CATEGORIES).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Опис товару *
                  </label>
                  <textarea
                    {...register('description', { 
                      required: 'Опис товару обов\'язковий',
                      minLength: { value: 10, message: 'Мінімум 10 символів' }
                    })}
                    rows={4}
                    className="input w-full resize-none"
                    placeholder="Детальний опис товару"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ціна (₴) *
                    </label>
                    <input
                      {...register('price', { 
                        required: 'Ціна обов\'язкова',
                        min: { value: 1, message: 'Ціна має бути більше 0' }
                      })}
                      type="number"
                      min="0"
                      step="0.01"
                      className="input w-full"
                      placeholder="0.00"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Кількість на складі *
                    </label>
                    <input
                      {...register('stockQuantity', { 
                        required: 'Кількість обов\'язкова',
                        min: { value: 0, message: 'Кількість не може бути менше 0' }
                      })}
                      type="number"
                      min="0"
                      className="input w-full"
                      placeholder="0"
                    />
                    {errors.stockQuantity && (
                      <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
                    )}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Доступні розміри *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`p-2 text-sm rounded border ${
                          selectedSizes.includes(size)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 text-gray-700 hover:border-primary-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSizes.length === 0 && (
                    <p className="text-gray-500 text-sm mt-1">Оберіть хоча б один розмір</p>
                  )}
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Доступні кольори *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleColor(color)}
                        className={`p-2 text-sm rounded border ${
                          selectedColors.includes(color)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 text-gray-700 hover:border-primary-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                  {selectedColors.length === 0 && (
                    <p className="text-gray-500 text-sm mt-1">Оберіть хоча б один колір</p>
                  )}
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Зображення товару *
                  </label>
                  
                  {/* Add Image URL */}
                  <div className="flex gap-2 mb-4">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="input flex-1"
                      placeholder="https://example.com/image.jpg або /api/placeholder/400/400"
                    />
                    <Button type="button" onClick={addImageUrl} disabled={!newImageUrl.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Image List */}
                  {imageUrls.length > 0 && (
                    <div className="space-y-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <span className="flex-1 text-sm text-gray-700 truncate">{url}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {imageUrls.length === 0 && (
                    <p className="text-gray-500 text-sm">Додайте хоча б одне зображення</p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Додавання...' : 'Додати товар'}
                  </Button>
                  <Link href="/admin/products">
                    <Button variant="outline" size="lg">
                      Скасувати
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </AdminProtection>
  );
}
