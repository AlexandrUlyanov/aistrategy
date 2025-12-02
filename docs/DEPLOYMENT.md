# 🚀 Инструкции по развертыванию DONOSTI STRATEGIA

## Содержание
- [Развертывание в production](#развертывание-в-production)
- [Развертывание на Emergent Platform](#развертывание-на-emergent-platform)
- [Развертывание на собственном сервере](#развертывание-на-собственном-сервере)
- [Docker развертывание](#docker-развертывание)
- [Настройка домена и SSL](#настройка-домена-и-ssl)
- [Мониторинг и логи](#мониторинг-и-логи)

---

## Развертывание в production

### 1. Подготовка

#### Переменные окружения

**Frontend (.env)**
```env
REACT_APP_BACKEND_URL=https://api.donostistrategia.com
```

**Backend (.env)**
```env
MONGO_URL=mongodb://your-mongo-host:27017
DB_NAME=donosti_strategia_prod
CORS_ORIGINS=https://donostistrategia.com,https://www.donostistrategia.com
SMTP_EMAIL=noreply@donostistrategia.com
SMTP_PASSWORD=your-secure-app-password
```

### 2. Сборка Frontend

```bash
cd /app/frontend

# Установка зависимостей
yarn install --production=false

# Сборка production версии
yarn build

# Результат будет в папке build/
ls -la build/
```

**Оптимизация сборки:**
- Минификация JavaScript и CSS
- Оптимизация изображений
- Code splitting
- Tree shaking

### 3. Подготовка Backend

```bash
cd /app/backend

# Установка production зависимостей
pip install -r requirements.txt --no-cache-dir

# Проверка синтаксиса
python -m py_compile server.py
```

---

## Развертывание на Emergent Platform

### Автоматическое развертывание

Emergent Platform предоставляет встроенную систему развертывания:

1. **Подключение GitHub**
   - Зайдите в настройки проекта
   - Подключите GitHub репозиторий
   - Настройте автоматическое развертывание

2. **Push to Deploy**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

3. **Мониторинг развертывания**
   - Откройте панель управления Emergent
   - Отслеживайте статус развертывания
   - Проверьте логи в реальном времени

### Настройка доменов

1. В панели Emergent перейдите в раздел «Domains»
2. Добавьте свой домен
3. Настройте DNS записи:
   ```
   A     @     [IP-адрес от Emergent]
   CNAME www   [URL от Emergent]
   ```
4. Дождитесь выпуска SSL сертификата (автоматически)

---

## Развертывание на собственном сервере

### Требования к серверу

**Минимальные:**
- CPU: 2 cores
- RAM: 2GB
- Storage: 20GB SSD
- OS: Ubuntu 20.04+ / Debian 11+

**Рекомендуемые:**
- CPU: 4 cores
- RAM: 4GB
- Storage: 50GB SSD
- OS: Ubuntu 22.04 LTS

### Установка на Ubuntu/Debian

#### 1. Обновление системы

```bash
sudo apt update && sudo apt upgrade -y
```

#### 2. Установка зависимостей

```bash
# Node.js и Yarn
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g yarn

# Python и pip
sudo apt install -y python3.10 python3-pip python3-venv

# MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Nginx
sudo apt install -y nginx

# Certbot для SSL
sudo apt install -y certbot python3-certbot-nginx
```

#### 3. Создание пользователя приложения

```bash
sudo useradd -m -s /bin/bash donosti
sudo usermod -aG sudo donosti
sudo su - donosti
```

#### 4. Клонирование проекта

```bash
cd /home/donosti
git clone https://your-repo-url.git donosti-strategia
cd donosti-strategia
```

#### 5. Настройка Frontend

```bash
cd /home/donosti/donosti-strategia/frontend

# Создание .env файла
cat > .env << EOF
REACT_APP_BACKEND_URL=https://api.donostistrategia.com
EOF

# Установка и сборка
yarn install
yarn build
```

#### 6. Настройка Backend

```bash
cd /home/donosti/donosti-strategia/backend

# Создание виртуального окружения
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt

# Создание .env файла
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=donosti_strategia_prod
CORS_ORIGINS=https://donostistrategia.com
SMTP_EMAIL=noreply@donostistrategia.com
SMTP_PASSWORD=your-app-password
EOF
```

#### 7. Настройка Systemd сервисов

**Backend сервис:**

```bash
sudo nano /etc/systemd/system/donosti-backend.service
```

```ini
[Unit]
Description=DONOSTI STRATEGIA Backend
After=network.target mongodb.service

[Service]
Type=simple
User=donosti
WorkingDirectory=/home/donosti/donosti-strategia/backend
Environment="PATH=/home/donosti/donosti-strategia/backend/venv/bin"
ExecStart=/home/donosti/donosti-strategia/backend/venv/bin/uvicorn server:app --host 0.0.0.0 --port 8001 --workers 4
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl start donosti-backend
sudo systemctl enable donosti-backend
sudo systemctl status donosti-backend
```

#### 8. Настройка Nginx

```bash
sudo nano /etc/nginx/sites-available/donostistrategia.com
```

```nginx
# Frontend
server {
    listen 80;
    server_name donostistrategia.com www.donostistrategia.com;
    
    root /home/donosti/donosti-strategia/frontend/build;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Static files caching
    location /static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Backend API
server {
    listen 80;
    server_name api.donostistrategia.com;
    
    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Включение конфигурации
sudo ln -s /etc/nginx/sites-available/donostistrategia.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 9. Настройка SSL с Let's Encrypt

```bash
# Автоматическая установка SSL
sudo certbot --nginx -d donostistrategia.com -d www.donostistrategia.com -d api.donostistrategia.com

# Автоматическое обновление
sudo certbot renew --dry-run
```

#### 10. Настройка Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

---

## Docker развертывание

### Dockerfile для Backend

```dockerfile
# /app/backend/Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Установка зависимостей
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода
COPY . .

# Порт
EXPOSE 8001

# Запуск
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Dockerfile для Frontend

```dockerfile
# /app/frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

# Установка зависимостей
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Сборка
COPY . .
RUN yarn build

# Production image
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: donosti-mongo
    restart: always
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_DATABASE: donosti_strategia
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    container_name: donosti-backend
    restart: always
    depends_on:
      - mongodb
    environment:
      MONGO_URL: mongodb://mongodb:27017
      DB_NAME: donosti_strategia
      CORS_ORIGINS: https://donostistrategia.com
      SMTP_EMAIL: ${SMTP_EMAIL}
      SMTP_PASSWORD: ${SMTP_PASSWORD}
    ports:
      - "8001:8001"

  frontend:
    build: ./frontend
    container_name: donosti-frontend
    restart: always
    depends_on:
      - backend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/ssl:/etc/nginx/ssl

volumes:
  mongo-data:
```

### Запуск через Docker Compose

```bash
# Создание .env файла для docker-compose
cat > .env << EOF
SMTP_EMAIL=noreply@donostistrategia.com
SMTP_PASSWORD=your-app-password
EOF

# Запуск
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down

# Перезапуск
docker-compose restart
```

---

## Настройка домена и SSL

### DNS настройки

Установите следующие DNS записи у вашего регистратора:

```
Тип    Имя  Значение              TTL
A      @    YOUR_SERVER_IP        3600
A      www  YOUR_SERVER_IP        3600
A      api  YOUR_SERVER_IP        3600
CNAME  *    donostistrategia.com     3600
```

### Проверка DNS

```bash
# Проверка A записей
dig donostistrategia.com +short
dig www.donostistrategia.com +short
dig api.donostistrategia.com +short

# Проверка распространения DNS
nslookup donostistrategia.com 8.8.8.8
```

---

## Мониторинг и логи

### Просмотр логов

```bash
# Backend логи (systemd)
sudo journalctl -u donosti-backend -f

# Nginx логи
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MongoDB логи
sudo tail -f /var/log/mongodb/mongod.log
```

### Мониторинг ресурсов

```bash
# CPU и память
htop

# Использование диска
df -h

# Статус сервисов
sudo systemctl status donosti-backend
sudo systemctl status nginx
sudo systemctl status mongod
```

### Настройка мониторинга (опционально)

**Prometheus + Grafana:**

```bash
# Установка Prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.40.0/prometheus-2.40.0.linux-amd64.tar.gz
tar xvf prometheus-2.40.0.linux-amd64.tar.gz
cd prometheus-2.40.0.linux-amd64
./prometheus --config.file=prometheus.yml
```

---

## Резервное копирование

### Автоматический backup MongoDB

```bash
# Создание скрипта backup
cat > /home/donosti/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/home/donosti/backups"
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --db donosti_strategia_prod --out $BACKUP_DIR/mongo_$DATE

# Удаление старых backup (старше 30 дней)
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} +
EOF

chmod +x /home/donosti/backup.sh

# Добавление в cron (ежедневно в 2:00)
crontab -e
# Добавить: 0 2 * * * /home/donosti/backup.sh
```

---

## Обновление приложения

### Обновление через Git

```bash
cd /home/donosti/donosti-strategia

# Создание backup текущей версии
sudo systemctl stop donosti-backend
cp -r /home/donosti/donosti-strategia /home/donosti/donosti-strategia.backup

# Обновление кода
git pull origin main

# Frontend
cd frontend
yarn install
yarn build

# Backend
cd ../backend
source venv/bin/activate
pip install -r requirements.txt

# Перезапуск
sudo systemctl start donosti-backend
sudo systemctl reload nginx
```

### Откат к предыдущей версии

```bash
sudo systemctl stop donosti-backend
rm -rf /home/donosti/donosti-strategia
mv /home/donosti/donosti-strategia.backup /home/donosti/donosti-strategia
sudo systemctl start donosti-backend
```

---

## Troubleshooting

### Backend не запускается

```bash
# Проверка логов
sudo journalctl -u donosti-backend -n 50

# Проверка порта
sudo netstat -tulpn | grep 8001

# Ручной запуск для отладки
cd /home/donosti/donosti-strategia/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
```

### Frontend показывает ошибки

```bash
# Проверка Nginx конфигурации
sudo nginx -t

# Пересборка Frontend
cd /home/donosti/donosti-strategia/frontend
yarn build

# Проверка прав доступа
ls -la /home/donosti/donosti-strategia/frontend/build
```

### MongoDB проблемы

```bash
# Проверка статуса
sudo systemctl status mongod

# Проверка подключения
mongo --eval "db.adminCommand('ping')"

# Восстановление из backup
mongorestore --db donosti_strategia_prod /path/to/backup
```

---

**Версия**: 1.0.0  
**Последнее обновление**: 27 октября 2025