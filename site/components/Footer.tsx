import Link from 'next/link';
import { Baby, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Baby className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">КідСтайл</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Найкращий дитячий одяг для ваших малюків. Якість, комфорт та стиль в кожній речі.
            </p>
            <div className="flex space-x-4">
              <a href="viber://chat?number=0956071603" className="text-gray-300 hover:text-primary-400 transition-colors">
                Viber
              </a>
              <a href="https://t.me/+380956071603" className="text-gray-300 hover:text-primary-400 transition-colors">
                Telegram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Про нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">+380 95 607 16 03</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">info@kidstyle.ua</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">Україна</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 КідСтайл. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
