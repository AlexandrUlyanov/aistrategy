# 📚 GlobalScale Agency - Полная документация проекта

## 🎯 Обзор проекта

**GlobalScale Agency** - это экстравагантный лендинг для маркетингового агентства полного цикла.

### Ключевые особенности:
- 🌐 Двуязычный интерфейс (английский/испанский)
- 🎨 Современный дизайн с анимациями
- 📱 Адаптивная верстка для всех устройств
- ✨ Интерактивные элементы и эффекты
- 🎭 Анимированные счетчики и карусели
- 📧 Контактная форма
- 📝 Блог с фильтрацией
- 💼 Портфолио проектов

### Технологический стек:

**Frontend:**
- React 19.2.0
- Tailwind CSS 3.4.18
- Framer Motion 12.23.24
- Shadcn/ui компоненты
- Lucide React (иконки)
- Axios 1.12.2
- Sonner (уведомления)

**Backend:**
- FastAPI 0.110.1
- MongoDB (Motor 3.3.1)
- Pydantic 2.6.4+
- Python 3.11+

## 📁 Структура проекта

```
/app
├── frontend/                    # React приложение
│   ├── public/                 # Статические файлы
│   ├── src/
│   │   ├── components/         # React компоненты
│   │   │   ├── ui/            # Базовые UI (Shadcn)
│   │   │   ├── Header.jsx     # Навигация
│   │   │   ├── Hero.jsx       # Главная секция
│   │   │   ├── Services.jsx   # Услуги
│   │   │   ├── Portfolio.jsx  # Портфолио
│   │   │   ├── Process.jsx    # Процесс работы
│   │   │   ├── Testimonials.jsx # Отзывы
│   │   │   ├── Blog.jsx       # Блог
│   │   │   ├── Contact.jsx    # Контакты
│   │   │   └── Footer.jsx     # Подвал
│   │   ├── mockData.js        # Данные (mock)
│   │   ├── App.js             # Главный компонент
│   │   ├── App.css            # Кастомные стили
│   │   └── index.css          # Глобальные стили
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                     # FastAPI сервер
│   ├── server.py               # API endpoints
│   └── requirements.txt
│
└── DOCS/                        # Документация
    ├── README.md               # Этот файл
    ├── FRONTEND.md             # Фронтенд
    ├── COMPONENTS.md           # Компоненты
    ├── BACKEND.md              # Бэкенд
    └── STYLES.md               # Стили и дизайн
```

## 🚀 Быстрый старт

### Требования:
- Node.js 18+
- Yarn
- Python 3.11+
- MongoDB

### Установка Frontend:

```bash
cd /app/frontend
yarn install
yarn start
```

**URL**: http://localhost:3000

### Установка Backend:

```bash
cd /app/backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**API URL**: http://localhost:8001/api
**Документация API**: http://localhost:8001/docs

## 🎨 Цветовая палитра

### Основные цвета:
- **Фиолетовый (Primary)**: #a855f7 `hsl(271, 91%, 65%)`
- **Бирюзовый (Secondary)**: #06b6d4 `hsl(189, 94%, 43%)`
- **Розовый (Accent)**: #f472b6 `hsl(330, 81%, 70%)`
- **Черный (Background)**: #0a0a0a `hsl(0, 0%, 4%)`
- **Белый (Foreground)**: #ffffff `hsl(0, 0%, 98%)`

### Градиенты:
```css
/* Основной градиент */
linear-gradient(135deg, #a855f7, #06b6d4, #f472b6)

/* Фиолетовый */
linear-gradient(135deg, #a855f7, #ec4899)

/* Бирюзовый */
linear-gradient(135deg, #06b6d4, #14b8a6)
```

## 📖 Документация

### Подробная документация:

1. **[FRONTEND.md](./FRONTEND.md)** - Архитектура фронтенда, данные, хуки
2. **[COMPONENTS.md](./COMPONENTS.md)** - Все React компоненты
3. **[BACKEND.md](./BACKEND.md)** - API endpoints, модели данных
4. **[STYLES.md](./STYLES.md)** - CSS, анимации, Tailwind

## 🌐 Переменные окружения

### Frontend `.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Backend `.env`:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=globalscale_agency
```

## 🔧 Основные команды

### Frontend:
```bash
yarn start          # Запуск dev-сервера
yarn build          # Сборка для production
yarn test           # Запуск тестов
```

### Backend:
```bash
uvicorn server:app --reload    # Запуск с hot-reload
pytest                         # Запуск тестов
```

## 📝 Текущее состояние

### ✅ Реализовано:
- Полностью функциональный фронтенд
- Все секции лендинга
- Анимации и интерактивность
- Двуязычная поддержка
- Адаптивный дизайн
- Базовый backend API

### 🚧 В разработке:
- Backend для контактной формы
- Email уведомления
- CMS для блога
- Авторизация администратора

### 📋 Планы:
- SEO оптимизация
- Google Analytics
- Больше языков
- Unit и E2E тесты

## 🤝 Контрибьюция

При добавлении нового функционала:
1. Следуйте существующей структуре
2. Документируйте код на русском
3. Тестируйте на разных устройствах
4. Проверяйте производительность

## 📞 Контакты

- **Email**: dev@globalscale.agency
- **Website**: https://globalscale.agency

---

**Версия**: 1.0.0
**Дата**: Февраль 2025
**Авторы**: GlobalScale Development Team