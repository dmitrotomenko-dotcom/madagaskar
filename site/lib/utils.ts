import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `${price} ₴`
}

export function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export const CATEGORIES = {
  newborn: 'Новонароджені',
  boys: 'Для хлопчиків',
  girls: 'Для дівчаток',
  toddlers: 'Малюки',
  accessories: 'Аксесуари',
  shoes: 'Взуття'
};

export const SIZES = [
  '0-3m', '3-6m', '6-12m', '1-2y', '2-3y', '3-4y', '4-5y', '5-6y', 'XS', 'S', 'M', 'L', 'XL'
];

export const COLORS = [
  'білий', 'чорний', 'сірий', 'синій', 'рожевий', 'жовтий', 'зелений', 
  'червоний', 'фіолетовий', 'помаранчевий'
];
