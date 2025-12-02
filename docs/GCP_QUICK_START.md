# ⚡ Quick Start: Развертывание на Google Cloud за 15 минут

## Предварительные требования
- ✅ Аккаунт Google Cloud
- ✅ Аккаунт MongoDB Atlas
- ✅ Google Cloud SDK установлен

---

## Шаг 1: Настройка Google Cloud (3 минуты)

```bash
# Логин
gcloud auth login

# Создание проекта
gcloud projects create donosti-strategia-prod

# Установка проекта
gcloud config set project donosti-strategia-prod

# Включение API
gcloud services enable run.googleapis.com containerregistry.googleapis.com cloudbuild.googleapis.com

# Установка региона
gcloud config set run/region europe-west1
```

---

## Шаг 2: Настройка MongoDB Atlas (5 минут)

1. Зайдите на https://cloud.mongodb.com
2. Create Database → M0 Free
3. Provider: Google Cloud, Region: europe-west1
4. Database Access → Add User (сохраните пароль!)
5. Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)
6. Connect → Connection String:

```
mongodb+srv://username:password@cluster.mongodb.net/donosti_strategia
```

---

## Шаг 3: Развертывание Backend (4 минуты)

```bash
cd /app/backend

# Сборка Docker образа
docker build -t gcr.io/donosti-strategia-prod/donosti-backend:v1 .

# Аутентификация Docker
gcloud auth configure-docker

# Push образа
docker push gcr.io/donosti-strategia-prod/donosti-backend:v1

# Deploy на Cloud Run
gcloud run deploy donosti-backend \
  --image gcr.io/donosti-strategia-prod/donosti-backend:v1 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars MONGO_URL="YOUR_MONGODB_URL",DB_NAME="donosti_strategia",CORS_ORIGINS="*" \
  --memory 512Mi

# Сохраните Backend URL из вывода!
```

---

## Шаг 4: Развертывание Frontend (3 минуты)

```bash
cd /app/frontend

# Обновите .env с Backend URL
echo "REACT_APP_BACKEND_URL=https://donosti-backend-xxx.run.app" > .env

# Сборка Docker образа
docker build -t gcr.io/donosti-strategia-prod/donosti-frontend:v1 .

# Push образа
docker push gcr.io/donosti-strategia-prod/donosti-frontend:v1

# Deploy на Cloud Run
gcloud run deploy donosti-frontend \
  --image gcr.io/donosti-strategia-prod/donosti-frontend:v1 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 256Mi

# Откройте URL из вывода в браузере!
```

---

## ✅ Готово!

Ваш сайт работает на:
- Frontend: `https://donosti-frontend-xxxxx.run.app`
- Backend: `https://donosti-backend-xxxxx.run.app`

---

## Настройка домена (Опционально)

```bash
# Добавление custom domain
gcloud beta run domain-mappings create \
  --service donosti-frontend \
  --domain donostistrategia.com \
  --region europe-west1

# Следуйте инструкциям по настройке DNS
```

---

## Стоимость

При малом трафике (<100K запросов/месяц):
- **БЕСПЛАТНО** благодаря Free Tier! 🎉

---

## Полная документация

Читайте: `/app/docs/GOOGLE_CLOUD_DEPLOYMENT.md`

---

**Вопросы?** ulyanov.ht@gmail.com
