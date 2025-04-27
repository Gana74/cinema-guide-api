# CinemaGuide - Онлайн кинотеатр на Vue 3 + TypeScript

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

Современная онлайн-платформа для поиска и просмотра фильмов, построенная на Vue 3 с TypeScript. Проект разработан как часть экосистемы VK Маруся.

## ✨ Основные возможности

- 🎬 Просмотр топ-10 фильмов по рейтингу IMDb
- 🎲 Рекомендация случайного фильма
- 🔍 Умный поиск по названию фильма
- 🏷️ Фильтрация по жанрам
- ⭐ Добавление фильмов в избранное
- 🎥 Просмотр трейлеров
- 👤 Система авторизации пользователей

## 🛠 Технологии

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- SCSS

## 📦 Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/username/cinema-guide.git

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

## 🏗 Структура проекта

```
cinema-guide/
├── src/
│   ├── api/           # API клиенты и интерфейсы
│   ├── assets/        # Статические ресурсы
│   ├── components/    # Vue компоненты
│   ├── pages/         # Страницы приложения
│   ├── router/        # Конфигурация маршрутизации
│   ├── stores/        # Хранилища Pinia
│   ├── types/         # TypeScript типы/интерфейсы
│   └── utils/         # Вспомогательные функции
```

## 🔑 API

Проект использует API CinemaGuide для получения данных о фильмах. Документация API доступна по адресу: https://cinemaguide.skillbox.cc/docs/

## 🎯 Особенности реализации

- Современный стек на Vue 3 + TypeScript
- Компонентная архитектура
- Адаптивный дизайн
- Сохранение состояния авторизации
- Оптимизированная загрузка данных
- Защищенные роуты для авторизованных пользователей
