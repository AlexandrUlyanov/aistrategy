# Multi-stage build для Frontend

# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Копирование package files
COPY package.json yarn.lock ./

# Установка зависимостей
RUN yarn install --frozen-lockfile --production=false

# Копирование исходного кода
COPY . .

# Build production version
RUN yarn build

# Stage 2: Production с Nginx
FROM nginx:alpine

# Копирование build из предыдущего stage
COPY --from=build /app/build /usr/share/nginx/html

# Копирование nginx конфигурации
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8080

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]