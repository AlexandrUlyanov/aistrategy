# DONOSTI STRATEGIA - Документация проекта

## 📋 Описание

DONOSTI STRATEGIA - премиальный веб-сайт международного агентства цифрового маркетинга и стратегии бренда. Проект представляет собой современное одностраничное приложение (SPA) с блогом и системой роутинга.

## 🎯 Основные возможности

### Функциональность
- ✅ Многоязычность (Английский/Испанский)
- ✅ Адаптивный дизайн для всех устройств
- ✅ Система блога с отдельными страницами статей
- ✅ Контактная форма с отправкой email
- ✅ Портфолио проектов
- ✅ Секция отзывов клиентов
- ✅ Описание услуг и процессов работы
- ✅ SEO-оптимизация
- ✅ Навигация с хлебными крошками
- ✅ Плавные анимации и переходы

### Технический стек

**Frontend:**
- React 19.0.0
- React Router DOM 7.5.1
- Tailwind CSS 3.4.17
- Framer Motion 12.23.24 (анимации)
- Swiper.js 12.0.3 (слайдеры)
- Shadcn UI (компоненты)
- Lucide React (иконки)
- Axios 1.8.4 (HTTP запросы)

**Backend:**
- FastAPI (Python)
- Motor (MongoDB async driver)
- Python SMTP (отправка email)
- Pydantic (валидация данных)

**База данных:**
- MongoDB

**Инструменты разработки:**
- CRACO (Create React App Configuration Override)
- ESLint (линтер JavaScript)
- PostCSS + Autoprefixer
- Yarn (менеджер пакетов)

## 📁 Структура проекта

```
/app
├── backend/                 # Backend приложение
│   ├── server.py           # Основной файл FastAPI сервера
│   ├── requirements.txt    # Python зависимости
│   └── .env               # Переменные окружения backend
│
├── frontend/               # Frontend приложение
│   ├── public/            # Статические файлы
│   │   ├── index.html     # HTML шаблон
│   │   └── fonts/         # Шрифты Sohne
│   │
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogArticle.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Breadcrumbs.jsx
│   │   │   └── ui/        # Shadcn UI компоненты
│   │   │
│   │   ├── mockData.js    # Данные для контента
│   │   ├── App.js         # Основной компонент приложения
│   │   ├── App.css        # Глобальные стили
│   │   └── index.css      # Tailwind CSS импорты
│   │
│   ├── package.json       # Node.js зависимости
│   ├── tailwind.config.js # Конфигурация Tailwind
│   ├── craco.config.js    # Конфигурация CRACO
│   └── .env              # Переменные окружения frontend
│
└── docs/                  # Документация
    ├── README.md          # Этот файл
    ├── DEPLOYMENT.md      # Инструкции по развертыванию
    ├── DEVELOPMENT.md     # Руководство разработчика
    ├── ARCHITECTURE.md    # Архитектура системы
    ├── COMPONENTS.md      # Документация компонентов
    └── API.md            # Документация API
```

## 🚀 Быстрый старт

### Предварительные требования
- Node.js >= 16.x
- Python >= 3.8
- MongoDB
- Yarn

### Установка

1. **Клонирование репозитория**
```bash
cd /app
```

2. **Установка Frontend зависимостей**
```bash
cd frontend
yarn install
```

3. **Установка Backend зависимостей**
```bash
cd backend
pip install -r requirements.txt
```

4. **Настройка переменных окружения**

Frontend (.env):
```
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

Backend (.env):
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=aureum_digital
CORS_ORIGINS=*
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

5. **Запуск приложения**

```bash
# Frontend (в папке frontend)
yarn start

# Backend (в папке backend)
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

## 📚 Документация

- [Инструкции по развертыванию](./DEPLOYMENT.md)
- [Руководство разработчика](./DEVELOPMENT.md)
- [Архитектура системы](./ARCHITECTURE.md)
- [Документация компонентов](./COMPONENTS.md)
- [Документация API](./API.md)

## 🎨 Дизайн система

### Цветовая палитра
- **Золотой (Golden)**: `#D4AF37` - акцентный цвет
- **Графитовый (Graphite)**: `#2c2c2c` - основной темный цвет
- **Белый**: `#ffffff` - основной светлый цвет
- **Серый**: `#fafafa` - фон

### Типографика
- **Основной шрифт**: Sohne (Buch, Kraftig, Halbfett)
- **Моноширинный**: Sohne Mono
- **Узкий жирный**: Sohne Schmal Fett

### Анимации
- Плавные переходы: 300-500ms
- Hover эффекты с трансформацией
- Scroll-triggered анимации через Framer Motion

## 🌐 Многоязычность

Проект поддерживает два языка:
- Английский (en) - по умолчанию
- Испанский (es)

Переключение языка осуществляется через кнопку в Header.

## 📝 Контент

### Блог
- 7 статей на темы маркетинга и стратегии
- Полное содержание на английском и испанском
- Система категорий и фильтрации
- Рекомендованные статьи

### Портфолио
- 6 кейсов клиентов
- Подробные описания проектов
- Метрики и результаты

## 🔒 Безопасность

- CORS настроен для разрешенных доменов
- Валидация email через Pydantic
- Защита от XSS через React
- Безопасное хранение переменных окружения

## 📧 Контакты

- Email: contact@donostistrategia.com
- Локация: San Sebastián, Spain

## 📄 Лицензия

© 2025 DONOSTI STRATEGIA. Все права защищены.

---

**Версия документации**: 1.0.0  
**Последнее обновление**: 27 октября 2025