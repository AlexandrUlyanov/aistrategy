# 🚀 DONOSTI STRATEGIA - Полная настройка на Google Cloud

## ✅ Проект полностью переведен на Google Cloud сервисы!

### Что изменено:

**Было:** MongoDB Atlas  
**Стало:** Google Cloud Firestore (NoSQL база данных)

**Преимущества:**
- ✅ Полностью интегрировано с Google Cloud
- ✅ Автоматическое масштабирование
- ✅ Встроенная безопасность
- ✅ Бесплатный tier (50K чтений/день)
- ✅ Нет необходимости в отдельном сервисе
- ✅ Работает без дополнительной настройки на Cloud Run

---

## 📦 Обновленные файлы:

1. ✅ `/app/backend/server.py` - Переписан для Firestore
2. ✅ `/app/backend/requirements.txt` - Google Cloud библиотеки
3. ✅ `/app/backend/.env` - Удалены MongoDB переменные
4. ✅ `/app/backend/Dockerfile` - Готов для Cloud Run
5. ✅ `/app/frontend/Dockerfile` - Готов для Cloud Run  
6. ✅ `/app/cloudbuild.yaml` - CI/CD конфигурация

---

## 🎯 Быстрое развертывание (15 минут)

### Шаг 1: Настройка Google Cloud (3 мин)

```bash
# Логин
gcloud auth login

# Создание проекта
gcloud projects create donosti-strategia-prod --name="DONOSTI STRATEGIA"

# Установка проекта
gcloud config set project donosti-strategia-prod

# Включение API
gcloud services enable run.googleapis.com \
  containerregistry.googleapis.com \
  cloudbuild.googleapis.com \
  firestore.googleapis.com

# Установка региона
gcloud config set run/region europe-west1
```

### Шаг 2: Настройка Firestore (2 мин)

**Через веб-консоль:**
1. Откройте https://console.cloud.google.com/firestore
2. Выберите проект: `donosti-strategia-prod`
3. Нажмите "Create Database"
4. Выберите режим: **Native mode** (рекомендуется)
5. Location: **eur3 (europe-west)** (близко к Испании)
6. Нажмите "Create Database"

**Или через CLI:**
```bash
gcloud firestore databases create --location=eur3
```

**Готово!** База данных создана. Никаких дополнительных настроек не требуется.

### Шаг 3: Развертывание Backend (5 мин)

```bash
cd /app/backend

# Сборка Docker образа
docker build -t gcr.io/donosti-strategia-prod/aureum-backend:v1 .

# Аутентификация Docker
gcloud auth configure-docker

# Push образа
docker push gcr.io/donosti-strategia-prod/aureum-backend:v1

# Deploy на Cloud Run (Firestore автоматически подключится!)
gcloud run deploy aureum-backend \
  --image gcr.io/donosti-strategia-prod/aureum-backend:v1 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars CORS_ORIGINS="*" \
  --memory 512Mi \
  --cpu 1 \
  --port 8080

# Сохраните Backend URL!
```

**Важно:** Firestore автоматически подключается через Application Default Credentials в Cloud Run. Никаких connection strings или паролей не нужно!

### Шаг 4: Обновление Frontend (3 мин)

```bash
cd /app/frontend

# Обновите .env с Backend URL
echo "REACT_APP_BACKEND_URL=https://aureum-backend-xxx.run.app" > .env

# Сборка Docker образа
docker build -t gcr.io/donosti-strategia-prod/aureum-frontend:v1 .

# Push образа
docker push gcr.io/donosti-strategia-prod/aureum-frontend:v1

# Deploy на Cloud Run
gcloud run deploy aureum-frontend \
  --image gcr.io/donosti-strategia-prod/aureum-frontend:v1 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 256Mi \
  --port 8080
```

### Шаг 5: Проверка (2 мин)

```bash
# Проверка Backend
BACKEND_URL=$(gcloud run services describe aureum-backend --region=europe-west1 --format="value(status.url)")
curl ${BACKEND_URL}/api/status

# Откройте Frontend в браузере
FRONTEND_URL=$(gcloud run services describe aureum-frontend --region=europe-west1 --format="value(status.url)")
echo "Frontend: ${FRONTEND_URL}"
```

**Готово! Сайт работает!** 🎉

---

## 📊 Структура данных Firestore

### Collection: `contacts`

Каждая форма контакта сохраняется как документ:

```javascript
{
  id: "uuid-string",
  name: "John Doe",
  email: "john@example.com",
  phone: "+34 123 456 789",
  company: "Example Corp",
  message: "Interested in services",
  language: "es",
  created_at: "2025-10-27T10:30:00Z"
}
```

### Просмотр данных

**Через веб-консоль:**
https://console.cloud.google.com/firestore/data

**Через API:**
```bash
curl ${BACKEND_URL}/api/contacts
```

---

## 🔧 Локальная разработка (с Firestore Emulator)

### Вариант 1: Использование Firestore Emulator

```bash
# Установка Firestore Emulator
gcloud components install cloud-firestore-emulator

# Запуск эмулятора
gcloud emulators firestore start --host-port=localhost:8089

# В другом терминале
export FIRESTORE_EMULATOR_HOST=localhost:8089
cd /app/backend
uvicorn server:app --reload
```

### Вариант 2: Использование Service Account (проще)

1. **Создание Service Account:**
```bash
gcloud iam service-accounts create aureum-dev \
  --display-name="AUREUM Development"

gcloud projects add-iam-policy-binding donosti-strategia-prod \
  --member="serviceAccount:aureum-dev@donosti-strategia-prod.iam.gserviceaccount.com" \
  --role="roles/datastore.user"

# Скачать ключ
gcloud iam service-accounts keys create ~/aureum-key.json \
  --iam-account=aureum-dev@donosti-strategia-prod.iam.gserviceaccount.com
```

2. **Обновить .env:**
```bash
cd /app/backend
echo 'GOOGLE_APPLICATION_CREDENTIALS=/Users/you/aureum-key.json' >> .env
```

3. **Запуск:**
```bash
uvicorn server:app --reload --port 8001
```

### Вариант 3: Без Firestore (только для тестирования API)

API будет работать, но данные не будут сохраняться. Подходит для тестирования frontend.

---

## 🤖 Автоматическое развертывание (CI/CD)

### Настройка Cloud Build Trigger

```bash
# Создание триггера для GitHub
gcloud beta builds triggers create github \
  --name="aureum-deploy-main" \
  --repo-name=aureum-digital \
  --repo-owner=YOUR_GITHUB_USERNAME \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml

# Теперь каждый push в main автоматически деплоит!
```

### Обновление cloudbuild.yaml (уже готово)

Файл `/app/cloudbuild.yaml` уже настроен для:
- Автоматической сборки Frontend и Backend
- Push образов в Container Registry
- Deploy на Cloud Run
- Настройки переменных окружения

**Изменения в substitutions (если нужно):**
```yaml
substitutions:
  _CORS_ORIGINS: 'https://aureumdigital.com'
  _SMTP_EMAIL: 'noreply@aureumdigital.com'
  _SMTP_PASSWORD: 'your-app-password'
```

---

## 💰 Стоимость (на 100% Google Cloud)

### Firestore

**Free Tier (постоянно бесплатно):**
- 50,000 reads/день
- 20,000 writes/день
- 20,000 deletes/день
- 1 GB хранилища

**Для малого сайта:** БЕСПЛАТНО

**Paid (если превышен Free Tier):**
- Reads: $0.06 / 100K
- Writes: $0.18 / 100K
- Deletes: $0.02 / 100K

### Cloud Run

**Free Tier:**
- 2 млн запросов/месяц
- 360,000 vCPU-секунд
- 180,000 GiB-секунд памяти

**Для малого трафика (100K запросов/месяц):** БЕСПЛАТНО

### Итоговая стоимость:

**Малый трафик (< 100K запросов/месяц):**
- Cloud Run: $0 (Free Tier)
- Firestore: $0 (Free Tier)
- **ИТОГО: $0/месяц** 🎉

**Средний трафик (500K запросов/месяц):**
- Cloud Run: ~$3-5/месяц
- Firestore: $0 (в пределах Free Tier)
- **ИТОГО: $3-5/месяц** ⚡

---

## 🔐 Безопасность Firestore

### Правила безопасности

**Создайте файл правил:**
1. Откройте https://console.cloud.google.com/firestore/rules
2. Добавьте правила:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contacts collection - только write для всех, read только для админов
    match /contacts/{contactId} {
      allow create: if request.auth == null; // Анонимные могут создавать
      allow read: if request.auth != null && request.auth.token.admin == true; // Только админы могут читать
    }
  }
}
```

**Или для начала (открытый доступ):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Временно для разработки
    }
  }
}
```

⚠️ **Важно:** В production обязательно настройте правила безопасности!

---

## 📝 API Endpoints

### GET /api/status
Health check

**Response:**
```json
{
  "status": "healthy",
  "service": "DONOSTI STRATEGIA API",
  "database": "connected",
  "timestamp": "2025-10-27T10:30:00.000Z"
}
```

### POST /api/contact
Отправка формы контакта

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+34 123 456 789",
  "company": "Example Corp",
  "message": "Interested in services",
  "language": "es"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "uuid-string"
}
```

### GET /api/contacts?limit=50
Получить контакты (admin)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "contacts": [...]
}
```

---

## 🎯 Настройка Custom Domain

```bash
# Добавление домена
gcloud beta run domain-mappings create \
  --service aureum-frontend \
  --domain aureumdigital.com \
  --region europe-west1

# Настройка DNS (у вашего регистратора)
# Следуйте инструкциям gcloud
```

**DNS записи (пример):**
```
Type: A
Host: @
Value: 216.239.32.21

Type: AAAA
Host: @
Value: 2001:4860:4802:32::15

Type: CNAME
Host: www
Value: ghs.googlehosted.com
```

**SSL:** Автоматически настраивается!

---

## 📚 Мониторинг

### Просмотр логов

```bash
# Backend логи
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=aureum-backend" --limit=50

# Firestore операции
gcloud logging read "resource.type=datastore_database" --limit=50
```

### Метрики

**Веб-консоль:**
- Cloud Run: https://console.cloud.google.com/run
- Firestore: https://console.cloud.google.com/firestore

**Доступные метрики:**
- Request count
- Request latency
- Error rate
- Firestore reads/writes
- Memory/CPU usage

---

## 🔄 Обновление приложения

### Простое обновление (без CI/CD)

```bash
# Backend
cd /app/backend
docker build -t gcr.io/donosti-strategia-prod/aureum-backend:v2 .
docker push gcr.io/donosti-strategia-prod/aureum-backend:v2
gcloud run services update aureum-backend --image=gcr.io/donosti-strategia-prod/aureum-backend:v2 --region=europe-west1

# Frontend
cd /app/frontend
docker build -t gcr.io/donosti-strategia-prod/aureum-frontend:v2 .
docker push gcr.io/donosti-strategia-prod/aureum-frontend:v2
gcloud run services update aureum-frontend --image=gcr.io/donosti-strategia-prod/aureum-frontend:v2 --region=europe-west1
```

### С CI/CD (через GitHub)

```bash
git add .
git commit -m "Update"
git push origin main

# Cloud Build автоматически деплоит!
```

---

## ✅ Готово!

Ваш проект DONOSTI STRATEGIA теперь полностью работает на Google Cloud:

- ✅ **Cloud Run** - Frontend и Backend
- ✅ **Firestore** - База данных
- ✅ **Container Registry** - Docker образы
- ✅ **Cloud Build** - CI/CD
- ✅ **Автоматический SSL**
- ✅ **Глобальная CDN**
- ✅ **Автоматическое масштабирование**

**Стоимость для малого трафика: $0/месяц** 🎉

---

**Документация:** `/app/docs/GOOGLE_CLOUD_DEPLOYMENT.md` - полное руководство  
**Quick Start:** `/app/docs/GCP_QUICK_START.md` - быстрый старт

**Поддержка:** ulyanov.ht@gmail.com
