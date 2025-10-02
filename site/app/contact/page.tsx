import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="py-8">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Зв'яжіться з нами</h1>
          <p className="text-gray-600 text-lg">
            Ми завжди готові допомогти вам з вибором дитячого одягу
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-500" />
                Контактна інформація
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-500 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Телефон</h3>
                  <p className="text-gray-600">+380 95 607 16 03</p>
                  <p className="text-sm text-gray-500">Щоденно з 9:00 до 21:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary-500 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">info@kidstyle.ua</p>
                  <p className="text-sm text-gray-500">Відповідаємо протягом 24 годин</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Локація</h3>
                  <p className="text-gray-600">Україна</p>
                  <p className="text-sm text-gray-500">Доставка по всій країні</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-500 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Робочі години</h3>
                  <p className="text-gray-600">Пн-Нд: 9:00 - 21:00</p>
                  <p className="text-sm text-gray-500">Без вихідних</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messaging Apps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-primary-500" />
                Месенджери
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-6">
                Найшвидший спосіб зв'язатися з нами - через месенджери
              </p>

              <div className="space-y-4">
                <a href="viber://chat?number=0956071603">
                  <Button className="w-full justify-start">
                    <div className="w-6 h-6 mr-3 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                    Написати в Viber
                  </Button>
                </a>

                <a href="https://t.me/+380956071603">
                  <Button variant="outline" className="w-full justify-start">
                    <div className="w-6 h-6 mr-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    Написати в Telegram
                  </Button>
                </a>

                <a href="tel:+380956071603">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-3 text-green-500" />
                    Подзвонити
                  </Button>
                </a>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  Для швидкого оформлення замовлення:
                </h3>
                <p className="text-sm text-blue-700">
                  1. Додайте товари до кошика<br />
                  2. Оформіть замовлення на сайті<br />
                  3. Отримайте номер замовлення<br />
                  4. Напишіть нам у Viber з номером замовлення
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Часті запитання</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Як оформити замовлення?
                </h3>
                <p className="text-gray-600 text-sm">
                  Додайте товари до кошика, заповніть контактну інформацію та оформіть замовлення. 
                  Після цього ви отримаєте номер замовлення, який потрібно надіслати нам у Viber.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Які способи оплати ви приймаєте?
                </h3>
                <p className="text-gray-600 text-sm">
                  Ми приймаємо оплату готівкою при отриманні, картою онлайн, та банківський переказ. 
                  Деталі обговорюємо індивідуально при підтвердженні замовлення.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Скільки коштує доставка?
                </h3>
                <p className="text-gray-600 text-sm">
                  Вартість доставки залежить від регіону та способу доставки. 
                  Безкоштовна доставка при замовленні від 1000₴. Деталі уточнюємо при оформленні.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Чи можна повернути або обміняти товар?
                </h3>
                <p className="text-gray-600 text-sm">
                  Так, ви можете повернути або обміняти товар протягом 14 днів з дня отримання, 
                  якщо він не використовувався та збережена його первісна упаковка.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
