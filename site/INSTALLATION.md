# Інструкція з встановлення та запуску

## Крок 1: Встановлення Node.js

### Windows:
1. Перейдіть на https://nodejs.org/
2. Завантажте LTS версію Node.js (рекомендується версія 18.x або новіша)
3. Запустіть завантажений файл та дотримуйтесь інструкцій встановлення
4. Перезапустіть командний рядок або PowerShell

### macOS:
```bash
# Використовуючи Homebrew
brew install node

# Або завантажте з https://nodejs.org/
```

### Linux (Ubuntu/Debian):
```bash
# Використовуючи NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Або використовуючи snap
sudo snap install node --classic
```

## Крок 2: Перевірка встановлення

Відкрийте командний рядок та виконайте:
```bash
node --version
npm --version
```

Ви повинні побачити номери версій.

## Крок 3: Встановлення залежностей проекту

В директорії проекту виконайте:
```bash
npm install
```

## Крок 4: Запуск проекту

### Для розробки (локально):
```bash
npm run dev
```

Сайт буде доступний за адресою: http://localhost:3000

### Для збірки в продакшен:
```bash
npm run build
```

### Для розгортання на Cloudflare:
```bash
npm run pages:build
npm run deploy
```

## Структура команд

- `npm run dev` - запуск в режимі розробки
- `npm run build` - збірка для продакшену  
- `npm run start` - запуск готової збірки
- `npm run lint` - перевірка коду
- `npm run pages:build` - збірка для Cloudflare Pages
- `npm run preview` - попередній перегляд Cloudflare збірки
- `npm run deploy` - розгортання на Cloudflare Pages

## Вирішення проблем

### Проблема з правами (Windows):
Якщо виникають помилки з правами доступу, запустіть PowerShell від імені адміністратора та виконайте:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Проблема з npm (будь-яка ОС):
Якщо npm не працює після встановлення Node.js, спробуйте:
```bash
npm install -g npm@latest
```

### Очистка кешу npm:
```bash
npm cache clean --force
```

## Тестування функціоналу

1. **Основний сайт**:
   - Перейдіть на http://localhost:3000
   - Перевірте каталог товарів
   - Додайте товари до кошика
   - Оформіть тестове замовлення

2. **Адмін-панель**:
   - Перейдіть на http://localhost:3000/admin/login
   - Увійдіть з даними: логін `admin`, пароль `admin123`
   - Додайте нові товари
   - Перевірте замовлення

## Готово!

Після виконання цих кроків ваш інтернет-магазин дитячого одягу буде готовий до використання! 🎉
