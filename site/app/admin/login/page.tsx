'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Lock, User } from 'lucide-react';
import { storage } from '@/lib/storage';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import toast from 'react-hot-toast';

interface LoginForm {
  username: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoggingIn(true);

    try {
      const admin = storage.getAdmin();
      
      if (data.username === admin.username && data.password === admin.password) {
        storage.setAdminLoggedIn(true);
        toast.success('Успішний вхід!');
        router.push('/admin');
      } else {
        toast.error('Невірний логін або пароль');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Помилка входу');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Вхід в адмін-панель
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="inline h-4 w-4 mr-1" />
                  Логін
                </label>
                <input
                  {...register('username', { 
                    required: 'Введіть логін' 
                  })}
                  type="text"
                  className="input w-full"
                  placeholder="Введіть логін"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Lock className="inline h-4 w-4 mr-1" />
                  Пароль
                </label>
                <input
                  {...register('password', { 
                    required: 'Введіть пароль' 
                  })}
                  type="password"
                  className="input w-full"
                  placeholder="Введіть пароль"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoggingIn}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Вхід...' : 'Увійти'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Тестові дані для входу:
              </h3>
              <p className="text-sm text-blue-700">
                <strong>Логін:</strong> admin<br />
                <strong>Пароль:</strong> admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
