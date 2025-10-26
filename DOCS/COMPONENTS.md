# 🧩 Документация компонентов

## Обзор компонентов

Все компоненты находятся в `/app/frontend/src/components/`

### Основные компоненты:
1. **Header.jsx** - Навигационная панель
2. **Hero.jsx** - Главная секция
3. **Services.jsx** - Услуги
4. **Portfolio.jsx** - Портфолио проектов
5. **Process.jsx** - Процесс работы
6. **Testimonials.jsx** - Отзывы и статистика
7. **Blog.jsx** - Блог
8. **Contact.jsx** - Контактная форма
9. **Footer.jsx** - Подвал

---

## 1. Header.jsx - Навигация

**Расположение**: `/app/frontend/src/components/Header.jsx`

### Описание:
Фиксированная навигационная панель с адаптивным меню и переключателем языка.

### Props:
```typescript
interface HeaderProps {
  language: 'en' | 'es';              // Текущий язык
  setLanguage: (lang: string) => void; // Функция смены языка
}
```

### Состояния:
```javascript
const [isScrolled, setIsScrolled] = useState(false);       // Прокручена ли страница
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Открыто ли мобильное меню
```

### Особенности:

#### 1. Эффект прокрутки
```javascript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll');
}, []);
```

- При прокрутке > 50px добавляется фон и граница
- Создает эффект «появления» навигации

#### 2. Адаптивное меню
```javascript
// Меню для desktop
<nav className="hidden lg:flex items-center space-x-8">
  {menuItems.map((item, index) => (
    <a href={item.href}>{language === 'es' ? item.labelEs : item.label}</a>
  ))}
</nav>

// Кнопка для mobile
<button
  className="lg:hidden"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
  {isMobileMenuOpen ? <X /> : <Menu />}
</button>
```

#### 3. Плавная прокрутка к секциям
```javascript
<a
  href="#services"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  }}
>
  Services
</a>
```

### Стили:

**Нормальное состояние**:
```css
bg-transparent
```

**После прокрутки**:
```css
bg-black/80            /* Полупрозрачный черный */
backdrop-blur-lg       /* Размытие фона */
border-b border-white/10
```

**Анимация появления**:
```javascript
<motion.header
  initial={{ y: -100 }}    // Начинается выше экрана
  animate={{ y: 0 }}       // Опускается на место
  transition={{ duration: 0.6 }}
>
```

---

## 2. Hero.jsx - Главная секция

**Расположение**: `/app/frontend/src/components/Hero.jsx`

### Описание:
Первый экран сайта с анимированными частицами, градиентным текстом и CTA кнопками.

### Props:
```typescript
interface HeroProps {
  language: 'en' | 'es';
}
```

### Ключевые элементы:

#### 1. Canvas с частицами
```javascript
const canvasRef = useRef(null);

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  // Класс частицы
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
      // Движение
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Циклическое появление с другой стороны
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
  
  // Создание 50 частиц
  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  
  // Анимационный цикл
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }
  
  animate();
}, []);
```

**Объяснение**:
- `requestAnimationFrame()` - оптимизированная анимация (60 FPS)
- Частицы двигаются в случайных направлениях
- При выходе за край появляются с противоположной стороны

#### 2. Геометрические фоновые формы
```javascript
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* Фиолетовое свечение слева-сверху */}
  <div className="absolute top-20 left-10 w-72 h-72 
    bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
  
  {/* Бирюзовое свечение справа-снизу */}
  <div className="absolute bottom-20 right-10 w-96 h-96 
    bg-teal-500/10 rounded-full blur-3xl animate-pulse" 
    style={{ animationDelay: '1s' }} />
  
  {/* Розовое свечение по центру */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" 
    style={{ animationDelay: '2s' }} />
</div>
```

**Техника**:
- `blur-3xl` - сильное размытие (64px)
- `/10` и `/5` - прозрачность 10% и 5%
- `animationDelay` - разные задержки для каждого элемента

#### 3. Плавающие метрики
```javascript
{/* Верхняя левая карточка */}
<motion.div
  animate={{ y: [0, -20, 0] }}           // Вверх-вниз
  transition={{ 
    duration: 4,                          // 4 секунды на цикл
    repeat: Infinity                      // Бесконечно
  }}
  className="absolute -top-4 -left-4 
    bg-gradient-to-br from-purple-600 to-purple-800 
    p-4 rounded-xl shadow-2xl border border-purple-400/30"
>
  <div className="text-2xl font-bold text-white">+180%</div>
  <div className="text-xs text-purple-200">Lead Growth</div>
</motion.div>

{/* Нижняя правая карточка */}
<motion.div
  animate={{ y: [0, 20, 0] }}            // Вниз-вверх (противоположно)
  transition={{ 
    duration: 5, 
    repeat: Infinity, 
    delay: 1                              // Задержка 1 сек
  }}
  className="absolute -bottom-4 -right-4 
    bg-gradient-to-br from-teal-600 to-teal-800 
    p-4 rounded-xl shadow-2xl border border-teal-400/30"
>
  <div className="text-2xl font-bold text-white">98%</div>
  <div className="text-xs text-teal-200">Satisfaction</div>
</motion.div>
```

**Эффект**:
- Две карточки двигаются асинхронно
- Создают ощущение глубины и движения

#### 4. Кнопки CTA
```javascript
<Button
  size="lg"
  className="bg-gradient-to-r from-purple-600 to-teal-600 
    hover:from-purple-700 hover:to-teal-700 
    text-white px-8 py-6 text-lg font-semibold group"
  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
>
  {language === 'es' ? 'Empezar Ahora' : 'Get Started'}
  <ArrowRight className="w-5 h-5 ml-2 
    group-hover:translate-x-1 transition-transform" />
</Button>

<Button
  size="lg"
  variant="outline"
  className="border-2 border-purple-500/50 text-white 
    hover:bg-purple-500 hover:text-white hover:border-purple-500 
    px-8 py-6 text-lg font-semibold group"
>
  <Play className="w-5 h-5 mr-2 
    group-hover:scale-110 transition-transform" />
  {language === 'es' ? 'Ver Casos' : 'View Cases'}
</Button>
```

**Hover эффекты**:
- Стрелка сдвигается вправо
- Иконка Play увеличивается
- Кнопка View Cases получает фон

---

## 3. Services.jsx - Услуги

**Расположение**: `/app/frontend/src/components/Services.jsx`

### Описание:
Отображение 4 услуг агентства с hover-эффектами и анимациями.

### Состояние:
```javascript
const [hoveredService, setHoveredService] = useState(null);
```

### Структура карточки:

```javascript
<motion.div
  key={service.id}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1, duration: 0.5 }}
  onMouseEnter={() => setHoveredService(service.id)}
  onMouseLeave={() => setHoveredService(null)}
  className="group relative overflow-hidden rounded-2xl 
    border border-white/10 backdrop-blur-sm 
    hover:border-purple-500/50 transition-all"
>
  {/* Фоновое изображение (появляется при hover) */}
  <div className="absolute inset-0 
    opacity-0 group-hover:opacity-20 transition-opacity">
    <img src={service.image} className="w-full h-full object-cover" />
    <div className="absolute inset-0 
      bg-gradient-to-t from-black via-black/80 to-transparent" />
  </div>
  
  {/* Иконка */}
  <div className={`
    inline-flex w-16 h-16 rounded-xl mb-6
    transition-all duration-500
    ${hoveredService === service.id
      ? 'bg-gradient-to-br from-purple-600 to-teal-600 scale-110'
      : 'bg-white/5 border border-white/10'
    }
  `}>
    <Icon className="w-8 h-8 text-white" />
  </div>
  
  {/* Заголовок */}
  <h3 className="text-2xl font-bold text-white mb-3">
    {language === 'es' ? service.titleEs : service.title}
  </h3>
  
  {/* Описание */}
  <p className="text-gray-400 mb-6 leading-relaxed">
    {language === 'es' ? service.descriptionEs : service.description}
  </p>
  
  {/* Список возможностей */}
  <div className="space-y-2 mb-6">
    {service.features.map((feature, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + i * 0.05 }}
        className="flex items-center space-x-2 text-sm text-gray-300"
      >
        <div className="w-1.5 h-1.5 bg-gradient-to-r 
          from-purple-500 to-teal-500 rounded-full" />
        <span>{feature}</span>
      </motion.div>
    ))}
  </div>
  
  {/* CTA кнопка */}
  <Button variant="ghost" className="text-purple-400">
    {language === 'es' ? 'Saber Más' : 'Learn More'}
    <ArrowRight className="w-4 h-4 ml-2 
      group-hover/btn:translate-x-1 transition-transform" />
  </Button>
</motion.div>
```

### Hover эффекты:

1. **Фоновое изображение**: `opacity: 0 → 20`
2. **Иконка**: 
   - Фон: `white/5` → `gradient purple-teal`
   - Размер: `scale(1)` → `scale(1.1)`
3. **Граница карточки**: `white/10` → `purple-500/50`

---

## 4. Portfolio.jsx - Портфолио

**Расположение**: `/app/frontend/src/components/Portfolio.jsx`

### Описание:
Галерея проектов с модальным окном для деталей.

### Состояние:
```javascript
const [selectedProject, setSelectedProject] = useState(null);
```

### Карточка проекта:

```javascript
<motion.div
  onClick={() => setSelectedProject(project)}
  className="group relative rounded-2xl overflow-hidden 
    cursor-pointer hover:border-teal-500/50"
>
  {/* Изображение */}
  <div className="relative h-64 overflow-hidden">
    <img 
      src={project.image}
      className="w-full h-full object-cover 
        group-hover:scale-110 transition-transform duration-700"
    />
    
    {/* Градиент снизу */}
    <div className="absolute inset-0 
      bg-gradient-to-t from-black via-black/60 to-transparent" />
    
    {/* Badge категории */}
    <Badge className="absolute top-4 left-4 bg-teal-500/90">
      {language === 'es' ? project.categoryEs : project.category}
    </Badge>
    
    {/* Overlay при hover */}
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute inset-0 
        bg-gradient-to-t from-teal-600/90 via-purple-600/80 to-transparent
        flex items-center justify-center"
    >
      <ExternalLink className="w-12 h-12 text-white" />
    </motion.div>
  </div>
  
  {/* Контент */}
  <div className="p-6">
    <h3 className="text-2xl font-bold text-white mb-2 
      group-hover:text-teal-400 transition-colors">
      {project.title}
    </h3>
    
    <p className="text-gray-400 mb-4 line-clamp-2">
      {language === 'es' ? project.descriptionEs : project.description}
    </p>
    
    {/* Метрики */}
    <div className="grid grid-cols-3 gap-3">
      {Object.entries(project.metrics).map(([key, value]) => {
        const Icon = getMetricIcon(key);
        return (
          <div key={key} className="text-center">
            <Icon className="w-4 h-4 text-teal-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{value}</div>
            <div className="text-xs text-gray-500 capitalize">{key}</div>
          </div>
        );
      })}
    </div>
    
    {/* Теги */}
    <div className="flex flex-wrap gap-2 mt-4">
      {project.tags.map((tag, i) => (
        <span key={i} className="text-xs px-2 py-1 
          bg-white/5 border border-white/10 rounded-full">
          {tag}
        </span>
      ))}
    </div>
  </div>
</motion.div>
```

### Модальное окно:

```javascript
<AnimatePresence>
  {selectedProject && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedProject(null)}
      className="fixed inset-0 z-50 flex items-center justify-center 
        p-4 bg-black/90 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}  // Не закрывать при клике внутри
        className="max-w-4xl w-full bg-gradient-to-br 
          from-gray-900 to-black border border-white/20 
          rounded-2xl overflow-hidden"
      >
        <img 
          src={selectedProject.image} 
          className="w-full h-80 object-cover" 
        />
        <div className="p-8">
          <h3 className="text-4xl font-bold text-white mb-4">
            {selectedProject.title}
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            {selectedProject.description}
          </p>
          
          {/* Метрики в модальном окне */}
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(selectedProject.metrics).map(([key, value]) => (
              <div key={key} className="text-center p-4 
                bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">
                  {value}
                </div>
                <div className="text-sm text-gray-400 capitalize">
                  {key}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

**AnimatePresence**:
- Позволяет анимировать элементы при размонтировании
- `exit` prop определяет анимацию исчезновения

---

Продолжение в следующем сообщении...
