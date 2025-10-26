# 🎨 Документация стилей

## Цветовая система

### Основные цвета

**Файл**: `/app/frontend/src/index.css`

```css
:root {
  --background: 0 0% 4%;          /* #0a0a0a - Очень темный фон */
  --foreground: 0 0% 98%;         /* #fafafa - Белый текст */
  --primary: 271 91% 65%;         /* #a855f7 - Фиолетовый */
  --secondary: 189 94% 43%;       /* #06b6d4 - Бирюзовый */
  --accent: 330 81% 70%;          /* #f472b6 - Розовый */
}
```

**Формат HSL**:
```
hsl(hue, saturation%, lightness%)
```

- **Hue (тон)**: 0-360° 
  - 0° = красный
  - 120° = зеленый
  - 240° = синий
- **Saturation (насыщенность)**: 0-100%
- **Lightness (яркость)**: 0-100%

---

## Градиенты

**Файл**: `/app/frontend/src/App.css`

### 1. Градиентный текст

```css
.gradient-text {
  background: linear-gradient(135deg, #a855f7, #06b6d4, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Использование**:
```jsx
<h1 className="gradient-text">
  We Scale Your Business
</h1>
```

**Результат**:
- Текст с градиентом фиолетовый → бирюзовый → розовый
- Под углом 135° (слева-снизу вправо-вверх)

### 2. Варианты градиентов

```css
/* Фиолетово-розовый */
.gradient-purple {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Бирюзово-зеленый */
.gradient-teal {
  background: linear-gradient(135deg, #06b6d4, #14b8a6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 3. Анимированный градиент

```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(270deg, #a855f7, #06b6d4, #f472b6);
  background-size: 200% 200%;  /* Градиент в 2 раза шире */
  animation: gradientShift 8s ease infinite;
}
```

**Принцип работы**:
1. Градиент в 2 раза больше элемента
2. Анимация сдвигает позицию слева направо
3. Создает эффект перелива

---

## Эффекты свечения

### 1. Box Shadow Glow

```css
/* Фиолетовое свечение */
.glow-purple {
  box-shadow: 
    0 0 20px rgba(168, 85, 247, 0.4),   /* Ближнее свечение */
    0 0 40px rgba(168, 85, 247, 0.2);   /* Дальнее свечение */
}

/* Бирюзовое свечение */
.glow-teal {
  box-shadow: 
    0 0 20px rgba(6, 182, 212, 0.4),
    0 0 40px rgba(6, 182, 212, 0.2);
}

/* Розовое свечение */
.glow-coral {
  box-shadow: 
    0 0 20px rgba(244, 114, 182, 0.4),
    0 0 40px rgba(244, 114, 182, 0.2);
}
```

**Синтаксис box-shadow**:
```css
box-shadow: offset-x offset-y blur-radius spread-radius color;
```

**Пример**:
```css
box-shadow: 0 0 20px 0 rgba(168, 85, 247, 0.4);
/*          ↑ ↑  ↑   ↑  ↑
            x y blur spread color */
```

---

## Анимации

### 1. Появление снизу

```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);  /* На 40px ниже */
  }
  to {
    opacity: 1;
    transform: translateY(0);     /* На месте */
  }
}

.slide-in-up {
  animation: slideInUp 0.6s ease-out;
}
```

**Использование**:
```jsx
<div className="slide-in-up">
  Элемент появляется снизу
</div>
```

### 2. Появление слева/справа

```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### 3. Floating (плавание)

```css
@keyframes float {
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-20px);  /* Поднимается на 20px */
  }
}

.floating {
  animation: float 6s ease-in-out infinite;
}
```

**Использование с Framer Motion**:
```jsx
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
>
  Плавающий элемент
</motion.div>
```

### 4. Pulse (пульсация)

```css
@keyframes pulse {
  0%, 100% { 
    opacity: 1; 
  }
  50% { 
    opacity: 0.7; 
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

### 5. Shimmer (мерцание)

```css
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.text-shimmer {
  background: linear-gradient(
    90deg,
    #a855f7 0%,
    #06b6d4 25%,
    #f472b6 50%,
    #a855f7 75%,
    #06b6d4 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}
```

---

## Hover эффекты

### 1. Подъем при hover

```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);  /* Поднимается на 8px */
  box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
}
```

### 2. Увеличение при hover

```css
.scale-hover {
  transition: transform 0.3s ease;
}

.scale-hover:hover {
  transform: scale(1.05);  /* Увеличение на 5% */
}
```

### 3. Групповой hover (Tailwind)

```jsx
<div className="group">
  <img className="group-hover:scale-110 transition-transform duration-700" />
  <h3 className="group-hover:text-purple-400 transition-colors" />
</div>
```

**Принцип**:
- `group` на родителе
- `group-hover:...` на дочерних элементах
- При hover на родителе срабатывают стили детей

---

## Glass Morphism

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);  /* Полупрозрачный фон */
  backdrop-filter: blur(10px);            /* Размытие фона */
  -webkit-backdrop-filter: blur(10px);    /* Safari */
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Использование с Tailwind**:
```jsx
<div className="
  bg-white/5                /* background: rgba(255,255,255,0.05) */
  backdrop-blur-lg          /* backdrop-filter: blur(16px) */
  border border-white/10
  rounded-2xl
  p-6
">
  Стеклянный эффект
</div>
```

**Степени размытия**:
- `backdrop-blur-sm` - 4px
- `backdrop-blur` - 8px
- `backdrop-blur-lg` - 16px
- `backdrop-blur-xl` - 24px

---

## Геометрические эффекты

### 1. Grid паттерн

```css
.grid-bg {
  background-image: 
    linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

**Результат**:
- Сетка из линий 50x50px
- Фиолетовый цвет с прозрачностью 10%

### 2. Radial Gradient фон

```css
.geometric-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(244, 114, 182, 0.1) 0%, transparent 50%);
  pointer-events: none;  /* Не блокирует клики */
}
```

**Объяснение**:
- 3 радиальных градиента
- Разные позиции (20% 50%, 80% 80%, 40% 20%)
- Создают эффект глубины

---

## Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;  /* Цвет фона */
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #a855f7, #06b6d4);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #9333ea, #0891b2);
}
```

**Поддержка**:
- ✅ Chrome, Edge, Safari
- ❌ Firefox (используйте `scrollbar-color` и `scrollbar-width`)

---

## Tailwind конфигурация

**Файл**: `/app/frontend/tailwind.config.js`

```javascript
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // CSS переменные из index.css
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',              // 0.5rem
        md: 'calc(var(--radius) - 2px)',  // 0.375rem
        sm: 'calc(var(--radius) - 4px)'   // 0.25rem
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
```

---

## Полезные Tailwind классы

### Размеры и отступы
```css
w-full          /* width: 100% */
h-screen        /* height: 100vh */
max-w-6xl       /* max-width: 72rem (1152px) */
px-4            /* padding-left/right: 1rem (16px) */
py-6            /* padding-top/bottom: 1.5rem (24px) */
gap-8           /* gap: 2rem (32px) */
```

### Флексбокс
```css
flex            /* display: flex */
items-center    /* align-items: center */
justify-between /* justify-content: space-between */
flex-col        /* flex-direction: column */
space-x-4       /* gap между элементами по X */
```

### Grid
```css
grid                /* display: grid */
grid-cols-3         /* 3 колонки */
md:grid-cols-2      /* 2 колонки на планшетах */
lg:grid-cols-4      /* 4 колонки на десктопе */
gap-6               /* gap: 1.5rem */
```

### Цвета
```css
text-white          /* color: white */
bg-black            /* background: black */
border-white/10     /* border-color: rgba(255,255,255,0.1) */
from-purple-600     /* gradient from */
to-teal-600         /* gradient to */
```

### Текст
```css
text-xl             /* font-size: 1.25rem */
font-bold           /* font-weight: 700 */
leading-relaxed     /* line-height: 1.625 */
tracking-wide       /* letter-spacing: 0.025em */
truncate            /* text-overflow: ellipsis */
line-clamp-2        /* обрезка до 2 строк */
```

### Эффекты
```css
rounded-2xl         /* border-radius: 1rem */
shadow-2xl          /* box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25) */
backdrop-blur-lg    /* backdrop-filter: blur(16px) */
transition-all      /* transition: all */
duration-300        /* transition-duration: 300ms */
ease-in-out         /* transition-timing-function: ease-in-out */
```

---

## Оптимизация

### 1. Минимизация CSS

Tailwind автоматически удаляет неиспользуемые классы:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Сканирует эти файлы
  ],
  // ...
};
```

### 2. Критический CSS

В production основной CSS загружается inline:

```html
<head>
  <style>
    /* Критические стили */
    .hero { ... }
  </style>
</head>
<body>
  <link rel="stylesheet" href="/static/css/main.css">
</body>
```

### 3. Анимации

Используйте `will-change` для оптимизации:

```css
.animated-element {
  will-change: transform, opacity;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Удалите после анимации */
.animated-element:hover {
  will-change: auto;
}
```

---

**Назад**: [COMPONENTS.md](./COMPONENTS.md)
**Главная**: [README.md](./README.md)