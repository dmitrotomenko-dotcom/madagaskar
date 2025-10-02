import { Heart, Shield, Truck, Users, Award, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="py-8">
      <div className="container max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Про нас</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            КідСтайл - це український бренд дитячого одягу, який створює якісні, 
            зручні та стильні речі для ваших малюків з 2020 року.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша історія</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                КідСтайл був заснований з простої ідеї - створювати дитячий одяг, 
                який поєднує в собі комфорт, якість та доступність. Ми розуміємо, 
                наскільки важливо для батьків знайти одяг, в якому їхні діти 
                почуваються комфортно та впевнено.
              </p>
              <p>
                З самого початку ми зосереджувалися на використанні тільки 
                найкращих матеріалів та ретельному контролі якості кожної речі. 
                Наша команда працює над тим, щоб кожен виріб відповідав найвищим 
                стандартам безпеки та комфорту для дітей.
              </p>
              <p>
                Сьогодні ми пишаємося тим, що тисячі українських сімей обирають 
                КідСтайл для своїх малюків, довіряючи нам найдорожче - комфорт 
                та щастя своїх дітей.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">5000+</h3>
                <p className="text-gray-600">Задоволених клієнтів</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">4+ років</h3>
                <p className="text-gray-600">На ринку</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
                <p className="text-gray-600">Рейтинг клієнтів</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Truck className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">24 години</h3>
                <p className="text-gray-600">Доставка по Україні</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Наші цінності</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent>
                <Heart className="h-16 w-16 text-red-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Любов до дітей
                </h3>
                <p className="text-gray-600">
                  Кожна річ створена з думкою про комфорт та щастя ваших малюків. 
                  Ми розуміємо, наскільки важливо, щоб діти почувалися вільно та впевнено.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <Shield className="h-16 w-16 text-blue-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Якість та безпека
                </h3>
                <p className="text-gray-600">
                  Використовуємо тільки сертифіковані матеріали, які безпечні для 
                  дитячої шкіри. Кожен виріб проходить ретельний контроль якості.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <Users className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Турбота про клієнтів
                </h3>
                <p className="text-gray-600">
                  Наша команда завжди готова допомогти з вибором, відповісти на 
                  запитання та забезпечити найкращий сервіс для наших клієнтів.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Чому обирають КідСтайл?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Натуральні матеріали
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Використовуємо бавовну, льон та інші натуральні тканини, 
                    які дихають та не викликають алергії.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Зручний крій
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Наш одяг розроблений з урахуванням анатомічних особливостей 
                    дітей різного віку для максимального комфорту.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Стильний дизайн
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Слідуємо світовим трендам дитячої моди, створюючи сучасні 
                    та привабливі моделі.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Доступні ціни
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Пропонуємо високоякісний одяг за справедливими цінами, 
                    щоб кожна сім'я могла дозволити собі краще для своїх дітей.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Швидка доставка
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Доставляємо замовлення по всій Україні протягом 1-3 робочих 
                    днів, безкоштовно від 1000₴.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">6</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Гарантія та обмін
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Надаємо гарантію на всі товари та можливість легкого 
                    обміну або повернення протягом 14 днів.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
