# 🚀 Развертывание DONOSTI STRATEGIA на Google Cloud Platform

## Содержание
- [Введение](#введение)
- [Архитектура на GCP](#архитектура-на-gcp)
- [Предварительные требования](#предварительные-требования)
- [Настройка Google Cloud](#настройка-google-cloud)
- [Настройка MongoDB Atlas](#настройка-mongodb-atlas)
- [Развертывание через Cloud Run](#развертывание-через-cloud-run)
- [Настройка домена и SSL](#настройка-домена-и-ssl)
- [Мониторинг и логи](#мониторинг-и-логи)
- [Автоматизация через Cloud Build](#автоматизация-через-cloud-build)
- [Стоимость и оптимизация](#стоимость-и-оптимизация)

---

## Введение

Это руководство описывает процесс развертывания полнофункционального приложения DONOSTI STRATEGIA на Google Cloud Platform с использованием:
- **Cloud Run** для Backend (FastAPI) и Frontend (React)
- **MongoDB Atlas** для базы данных
- **Cloud Build** для CI/CD
- **Container Registry** для Docker образов

### Преимущества Google Cloud Run:
- ✅ Serverless (платите только за использование)
- ✅ Автоматическое масштабирование 0→N
- ✅ Встроенный балансировщик нагрузки
- ✅ HTTPS из коробки
- ✅ Простое развертывание из Docker
- ✅ Низкая стоимость для малого трафика

---

## Архитектура на GCP

```
┌─────────────────────────────────────────────────────┐
│                   Internet                          │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
        ┌──────▼──────┐        ┌─────▼─────┐
        │   Frontend  │        │  Backend  │
        │  Cloud Run  │◄───────┤ Cloud Run │
        │   (React)   │        │ (FastAPI) │
        └─────────────┘        └─────┬─────┘
                                     │
                              ┌──────▼──────┐
                              │  MongoDB    │
                              │   Atlas     │
                              └─────────────┘
```

**Компоненты:**
- **Frontend**: Nginx + React build (Cloud Run)
- **Backend**: FastAPI + Uvicorn (Cloud Run)
- **Database**: MongoDB Atlas (Managed)
- **Storage**: Container Registry (Docker images)
- **CI/CD**: Cloud Build (автоматизация)

---

## Предварительные требования

### 1. Аккаунт Google Cloud

Зарегистрируйтесь на https://cloud.google.com

**Бесплатные ресурсы (Free Tier):**
- $300 кредитов на 90 дней
- Cloud Run: 2 миллиона запросов/месяц бесплатно
- Container Registry: 0.5 GB хранилища бесплатно

### 2. Установка Google Cloud SDK

**macOS:**
```bash
brew install --cask google-cloud-sdk
```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

**Windows:**
Скачайте установщик: https://cloud.google.com/sdk/docs/install

**Проверка установки:**
```bash
gcloud --version
```

### 3. Инструменты разработки

```bash
# Docker (для локальной сборки)
docker --version

# Git
git --version
```

### 4. Аккаунт MongoDB Atlas

Зарегистрируйтесь на https://www.mongodb.com/cloud/atlas

---

## Настройка Google Cloud

### Шаг 1: Инициализация Google Cloud SDK

```bash
# Аутентификация
gcloud auth login

# Просмотр аккаунтов
gcloud auth list
```

### Шаг 2: Создание нового проекта

```bash
# Создание проекта
gcloud projects create donosti-strategia-prod --name="DONOSTI STRATEGIA Production"

# Установка текущего проекта
gcloud config set project donosti-strategia-prod

# Проверка
gcloud config get-value project
```

**Через веб-интерфейс:**
1. Перейдите на https://console.cloud.google.com
2. Нажмите "Select a project" → "New Project"
3. Имя: `DONOSTI STRATEGIA Production`
4. ID: `donosti-strategia-prod`

### Шаг 3: Включение необходимых API

```bash
# Cloud Run API
gcloud services enable run.googleapis.com

# Container Registry API
gcloud services enable containerregistry.googleapis.com

# Cloud Build API
gcloud services enable cloudbuild.googleapis.com

# Cloud Resource Manager API
gcloud services enable cloudresourcemanager.googleapis.com

# Проверка включенных сервисов
gcloud services list --enabled
```

### Шаг 4: Настройка региона

```bash
# Установка региона по умолчанию (Европа - Бельгия)
gcloud config set run/region europe-west1

# Для Испании можно использовать:
# europe-southwest1 (Madrid) - если доступен

# Проверка
gcloud config list
```

**Доступные европейские регионы:**
- `europe-west1` - Бельгия
- `europe-west3` - Франкфурт, Германия
- `europe-west4` - Нидерланды
- `europe-southwest1` - Мадрид, Испания (новый)

### Шаг 5: Настройка биллинга

```bash
# Просмотр биллинг аккаунтов
gcloud beta billing accounts list

# Привязка биллинга к проекту
gcloud beta billing projects link donosti-strategia-prod \
  --billing-account=YOUR-BILLING-ACCOUNT-ID
```

**Через веб-интерфейс:**
1. Перейдите в "Billing" → https://console.cloud.google.com/billing
2. Создайте биллинг аккаунт
3. Привяжите к проекту `donosti-strategia-prod`

---

## Настройка MongoDB Atlas

### Шаг 1: Создание кластера

1. Перейдите на https://cloud.mongodb.com
2. Войдите или зарегистрируйтесь
3. Нажмите "Build a Database"
4. Выберите план:
   - **Shared (FREE)** - для тестирования
   - **Dedicated** - для production

**Рекомендуемые настройки:**
- Provider: **Google Cloud**
- Region: **europe-west1** (Бельгия) или **europe-west3** (Франкфурт)
- Cluster Tier: **M0 Sandbox** (бесплатно) или **M10** (production)
- Cluster Name: `donosti-strategia-cluster`

### Шаг 2: Настройка безопасности

**Database Access:**
1. Database Access → Add New Database User
2. Username: `donosti_admin`
3. Password: Создайте надежный пароль (сохраните!)
4. Database User Privileges: `Atlas admin`

**Network Access:**
1. Network Access → Add IP Address
2. Выберите: **Allow access from anywhere** (0.0.0.0/0)
   - Для production лучше указать конкретные IP Cloud Run

### Шаг 3: Получение Connection String

1. Нажмите "Connect" на вашем кластере
2. Выберите "Connect your application"
3. Driver: **Python** / Version: **3.6 or later**
4. Скопируйте Connection String:

```
mongodb+srv://donosti_admin:<password>@donosti-strategia-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

5. Замените `<password>` на ваш реальный пароль

**Пример финального URL:**
```
mongodb+srv://donosti_admin:MySecurePass123@donosti-strategia-cluster.abc123.mongodb.net/donosti_strategia?retryWrites=true&w=majority
```

### Шаг 4: Создание базы данных

1. В MongoDB Atlas → Collections
2. Create Database
3. Database name: `donosti_strategia`
4. Collection name: `contacts`

---

## Развертывание через Cloud Run

### Вариант 1: Ручное развертывание (рекомендуется для первого раза)

#### Подготовка проекта

```bash
cd /app

# Проверка структуры
ls -la
# Должны быть: backend/, frontend/, cloudbuild.yaml
```

#### Шаг 1: Сборка Backend Docker образа

```bash
# Переход в папку backend
cd backend

# Сборка образа
docker build -t gcr.io/donosti-strategia-prod/donosti-backend:v1 .

# Проверка образа
docker images | grep donosti-backend

# Локальный тест (опционально)
docker run -p 8080:8080 \
  -e MONGO_URL="your-mongodb-url" \
  -e DB_NAME="donosti_strategia" \
  -e CORS_ORIGINS="*" \
  gcr.io/donosti-strategia-prod/donosti-backend:v1

# Тест в браузере: http://localhost:8080/api/status
```

#### Шаг 2: Push Backend образа

```bash
# Аутентификация Docker с GCR
gcloud auth configure-docker

# Push образа в Container Registry
docker push gcr.io/donosti-strategia-prod/donosti-backend:v1
```

#### Шаг 3: Deploy Backend на Cloud Run

```bash
# Замените переменные на свои значения
export MONGO_URL="mongodb+srv://user:password@cluster.mongodb.net/donosti_strategia"
export DB_NAME="donosti_strategia"
export CORS_ORIGINS="https://aureumdigital.com"

# Deploy
gcloud run deploy donosti-backend \
  --image gcr.io/donosti-strategia-prod/donosti-backend:v1 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars MONGO_URL="$MONGO_URL",DB_NAME="$DB_NAME",CORS_ORIGINS="$CORS_ORIGINS" \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0 \
  --port 8080

# После успешного deploy получите URL:
# https://donosti-backend-xxxxxxxxxx-ew.a.run.app
```

**Сохраните Backend URL!**

#### Шаг 4: Обновление Frontend для Backend URL

```bash
cd ../frontend

# Создайте .env для production
cat > .env << EOF
REACT_APP_BACKEND_URL=https://donosti-backend-xxxxxxxxxx-ew.a.run.app
EOF

# Или обновите существующий .env
```

#### Шаг 5: Сборка Frontend Docker образа

```bash
# Сборка образа
docker build -t gcr.io/donosti-strategia-prod/donosti-frontend:v1 .

# Локальный тест (опционально)
docker run -p 8080:8080 gcr.io/donosti-strategia-prod/donosti-frontend:v1

# Тест: http://localhost:8080
```

#### Шаг 6: Push Frontend образа

```bash
# Push образа
docker push gcr.io/donosti-strategia-prod/donosti-frontend:v1
```

#### Шаг 7: Deploy Frontend на Cloud Run

```bash
gcloud run deploy donosti-frontend \
  --image gcr.io/donosti-strategia-prod/donosti-frontend:v1 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0 \
  --port 8080

# После успешного deploy получите URL:
# https://donosti-frontend-xxxxxxxxxx-ew.a.run.app
```

#### Шаг 8: Проверка работоспособности

```bash
# Проверка Backend
curl https://donosti-backend-xxxxxxxxxx-ew.a.run.app/api/status

# Проверка Frontend
open https://donosti-frontend-xxxxxxxxxx-ew.a.run.app
```

---

### Вариант 2: Автоматическое развертывание через Cloud Build

#### Шаг 1: Настройка Cloud Build

```bash
# Предоставление прав Cloud Build
PROJECT_NUMBER=$(gcloud projects describe donosti-strategia-prod --format="value(projectNumber)")

gcloud projects add-iam-policy-binding donosti-strategia-prod \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding donosti-strategia-prod \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

#### Шаг 2: Настройка переменных Cloud Build

Обновите `cloudbuild.yaml` с вашими значениями:

```yaml
substitutions:
  _MONGO_URL: 'mongodb+srv://user:password@cluster.mongodb.net/donosti_strategia'
  _DB_NAME: 'donosti_strategia'
  _CORS_ORIGINS: 'https://aureumdigital.com'
```

#### Шаг 3: Запуск Cloud Build

```bash
cd /app

# Ручной запуск Cloud Build
gcloud builds submit --config=cloudbuild.yaml .

# Просмотр логов
gcloud builds list
gcloud builds log BUILD_ID
```

#### Шаг 4: Настройка CI/CD с GitHub (Опционально)

```bash
# Подключение GitHub репозитория
gcloud beta builds triggers create github \
  --repo-name=aureum-digital \
  --repo-owner=YOUR_GITHUB_USERNAME \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

Теперь каждый push в main ветку автоматически запускает deploy!

---

## Настройка домена и SSL

### Шаг 1: Настройка Custom Domain для Frontend

```bash
# Добавление домена к Frontend сервису
gcloud beta run domain-mappings create \
  --service donosti-frontend \
  --domain aureumdigital.com \
  --region europe-west1
```

### Шаг 2: Настройка DNS

Cloud Run предоставит инструкции по настройке DNS. Обычно:

**Тип A:**
```
Host: @
Value: 216.239.32.21
TTL: 3600
```

**Тип AAAA:**
```
Host: @
Value: 2001:4860:4802:32::15
TTL: 3600
```

**Тип CNAME (для www):**
```
Host: www
Value: ghs.googlehosted.com
TTL: 3600
```

### Шаг 3: Настройка API Subdomain

```bash
# Добавление api.aureumdigital.com для Backend
gcloud beta run domain-mappings create \
  --service donosti-backend \
  --domain api.aureumdigital.com \
  --region europe-west1
```

**DNS для API:**
```
Host: api
Type: CNAME
Value: ghs.googlehosted.com
TTL: 3600
```

### Шаг 4: Проверка SSL

SSL сертификаты устанавливаются автоматически Cloud Run.

```bash
# Проверка статуса домена
gcloud beta run domain-mappings describe \
  --domain aureumdigital.com \
  --region europe-west1
```

**Статус должен быть:** `Ready`

Сертификаты обновляются автоматически!

---

## Мониторинг и логи

### Просмотр логов

```bash
# Backend логи
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=donosti-backend" \
  --limit 50 \
  --format json

# Frontend логи
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=donosti-frontend" \
  --limit 50

# Логи в реальном времени
gcloud logging tail "resource.type=cloud_run_revision"
```

### Метрики и мониторинг

**Через веб-интерфейс:**
1. Перейдите на https://console.cloud.google.com/run
2. Выберите сервис (donosti-backend или donosti-frontend)
3. Вкладка "Metrics"

**Доступные метрики:**
- Request count (количество запросов)
- Request latency (задержка)
- Container instance count (количество контейнеров)
- Container CPU utilization (использование CPU)
- Container memory utilization (использование памяти)
- Container billable time (оплачиваемое время)

### Настройка уведомлений

```bash
# Создание топика для уведомлений
gcloud pubsub topics create aureum-alerts

# Создание алертов (через веб-интерфейс проще)
# https://console.cloud.google.com/monitoring/alerting
```

**Рекомендуемые алерты:**
- High error rate (>5%)
- High latency (>2s)
- Container crashes
- Memory usage >90%

---

## Автоматизация через Cloud Build

### Настройка CI/CD pipeline

#### 1. Триггеры Cloud Build

**Создание триггера для GitHub:**

```bash
gcloud beta builds triggers create github \
  --name="aureum-deploy-main" \
  --repo-name=aureum-digital \
  --repo-owner=YOUR_GITHUB_USERNAME \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml \
  --description="Auto deploy on push to main"
```

**Через веб-интерфейс:**
1. https://console.cloud.google.com/cloud-build/triggers
2. "Create Trigger"
3. Connect Repository → GitHub
4. Select repository
5. Branch: `^main$`
6. Build configuration: `cloudbuild.yaml`

#### 2. Переменные окружения

**В Cloud Build:**
1. Triggers → Select trigger → Edit
2. Substitution variables:
   - `_MONGO_URL`: `mongodb+srv://...`
   - `_DB_NAME`: `donosti_strategia`
   - `_CORS_ORIGINS`: `https://aureumdigital.com`

**Или через Secret Manager (более безопасно):**

```bash
# Создание секрета
echo -n "mongodb+srv://..." | gcloud secrets create mongo-url --data-file=-

# Предоставление доступа Cloud Build
gcloud secrets add-iam-policy-binding mongo-url \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

#### 3. Build history

```bash
# Просмотр истории сборок
gcloud builds list --limit=10

# Детали конкретной сборки
gcloud builds describe BUILD_ID

# Логи сборки
gcloud builds log BUILD_ID --stream
```

---

## Стоимость и оптимизация

### Калькулятор стоимости

**Cloud Run (pay-per-use):**
- Запросы: $0.40 за миллион запросов
- CPU: $0.00002400 за vCPU-секунду
- Memory: $0.00000250 за GiB-секунду

**Пример расчета для малого трафика:**
- 100,000 запросов/месяц
- Средняя длительность: 200ms
- Память: 512Mi Backend + 256Mi Frontend

**Стоимость:**
```
Запросы: 100,000 * $0.40 / 1,000,000 = $0.04
CPU: 100,000 * 0.2s * 1 vCPU * $0.000024 = $0.48
Memory: 100,000 * 0.2s * 0.5 GiB * $0.0000025 = $0.025

Итого: ~$0.55/месяц
```

**Free Tier покрывает:**
- 2 миллиона запросов/месяц
- 360,000 vCPU-секунд/месяц
- 180,000 GiB-секунд памяти/месяц

**Вывод:** Малый трафик будет БЕСПЛАТНЫМ!

### MongoDB Atlas стоимость

**Shared (M0):**
- Бесплатно
- 512MB хранилища
- Shared CPU/RAM

**Dedicated (M10):**
- $0.08/час = ~$57/месяц
- 10GB хранилища
- 2GB RAM

### Оптимизация расходов

**1. Настройка min-instances:**
```bash
# Держать 0 минимальных инстансов (cold start допустим)
--min-instances=0

# Для production с высоким трафиком:
--min-instances=1  # Избегает cold start
```

**2. Оптимизация памяти:**
```bash
# Backend: достаточно 512Mi
--memory=512Mi

# Frontend: достаточно 256Mi
--memory=256Mi
```

**3. Настройка timeout:**
```bash
# Уменьшение timeout для экономии
--timeout=30s  # Вместо дефолтных 300s
```

**4. Request throttling:**
```bash
# Ограничение одновременных запросов
--concurrency=80  # До 80 запросов на контейнер
```

---

## Резервное копирование

### MongoDB Atlas Backups

**Автоматические бэкапы (M10+):**
- Continuous backups каждые 12 часов
- Point-in-time recovery
- Retention: 2-35 дней

**Настройка:**
1. MongoDB Atlas → Cluster
2. Backup → Configure
3. Enable Cloud Provider Snapshots

### Container Images

```bash
# Список всех образов
gcloud container images list --repository=gcr.io/donosti-strategia-prod

# Удаление старых образов (экономия)
gcloud container images delete gcr.io/donosti-strategia-prod/donosti-backend:old-tag
```

---

## Troubleshooting

### Backend не запускается

```bash
# Проверка логов
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=donosti-backend" --limit=50

# Проверка переменных окружения
gcloud run services describe donosti-backend --region=europe-west1 --format="value(spec.template.spec.containers[0].env)"

# Локальный тест образа
docker run -it gcr.io/donosti-strategia-prod/donosti-backend:latest /bin/bash
```

### Frontend не загружается

```bash
# Проверка Nginx конфигурации
docker run gcr.io/donosti-strategia-prod/donosti-frontend:latest cat /etc/nginx/conf.d/default.conf

# Проверка build
docker run gcr.io/donosti-strategia-prod/donosti-frontend:latest ls -la /usr/share/nginx/html
```

### Ошибки соединения с MongoDB

```bash
# Тест подключения из Cloud Run
gcloud run services update donosti-backend \
  --set-env-vars MONGO_URL="mongodb+srv://NEW_CONNECTION_STRING"

# Проверка в логах
gcloud logging read "resource.labels.service_name=donosti-backend AND textPayload=~\"mongo\"" --limit=10
```

### Cold start слишком долгий

```bash
# Увеличение min-instances
gcloud run services update donosti-backend \
  --min-instances=1 \
  --region=europe-west1

# Предупреждение: это увеличит стоимость!
```

---

## Полезные команды

```bash
# Список всех Cloud Run сервисов
gcloud run services list

# Детали сервиса
gcloud run services describe donosti-backend --region=europe-west1

# Обновление переменных окружения
gcloud run services update donosti-backend \
  --update-env-vars KEY=VALUE \
  --region=europe-west1

# Масштабирование
gcloud run services update donosti-backend \
  --max-instances=20 \
  --region=europe-west1

# Откат к предыдущей версии
gcloud run services update-traffic donosti-backend \
  --to-revisions=PREVIOUS_REVISION=100 \
  --region=europe-west1

# Удаление сервиса
gcloud run services delete donosti-backend --region=europe-west1

# Просмотр ревизий
gcloud run revisions list --service=donosti-backend --region=europe-west1
```

---

## Заключение

Поздравляем! Ваше приложение DONOSTI STRATEGIA теперь работает на Google Cloud Platform с:
- ✅ Автоматическим масштабированием
- ✅ HTTPS из коробки
- ✅ Глобальной доступностью
- ✅ Минимальной стоимостью
- ✅ Профессиональным мониторингом

**Следующие шаги:**
1. Настройте custom domain
2. Настройте CI/CD с GitHub
3. Настройте алерты и мониторинг
4. Регулярно проверяйте метрики
5. Оптимизируйте производительность

**Поддержка:**
- Google Cloud Docs: https://cloud.google.com/run/docs
- Community: https://stackoverflow.com/questions/tagged/google-cloud-run
- Support: https://cloud.google.com/support

---

**Версия документации:** 1.0.0  
**Последнее обновление:** 27 октября 2025  
**Контакт:** ulyanov.ht@gmail.com
