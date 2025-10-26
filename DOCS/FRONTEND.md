# 🎨 Frontend документация

## Архитектура приложения

### App.js - Главный компонент

**Расположение**: `/app/frontend/src/App.js`

```javascript
import React, { useState } from "react";
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
// ... остальные импорты

function App() {
  // Состояние языка (en/es)
  const [language, setLanguage] = useState('en');

  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <Services language={language} />
        <Portfolio language={language} />
        <Process language={language} />
        <Testimonials language={language} />
        <Blog language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
      <Toaster position="top-right" />
    </div>
  );
}
```

**Ключевые моменты**:
- Единое управление языком на уровне приложения
- Язык передается через props всем компонентам
- Toaster для глобальных уведомлений

---

## mockData.js - Данные приложения

**Расположение**: `/app/frontend/src/mockData.js`

### 1. Services - Услуги агентства

```javascript
export const services = [
  {
    id: 1,
    title: "Website Development",           // EN
    titleEs: "Desarrollo de Sitios Web",   // ES
    description: "Custom websites...",      // EN описание
    descriptionEs: "Sitios web...",        // ES описание
    icon: "Code",                          // Название иконки (lucide-react)
    image: "https://...",                  // URL изображения
    features: [                            // Список возможностей
      "Responsive Design",
      "SEO Optimized",
      "Performance Focused",
      "Conversion Optimized"
    ]
  },
  // Всего 4 услуги:
  // 1. Website Development
  // 2. Marketing Campaigns  
  // 3. Marketing Automation
  // 4. International Expansion
]
```

**Использование**:
```javascript
import { services } from '../mockData';

services.map(service => (
  <div key={service.id}>
    <h3>{language === 'es' ? service.titleEs : service.title}</h3>
  </div>
))
```

### 2. Portfolio - Проекты

```javascript
export const portfolio = [
  {
    id: 1,
    title: "Entraycompara",
    description: "SaaS platform...",
    descriptionEs: "Plataforma SaaS...",
    category: "SaaS Platform",
    categoryEs: "Plataforma SaaS",
    image: "https://...",
    metrics: {                              // Результаты проекта
      leads: "+180%",
      traffic: "+250%",
      conversions: "+120%"
    },
    tags: ["Web Development", "SEO", "Marketing Automation"]
  },
  // Всего 5 проектов:
  // 1. Entraycompara (SaaS)
  // 2. Hotel Luxury Brand (Branding)
  // 3. Mandela Vintage Shop (E-commerce)
  // 4. Energy Export Solutions (B2B)
  // 5. FacturaFlash (SaaS)
]
```

### 3. Testimonials - Отзывы клиентов

```javascript
export const testimonials = [
  {
    id: 1,
    name: "Carlos Martínez",
    position: "CEO",
    company: "TechVision Solutions",
    image: "https://...",                 // Фото клиента
    quote: "GlobalScale transformed...",  // EN отзыв
    quoteEs: "GlobalScale transformó...", // ES отзыв
    rating: 5                              // Рейтинг 1-5
  },
  // Всего 6 отзывов от реальных клиентов
]
```

### 4. Stats - Статистика агентства

```javascript
export const stats = [
  {
    value: 250,                            // Числовое значение
    suffix: "+",                           // Суффикс (+ или %)
    label: "Clients Served",               // EN метка
    labelEs: "Clientes Atendidos"         // ES метка
  },
  // 4 метрики:
  // 250+ клиентов
  // 420% средний ROI
  // 50+ стран
  // 98% удовлетворенность
]
```

### 5. Process - Этапы работы

```javascript
export const process = [
  {
    step: 1,                                // Номер этапа
    title: "Discovery & Strategy",
    titleEs: "Descubrimiento y Estrategia",
    description: "We analyze your business...",
    descriptionEs: "Analizamos tu negocio...",
    icon: "Search"                         // Иконка этапа
  },
  // 4 этапа:
  // 1. Discovery & Strategy
  // 2. Design & Development
  // 3. Launch & Optimize
  // 4. Scale & Grow
]
```

### 6. BlogPosts - Статьи блога

```javascript
export const blogPosts = [
  {
    id: 1,
    title: "10 Digital Marketing Trends...",
    titleEs: "10 Tendencias de Marketing...",
    excerpt: "Discover the cutting-edge...",
    excerptEs: "Descubre las estrategias...",
    category: "Digital Strategy",
    categoryEs: "Estrategia Digital",
    author: "GlobalScale Team",
    date: "2025-02-15",                    // ISO формат
    readTime: "8 min read",
    image: "https://..."
  },
  // 3 статьи:
  // 1. Digital Marketing Trends 2025
  // 2. SEO in Spain
  // 3. Exporting Your Brand
]
```

---

## Основные паттерны

### 1. Двуязычность

**Паттерн условного отображения**:
```javascript
const MyComponent = ({ language }) => {
  return (
    <div>
      <h1>{language === 'es' ? 'Título en español' : 'English title'}</h1>
    </div>
  );
};
```

**В mockData**:
```javascript
// Всегда два поля для текста
title: "English",
titleEs: "Español"
```

### 2. Анимации с Framer Motion

**Появление при прокрутке**:
```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 50 }}        // Начальное состояние
  whileInView={{ opacity: 1, y: 0 }}     // При появлении в viewport
  viewport={{ once: true }}               // Анимация только 1 раз
  transition={{ duration: 0.6 }}         // Длительность
>
  Контент
</motion.div>
```

**Последовательная анимация**:
```javascript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}   // Задержка увеличивается
  >
    {item.title}
  </motion.div>
))}
```

**Бесконечная анимация**:
```javascript
<motion.div
  animate={{ y: [0, -20, 0] }}           // Массив значений
  transition={{
    duration: 4,
    repeat: Infinity,                     // Бесконечное повторение
    ease: "easeInOut"
  }}
>
  Плавающий элемент
</motion.div>
```

### 3. Управление состоянием

**useState для локального состояния**:
```javascript
import { useState } from 'react';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      Toggle
    </button>
  );
};
```

**useEffect для side-effects**:
```javascript
import { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    // Выполняется при монтировании
    const handleScroll = () => {
      console.log('Scrolling...');
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup при размонтировании
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Пустой массив = выполнится 1 раз
  
  return <div>Component</div>;
};
```

### 4. Стилизация с Tailwind

**Условные классы**:
```javascript
const Button = ({ variant, size }) => {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg
        ${variant === 'primary' ? 'bg-purple-600' : 'bg-gray-600'}
        ${size === 'large' ? 'text-lg' : 'text-base'}
      `}
    >
      Click me
    </button>
  );
};
```

**Группы hover**:
```javascript
<div className="group">
  <img className="group-hover:scale-110 transition-transform" />
  <h3 className="group-hover:text-purple-400 transition-colors" />
</div>
```

**Адаптивность**:
```javascript
<div className="
  grid
  grid-cols-1       /* 1 колонка на мобильных */
  md:grid-cols-2    /* 2 колонки на планшетах */
  lg:grid-cols-3    /* 3 колонки на десктопе */
  gap-4
">
  {items.map(item => <Card key={item.id} />)}
</div>
```

---

## Оптимизация производительности

### 1. React.memo для мемоизации

```javascript
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // Компонент не перерендерится если props не изменились
  return <div>{data}</div>;
});
```

### 2. useMemo для вычислений

```javascript
import { useMemo } from 'react';

const MyComponent = ({ items }) => {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]); // Пересчитывается только при изменении items
  
  return <List items={sortedItems} />;
};
```

### 3. useCallback для функций

```javascript
import { useCallback } from 'react';

const ParentComponent = () => {
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []); // Функция создается 1 раз
  
  return <ChildComponent onClick={handleClick} />;
};
```

### 4. Lazy loading изображений

```javascript
<img 
  src={imageUrl} 
  alt="Description"
  loading="lazy"           // Встроенная lazy загрузка
  className="w-full h-auto"
/>
```

---

## Рекомендации

### ✅ Хорошие практики:

1. **Всегда используйте key при .map()**:
```javascript
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

2. **Деструктуризация props**:
```javascript
// ✅ Хорошо
const Component = ({ title, description }) => {
  return <div>{title}</div>;
};

// ❌ Плохо  
const Component = (props) => {
  return <div>{props.title}</div>;
};
```

3. **Условный рендеринг**:
```javascript
// ✅ Хорошо
{isVisible && <Modal />}

// ✅ Хорошо с else
{isVisible ? <Modal /> : <Placeholder />}

// ❌ Плохо (undefined в JSX)
{isVisible && undefined}
```

4. **Обработчики событий**:
```javascript
// ✅ Хорошо
<button onClick={() => handleClick(item.id)}>Click</button>

// ❌ Плохо (вызовется сразу)
<button onClick={handleClick(item.id)}>Click</button>
```

### ❌ Избегайте:

1. Мутации state напрямую
2. Inline функции в render (для оптимизации)
3. Большие компоненты (>300 строк)
4. Дублирование логики

---

## Отладка

### React DevTools

1. Установите расширение React DevTools
2. Проверяйте props и state компонентов
3. Используйте Profiler для поиска узких мест

### Console логирование

```javascript
const MyComponent = ({ data }) => {
  console.log('Rendering with data:', data);
  
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []);
  
  return <div>{data}</div>;
};
```

### Обработка ошибок

```javascript
import { useState, useEffect } from 'react';

const MyComponent = () => {
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData()
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
      });
  }, []);
  
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  
  return <div>Content</div>;
};
```

---

**Следующий раздел**: [COMPONENTS.md](./COMPONENTS.md) - Детальное описание каждого компонента