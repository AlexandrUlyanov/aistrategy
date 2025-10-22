# 📚 Документация проекта GlobalScale Agency

## 📋 Оглавление
1. [Обзор проекта](#обзор-проекта)
2. [Архитектура](#архитектура)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Компоненты](#компоненты)
6. [Стили и дизайн](#стили-и-дизайн)
7. [Данные](#данные)
8. [Установка и запуск](#установка-и-запуск)

---

## 🎯 Обзор проекта

**GlobalScale Agency** - это экстравагантный лендинг-пейдж для полноценного маркетингового агентства, специализирующегося на веб-сайтах, входящих/исходящих кампаниях и комплексных маркетинговых решениях.

### Основные возможности:
- 🌐 Двуязычная поддержка (английский/испанский)
- 🎨 Современный дизайн с анимациями и эффектами
- 📱 Полностью адаптивная верстка
- ✨ Интерактивные элементы (параллакс, hover-эффекты)
- 🎭 Анимированные счетчики и карусели
- 📧 Контактная форма
- 📝 Блог с фильтрацией
- 💼 Портфолио с кейсами

### Технологический стек:
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Swiper
- **Backend**: FastAPI, MongoDB (Motor)
- **UI Components**: Shadcn/ui, Lucide React (иконки)
- **Анимации**: Framer Motion, CSS Animations

---

## 🏗️ Архитектура

```
/app
├── frontend/               # React приложение
│   ├── public/            # Статические файлы
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   │   ├── ui/       # Базовые UI компоненты (Shadcn)
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── mockData.js    # Моковые данные
│   │   ├── App.js         # Главный компонент
│   │   ├── App.css        # Кастомные стили
│   │   └── index.css      # Глобальные стили
│   ├── package.json       # Зависимости frontend
│   └── tailwind.config.js # Конфигурация Tailwind
│
└── backend/               # FastAPI сервер
    ├── server.py          # Основной файл сервера
    └── requirements.txt   # Зависимости backend
```

---

## 🎨 Frontend

### Файл: `/app/frontend/src/App.js`

**Назначение**: Главный компонент приложения, который объединяет все секции лендинга.

**Основные функции**:
```javascript
function App() {
  // Управление языком интерфейса
  const [language, setLanguage] = useState('en'); // 'en' или 'es'
  
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

**Ключевые особенности**:
- Управление состоянием языка на уровне приложения
- Передача языка во все компоненты через props
- Использование компонента Toaster для уведомлений

---

### Файл: `/app/frontend/src/mockData.js`

**Назначение**: Хранилище всех данных для лендинга (в production должны быть заменены на API-запросы).

**Структура данных**:

#### 1. `services` - Услуги агентства
```javascript
export const services = [
  {
    id: 1,
    title: "Website Development",           // Название на английском
    titleEs: "Desarrollo de Sitios Web",   // Название на испанском
    description: "...",                     // Описание на английском
    descriptionEs: "...",                   // Описание на испанском
    icon: "Code",                          // Название иконки из lucide-react
    image: "https://...",                  // URL изображения
    features: ["Feature 1", "Feature 2"]   // Список возможностей
  },
  // ... всего 4 услуги
]
```

#### 2. `portfolio` - Портфолио проектов
```javascript
export const portfolio = [
  {
    id: 1,
    title: "Entraycompara",
    description: "...",
    category: "SaaS Platform",
    image: "https://...",
    metrics: {
      leads: "+180%",      // Метрики проекта
      traffic: "+250%",
      conversions: "+120%"
    },
    tags: ["Web Development", "SEO"]
  },
  // ... всего 5 проектов
]
```

#### 3. `testimonials` - Отзывы клиентов
```javascript
export const testimonials = [
  {
    id: 1,
    name: "Carlos Martínez",
    position: "CEO",
    company: "TechVision Solutions",
    image: "https://...",
    quote: "...",
    quoteEs: "...",
    rating: 5
  },
  // ... всего 6 отзывов
]
```

#### 4. `stats` - Статистика агентства
```javascript
export const stats = [
  {
    value: 250,
    suffix: "+",
    label: "Clients Served",
    labelEs: "Clientes Atendidos"
  },
  // ... всего 4 метрики
]
```

#### 5. `process` - Процесс работы
```javascript
export const process = [
  {
    step: 1,
    title: "Discovery & Strategy",
    titleEs: "Descubrimiento y Estrategia",
    description: "...",
    descriptionEs: "...",
    icon: "Search"
  },
  // ... всего 4 этапа
]
```

#### 6. `blogPosts` - Статьи блога
```javascript
export const blogPosts = [
  {
    id: 1,
    title: "10 Digital Marketing Trends...",
    titleEs: "10 Tendencias de Marketing...",
    excerpt: "...",
    category: "Digital Strategy",
    author: "GlobalScale Team",
    date: "2025-02-15",
    readTime: "8 min read",
    image: "https://..."
  },
  // ... всего 3 статьи
]
```

---

## 🧩 Компоненты

### 1. Header.jsx - Навигационная панель

**Назначение**: Фиксированная шапка сайта с навигацией и переключателем языка.

**Основные возможности**:
- Фиксированная позиция с эффектом прокрутки
- Адаптивное мобильное меню
- Переключатель языка (EN/ES)
- Плавная прокрутка к секциям
- Анимация появления при загрузке

**Ключевой код**:
```javascript
const Header = ({ language, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Отслеживание прокрутки для изменения фона
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // ...
}
```

**Состояния**:
- `isScrolled`: Добавляет фон и границу при прокрутке
- `isMobileMenuOpen`: Управление мобильным меню

**Стили при прокрутке**:
- `bg-black/80 backdrop-blur-lg` - полупрозрачный фон с размытием
- `border-b border-white/10` - тонкая граница снизу

---

### 2. Hero.jsx - Главная секция

**Назначение**: Первая секция сайта с главным сообщением и призывом к действию.

**Основные возможности**:
- Анимированный canvas с частицами
- Геометрические фоновые формы
- Градиентный текст
- Анимированные метрики (250+ клиентов, 420% ROI, 50+ стран)
- Плавающие карточки с метриками
- Две CTA кнопки: "Get Started" и "View Cases"

**Технические детали**:

#### Canvas анимация частиц:
```javascript
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = Math.random() > 0.5 
        ? 'rgba(168, 85, 247, 0.5)'  // Фиолетовый
        : 'rgba(6, 182, 212, 0.5)';  // Бирюзовый
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      // Циклическое движение
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // ... создание 50 частиц и анимационный цикл
}, []);
```

#### Плавающие карточки:
```javascript
// Анимация вверх-вниз
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 4, repeat: Infinity }}
  className="absolute -top-4 -left-4 bg-gradient-to-br from-purple-600 to-purple-800..."
>
  <div className="text-2xl font-bold">+180%</div>
  <div className="text-xs">Lead Growth</div>
</motion.div>
```

**Цветовая схема**:
- Фон: `bg-gradient-to-br from-black via-purple-950/20 to-black`
- Акценты: Фиолетовый (#a855f7), Бирюзовый (#06b6d4), Розовый (#f472b6)

---

### 3. Services.jsx - Услуги агентства

**Назначение**: Секция с описанием 4 основных услуг агентства.

**Основные возможности**:
- Сетка 2x2 на десктопе
- Hover-эффекты с изображениями
- Анимация иконок при наведении
- Список возможностей для каждой услуги
- Переход к форме контакта

**Технические детали**:

#### Карточка услуги:
```javascript
<motion.div
  key={service.id}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1, duration: 0.5 }}
  onMouseEnter={() => setHoveredService(service.id)}
  onMouseLeave={() => setHoveredService(null)}
  className="group relative overflow-hidden rounded-2xl..."
>
  {/* Фоновое изображение при hover */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-20">
    <img src={service.image} alt={service.title} />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
  </div>
  
  {/* Иконка с изменением цвета при hover */}
  <div className={hoveredService === service.id
    ? 'bg-gradient-to-br from-purple-600 to-teal-600 scale-110'
    : 'bg-white/5 border border-white/10'
  }>
    <Icon className="w-8 h-8 text-white" />
  </div>
  
  {/* Контент */}
</motion.div>
```

**Состояние**:
- `hoveredService`: ID услуги над которой находится курсор

**Анимация появления**:
- Последовательное появление карточек с задержкой
- `whileInView` - анимация при прокрутке

---

### 4. Portfolio.jsx - Портфолио проектов

**Назначение**: Галерея выполненных проектов с метриками и деталями.

**Основные возможности**:
- Сетка 3 колонки на десктопе
- Hover-эффект с увеличением изображения
- Модальное окно с деталями проекта
- Метрики для каждого проекта
- Теги технологий

**Технические детали**:

#### Карточка проекта:
```javascript
<motion.div
  onClick={() => setSelectedProject(project)}
  className="group relative rounded-2xl overflow-hidden cursor-pointer"
>
  {/* Изображение с zoom при hover */}
  <div className="relative h-64 overflow-hidden">
    <img 
      src={project.image}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    
    {/* Overlay с иконкой при hover */}
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute inset-0 bg-gradient-to-t from-teal-600/90 via-purple-600/80..."
    >
      <ExternalLink className="w-12 h-12 text-white" />
    </motion.div>
  </div>
  
  {/* Метрики проекта */}
  <div className="grid grid-cols-3 gap-3">
    {Object.entries(project.metrics).map(([key, value]) => (
      <div key={key} className="text-center">
        <div className="text-lg font-bold">{value}</div>
        <div className="text-xs capitalize">{key}</div>
      </div>
    ))}
  </div>
</motion.div>
```

#### Модальное окно:
```javascript
<AnimatePresence>
  {selectedProject && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedProject(null)}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full bg-gradient-to-br from-gray-900 to-black..."
      >
        {/* Детали проекта */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

**Состояние**:
- `selectedProject`: Выбранный проект для отображения в модальном окне

---

### 5. Process.jsx - Процесс работы

**Назначение**: Визуализация 4-этапного процесса работы агентства.

**Основные возможности**:
- Временная линия (timeline) на десктопе
- Альтернативное расположение карточек (зигзаг)
- Центральные иконки на линии
- Анимация появления с разных сторон
- Стрелки между этапами

**Технические детали**:

#### Timeline структура:
```javascript
<div className="relative max-w-6xl mx-auto">
  {/* Вертикальная линия посередине */}
  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 
    bg-gradient-to-b from-purple-500 via-pink-500 to-teal-500" />
  
  {process.map((step, index) => {
    const isEven = index % 2 === 0;
    
    return (
      <motion.div
        key={step.step}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className={isEven ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'}
      >
        {/* Карточка этапа */}
        <div className={`lg:w-1/2 ${isEven ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}>
          {/* Контент */}
        </div>
        
        {/* Центральная иконка */}
        <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-purple-600 
            rounded-full border-4 border-black">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>
        
        {/* Стрелка между этапами */}
        {index < process.length - 1 && (
          <motion.div className="absolute left-1/2 -bottom-8 -translate-x-1/2">
            <ArrowRight className="w-6 h-6 text-pink-500 rotate-90" />
          </motion.div>
        )}
      </motion.div>
    );
  })}
</div>
```

**Логика чередования**:
```javascript
const isEven = index % 2 === 0;
// Четные элементы (0, 2) - слева
// Нечетные элементы (1, 3) - справа
```

**Цветовая схема**:
- Градиент линии: фиолетовый → розовый → бирюзовый
- Иконки: розовый → фиолетовый градиент

---

### 6. Testimonials.jsx - Отзывы и статистика

**Назначение**: Секция с анимированными счетчиками статистики и каруселью отзывов клиентов.

**Основные возможности**:
- Анимированные счетчики (250+, 420%, 50+, 98%)
- Карусель отзывов с фотографиями
- Навигация (стрелки и точки)
- Сетка миниатюрных отзывов внизу
- Рейтинг звездами

**Технические детали**:

#### Анимированные счетчики:
```javascript
const [counters, setCounters] = useState(stats.map(() => 0));
const [hasAnimated, setHasAnimated] = useState(false);

useEffect(() => {
  if (!hasAnimated) return;
  
  const duration = 2000; // 2 секунды
  const intervals = stats.map((stat, index) => {
    const increment = stat.value / (duration / 50); // Обновление каждые 50мс
    
    return setInterval(() => {
      setCounters(prev => {
        const newCounters = [...prev];
        if (newCounters[index] < stat.value) {
          newCounters[index] = Math.min(newCounters[index] + increment, stat.value);
        }
        return newCounters;
      });
    }, 50);
  });
  
  return () => intervals.forEach(clearInterval);
}, [hasAnimated]);

// Запуск при появлении в viewport
<motion.div
  onViewportEnter={() => setHasAnimated(true)}
>
  {stats.map((stat, index) => (
    <div>
      <span className="gradient-text">
        {Math.floor(counters[index])}{stat.suffix}
      </span>
    </div>
  ))}
</motion.div>
```

#### Карусель отзывов:
```javascript
const [currentIndex, setCurrentIndex] = useState(0);

const nextTestimonial = () => {
  setCurrentIndex((prev) => (prev + 1) % testimonials.length);
};

const prevTestimonial = () => {
  setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
};

<AnimatePresence mode="wait">
  <motion.div
    key={currentIndex}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
  >
    {/* Отзыв */}
    <img src={testimonials[currentIndex].image} />
    <p>"{testimonials[currentIndex].quote}"</p>
    
    {/* Рейтинг звездами */}
    <div className="flex gap-1">
      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
      ))}
    </div>
  </motion.div>
</AnimatePresence>
```

#### Индикаторы навигации:
```javascript
<div className="flex gap-2">
  {testimonials.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`w-2 h-2 rounded-full transition-all duration-300 ${
        index === currentIndex
          ? 'bg-purple-500 w-8'  // Активный индикатор шире
          : 'bg-gray-600 hover:bg-gray-500'
      }`}
    />
  ))}
</div>
```

**Состояния**:
- `counters`: Массив текущих значений счетчиков
- `hasAnimated`: Флаг запуска анимации при появлении
- `currentIndex`: Индекс текущего отзыва в карусели

---

### 7. Blog.jsx - Секция блога

**Назначение**: Отображение статей блога с фильтрацией по категориям.

**Основные возможности**:
- Фильтрация по категориям
- Сетка статей (3 колонки)
- Превью изображений
- Мета-информация (дата, время чтения)
- Переход к полной статье

**Технические детали**:

#### Фильтрация категорий:
```javascript
const [selectedCategory, setSelectedCategory] = useState('all');

const categories = ['all', 'Digital Strategy', 'SEO', 'International Marketing'];
const categoriesEs = ['Todos', 'Estrategia Digital', 'SEO', 'Marketing Internacional'];

const filteredPosts = selectedCategory === 'all'
  ? blogPosts
  : blogPosts.filter((post) => post.category === selectedCategory);

// Кнопки фильтров
{categories.map((category, index) => (
  <Button
    key={category}
    variant={selectedCategory === category ? 'default' : 'outline'}
    onClick={() => setSelectedCategory(category)}
    className={`rounded-full ${
      selectedCategory === category
        ? 'bg-gradient-to-r from-teal-600 to-purple-600 text-white'
        : 'border-white/20 text-gray-400 hover:text-white'
    }`}
  >
    {language === 'es' ? categoriesEs[index] : category}
  </Button>
))}
```

#### Карточка статьи:
```javascript
<motion.article
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1, duration: 0.5 }}
  className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm..."
>
  {/* Изображение с zoom при hover */}
  <div className="relative h-56 overflow-hidden">
    <img 
      src={post.image}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <Badge className="absolute top-4 left-4 bg-teal-500/90">
      {language === 'es' ? post.categoryEs : post.category}
    </Badge>
  </div>
  
  {/* Мета-информация */}
  <div className="flex items-center gap-4 text-sm text-gray-500">
    <div className="flex items-center gap-1">
      <Calendar className="w-4 h-4" />
      <span>{new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</span>
    </div>
    <div className="flex items-center gap-1">
      <Clock className="w-4 h-4" />
      <span>{post.readTime}</span>
    </div>
  </div>
  
  {/* Заголовок и описание */}
  <h3 className="text-xl font-bold text-white group-hover:text-teal-400 line-clamp-2">
    {language === 'es' ? post.titleEs : post.title}
  </h3>
  <p className="text-gray-400 line-clamp-3">
    {language === 'es' ? post.excerptEs : post.excerpt}
  </p>
  
  {/* Кнопка "Read More" */}
  <Button variant="ghost" className="text-teal-400 hover:text-teal-300 group/btn">
    {language === 'es' ? 'Leer Más' : 'Read More'}
    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
  </Button>
</motion.article>
```

**Состояние**:
- `selectedCategory`: Текущая выбранная категория для фильтрации

**Утилиты Tailwind**:
- `line-clamp-2`: Обрезка текста до 2 строк
- `line-clamp-3`: Обрезка текста до 3 строк

---

### 8. Contact.jsx - Контактная форма

**Назначение**: Форма обратной связи с контактной информацией агентства.

**Основные возможности**:
- Валидация полей формы
- Отправка формы (текущая реализация - mock)
- Toast-уведомления об успешной отправке
- Контактная информация агентства
- Список преимуществ

**Технические детали**:

#### Управление состоянием формы:
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  company: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // Симуляция отправки (в production заменить на API-запрос)
  setTimeout(() => {
    toast.success(
      language === 'es'
        ? '¡Mensaje enviado! Nos pondremos en contacto pronto.'
        : 'Message sent! We\'ll get back to you soon.'
    );
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  }, 1500);
};
```

#### Структура формы:
```javascript
<form onSubmit={handleSubmit}>
  {/* Поле имени */}
  <div>
    <label htmlFor="name">
      {language === 'es' ? 'Nombre Completo' : 'Full Name'}
    </label>
    <Input
      id="name"
      name="name"
      type="text"
      required
      value={formData.name}
      onChange={handleChange}
      className="bg-white/5 border-white/10 text-white focus:border-purple-500"
      placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
    />
  </div>
  
  {/* Email, Company (опционально), Message */}
  {/* ... */}
  
  {/* Кнопка отправки */}
  <Button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-gradient-to-r from-purple-600 to-teal-600..."
  >
    {isSubmitting ? (
      language === 'es' ? 'Enviando...' : 'Sending...'
    ) : (
      <>
        {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </>
    )}
  </Button>
</form>
```

#### Контактная информация:
```javascript
<div className="space-y-6">
  {/* Email */}
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center">
      <Mail className="w-6 h-6 text-purple-400" />
    </div>
    <div>
      <div className="text-sm text-gray-500">
        {language === 'es' ? 'Email' : 'Email'}
      </div>
      <div className="text-white font-medium">contact@globalscale.agency</div>
    </div>
  </div>
  
  {/* Phone и Location */}
  {/* ... */}
</div>
```

**Состояния**:
- `formData`: Объект с данными формы
- `isSubmitting`: Флаг процесса отправки

**TODO для production**:
```javascript
// Заменить setTimeout на реальный API-запрос:
const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
if (response.data.success) {
  toast.success('Message sent!');
}
```

---

### 9. Footer.jsx - Подвал сайта

**Назначение**: Нижняя часть сайта с навигацией, контактами и социальными сетями.

**Основные возможности**:
- 4 колонки: Бренд, Услуги, Компания, Контакты
- Социальные сети с иконками
- Копирайт и юридические ссылки
- Градиентная полоса снизу

**Технические детали**:

#### Структура данных футера:
```javascript
const footerLinks = {
  services: {
    title: language === 'es' ? 'Servicios' : 'Services',
    links: [
      { label: language === 'es' ? 'Desarrollo Web' : 'Web Development', href: '#services' },
      // ...
    ]
  },
  company: {
    title: language === 'es' ? 'Empresa' : 'Company',
    links: [
      { label: language === 'es' ? 'Portafolio' : 'Portfolio', href: '#portfolio' },
      // ...
    ]
  },
  contact: {
    title: language === 'es' ? 'Contacto' : 'Contact',
    info: [
      { icon: Mail, text: 'contact@globalscale.agency' },
      { icon: Phone, text: '+34 900 123 456' },
      { icon: MapPin, text: language === 'es' ? 'Madrid, España' : 'Madrid, Spain' }
    ]
  }
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' }
];
```

#### Колонка с социальными сетями:
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  {/* Логотип и описание */}
  <div className="flex items-center space-x-2">
    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-lg">
      GS
    </div>
    <span className="text-xl font-bold gradient-text">GlobalScale</span>
  </div>
  
  {/* Социальные сети */}
  <div className="flex gap-3">
    {socialLinks.map((social, index) => {
      const Icon = social.icon;
      return (
        <a
          key={index}
          href={social.href}
          aria-label={social.label}
          className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg 
            hover:bg-purple-500/20 hover:border-purple-500/50 transition-all group"
        >
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
        </a>
      );
    })}
  </div>
</motion.div>
```

#### Нижняя панель:
```javascript
<motion.div className="pt-8 border-t border-white/10 flex items-center justify-between">
  <p className="text-gray-400 text-sm">
    © {currentYear} GlobalScale Agency. 
    {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
  </p>
  
  <div className="flex gap-6 text-sm">
    <a href="#" className="text-gray-400 hover:text-white">
      {language === 'es' ? 'Privacidad' : 'Privacy Policy'}
    </a>
    <a href="#" className="text-gray-400 hover:text-white">
      {language === 'es' ? 'Términos' : 'Terms of Service'}
    </a>
    <a href="#" className="text-gray-400 hover:text-white">
      {language === 'es' ? 'Cookies' : 'Cookies'}
    </a>
  </div>
</motion.div>

{/* Градиентная полоса */}
<div className="absolute bottom-0 left-0 right-0 h-1 
  bg-gradient-to-r from-purple-600 via-teal-500 to-pink-500" />
```

---

## 🎨 Стили и дизайн

### Файл: `/app/frontend/src/index.css`

**Назначение**: Глобальные стили и настройка Tailwind CSS.

**Основные определения**:

#### CSS Variables (Цветовая палитра):
```css
@layer base {
  :root {
    --background: 0 0% 4%;          /* Очень темный фон */
    --foreground: 0 0% 98%;         /* Почти белый текст */
    --card: 0 0% 8%;                /* Фон карточек */
    --primary: 271 91% 65%;         /* Фиолетовый #a855f7 */
    --secondary: 189 94% 43%;       /* Бирюзовый #06b6d4 */
    --accent: 330 81% 70%;          /* Розовый #f472b6 */
    --muted: 0 0% 15%;              /* Приглушенный серый */
    --border: 0 0% 15%;             /* Цвет границ */
    --ring: 271 91% 65%;            /* Цвет focus ring */
    --radius: 0.5rem;               /* Базовый border-radius */
  }
}
```

**Формат HSL**: `hsl(hue, saturation%, lightness%)`
- Hue (тон): 0-360 (0=красный, 120=зеленый, 240=синий)
- Saturation (насыщенность): 0-100%
- Lightness (яркость): 0-100%

#### Базовые стили:
```css
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #0a0a0a;
  color: #ffffff;
}
```

---

### Файл: `/app/frontend/src/App.css`

**Назначение**: Кастомные анимации, утилиты и эффекты для лендинга.

#### 1. Градиентный текст:
```css
.gradient-text {
  background: linear-gradient(135deg, #a855f7, #06b6d4, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-purple {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-teal {
  background: linear-gradient(135deg, #06b6d4, #14b8a6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Использование**:
```jsx
<h1 className="gradient-text">Мы масштабируем ваш бизнес</h1>
```

#### 2. Анимированный градиент:
```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(270deg, #a855f7, #06b6d4, #f472b6);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}
```

**Принцип работы**: Градиент в 2 раза шире контейнера, анимация перемещает его позицию.

#### 3. Эффекты свечения (Glow):
```css
.glow-purple {
  box-shadow: 
    0 0 20px rgba(168, 85, 247, 0.4),
    0 0 40px rgba(168, 85, 247, 0.2);
}

.glow-teal {
  box-shadow: 
    0 0 20px rgba(6, 182, 212, 0.4),
    0 0 40px rgba(6, 182, 212, 0.2);
}

.glow-coral {
  box-shadow: 
    0 0 20px rgba(244, 114, 182, 0.4),
    0 0 40px rgba(244, 114, 182, 0.2);
}
```

**Многослойная тень**: Внутренняя (сильная) + внешняя (размытая)

#### 4. Hover-эффекты:
```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
}

.scale-hover {
  transition: transform 0.3s ease;
}

.scale-hover:hover {
  transform: scale(1.05);
}
```

#### 5. Анимации появления:
```css
/* Плавное появление снизу */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-up {
  animation: slideInUp 0.6s ease-out;
}

/* Появление слева */
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

/* Появление справа */
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

#### 6. Floating анимация:
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.floating {
  animation: float 6s ease-in-out infinite;
}
```

**Применение**: Плавающие карточки с метриками в Hero секции.

#### 7. Геометрический фон:
```css
.geometric-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(244, 114, 182, 0.1) 0%, transparent 50%);
  pointer-events: none;
}
```

**Многослойные радиальные градиенты**: Создают эффект глубины.

#### 8. Glass-morphism:
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Эффект стекла**: Полупрозрачный фон + размытие заднего плана.

#### 9. Grid паттерн:
```css
.grid-bg {
  background-image: 
    linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

**Сетка**: Вертикальные и горизонтальные линии каждые 50px.

#### 10. Кастомный scrollbar:
```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #a855f7, #06b6d4);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #9333ea, #0891b2);
}
```

#### 11. Текст с мерцанием:
```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
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
  background-clip: text;
  animation: shimmer 3s linear infinite;
}
```

---

### Файл: `/app/frontend/tailwind.config.js`

**Назначение**: Конфигурация Tailwind CSS с кастомной палитрой и темой.

```javascript
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Расширение цветовой палитры
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        // ... остальные цвета
      },
      
      // Скругление углов
      borderRadius: {
        lg: 'var(--radius)',        // 0.5rem
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      
      // Кастомные анимации
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
```

**Ключевые особенности**:
- `darkMode: ["class"]` - переключение темы через класс
- `content` - пути к файлам для сканирования классов
- `extend` - расширение стандартной темы Tailwind
- `plugins` - дополнительные плагины (tailwindcss-animate)

---

## 🔧 Backend

### Файл: `/app/backend/server.py`

**Назначение**: FastAPI сервер с MongoDB для хранения данных.

**Основная структура**:

```python
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Загрузка переменных окружения
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Подключение к MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Создание приложения и роутера
app = FastAPI()
api_router = APIRouter(prefix="/api")
```

#### Модели данных (Pydantic):
```python
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str
```

**Pydantic**: Библиотека для валидации данных и сериализации.
- `Field`: Настройка поля (значение по умолчанию, валидация)
- `default_factory`: Функция для генерации значения по умолчанию

#### Эндпоинты API:

##### 1. Корневой маршрут:
```python
@api_router.get("/")
async def root():
    return {"message": "Hello World"}
```

**URL**: `GET /api/`
**Ответ**: `{"message": "Hello World"}`

##### 2. Создание записи:
```python
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj
```

**URL**: `POST /api/status`
**Тело запроса**:
```json
{
  "client_name": "GlobalScale Agency"
}
```
**Ответ**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "client_name": "GlobalScale Agency",
  "timestamp": "2025-02-22T10:30:00"
}
```

##### 3. Получение всех записей:
```python
@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]
```

**URL**: `GET /api/status`
**Ответ**:
```json
[
  {
    "id": "...",
    "client_name": "...",
    "timestamp": "..."
  }
]
```

#### Middleware и конфигурация:

```python
# Подключение роутера к приложению
app.include_router(api_router)

# CORS middleware для разрешения запросов с frontend
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],           # В production указать конкретные домены
    allow_methods=["*"],
    allow_headers=["*"],
)

# Логирование
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Закрытие соединения при остановке
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
```

**CORS (Cross-Origin Resource Sharing)**:
- Позволяет frontend (порт 3000) делать запросы к backend (порт 8001)
- `allow_origins=["*"]` - разрешить запросы с любых доменов

### TODO для контактной формы:

Добавить эндпоинт для обработки контактных форм:

```python
# Модель для контактной формы
class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str = ""
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    language: str = "en"

class ContactFormCreate(BaseModel):
    name: str
    email: str
    company: str = ""
    message: str
    language: str = "en"

# Эндпоинт
@api_router.post("/contact", response_model=ContactForm)
async def create_contact(input: ContactFormCreate):
    contact_dict = input.dict()
    contact_obj = ContactForm(**contact_dict)
    
    # Сохранение в БД
    await db.contacts.insert_one(contact_obj.dict())
    
    # TODO: Отправка email уведомления
    # await send_email_notification(contact_obj)
    
    return contact_obj
```

---

## 📦 Установка и запуск

### Требования:
- Node.js 18+ и Yarn
- Python 3.11+
- MongoDB

### Frontend:

```bash
cd /app/frontend

# Установка зависимостей
yarn install

# Запуск dev-сервера
yarn start

# Сборка для production
yarn build
```

**Порт**: 3000
**URL**: http://localhost:3000

### Backend:

```bash
cd /app/backend

# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows

# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Порт**: 8001
**API URL**: http://localhost:8001/api
**Документация**: http://localhost:8001/docs

### Переменные окружения:

#### Frontend (`.env`):
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

#### Backend (`.env`):
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=globalscale_agency
```

---

## 🎯 Ключевые библиотеки

### Frontend:

| Библиотека | Версия | Назначение |
|-----------|--------|-----------|
| react | 19.2.0 | UI библиотека |
| react-dom | 19.2.0 | React для браузера |
| react-router-dom | 7.9.4 | Маршрутизация (не используется) |
| framer-motion | 12.23.24 | Анимации |
| swiper | 12.0.3 | Карусели (не используется) |
| axios | 1.12.2 | HTTP-клиент |
| lucide-react | 0.507.0 | Иконки |
| tailwindcss | 3.4.18 | CSS фреймворк |
| clsx | 2.1.1 | Утилита для классов |
| sonner | 2.0.7 | Toast уведомления |
| @radix-ui/* | различные | Базовые UI компоненты |

### Backend:

| Библиотека | Версия | Назначение |
|-----------|--------|-----------|
| fastapi | 0.110.1 | Web фреймворк |
| uvicorn | 0.25.0 | ASGI сервер |
| motor | 3.3.1 | Async MongoDB драйвер |
| pydantic | 2.6.4+ | Валидация данных |
| python-dotenv | 1.0.1+ | Переменные окружения |

---

## 🚀 Производительность и оптимизация

### Frontend:

1. **Lazy Loading изображений**:
```jsx
<img loading="lazy" src={imageUrl} alt="..." />
```

2. **Мемоизация компонентов**:
```jsx
import { memo } from 'react';
export const Header = memo(({ language, setLanguage }) => {
  // ...
});
```

3. **Виртуализация длинных списков**:
```jsx
// Для больших списков использовать react-window
import { FixedSizeList } from 'react-window';
```

4. **Code Splitting**:
```jsx
import { lazy, Suspense } from 'react';
const Blog = lazy(() => import('./components/Blog'));

<Suspense fallback={<div>Loading...</div>}>
  <Blog language={language} />
</Suspense>
```

### Backend:

1. **Индексы MongoDB**:
```python
# При инициализации создать индексы
await db.contacts.create_index("email")
await db.contacts.create_index("timestamp")
```

2. **Кеширование**:
```python
from functools import lru_cache

@lru_cache(maxsize=100)
async def get_blog_posts():
    return await db.blog_posts.find().to_list(100)
```

3. **Пагинация**:
```python
@api_router.get("/blog")
async def get_blog_posts(page: int = 1, limit: int = 10):
    skip = (page - 1) * limit
    posts = await db.blog_posts.find().skip(skip).limit(limit).to_list(limit)
    return posts
```

---

## 🔐 Безопасность

### Frontend:

1. **Защита от XSS**: React автоматически экранирует данные
2. **Валидация на стороне клиента**: Проверка email, обязательные поля
3. **HTTPS в production**: Всегда использовать шифрованное соединение

### Backend:

1. **Валидация входных данных**: Pydantic models
2. **Rate Limiting**:
```python
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)

@api_router.post("/contact")
@limiter.limit("5/minute")
async def create_contact(request: Request, input: ContactFormCreate):
    # ...
```

3. **CORS настройка**:
```python
# В production указать конкретные домены
allow_origins=["https://globalscale.agency"]
```

4. **Переменные окружения**: Никогда не коммитить .env файлы

---

## 📝 Дополнительные заметки

### Планы развития:

1. **Backend для контактной формы**:
   - Реализовать эндпоинт `/api/contact`
   - Интеграция с email сервисом (SendGrid, AWS SES)
   - Сохранение заявок в MongoDB

2. **CMS для блога**:
   - Admin панель для управления статьями
   - CRUD операции для blog posts
   - Загрузка изображений

3. **Аналитика**:
   - Google Analytics
   - Отслеживание конверсий
   - Heatmaps (Hotjar)

4. **SEO оптимизация**:
   - Meta tags для каждой секции
   - Sitemap.xml
   - Robots.txt
   - Структурированные данные (Schema.org)

5. **Многоязычность**:
   - Добавить больше языков
   - i18n библиотека (react-i18next)

6. **Тестирование**:
   - Unit тесты (Jest)
   - E2E тесты (Playwright)
   - Тесты API (pytest)

---

## 🤝 Контрибьюция

При добавлении новых компонентов:

1. Следовать существующей структуре файлов
2. Использовать TypeScript для типизации (будущее улучшение)
3. Добавлять комментарии на русском языке
4. Тестировать на разных разрешениях экрана
5. Проверять производительность (React DevTools)

---

## 📞 Поддержка

Для вопросов и предложений:
- Email: dev@globalscale.agency
- GitHub Issues: [ссылка на репозиторий]

---

**Дата последнего обновления**: 22 февраля 2025
**Версия**: 1.0.0
**Автор документации**: AI Assistant
